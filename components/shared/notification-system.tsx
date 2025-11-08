"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, X, CheckCircle, AlertTriangle, Info } from "lucide-react"
import { useRealtime } from "@/hooks/use-realtime"

interface NotificationSystemProps {
  userId: string
  userType: "customer" | "agent" | "admin"
}

export function NotificationSystem({ userId, userType }: NotificationSystemProps) {
  const { notifications, clearNotifications } = useRealtime(userId, userType)
  const [showNotifications, setShowNotifications] = useState(false)

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-400" />
      default:
        return <Info className="h-4 w-4 text-blue-400" />
    }
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" onClick={() => setShowNotifications(!showNotifications)} className="relative">
        <Bell className="h-5 w-5" />
        {notifications.length > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500">{notifications.length}</Badge>
        )}
      </Button>

      {showNotifications && (
        <div className="absolute right-0 top-12 w-80 max-h-96 overflow-y-auto bg-card border border-border rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold">Notifications</h3>
            <div className="flex items-center gap-2">
              {notifications.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearNotifications}>
                  Clear All
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={() => setShowNotifications(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No new notifications</p>
              </div>
            ) : (
              <div className="space-y-1">
                {notifications.map((notification, index) => (
                  <div key={index} className="p-3 hover:bg-accent/50 border-b border-border last:border-b-0">
                    <div className="flex items-start gap-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{notification.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(notification.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
