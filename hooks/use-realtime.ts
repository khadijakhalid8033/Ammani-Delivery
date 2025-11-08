"use client"

import { useEffect, useState } from "react"
import { getWebSocketClient } from "@/lib/websocket"

export function useRealtime(userId: string, userType: "customer" | "agent" | "admin") {
  const [isConnected, setIsConnected] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])

  useEffect(() => {
    const wsClient = getWebSocketClient()

    // Connect to WebSocket (with polling fallback)
    wsClient.connect(userId, userType)

    // Listen for WebSocket messages
    const handleMessage = (event: CustomEvent) => {
      const { type, data } = event.detail

      console.log("[v0] Received real-time message:", type, data)

      switch (type) {
        case "notification":
          setNotifications((prev) => [data, ...prev.slice(0, 9)]) // Keep last 10
          break
        case "delivery_update":
          // Handle delivery status updates
          window.dispatchEvent(new CustomEvent("delivery-update", { detail: data }))
          break
        case "agent_location":
          // Handle agent location updates
          window.dispatchEvent(new CustomEvent("agent-location", { detail: data }))
          break
        case "connection_status":
          setIsConnected(data.connected)
          break
      }
    }

    window.addEventListener("websocket-message", handleMessage as EventListener)

    const connectionTimer = setTimeout(() => {
      setIsConnected(true)
    }, 1000)

    return () => {
      clearTimeout(connectionTimer)
      window.removeEventListener("websocket-message", handleMessage as EventListener)
      wsClient.disconnect()
    }
  }, [userId, userType])

  const sendMessage = (type: string, data: any) => {
    const wsClient = getWebSocketClient()
    wsClient.send({ type, data })
  }

  return {
    isConnected,
    notifications,
    sendMessage,
    clearNotifications: () => setNotifications([]),
  }
}
