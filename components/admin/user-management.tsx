"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, User, Mail, Phone, MoreHorizontal } from "lucide-react"

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  const users = [
    {
      id: "USR-001",
      name: "Alex Johnson",
      email: "alex.johnson@email.com",
      phone: "+234 (803) 123-4567",
      status: "active",
      joinDate: "2024-12-15",
      totalOrders: 23,
      totalSpent: 49150,
      lastOrder: "2025-01-15",
    },
    {
      id: "USR-002",
      name: "Sarah Wilson",
      email: "sarah.wilson@email.com",
      phone: "+234 (805) 234-5678",
      status: "active",
      joinDate: "2024-11-20",
      totalOrders: 45,
      totalSpent: 113450,
      lastOrder: "2025-01-14",
    },
    {
      id: "USR-003",
      name: "David Brown",
      email: "david.brown@email.com",
      phone: "+234 (807) 345-6789",
      status: "inactive",
      joinDate: "2024-10-05",
      totalOrders: 12,
      totalSpent: 26900,
      lastOrder: "2024-12-20",
    },
    {
      id: "USR-004",
      name: "Emma Davis",
      email: "emma.davis@email.com",
      phone: "+234 (809) 456-7890",
      status: "suspended",
      joinDate: "2024-09-12",
      totalOrders: 8,
      totalSpent: 17850,
      lastOrder: "2024-11-15",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400"
      case "inactive":
        return "bg-gray-500/20 text-gray-400"
      case "suspended":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">Manage customer accounts and activity</p>
        </div>
        <Button>Add New User</Button>
      </div>

      {/* Search and Filters */}
      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-400">1,247</p>
            <p className="text-sm text-muted-foreground">Total Users</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">1,156</p>
            <p className="text-sm text-muted-foreground">Active Users</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">78</p>
            <p className="text-sm text-muted-foreground">New This Month</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-400">₦9,135,600</p>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>Complete list of registered customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Mail className="h-4 w-4" />
                      <span>Email</span>
                    </div>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Phone className="h-4 w-4" />
                      <span>Phone</span>
                    </div>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Total Orders</p>
                    <p className="font-bold text-primary">{user.totalOrders}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Total Spent</p>
                    <p className="font-bold text-primary">₦{user.totalSpent.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Joined: {user.joinDate}</span>
                  <span className="text-muted-foreground">Last Order: {user.lastOrder}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
