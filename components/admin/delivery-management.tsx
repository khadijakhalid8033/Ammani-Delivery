"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MapPin, Eye } from "lucide-react"

export function DeliveryManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const deliveries = [
    {
      id: "ORD-001",
      customer: "Alex Johnson",
      agent: "John Doe",
      pickup: "Sabon Gari Market",
      dropoff: "Kano Central Market",
      status: "completed",
      amount: 600,
      createdAt: "2025-01-15 14:30",
      completedAt: "2025-01-15 15:15",
      distance: "2.3 km",
    },
    {
      id: "ORD-002",
      customer: "Sarah Wilson",
      agent: "Mike Chen",
      pickup: "Fagge District",
      dropoff: "Kano City Mall",
      status: "in-progress",
      amount: 450,
      createdAt: "2025-01-15 15:00",
      completedAt: null,
      distance: "1.8 km",
    },
    {
      id: "ORD-003",
      customer: "David Brown",
      agent: "Lisa Park",
      pickup: "Nasarawa GRA",
      dropoff: "Kofar Ruwa Market",
      status: "pending",
      amount: 900,
      createdAt: "2025-01-15 15:10",
      completedAt: null,
      distance: "3.1 km",
    },
    {
      id: "ORD-004",
      customer: "Emma Davis",
      agent: "Tom Wilson",
      pickup: "Bompai Industrial Area",
      dropoff: "Kano Government House",
      status: "cancelled",
      amount: 250,
      createdAt: "2025-01-15 13:45",
      completedAt: null,
      distance: "1.2 km",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400"
      case "in-progress":
        return "bg-blue-500/20 text-blue-400"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400"
      case "cancelled":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesSearch =
      delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.agent.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || delivery.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Delivery Management</h1>
          <p className="text-muted-foreground">Monitor and manage all delivery orders</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by order ID, customer, or agent..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-input border border-border rounded-md text-foreground"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">23</p>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-400">156</p>
            <p className="text-sm text-muted-foreground">Completed Today</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">8</p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-400">₦690,000</p>
            <p className="text-sm text-muted-foreground">Revenue Today</p>
          </CardContent>
        </Card>
      </div>

      {/* Deliveries Table */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>All Deliveries</CardTitle>
          <CardDescription>Complete list of delivery orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDeliveries.map((delivery) => (
              <div key={delivery.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">{delivery.id.slice(-2)}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{delivery.id}</p>
                      <p className="text-sm text-muted-foreground">{delivery.createdAt}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className={getStatusColor(delivery.status)}>
                      {delivery.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Customer</p>
                    <p className="font-medium">{delivery.customer}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Agent</p>
                    <p className="font-medium">{delivery.agent}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Route</p>
                    <p className="font-medium">{delivery.distance}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Amount</p>
                    <p className="font-bold text-primary">₦{delivery.amount.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-green-500" />
                      <span className="text-muted-foreground">From:</span>
                      <span>{delivery.pickup}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-red-500" />
                      <span className="text-muted-foreground">To:</span>
                      <span>{delivery.dropoff}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDeliveries.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No deliveries found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
