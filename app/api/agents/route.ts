import { type NextRequest, NextResponse } from "next/server"

// Mock database - in production, use a real database
const agents: any[] = [
  {
    id: "AGT-001",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    vehicle: "Honda CB150R",
    vehicleType: "Motorcycle",
    rating: 4.8,
    totalDeliveries: 247,
    isOnline: true,
    location: { lat: 40.7128, lng: -74.006 },
    createdAt: "2024-03-15T10:00:00Z",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const isOnline = searchParams.get("online")

  let filteredAgents = agents

  if (status) {
    filteredAgents = filteredAgents.filter((a) => a.status === status)
  }
  if (isOnline !== null) {
    filteredAgents = filteredAgents.filter((a) => a.isOnline === (isOnline === "true"))
  }

  return NextResponse.json({ agents: filteredAgents })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, vehicle, vehicleType } = body

    const newAgent = {
      id: `AGT-${String(agents.length + 1).padStart(3, "0")}`,
      name,
      email,
      phone,
      status: "pending",
      vehicle,
      vehicleType,
      rating: 0,
      totalDeliveries: 0,
      isOnline: false,
      location: null,
      createdAt: new Date().toISOString(),
    }

    agents.push(newAgent)

    console.log("[v0] New agent registered:", newAgent.id)

    return NextResponse.json({ agent: newAgent }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error registering agent:", error)
    return NextResponse.json({ error: "Failed to register agent" }, { status: 500 })
  }
}
