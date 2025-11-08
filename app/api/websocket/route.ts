import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")
  const userType = searchParams.get("userType")

  if (!userId || !userType) {
    return new Response("Missing userId or userType", { status: 400 })
  }

  // Check if this is a WebSocket upgrade request
  const upgrade = request.headers.get("upgrade")
  if (upgrade !== "websocket") {
    return new Response("Expected WebSocket upgrade", { status: 426 })
  }

  // WebSocket upgrades are not supported in this environment
  // The client will fall back to polling
  console.log(`[v0] WebSocket upgrade not supported, client will use polling fallback`)

  return new Response("WebSocket upgrade not supported in this environment", {
    status: 501,
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
