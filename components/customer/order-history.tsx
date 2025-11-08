"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, MapPin, Star, RotateCcw } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface OrderHistoryProps {
  onBack: () => void
}

export function OrderHistory({ onBack }: OrderHistoryProps) {
  const orders = [
    {
      id: "ORD-001",
      service: "Home → Sabon Gari Market",
      agent: "Musa Ibrahim",
      date: "2025-01-15",
      status: "completed",
      amount: 300, // Updated to Naira
      rating: 5,
      pickup: "Nasarawa GRA",
      dropoff: "Sabon Gari Market",
    },
    {
      id: "ORD-002",
      service: "Restaurant Delivery",
      agent: "Fatima Aliyu",
      date: "2025-01-14",
      status: "completed",
      amount: 200, // Updated to Naira
      rating: 4,
      pickup: "Aminu Kano Way Restaurant",
      dropoff: "Fagge District",
    },
    {
      id: "ORD-003",
      service: "Kano Motor Park Pickup",
      agent: "Abdullahi Sani",
      date: "2025-01-13",
      status: "cancelled",
      amount: 250, // Updated to Naira
      rating: null,
      pickup: "Kano Central Motor Park",
      dropoff: "Kano City Mall",
    },
    {
      id: "ORD-004",
      service: "Custom Delivery",
      agent: "Aisha Mohammed",
      date: "2025-01-12",
      status: "completed",
      amount: 250, // Updated to Naira
      rating: 5,
      pickup: "Government House",
      dropoff: "Bayero University Kano",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400"
      case "cancelled":
        return "bg-red-500/20 text-red-400"
      case "in-progress":
        return "bg-blue-500/20 text-blue-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-3 w-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold">Order History</h1>
          <p className="text-sm text-muted-foreground">Your past deliveries</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">12</p>
            <p className="text-xs text-muted-foreground">Total Orders</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">₦1000</p>
            <p className="text-xs text-muted-foreground">Total Spent</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">4.8</p>
            <p className="text-xs text-muted-foreground">Avg Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Order List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="border-border bg-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">{order.service}</CardTitle>
                  <CardDescription className="text-sm">
                    Order #{order.id} • {order.date}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">From:</span>
                  <span className="font-medium">{order.pickup}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">To:</span>
                  <span className="font-medium">{order.dropoff}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Agent:</span>
                    <span className="text-sm font-medium">{order.agent}</span>
                    {order.rating && <div className="flex items-center gap-1">{renderStars(order.rating)}</div>}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-primary">₦{order.amount.toFixed(2)}</span>
                    {order.status === "completed" && (
                      <Button variant="outline" size="sm">
                        <RotateCcw className="h-3 w-3 mr-1" />
                        Reorder
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">Load More Orders</Button>
      </div>
    </div>
  )
}
