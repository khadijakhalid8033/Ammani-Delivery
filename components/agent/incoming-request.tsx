"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock, DollarSign, User, Navigation } from "lucide-react"

interface IncomingRequestProps {
  request: {
    id: string
    customer: string
    service: string
    pickup: string
    dropoff: string
    distance: string
    fare: number
    estimatedTime: string
  }
  onAccept: () => void
  onDecline: () => void
}

export function IncomingRequest({ request, onAccept, onDecline }: IncomingRequestProps) {
  const [timeLeft, setTimeLeft] = useState(30)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onDecline()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [onDecline])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md border-border bg-card animate-in slide-in-from-bottom-4">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-xl">New Delivery Request</CardTitle>
          <CardDescription>Auto-decline in {timeLeft}s</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Customer Info */}
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold">{request.customer}</p>
              <p className="text-sm text-muted-foreground">{request.service}</p>
            </div>
          </div>

          {/* Trip Details */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Pickup</p>
                <p className="font-medium">{request.pickup}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Drop-off</p>
                <p className="font-medium">{request.dropoff}</p>
              </div>
            </div>
          </div>

          {/* Trip Stats */}
          <div className="grid grid-cols-3 gap-4 p-3 bg-muted/50 rounded-lg">
            <div className="text-center">
              <Navigation className="h-5 w-5 text-primary mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Distance</p>
              <p className="font-semibold text-sm">{request.distance}</p>
            </div>
            <div className="text-center">
              <Clock className="h-5 w-5 text-primary mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Est. Time</p>
              <p className="font-semibold text-sm">{request.estimatedTime}</p>
            </div>
            <div className="text-center">
              <DollarSign className="h-5 w-5 text-primary mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Fare</p>
              <p className="font-semibold text-sm">${request.fare.toFixed(2)}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onDecline} className="flex-1 bg-transparent">
              Decline
            </Button>
            <Button onClick={onAccept} className="flex-1">
              Accept
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
