"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, MapPin, Clock, User, Bell, History, QrCode } from "lucide-react"
import { ServiceSelector } from "./service-selector"
import { WalletView } from "./wallet-view"
import { OrderTracking } from "./order-tracking"
import { OrderHistory } from "./order-history"
import { useRealtime } from "@/hooks/use-realtime"

type ViewType = "home" | "book" | "wallet" | "tracking" | "history" | "profile"

export function CustomerDashboard() {
  const [currentView, setCurrentView] = useState<ViewType>("home")
  const [walletBalance] = useState(45.5)
  const [activeOrder] = useState({
    id: "ORD-001",
    status: "in-progress",
    agent: "Ahmad Umar",
    eta: "12 mins",
  })

  const { isConnected, sendMessage } = useRealtime("USR-001", "customer")

  const renderView = () => {
    switch (currentView) {
      case "book":
        return <ServiceSelector onBack={() => setCurrentView("home")} />
      case "wallet":
        return <WalletView balance={walletBalance} onBack={() => setCurrentView("home")} />
      case "tracking":
        return <OrderTracking order={activeOrder} onBack={() => setCurrentView("home")} />
      case "history":
        return <OrderHistory onBack={() => setCurrentView("home")} />
      default:
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Hi, Alex!</h1>
                <p className="text-muted-foreground">What can we deliver for you today?</p>
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

            {/* Wallet Balance */}
            <Card className="border-border bg-gradient-to-r from-primary/10 to-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <Wallet className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Wallet Balance</p>
                      <p className="text-2xl font-bold text-foreground">₦{(walletBalance * 50).toFixed(2)}</p>
                    </div>
                  </div>
                  <Button onClick={() => setCurrentView("wallet")}>Add Funds</Button>
                </div>
              </CardContent>
            </Card>

            {/* Active Order */}
            {activeOrder && (
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/20 rounded-lg">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{activeOrder.agent}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          ETA: {activeOrder.eta}
                        </p>
                      </div>
                    </div>
                    <Button onClick={() => setCurrentView("tracking")}>Track Order</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Card
                className="border-border bg-card cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => setCurrentView("book")}
              >
                <CardContent className="p-6 text-center">
                  <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">Book Delivery</h3>
                  <p className="text-sm text-muted-foreground">Find nearby agents</p>
                </CardContent>
              </Card>

              <Card
                className="border-border bg-card cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => setCurrentView("history")}
              >
                <CardContent className="p-6 text-center">
                  <History className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">Order History</h3>
                  <p className="text-sm text-muted-foreground">View past deliveries</p>
                </CardContent>
              </Card>
            </div>

            {/* Service Types */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Popular Services</CardTitle>
                <CardDescription>Choose from our most requested delivery types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { title: "Sabon Gari Market → Home", desc: "Shopping delivery", price: "From ₦250" },
                    { title: "Restaurant", desc: "Food delivery", price: "From ₦200" },
                    { title: "Kano Motor Park", desc: "Travel pickup", price: "From ₦300" },
                    { title: "Custom", desc: "Any location", price: "From ₦250" },
                  ].map((service, index) => (
                    <div
                      key={index}
                      className="p-3 border border-border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                      onClick={() => setCurrentView("book")}
                    >
                      <h4 className="font-medium text-sm">{service.title}</h4>
                      <p className="text-xs text-muted-foreground">{service.desc}</p>
                      <p className="text-xs text-primary font-medium mt-1">{service.price}</p>
                    </div>
                  ))}
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

      {!isConnected && (
        <div className="fixed top-4 right-4 bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
          Connecting...
        </div>
      )}

      {/* Bottom Navigation */}
      {currentView === "home" && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
          <div className="max-w-md mx-auto px-4 py-2">
            <div className="flex justify-around">
              <Button variant="ghost" size="sm" className="flex-col h-auto py-2" onClick={() => setCurrentView("home")}>
                <MapPin className="h-5 w-5 mb-1" />
                <span className="text-xs">Home</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex-col h-auto py-2" onClick={() => setCurrentView("book")}>
                <QrCode className="h-5 w-5 mb-1" />
                <span className="text-xs">Book</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex-col h-auto py-2"
                onClick={() => setCurrentView("wallet")}
              >
                <Wallet className="h-5 w-5 mb-1" />
                <span className="text-xs">Wallet</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex-col h-auto py-2"
                onClick={() => setCurrentView("history")}
              >
                <History className="h-5 w-5 mb-1" />
                <span className="text-xs">History</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
