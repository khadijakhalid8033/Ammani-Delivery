import { type NextRequest, NextResponse } from "next/server"
import { broadcastMessage, sendNotification } from "../websocket/route"

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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const customerId = searchParams.get("customerId")
  const agentId = searchParams.get("agentId")

  let filteredDeliveries = deliveries

  if (status) {
    filteredDeliveries = filteredDeliveries.filter((d) => d.status === status)
  }
  if (customerId) {
    filteredDeliveries = filteredDeliveries.filter((d) => d.customerId === customerId)
  }
  if (agentId) {
    filteredDeliveries = filteredDeliveries.filter((d) => d.agentId === agentId)
  }

  return NextResponse.json({ deliveries: filteredDeliveries })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customerId, pickup, dropoff, serviceType, amount } = body

    const newDelivery = {
      id: `ORD-${String(deliveries.length + 1).padStart(3, "0")}`,
      customerId,
      agentId: null,
      status: "pending",
      pickup,
      dropoff,
      serviceType,
      amount,
      createdAt: new Date().toISOString(),
      completedAt: null,
    }

    deliveries.push(newDelivery)

    // Broadcast to all available agents
    broadcastMessage(
      {
        type: "new_delivery_request",
        data: {
          deliveryId: newDelivery.id,
          pickup: newDelivery.pickup,
          dropoff: newDelivery.dropoff,
          amount: newDelivery.amount,
          serviceType: newDelivery.serviceType,
          timestamp: new Date().toISOString(),
        },
      },
      "agent",
    )

    // Send notification to customer
    sendNotification(customerId, {
      type: "success",
      title: "Delivery Request Created",
      message: `Your delivery request ${newDelivery.id} has been created and is being matched with nearby agents.`,
    })

    console.log("[v0] New delivery created and broadcast:", newDelivery.id)

    return NextResponse.json({ delivery: newDelivery }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating delivery:", error)
    return NextResponse.json({ error: "Failed to create delivery" }, { status: 500 })
  }
}
