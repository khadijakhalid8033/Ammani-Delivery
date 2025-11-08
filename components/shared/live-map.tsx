"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation, Truck } from "lucide-react"

interface LiveMapProps {
  deliveryId?: string
  agentLocation?: { lat: number; lng: number }
  pickupLocation?: { lat: number; lng: number; address: string }
  dropoffLocation?: { lat: number; lng: number; address: string }
}

export function LiveMap({ deliveryId, agentLocation, pickupLocation, dropoffLocation }: LiveMapProps) {
  const [currentLocation, setCurrentLocation] = useState(agentLocation)

  useEffect(() => {
    if (!deliveryId) return

    // Listen for agent location updates
    const handleLocationUpdate = (event: CustomEvent) => {
      if (event.detail.deliveryId === deliveryId) {
        setCurrentLocation(event.detail.location)
        console.log("[v0] Agent location updated:", event.detail.location)
      }
    }

    window.addEventListener("agent-location", handleLocationUpdate as EventListener)

    // Simulate location updates for demo
    const interval = setInterval(() => {
      if (agentLocation) {
        const newLocation = {
          lat: agentLocation.lat + (Math.random() - 0.5) * 0.001,
          lng: agentLocation.lng + (Math.random() - 0.5) * 0.001,
        }
        setCurrentLocation(newLocation)
      }
    }, 5000)

    return () => {
      window.removeEventListener("agent-location", handleLocationUpdate as EventListener)
      clearInterval(interval)
    }
  }, [deliveryId, agentLocation])

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="h-5 w-5" />
          Live Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-64 bg-muted rounded-lg overflow-hidden">
          {/* Map placeholder - in production, integrate with Google Maps or Mapbox */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-green-500/20">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Live Map View</p>
              <p className="text-xs text-muted-foreground">Real-time tracking active</p>
            </div>
          </div>

          {/* Location markers */}
          {pickupLocation && (
            <div className="absolute top-4 left-4 bg-green-500 text-white p-2 rounded-full shadow-lg">
              <MapPin className="h-4 w-4" />
            </div>
          )}

          {dropoffLocation && (
            <div className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg">
              <MapPin className="h-4 w-4" />
            </div>
          )}

          {currentLocation && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-primary text-white p-2 rounded-full shadow-lg animate-pulse">
              <Truck className="h-4 w-4" />
            </div>
          )}
        </div>

        {/* Location details */}
        <div className="mt-4 space-y-2 text-sm">
          {pickupLocation && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-muted-foreground">Pickup:</span>
              <span className="font-medium">{pickupLocation.address}</span>
            </div>
          )}
          {dropoffLocation && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-muted-foreground">Drop-off:</span>
              <span className="font-medium">{dropoffLocation.address}</span>
            </div>
          )}
          {currentLocation && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              <span className="text-muted-foreground">Agent:</span>
              <span className="font-medium">
                {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
