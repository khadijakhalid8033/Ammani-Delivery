"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Truck, Star, CheckCircle, X, Eye } from "lucide-react"

export function AgentManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const agents = [
    {
      id: "AGT-001",
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      status: "active",
      vehicle: "Honda CB150R",
      vehicleType: "Motorcycle",
      rating: 4.8,
      totalDeliveries: 247,
      joinDate: "2024-03-15",
      lastActive: "2025-01-15 15:30",
      earnings: 1247.5,
      verificationStatus: "verified",
    },
    {
      id: "AGT-002",
      name: "Sarah Wilson",
      email: "sarah.wilson@email.com",
      phone: "+1 (555) 234-5678",
      status: "active",
      vehicle: "Toyota Vios",
      vehicleType: "Car",
      rating: 4.9,
      totalDeliveries: 189,
      joinDate: "2024-05-20",
      lastActive: "2025-01-15 14:45",
      earnings: 987.25,
      verificationStatus: "verified",
    },
    {
      id: "AGT-003",
      name: "Mike Johnson",
      email: "mike.johnson@email.com",
      phone: "+1 (555) 345-6789",
      status: "pending",
      vehicle: "Yamaha Mio",
      vehicleType: "Motorcycle",
      rating: 0,
      totalDeliveries: 0,
      joinDate: "2025-01-14",
      lastActive: "2025-01-14 10:20",
      earnings: 0,
      verificationStatus: "pending",
    },
    {
      id: "AGT-004",
      name: "Lisa Chen",
      email: "lisa.chen@email.com",
      phone: "+1 (555) 456-7890",
      status: "suspended",
      vehicle: "Suzuki Swift",
      vehicleType: "Car",
      rating: 3.2,
      totalDeliveries: 45,
      joinDate: "2024-08-10",
      lastActive: "2025-01-10 09:15",
      earnings: 234.75,
      verificationStatus: "verified",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400"
      case "suspended":
        return "bg-red-500/20 text-red-400"
      case "inactive":
        return "bg-gray-500/20 text-gray-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getVerificationColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-500/20 text-green-400"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400"
      case "rejected":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || agent.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleApproveAgent = (agentId: string) => {
    // Handle agent approval
    console.log("Approving agent:", agentId)
  }

  const handleRejectAgent = (agentId: string) => {
    // Handle agent rejection
    console.log("Rejecting agent:", agentId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Agent Management</h1>
          <p className="text-muted-foreground">Manage delivery agents and applications</p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search agents..."
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
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-400">89</p>
            <p className="text-sm text-muted-foreground">Active Agents</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">5</p>
            <p className="text-sm text-muted-foreground">Pending Approval</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">4.7</p>
            <p className="text-sm text-muted-foreground">Avg Rating</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-400">23</p>
            <p className="text-sm text-muted-foreground">Online Now</p>
          </CardContent>
        </Card>
      </div>

      {/* Agents Table */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>All Agents</CardTitle>
          <CardDescription>Complete list of delivery agents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAgents.map((agent) => (
              <div key={agent.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <Truck className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{agent.name}</p>
                      <p className="text-sm text-muted-foreground">{agent.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className={getVerificationColor(agent.verificationStatus)}>
                      {agent.verificationStatus}
                    </Badge>
                    <Badge variant="secondary" className={getStatusColor(agent.status)}>
                      {agent.status}
                    </Badge>
                    {agent.status === "pending" && (
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleApproveAgent(agent.id)}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleRejectAgent(agent.id)}>
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Contact</p>
                    <p className="font-medium">{agent.email}</p>
                    <p className="text-xs text-muted-foreground">{agent.phone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Vehicle</p>
                    <p className="font-medium">{agent.vehicle}</p>
                    <p className="text-xs text-muted-foreground">{agent.vehicleType}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Performance</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{agent.rating || "N/A"}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{agent.totalDeliveries} deliveries</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Earnings</p>
                    <p className="font-bold text-primary">₦{agent.earnings.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">Total earned</p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Joined: {agent.joinDate}</span>
                  <span className="text-muted-foreground">Last Active: {agent.lastActive}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
