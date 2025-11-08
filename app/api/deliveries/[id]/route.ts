import { type NextRequest, NextResponse } from "next/server"
import { broadcastDeliveryUpdate, sendNotification } from "../../websocket/route"

// Mock database - in production, use a real database
const deliveries: any[] = [
  {
    id: "ORD-001",
    customerId: "USR-001",
    agentId: "AGT-001",
    status: "completed",
    pickup: "Nasarawa GRA", // Updated to Kano location
    dropoff: "Sabon Gari Market", // Updated to Kano location
    amount: 20625, // Updated to Naira equivalent
    createdAt: "2025-01-15T14:30:00Z",
    completedAt: "2025-01-15T15:15:00Z",
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const delivery = deliveries.find((d) => d.id === params.id)

  if (!delivery) {
    return NextResponse.json({ error: "Delivery not found" }, { status: 404 })
  }

  return NextResponse.json({ delivery })
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const deliveryIndex = deliveries.findIndex((d) => d.id === params.id)

    if (deliveryIndex === -1) {
      return NextResponse.json({ error: "Delivery not found" }, { status: 404 })
    }

    const previousStatus = deliveries[deliveryIndex].status

    // Update delivery
    deliveries[deliveryIndex] = {
      ...deliveries[deliveryIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    const updatedDelivery = deliveries[deliveryIndex]

    // Broadcast delivery update to all relevant parties
    broadcastDeliveryUpdate(updatedDelivery.id, {
      status: updatedDelivery.status,
      agentId: updatedDelivery.agentId,
      pickup: updatedDelivery.pickup,
      dropoff: updatedDelivery.dropoff,
      estimatedTime: updatedDelivery.estimatedTime,
      previousStatus,
    })

    // Send notifications based on status change
    if (updatedDelivery.status !== previousStatus) {
      const statusMessages = {
        accepted: "Your delivery has been accepted by an agent",
        picked_up: "Your items have been picked up",
        in_transit: "Your delivery is on the way",
        delivered: "Your delivery has been completed",
        cancelled: "Your delivery has been cancelled",
      }

      if (statusMessages[updatedDelivery.status as keyof typeof statusMessages]) {
        sendNotification(updatedDelivery.customerId, {
          type:
            updatedDelivery.status === "delivered"
              ? "success"
              : updatedDelivery.status === "cancelled"
                ? "error"
                : "info",
          title: "Delivery Update",
          message: statusMessages[updatedDelivery.status as keyof typeof statusMessages],
        })
      }

      // Notify agent of status changes too
      if (updatedDelivery.agentId && updatedDelivery.status === "delivered") {
        sendNotification(updatedDelivery.agentId, {
          type: "success",
          title: "Delivery Completed",
          message: `Delivery ${updatedDelivery.id} has been marked as completed. Payment will be processed shortly.`,
        })
      }
    }

    console.log("[v0] Delivery updated and broadcast:", updatedDelivery.id, "Status:", updatedDelivery.status)

    return NextResponse.json({ delivery: updatedDelivery })
  } catch (error) {
    console.error("[v0] Error updating delivery:", error)
    return NextResponse.json({ error: "Failed to update delivery" }, { status: 500 })
  }
}
