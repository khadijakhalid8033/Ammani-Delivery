"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Users, Truck, MapPin } from "lucide-react"

export function AnalyticsDashboard() {
  const metrics = [
    {
      title: "Total Revenue",
      value: "₦3,628,000",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-400",
    },
    {
      title: "Active Users",
      value: "1,247",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "text-blue-400",
    },
    {
      title: "Delivery Agents",
      value: "89",
      change: "+5.6%",
      trend: "up",
      icon: Truck,
      color: "text-purple-400",
    },
    {
      title: "Avg Delivery Time",
      value: "18 mins",
      change: "-2.1%",
      trend: "down",
      icon: MapPin,
      color: "text-orange-400",
    },
  ]

  const weeklyData = [
    { day: "Mon", orders: 45, revenue: 935900 }, // Updated to Naira
    { day: "Tue", orders: 52, revenue: 119500 },
    { day: "Wed", orders: 38, revenue: 536350 },
    { day: "Thu", orders: 61, revenue: 302000 },
    { day: "Fri", orders: 73, revenue: 523700 },
    { day: "Sat", orders: 68, revenue: 395450 },
    { day: "Sun", orders: 42, revenue: 815100 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Platform performance insights and metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.title} className="border-border bg-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-3xl font-bold text-foreground">{metric.value}</p>
                    <div
                      className={`flex items-center gap-1 text-sm mt-1 ${metric.trend === "up" ? "text-green-400" : "text-red-400"}`}
                    >
                      {metric.trend === "up" ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      <span>{metric.change} from last month</span>
                    </div>
                  </div>
                  <div
                    className={`p-3 bg-opacity-20 rounded-lg ${metric.color.replace("text-", "bg-").replace("-400", "-500/20")}`}
                  >
                    <Icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Orders Chart */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Weekly Orders</CardTitle>
            <CardDescription>Order volume over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyData.map((day) => (
                <div key={day.day} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-semibold text-primary">{day.day}</span>
                    </div>
                    <span className="font-medium">{day.orders} orders</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(day.orders / Math.max(...weeklyData.map((d) => d.orders))) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-primary">₦{day.revenue.toFixed(2)}</span>{" "}
                    {/* Updated currency */}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Agents */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Top Performing Agents</CardTitle>
            <CardDescription>Highest rated delivery agents this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Fatima Aliyu", rating: 4.9, deliveries: 89, earnings: 80300 }, 
                { name: "Musa Ibrahim", rating: 4.8, deliveries: 76, earnings: 67250 },
                { name: "Abdullahi Sani", rating: 4.7, deliveries: 68, earnings: 45400 },
                { name: "Aisha Mohammed", rating: 4.6, deliveries: 54, earnings: 38225 },
              ].map((agent, index) => (
                <div key={agent.name} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ⭐ {agent.rating} • {agent.deliveries} deliveries
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-primary">₦{agent.earnings.toFixed(2)}</p> {/* Updated currency */}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Service Distribution</CardTitle>
            <CardDescription>Popular delivery types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { service: "Restaurant Delivery", percentage: 45, count: 234 },
                { service: "Home → Sabon Gari Market", percentage: 30, count: 156 }, // Updated to Kano location
                { service: "Custom Delivery", percentage: 15, count: 78 },
                { service: "Kano Motor Park", percentage: 10, count: 52 }, // Updated to Kano location
              ].map((item) => (
                <div key={item.service} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.service}</span>
                    <span className="text-muted-foreground">{item.count} orders</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Customer Satisfaction</CardTitle>
            <CardDescription>Rating distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { stars: 5, count: 156, percentage: 65 },
                { stars: 4, count: 67, percentage: 28 },
                { stars: 3, count: 12, percentage: 5 },
                { stars: 2, count: 3, percentage: 1 },
                { stars: 1, count: 2, percentage: 1 },
              ].map((rating) => (
                <div key={rating.stars} className="flex items-center gap-3">
                  <span className="text-sm w-8">{rating.stars}⭐</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${rating.percentage}%` }} />
                  </div>
                  <span className="text-sm text-muted-foreground w-8">{rating.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Peak Hours</CardTitle>
            <CardDescription>Busiest delivery times</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { time: "12:00 PM", orders: 45, percentage: 90 },
                { time: "7:00 PM", orders: 38, percentage: 76 },
                { time: "1:00 PM", orders: 32, percentage: 64 },
                { time: "8:00 PM", orders: 28, percentage: 56 },
                { time: "6:00 PM", orders: 25, percentage: 50 },
              ].map((hour) => (
                <div key={hour.time} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{hour.time}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-blue-400 rounded-full" style={{ width: `${hour.percentage}%` }} />
                    </div>
                    <span className="text-sm text-muted-foreground w-8">{hour.orders}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
