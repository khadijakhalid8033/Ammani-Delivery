"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, MapPin, Phone, MessageCircle, Clock, CheckCircle, QrCode } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface OrderTrackingProps {
  order: {
    id: string
    status: string
    agent: string
    eta: string
  }
  onBack: () => void
}

export function OrderTracking({ order, onBack }: OrderTrackingProps) {
  const [currentStatus, setCurrentStatus] = useState("pickup")
  const [showQR, setShowQR] = useState(false)

  const statusSteps = [
    { id: "confirmed", label: "Order Confirmed", completed: true },
    { id: "pickup", label: "Agent En Route", completed: true, active: currentStatus === "pickup" },
    { id: "collected", label: "Item Collected", completed: false },
    { id: "delivery", label: "Out for Delivery", completed: false },
    { id: "delivered", label: "Delivered", completed: false },
  ]

  // Simulate status updates
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStatus === "pickup") {
        setCurrentStatus("collected")
      } else if (currentStatus === "collected") {
        setCurrentStatus("delivery")
      }
    }, 10000)

    return () => clearTimeout(timer)
  }, [currentStatus])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold">Track Order</h1>
          <p className="text-sm text-muted-foreground">Order #{order.id}</p>
        </div>
      </div>

      {/* Status Card */}
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Delivery Status</CardTitle>
            <Badge variant="secondary" className="bg-green-500/20 text-green-400">
              In Progress
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {statusSteps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed ? "bg-green-500" : step.active ? "bg-primary" : "bg-muted"
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle className="h-4 w-4 text-white" />
                  ) : (
                    <span className="text-xs font-bold text-white">{index + 1}</span>
                  )}
                </div>
                <div className="flex-1">
                  <p
                    className={`font-medium ${
                      step.completed || step.active ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </p>
                  {step.active && <p className="text-sm text-primary">Current status</p>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Agent Info */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Your Delivery Agent</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="font-semibold text-primary">{order.agent.charAt(0)}</span>
              </div>
              <div>
                <p className="font-semibold">{order.agent}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>ETA: {order.eta}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Map Placeholder */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Live Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Live map tracking</p>
              <p className="text-xs text-muted-foreground">Agent location updates in real-time</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* QR Code for Confirmation */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Delivery Confirmation</CardTitle>
          <CardDescription>Show this QR code to your delivery agent</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            {showQR ? (
              <div className="space-y-4">
                <div className="w-32 h-32 bg-white rounded-lg mx-auto flex items-center justify-center">
                  <div className="text-xs text-black font-mono">
                    QR CODE
                    <br />
                    {order.id}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Agent will scan this code to confirm delivery</p>
                <Button variant="outline" onClick={() => setShowQR(false)}>
                  Hide QR Code
                </Button>
              </div>
            ) : (
              <Button onClick={() => setShowQR(true)} className="w-full">
                <QrCode className="h-4 w-4 mr-2" />
                Show QR Code
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
