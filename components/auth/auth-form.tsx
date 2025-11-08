"use client"

import type React from "react"
import { useState } from "react"
import { usePathname } from "next/navigation"   // 👈 NEW
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Truck, User, Shield } from "lucide-react"

interface AuthFormProps {
  type: "customer" | "agent" | "admin"
}

export function AuthForm({ type }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()   // 👈 get current route

  // 👇 decide defaultTab based on URL
  const defaultTab = pathname.includes("register") ? "register" : "login"

  const getIcon = () => {
    switch (type) {
      case "customer":
        return <User className="h-6 w-6" />
      case "agent":
        return <Truck className="h-6 w-6" />
      case "admin":
        return <Shield className="h-6 w-6" />
    }
  }

  const getTitle = () => {
    switch (type) {
      case "customer":
        return "Customer Portal"
      case "agent":
        return "Delivery Agent Portal"
      case "admin":
        return "Admin Dashboard"
    }
  }

  const getDescription = () => {
    switch (type) {
      case "customer":
        return "Order deliveries and track your packages"
      case "agent":
        return "Accept delivery requests and manage earnings"
      case "admin":
        return "Manage platform operations and analytics"
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md border-border bg-card">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4 text-primary">{getIcon()}</div>
          <CardTitle className="text-2xl">{getTitle()}</CardTitle>
          <CardDescription>{getDescription()}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="bg-input border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    className="bg-input border-border"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    required
                    className="bg-input border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="bg-input border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    required
                    className="bg-input border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    required
                    className="bg-input border-border"
                  />
                </div>
                {type === "agent" && (
                  <div className="space-y-2">
                    <Label htmlFor="vehicle">Vehicle Type</Label>
                    <select
                      id="vehicle"
                      className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
                      required
                    >
                      <option value="">Select vehicle type</option>
                      <option value="bike">Motorcycle</option>
                      <option value="car">Car</option>
                      <option value="van">Van</option>
                      <option value="keke">Keke Napep</option>
                    </select>
                  </div>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
