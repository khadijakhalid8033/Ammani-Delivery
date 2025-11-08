"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, User, Star, Truck, Shield, Settings, LogOut } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface AgentProfileProps {
  onBack: () => void
}

export function AgentProfile({ onBack }: AgentProfileProps) {
  const agentData = {
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    rating: 4.8,
    totalDeliveries: 247,
    joinDate: "March 2024",
    vehicle: "Honda CB150R",
    vehicleType: "Motorcycle",
    licenseNumber: "DL123456789",
    status: "verified",
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold">Profile</h1>
          <p className="text-sm text-muted-foreground">Manage your account settings</p>
        </div>
      </div>

      {/* Profile Summary */}
      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{agentData.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{agentData.rating}</span>
                </div>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{agentData.totalDeliveries} deliveries</span>
              </div>
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 mt-2">
                <Shield className="h-3 w-3 mr-1" />
                Verified Agent
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Personal Information</CardTitle>
          <CardDescription>Your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={agentData.name} readOnly className="bg-muted" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={agentData.email} readOnly className="bg-muted" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" value={agentData.phone} readOnly className="bg-muted" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="joinDate">Member Since</Label>
            <Input id="joinDate" value={agentData.joinDate} readOnly className="bg-muted" />
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Information */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Vehicle Information</CardTitle>
          <CardDescription>Your registered vehicle details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Truck className="h-8 w-8 text-primary" />
            <div>
              <p className="font-semibold">{agentData.vehicle}</p>
              <p className="text-sm text-muted-foreground">{agentData.vehicleType}</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="license">License Number</Label>
            <Input id="license" value={agentData.licenseNumber} readOnly className="bg-muted" />
          </div>
        </CardContent>
      </Card>

      {/* Performance Stats */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Performance Stats</CardTitle>
          <CardDescription>Your delivery performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-primary">{agentData.rating}</p>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-primary">{agentData.totalDeliveries}</p>
              <p className="text-sm text-muted-foreground">Total Deliveries</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-primary">94%</p>
              <p className="text-sm text-muted-foreground">Acceptance Rate</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-primary">98%</p>
              <p className="text-sm text-muted-foreground">On-time Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="space-y-3">
        <Button variant="outline" className="w-full justify-start bg-transparent">
          <Settings className="h-4 w-4 mr-3" />
          Account Settings
        </Button>
        <Button variant="outline" className="w-full justify-start text-red-400 hover:text-red-300 bg-transparent">
          <LogOut className="h-4 w-4 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
