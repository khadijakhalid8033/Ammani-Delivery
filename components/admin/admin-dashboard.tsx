"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  BarChart3,
  Users,
  Truck,
  DollarSign,
  MapPin,
  Search,
  Bell,
  Settings,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import { AdminSidebar } from "./admin-sidebar"
import { DeliveryManagement } from "./delivery-management"
import { UserManagement } from "./user-management"
import { AgentManagement } from "./agent-management"
import { AnalyticsDashboard } from "./analytics-dashboard"
import { useRealtime } from "@/hooks/use-realtime"

type ViewType = "overview" | "deliveries" | "users" | "agents" | "analytics" | "settings"

export function AdminDashboard() {
  const [currentView, setCurrentView] = useState<ViewType>("overview")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Mock data for dashboard stats
  const stats = {
    totalUsers: 1247,
    totalAgents: 89,
    activeDeliveries: 23,
    todayRevenue: 34560,
    pendingAgents: 5,
    completedDeliveries: 156,
  }

  const recentDeliveries = [
    {
      id: "ORD-001",
      customer: "Alex Johnson",
      agent: "John Doe",
      status: "completed",
      amount: 250,
      time: "2 mins ago",
    },
    {
      id: "ORD-002",
      customer: "Sarah Wilson",
      agent: "Mike Chen",
      status: "in-progress",
      amount: 500,
      time: "5 mins ago",
    },
    {
      id: "ORD-003",
      customer: "David Brown",
      agent: "Lisa Park",
      status: "pending",
      amount: 900,
      time: "8 mins ago",
    },
  ]

  const { isConnected, notifications } = useRealtime("ADM-001", "admin")

  const renderMainContent = () => {
    switch (currentView) {
      case "deliveries":
        return <DeliveryManagement />
      case "users":
        return <UserManagement />
      case "agents":
        return <AgentManagement />
      case "analytics":
        return <AnalyticsDashboard />
      default:
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
                <p className="text-muted-foreground">Monitor your delivery platform performance</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search..." className="pl-10 w-64" />
                </div>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Users</p>
                      <p className="text-3xl font-bold text-foreground">{stats.totalUsers.toLocaleString()}</p>
                      <div className="flex items-center gap-1 text-sm text-green-400 mt-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>+12% from last month</span>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      <Users className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Agents</p>
                      <p className="text-3xl font-bold text-foreground">{stats.totalAgents}</p>
                      <div className="flex items-center gap-1 text-sm text-green-400 mt-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>+5 new this week</span>
                      </div>
                    </div>
                    <div className="p-3 bg-green-500/20 rounded-lg">
                      <Truck className="h-6 w-6 text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Deliveries</p>
                      <p className="text-3xl font-bold text-foreground">{stats.activeDeliveries}</p>
                      <div className="flex items-center gap-1 text-sm text-blue-400 mt-1">
                        <Clock className="h-4 w-4" />
                        <span>Real-time</span>
                      </div>
                    </div>
                    <div className="p-3 bg-orange-500/20 rounded-lg">
                      <MapPin className="h-6 w-6 text-orange-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Today's Revenue</p>
                      <p className="text-3xl font-bold text-foreground">${stats.todayRevenue.toLocaleString()}</p>
                      <div className="flex items-center gap-1 text-sm text-green-400 mt-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>+8% from yesterday</span>
                      </div>
                    </div>
                    <div className="p-3 bg-purple-500/20 rounded-lg">
                      <DollarSign className="h-6 w-6 text-purple-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Deliveries */}
              <Card className="lg:col-span-2 border-border bg-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Recent Deliveries</CardTitle>
                      <CardDescription>Latest delivery activity</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setCurrentView("deliveries")}>
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentDeliveries.map((delivery) => (
                      <div
                        key={delivery.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary">{delivery.id.slice(-2)}</span>
                          </div>
                          <div>
                            <p className="font-medium">{delivery.customer}</p>
                            <p className="text-sm text-muted-foreground">Agent: {delivery.agent}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge
                            variant="secondary"
                            className={
                              delivery.status === "completed"
                                ? "bg-green-500/20 text-green-400"
                                : delivery.status === "in-progress"
                                  ? "bg-blue-500/20 text-blue-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                            }
                          >
                            {delivery.status}
                          </Badge>
                          <div className="text-right">
                            <p className="font-bold text-primary">₦{delivery.amount.toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground">{delivery.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions & Alerts */}
              <div className="space-y-6">
                {/* Pending Approvals */}
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Pending Approvals</CardTitle>
                    <CardDescription>Agent registrations awaiting review</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-400" />
                          <span className="text-sm font-medium">{stats.pendingAgents} new agents</span>
                        </div>
                        <Button size="sm" onClick={() => setCurrentView("agents")}>
                          Review
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Today's Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm">Completed Deliveries</span>
                        </div>
                        <span className="font-bold">{stats.completedDeliveries}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-blue-400" />
                          <span className="text-sm">Average Delivery Time</span>
                        </div>
                        <span className="font-bold">18 mins</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-purple-400" />
                          <span className="text-sm">Customer Satisfaction</span>
                        </div>
                        <span className="font-bold">4.8/5</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                        onClick={() => setCurrentView("analytics")}
                      >
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Analytics
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                        onClick={() => setCurrentView("users")}
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Manage Users
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                        onClick={() => setCurrentView("agents")}
                      >
                        <Truck className="h-4 w-4 mr-2" />
                        Manage Agents
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"}`}>
        {!isConnected && (
          <div className="fixed top-4 right-4 bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm z-50">
            Connecting to real-time updates...
          </div>
        )}

        <div className="p-6">{renderMainContent()}</div>
      </main>
    </div>
  )
}
