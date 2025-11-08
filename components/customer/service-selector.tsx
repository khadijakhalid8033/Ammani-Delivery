"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, MapPin, Navigation, Clock, Star } from "lucide-react"

interface ServiceSelectorProps {
  onBack: () => void
}

export function ServiceSelector({ onBack }: ServiceSelectorProps) {
  const [step, setStep] = useState<"service" | "locations" | "agents" | "confirm">("service")
  const [selectedService, setSelectedService] = useState("")
  const [pickupLocation, setPickupLocation] = useState("")
  const [dropoffLocation, setDropoffLocation] = useState("")
  const [selectedAgent, setSelectedAgent] = useState<any>(null)

  const services = [
    {
      id: "market-home",
      title: "Sabon Gari Market → Home ",
      desc: "Shopping and grocery delivery",
      price: 250,
      icon: "🏠",
    },
    { id: "restaurant", title: "Restaurant Delivery", desc: "Hot meals delivered fresh", price: 250, icon: "🍕" },
    {
      id: "bus-station",
      title: "Kano Motor Park Pickup",
      desc: "Travel assistance and luggage",
      price: 300,
      icon: "🚌🛺",
    },
    { id: "custom", title: "Custom Delivery", desc: "Any pickup and drop-off service", price: 250, icon: "📦" },
  ]

  const nearbyAgents = [
    { id: 1, name: "Musa Ibrahim", rating: 4.8, distance: "0.5 km", eta: "5 mins", vehicle: "Motorcycle", price: 250 },
    { id: 2, name: "Fatima Aliyu", rating: 4.9, distance: "0.8 km", eta: "7 mins", vehicle: "Car", price: 350 },
    { id: 3, name: "Fatima Aliyu", rating: 4.9, distance: "0.6 km", eta: "5 mins", vehicle: "Rickshaw(keke NAPEP)", price: 350 },
    { id: 4, name: "Abdullahi Sani", rating: 4.7, distance: "1.2 km", eta: "10 mins", vehicle: "Van", price: 500 },
  ]

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId)
    setStep("locations")
  }

  const handleLocationSubmit = () => {
    if (pickupLocation && dropoffLocation) {
      setStep("agents")
    }
  }

  const handleAgentSelect = (agent: any) => {
    setSelectedAgent(agent)
    setStep("confirm")
  }

  const handleConfirmBooking = () => {
    // Simulate booking confirmation
    alert("Booking confirmed! Your delivery agent will contact you shortly.")
    onBack()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold">Book Delivery</h1>
          <p className="text-sm text-muted-foreground">
            {step === "service" && "Choose your service type"}
            {step === "locations" && "Set pickup and drop-off locations"}
            {step === "agents" && "Select a delivery agent"}
            {step === "confirm" && "Confirm your booking"}
          </p>
        </div>
      </div>

      {/* Service Selection */}
      {step === "service" && (
        <div className="space-y-4">
          {services.map((service) => (
            <Card
              key={service.id}
              className="border-border bg-card cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => handleServiceSelect(service.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{service.icon}</div>
                    <div>
                      <h3 className="font-semibold">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">{service.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">₦{service.price.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">Starting from</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Location Selection */}
      {step === "locations" && (
        <div className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg">Delivery Locations</CardTitle>
              <CardDescription>Enter your pickup and drop-off addresses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pickup">Pickup Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="pickup"
                    placeholder="Enter pickup address"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dropoff">Drop-off Location</Label>
                <div className="relative">
                  <Navigation className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="dropoff"
                    placeholder="Enter drop-off address"
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button onClick={handleLocationSubmit} className="w-full" disabled={!pickupLocation || !dropoffLocation}>
                Find Nearby Agents
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Agent Selection */}
      {step === "agents" && (
        <div className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg">Available Agents</CardTitle>
              <CardDescription>Choose from nearby delivery agents</CardDescription>
            </CardHeader>
          </Card>

          {nearbyAgents.map((agent) => (
            <Card
              key={agent.id}
              className="border-border bg-card cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => handleAgentSelect(agent)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-primary">{agent.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{agent.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{agent.rating}</span>
                        <span>•</span>
                        <span>{agent.distance}</span>
                        <span>•</span>
                        <span>{agent.vehicle}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">₦{agent.price.toFixed(2)}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{agent.eta}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Booking Confirmation */}
      {step === "confirm" && selectedAgent && (
        <div className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg">Confirm Booking</CardTitle>
              <CardDescription>Review your delivery details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service:</span>
                  <span className="font-medium">{services.find((s) => s.id === selectedService)?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Agent:</span>
                  <span className="font-medium">{selectedAgent.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pickup:</span>
                  <span className="font-medium text-right max-w-[200px] truncate">{pickupLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Drop-off:</span>
                  <span className="font-medium text-right max-w-[200px] truncate">{dropoffLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ETA:</span>
                  <span className="font-medium">{selectedAgent.eta}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary">₦{selectedAgent.price.toFixed(2)}</span>
                </div>
              </div>
              <Button onClick={handleConfirmBooking} className="w-full">
                Confirm & Pay
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
