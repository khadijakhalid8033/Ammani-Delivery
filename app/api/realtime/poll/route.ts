import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")
  const userType = searchParams.get("userType")

  if (!userId || !userType) {
    return NextResponse.json({ error: "Missing userId or userType" }, { status: 400 })
  }

  // Simulate real-time updates for demo purposes
  const updates = []

  // Add sample notifications for customers
  if (userType === "customer" && Math.random() > 0.8) {
    updates.push({
      type: "notification",
      data: {
        type: "info",
        title: "Delivery Update",
        message: "Your delivery is on the way!",
        timestamp: new Date().toISOString(),
      },
    })
  }

  // Add sample delivery updates
  if (Math.random() > 0.9) {
    updates.push({
      type: "delivery_update",
      data: {
        deliveryId: "del_123",
        status: "in_transit",
        location: { lat: 12.0022, lng: 8.5919 },
        timestamp: new Date().toISOString(),
      },
    })
  }

  return NextResponse.json(updates)
}
