"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Navigation, Phone, MessageCircle, CheckCircle } from "lucide-react"

interface ActiveDeliveryProps {
  delivery: {
    id: string
    customer: string
    service: string
    pickup: string
    dropoff: string
    distance: string
    fare: number
    estimatedTime: string
  }
  onComplete: () => void
  onBack: () => void
}

export function ActiveDelivery({ delivery, onComplete, onBack }: ActiveDeliveryProps) {
  const [currentStep, setCurrentStep] = useState<"pickup" | "transit" | "delivered">("pickup")

  const steps = [
    { id: "pickup", label: "Going to Pickup", completed: false, active: currentStep === "pickup" },
    {
      id: "transit",
      label: "Item Collected",
      completed: currentStep === "delivered",
      active: currentStep === "transit",
    },
    { id: "delivered", label: "Delivered", completed: currentStep === "delivered", active: false },
  ]

  const handleNextStep = () => {
    if (currentStep === "pickup") {
      setCurrentStep("transit")
    } else if (currentStep === "transit") {
      setCurrentStep("delivered")
      setTimeout(() => {
        onComplete()
      }, 1000)
    }
  }

  const getStepButton = () => {
    switch (currentStep) {
      case "pickup":
        return "Arrived at Pickup"
      case "transit":
        return "Mark as Delivered"
      case "delivered":
        return "Delivery Complete"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold">Active Delivery</h1>
          <p className="text-sm text-muted-foreground">Order #{delivery.id}</p>
        </div>
      </div>

      {/* Customer Info */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Customer Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="font-semibold text-primary">{delivery.customer.charAt(0)}</span>
              </div>
              <div>
                <p className="font-semibold">{delivery.customer}</p>
                <p className="text-sm text-muted-foreground">{delivery.service}</p>
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

      {/* Delivery Progress */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Delivery Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {steps.map((step, index) => (
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
                  {step.active && <p className="text-sm text-primary">Current step</p>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Location Details */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Trip Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Pickup Location</p>
              <p className="font-medium">{delivery.pickup}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Drop-off Location</p>
              <p className="font-medium">{delivery.dropoff}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Distance</p>
              <p className="font-semibold">{delivery.distance}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Est. Time</p>
              <p className="font-semibold">{delivery.estimatedTime}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Fare</p>
              <p className="font-semibold text-primary">${delivery.fare.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <Card className="border-border bg-card">
        <CardContent className="p-4">
          <Button className="w-full bg-transparent" variant="outline">
            <Navigation className="h-4 w-4 mr-2" />
            Open in Maps
          </Button>
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="pb-20">
        <Button onClick={handleNextStep} className="w-full h-12 text-lg" disabled={currentStep === "delivered"}>
          {currentStep === "delivered" ? (
            <>
              <CheckCircle className="h-5 w-5 mr-2" />
              Delivery Complete
            </>
          ) : (
            getStepButton()
          )}
        </Button>
      </div>
    </div>
  )
}
