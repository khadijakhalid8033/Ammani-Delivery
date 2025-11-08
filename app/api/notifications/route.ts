import { type NextRequest, NextResponse } from "next/server"
import { broadcastMessage } from "../websocket/route"

// Mock notification system
const notifications: any[] = []

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")
  const userType = searchParams.get("userType")

  let filteredNotifications = notifications

  if (userId) {
    filteredNotifications = filteredNotifications.filter((n) => n.userId === userId)
  }
  if (userType) {
    filteredNotifications = filteredNotifications.filter((n) => n.userType === userType)
  }

  return NextResponse.json({ notifications: filteredNotifications })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, userType, title, message, type } = body

    const notification = {
      id: `NOT-${Date.now()}`,
      userId,
      userType,
      title,
      message,
      type,
      read: false,
      createdAt: new Date().toISOString(),
    }

    notifications.push(notification)

    // Broadcast notification via WebSocket for instant delivery
    broadcastMessage(
      {
        type: "notification",
        data: notification,
      },
      undefined,
      userId,
    )

    console.log("[v0] Notification created and broadcast:", notification.id, "for", userId)

    return NextResponse.json({ notification }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating notification:", error)
    return NextResponse.json({ error: "Failed to create notification" }, { status: 500 })
  }
}
