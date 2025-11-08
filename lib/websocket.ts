// WebSocket client for real-time features
export class WebSocketClient {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000
  private pollingInterval: NodeJS.Timeout | null = null
  private isPolling = false

  constructor(private url: string) {}

  connect(userId: string, userType: "customer" | "agent" | "admin") {
    this.tryWebSocketConnection(userId, userType)
  }

  private tryWebSocketConnection(userId: string, userType: "customer" | "agent" | "admin") {
    try {
      if (typeof WebSocket === "undefined") {
        console.log("[v0] WebSocket not available, using polling fallback")
        this.startPolling(userId, userType)
        return
      }

      this.ws = new WebSocket(`${this.url}?userId=${userId}&userType=${userType}`)

      this.ws.onopen = () => {
        console.log("[v0] WebSocket connected")
        this.reconnectAttempts = 0
        this.stopPolling()
      }

      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        this.handleMessage(data)
      }

      this.ws.onclose = () => {
        console.log("[v0] WebSocket disconnected")
        this.reconnect(userId, userType)
      }

      this.ws.onerror = (error) => {
        console.log("[v0] WebSocket error, falling back to polling")
        this.startPolling(userId, userType)
      }
    } catch (error) {
      console.log("[v0] Failed to connect WebSocket, using polling fallback")
      this.startPolling(userId, userType)
    }
  }

  private startPolling(userId: string, userType: "customer" | "agent" | "admin") {
    if (this.isPolling) return

    this.isPolling = true
    console.log("[v0] Starting polling fallback")

    // Simulate connection
    setTimeout(() => {
      this.handleMessage({ type: "connection_status", data: { connected: true } })
    }, 100)

    // Poll for updates every 5 seconds
    this.pollingInterval = setInterval(() => {
      this.pollForUpdates(userId, userType)
    }, 5000)
  }

  private stopPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval)
      this.pollingInterval = null
      this.isPolling = false
    }
  }

  private async pollForUpdates(userId: string, userType: "customer" | "agent" | "admin") {
    try {
      const response = await fetch(`/api/realtime/poll?userId=${userId}&userType=${userType}`)
      if (response.ok) {
        const updates = await response.json()
        updates.forEach((update: any) => this.handleMessage(update))
      }
    } catch (error) {
      console.log("[v0] Polling error:", error)
    }
  }

  private reconnect(userId: string, userType: "customer" | "agent" | "admin") {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      setTimeout(() => {
        console.log(`[v0] Reconnecting (attempt ${this.reconnectAttempts})`)
        this.tryWebSocketConnection(userId, userType)
      }, this.reconnectDelay * this.reconnectAttempts)
    } else {
      console.log("[v0] Max reconnect attempts reached, using polling")
      this.startPolling(userId, userType)
    }
  }

  private handleMessage(data: any) {
    // Dispatch custom events for different message types
    const event = new CustomEvent("websocket-message", { detail: data })
    window.dispatchEvent(event)
  }

  send(data: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data))
    }
  }

  disconnect() {
    this.stopPolling()
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }
}

// Singleton instance
let wsClient: WebSocketClient | null = null

export const getWebSocketClient = () => {
  if (!wsClient) {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3001"
    wsClient = new WebSocketClient(wsUrl)
  }
  return wsClient
}
