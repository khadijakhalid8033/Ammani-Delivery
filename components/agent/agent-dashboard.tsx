"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Truck, DollarSign, MapPin, User, Bell, Navigation, CheckCircle } from "lucide-react"
import { IncomingRequest } from "./incoming-request"
import { ActiveDelivery } from "./active-delivery"
import { EarningsView } from "./earnings-view"
import { AgentProfile } from "./agent-profile"
import { useRealtime } from "@/hooks/use-realtime"

type ViewType = "home" | "active" | "earnings" | "profile"

export function AgentDashboard() {
  const [currentView, setCurrentView] = useState<ViewType>("home")
  const [isOnline, setIsOnline] = useState(false)
  const [showIncomingRequest, setShowIncomingRequest] = useState(false)
  const [activeDelivery, setActiveDelivery] = useState<any>(null)
  const [todayEarnings] = useState(127.5)
  const [completedDeliveries] = useState(8)

  const incomingRequest = {
    id: "REQ-001",
    customer: "Amina Yusuf",
    service: "Sabon Gari Market → Home",
    pickup: "Nasarawa GRA",
    dropoff: "Sabon Gari Market",
    distance: "2.3 km",
    fare: 14025,
    estimatedTime: "15 mins",
  }

  useEffect(() => {
    if (isOnline && !activeDelivery) {
      const timer = setTimeout(() => {
        setShowIncomingRequest(true)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isOnline, activeDelivery])

  const { isConnected, sendMessage } = useRealtime("AGT-001", "agent")

  useEffect(() => {
    if (isOnline && isConnected) {
      const interval = setInterval(() => {
        const location = {
          lat: 12.0022 + (Math.random() - 0.5) * 0.01,
          lng: 8.592 + (Math.random() - 0.5) * 0.01,
        }
        sendMessage("location_update", { agentId: "AGT-001", location })
      }, 10000)

      return () => clearInterval(interval)
    }
  }, [isOnline, isConnected, sendMessage])

  const handleAcceptRequest = () => {
    setActiveDelivery(incomingRequest)
    setShowIncomingRequest(false)
    setCurrentView("active")
  }

  const handleDeclineRequest = () => {
    setShowIncomingRequest(false)
  }

  const handleCompleteDelivery = () => {
    setActiveDelivery(null)
    setCurrentView("home")
  }

  const renderView = () => {
    switch (currentView) {
      case "active":
        return activeDelivery ? (
          <ActiveDelivery
            delivery={activeDelivery}
            onComplete={handleCompleteDelivery}
            onBack={() => setCurrentView("home")}
          />
        ) : (
          <div className="text-center py-12">
            <Truck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No active deliveries</p>
          </div>
        )
      case "earnings":
        return <EarningsView earnings={todayEarnings} onBack={() => setCurrentView("home")} />
      case "profile":
        return <AgentProfile onBack={() => setCurrentView("home")} />
      default:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Hi, Musa!</h1>
                <p className="text-muted-foreground">Ready to start earning?</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setCurrentView("profile")}>
                  <User className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isOnline ? "bg-green-500/20" : "bg-gray-500/20"}`}>
                      <Truck className={`h-6 w-6 ${isOnline ? "text-green-400" : "text-gray-400"}`} />
                    </div>
                    <div>
                      <p className="font-semibold">{isOnline ? "You're Online" : "You're Offline"}</p>
                      <p className="text-sm text-muted-foreground">
                        {isOnline ? "Ready to receive delivery requests" : "Turn on to start receiving requests"}
                      </p>
                    </div>
                  </div>
                  <Switch checked={isOnline} onCheckedChange={setIsOnline} />
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="border-border bg-card">
                <CardContent className="p-4 text-center">
                  <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">₦{(todayEarnings * 1650).toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Today's Earnings</p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-4 text-center">
                  <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{completedDeliveries}</p>
                  <p className="text-sm text-muted-foreground">Deliveries Done</p>
                </CardContent>
              </Card>
            </div>

            {activeDelivery && (
              <Card className="border-border bg-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Active Delivery</CardTitle>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                      In Progress
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Customer:</span>
                      <span className="font-medium">{activeDelivery.customer}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Service:</span>
                      <span className="font-medium">{activeDelivery.service}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Fare:</span>
                      <span className="font-bold text-primary">₦{activeDelivery.fare.toFixed(2)}</span>
                    </div>
                    <Button onClick={() => setCurrentView("active")} className="w-full">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-2 gap-4">
              <Card
                className="border-border bg-card cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => setCurrentView("earnings")}
              >
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">Earnings</h3>
                  <p className="text-sm text-muted-foreground">View your income</p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card cursor-pointer hover:bg-accent/50 transition-colors">
                <CardContent className="p-6 text-center">
                  <Navigation className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">Navigation</h3>
                  <p className="text-sm text-muted-foreground">Open maps</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>This Week's Performance</CardTitle>
                <CardDescription>Your delivery statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Deliveries:</span>
                    <span className="font-bold">42</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Average Rating:</span>
                    <span className="font-bold">4.8 ⭐</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Earnings:</span>
                    <span className="font-bold text-primary">₦802,725</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Acceptance Rate:</span>
                    <span className="font-bold">94%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto p-4">{renderView()}</div>

      {showIncomingRequest && (
        <IncomingRequest request={incomingRequest} onAccept={handleAcceptRequest} onDecline={handleDeclineRequest} />
      )}

      {!isConnected && (
        <div className="fixed top-4 right-4 bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
          Connecting...
        </div>
      )}

      {currentView === "home" && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
          <div className="max-w-md mx-auto px-4 py-2">
            <div className="flex justify-around">
              <Button variant="ghost" size="sm" className="flex-col h-auto py-2">
                <MapPin className="h-5 w-5 mb-1" />
                <span className="text-xs">Home</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex-col h-auto py-2"
                onClick={() => setCurrentView("active")}
              >
                <Truck className="h-5 w-5 mb-1" />
                <span className="text-xs">Active</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex-col h-auto py-2"
                onClick={() => setCurrentView("earnings")}
              >
                <DollarSign className="h-5 w-5 mb-1" />
                <span className="text-xs">Earnings</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex-col h-auto py-2"
                onClick={() => setCurrentView("profile")}
              >
                <User className="h-5 w-5 mb-1" />
                <span className="text-xs">Profile</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
