import { type NextRequest, NextResponse } from "next/server"
import { broadcastAgentLocation } from "../../websocket/route"

// Mock agent locations storage
const agentLocations = new Map<string, { lat: number; lng: number; timestamp: string }>()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { agentId, location } = body

    if (!agentId || !location || typeof location.lat !== "number" || typeof location.lng !== "number") {
      return NextResponse.json({ error: "Invalid agentId or location data" }, { status: 400 })
    }

    const locationData = {
      lat: location.lat,
      lng: location.lng,
      timestamp: new Date().toISOString(),
    }

    // Store agent location
    agentLocations.set(agentId, locationData)

    // Broadcast agent location to customers tracking their deliveries
    broadcastAgentLocation(agentId, {
      lat: location.lat,
      lng: location.lng,
    })

    console.log(`[v0] Agent ${agentId} location updated and broadcast:`, location)

    return NextResponse.json({
      success: true,
      location: locationData,
    })
  } catch (error) {
    console.error("[v0] Error updating agent location:", error)
    return NextResponse.json({ error: "Failed to update location" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const agentId = searchParams.get("agentId")

  if (!agentId) {
    // Return all agent locations
    const allLocations = Object.fromEntries(agentLocations)
    return NextResponse.json({ locations: allLocations })
  }

  const location = agentLocations.get(agentId)
  if (!location) {
    return NextResponse.json({ error: "Agent location not found" }, { status: 404 })
  }

  return NextResponse.json({ location })
}
