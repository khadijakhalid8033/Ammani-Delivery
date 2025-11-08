"use client"

import { Button } from "@/components/ui/button"
import { BarChart3, Users, Truck, MapPin, Settings, Shield, Menu, Home } from "lucide-react"

interface AdminSidebarProps {
  currentView: string
  onViewChange: (view: string) => void
  isOpen: boolean
  onToggle: () => void
}

export function AdminSidebar({ currentView, onViewChange, isOpen, onToggle }: AdminSidebarProps) {
  const menuItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "deliveries", label: "Deliveries", icon: MapPin },
    { id: "users", label: "Users", icon: Users },
    { id: "agents", label: "Agents", icon: Truck },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-card border-r border-border transition-all duration-300 z-50 ${isOpen ? "w-64" : "w-16"}`}
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onToggle}>
            <Menu className="h-5 w-5" />
          </Button>
          {isOpen && (
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Admin Panel</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentView === item.id

            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start ${!isOpen && "px-2"} ${isActive ? "bg-primary/10 text-primary" : ""}`}
                onClick={() => onViewChange(item.id)}
              >
                <Icon className="h-5 w-5" />
                {isOpen && <span className="ml-3">{item.label}</span>}
              </Button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
