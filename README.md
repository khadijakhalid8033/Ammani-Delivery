# Ammani - Multi-Service Delivery Platform

A comprehensive delivery platform connecting customers with delivery agents for various services including home-to-market deliveries, restaurant orders, bus station pickups, and custom delivery services.

## Features

### Customer App
- Service selection and booking
- Real-time agent tracking
- Wallet system with payment processing
- QR code delivery confirmation
- Order history and ratings

### Delivery Agent App
- Real-time delivery requests
- GPS navigation integration
- Earnings tracking and payouts
- Performance analytics
- Online/offline status management

### Admin Dashboard
- Platform overview and analytics
- User and agent management
- Delivery monitoring and management
- Real-time notifications
- Performance metrics and reporting

## Technology Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **Real-time**: WebSocket connections
- **API**: Next.js API routes
- **Database**: Ready for integration with PostgreSQL/MongoDB
- **Maps**: Ready for Google Maps/Mapbox integration
- **Payments**: Ready for Stripe/PayPal integration

## Real-time Features

- Live delivery tracking
- Instant notifications
- Agent location updates
- Status change broadcasts
- Connection status monitoring

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Access the applications:
   - Customer App: `/customer`
   - Agent App: `/agent`
   - Admin Dashboard: `/admin`

## API Endpoints

- `GET /api/deliveries` - List deliveries
- `POST /api/deliveries` - Create delivery
- `PATCH /api/deliveries/[id]` - Update delivery
- `GET /api/agents` - List agents
- `POST /api/agents` - Register agent
- `GET /api/notifications` - Get notifications

## Production Deployment

For production deployment:

1. Set up a real database (PostgreSQL/MongoDB)
2. Configure WebSocket server
3. Integrate payment processing
4. Add map services (Google Maps/Mapbox)
5. Set up push notifications
6. Configure environment variables

## Environment Variables

\`\`\`env
NEXT_PUBLIC_WS_URL=ws://localhost:3001
DATABASE_URL=your_database_url
STRIPE_SECRET_KEY=your_stripe_key
GOOGLE_MAPS_API_KEY=your_maps_key
\`\`\`

## License

MIT License - see LICENSE file for details.
