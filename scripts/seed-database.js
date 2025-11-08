// Database seeding script for development
const deliveries = [
  {
    id: "ORD-001",
    customerId: "USR-001",
    agentId: "AGT-001",
    status: "completed",
    pickup: "Sabon Gari Market",
    dropoff: "Kano Central Market",
    amount: 2500,
    serviceType: "home-market",
    createdAt: "2025-01-15T14:30:00Z",
    completedAt: "2025-01-15T15:15:00Z",
  },
  {
    id: "ORD-002",
    customerId: "USR-002",
    agentId: "AGT-002",
    status: "in-progress",
    pickup: "Fagge District",
    dropoff: "Kano City Mall",
    amount: 1750,
    serviceType: "restaurant",
    createdAt: "2025-01-15T15:00:00Z",
    completedAt: null,
  },
]

const users = [
  {
    id: "USR-001",
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+234 (803) 123-4567",
    status: "active",
    walletBalance: 9100,
    totalOrders: 23,
    joinDate: "2024-12-15T10:00:00Z",
  },
  {
    id: "USR-002",
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    phone: "+234 (805) 234-5678",
    status: "active",
    walletBalance: 13450,
    totalOrders: 45,
    joinDate: "2024-11-20T10:00:00Z",
  },
]

const agents = [
  {
    id: "AGT-001",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+234 (803) 123-4567",
    status: "active",
    vehicle: "Honda CB150R",
    vehicleType: "Motorcycle",
    rating: 4.8,
    totalDeliveries: 247,
    isOnline: true,
    location: { lat: 12.0022, lng: 8.592 },
    earnings: 249500,
    joinDate: "2024-03-15T10:00:00Z",
  },
  {
    id: "AGT-002",
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    phone: "+234 (805) 234-5678",
    status: "active",
    vehicle: "Toyota Vios",
    vehicleType: "Car",
    rating: 4.9,
    totalDeliveries: 189,
    isOnline: true,
    location: { lat: 11.9804, lng: 8.5456 },
    earnings: 197450,
    joinDate: "2024-05-20T10:00:00Z",
  },
]

console.log("Database seeded with sample data:")
console.log("- Deliveries:", deliveries.length)
console.log("- Users:", users.length)
console.log("- Agents:", agents.length)

// In production, this would insert data into your actual database
// For now, this serves as reference data structure
