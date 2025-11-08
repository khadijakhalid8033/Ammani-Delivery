"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, DollarSign, TrendingUp, Calendar, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface EarningsViewProps {
  earnings: number
  onBack: () => void
}

export function EarningsView({ earnings, onBack }: EarningsViewProps) {
  const weeklyEarnings = [
    { day: "Mon", amount: 17075, deliveries: 6 },
    { day: "Tue", amount: 20500, deliveries: 9 },
    { day: "Wed", amount: 18750, deliveries: 7 },
    { day: "Thu", amount: 12870, deliveries: 10 },
    { day: "Fri", amount: 24700, deliveries: 12 },
    { day: "Sat", amount: 35750, deliveries: 13 },
    { day: "Sun", amount: 19100, deliveries: 8 },
  ]

  const recentPayouts = [
    { id: 1, amount: 40507, date: "2025-01-14", status: "completed", method: "Bank Transfer" }, // Updated to Naira
    { id: 2, amount: 31308, date: "2025-01-07", status: "completed", method: "Bank Transfer" },
    { id: 3, amount: 25781, date: "2024-12-31", status: "completed", method: "Bank Transfer" },
  ]

  const totalWeekly = weeklyEarnings.reduce((sum, day) => sum + day.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold">Earnings</h1>
          <p className="text-sm text-muted-foreground">Track your income and payouts</p>
        </div>
      </div>

      {/* Today's Earnings */}
      <Card className="border-border bg-gradient-to-r from-primary/10 to-primary/5">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Today's Earnings</p>
            <p className="text-4xl font-bold text-foreground mb-2">₦{(earnings * 1650).toFixed(2)}</p>{" "}
            {/* Updated to Naira */}
            <div className="flex items-center justify-center gap-2 text-sm text-green-400">
              <TrendingUp className="h-4 w-4" />
              <span>+12% from yesterday</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Overview */}
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">This Week</CardTitle>
              <CardDescription>₦{totalWeekly.toFixed(2)} total earnings</CardDescription> {/* Updated currency */}
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {weeklyEarnings.map((day) => (
              <div key={day.day} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">{day.day}</span>
                  </div>
                  <div>
                    <p className="font-medium">₦{day.amount.toFixed(2)}</p> {/* Updated currency */}
                    <p className="text-sm text-muted-foreground">{day.deliveries} deliveries</p>
                  </div>
                </div>
                <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(day.amount / Math.max(...weeklyEarnings.map((d) => d.amount))) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">₦802,725</p> {/* Updated to Naira */}
            <p className="text-sm text-muted-foreground">This Week</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">₦3,047,550</p> {/* Updated to Naira */}
            <p className="text-sm text-muted-foreground">This Month</p>
          </CardContent>
        </Card>
      </div>

      {/* Payout History */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Payout History</CardTitle>
          <CardDescription>Your recent withdrawals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentPayouts.map((payout) => (
              <div key={payout.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium">₦{payout.amount.toFixed(2)}</p> {/* Updated currency */}
                  <p className="text-sm text-muted-foreground">
                    {payout.date} • {payout.method}
                  </p>
                </div>
                <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                  {payout.status}
                </Badge>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4 bg-transparent">
            Request Payout
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
