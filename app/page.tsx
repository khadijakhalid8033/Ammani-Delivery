import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, MapPin, Clock, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Truck className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">Ammani Delivery</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/auth/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Fast, Reliable Delivery
            <span className="text-primary block">Anywhere, Anytime</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Connect with trusted delivery agents in your area for home-to-market, restaurant deliveries, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/customer">
              <Button size="lg" className="w-full sm:w-auto">
                Order Delivery
              </Button>
            </Link>
            <Link href="/agent">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                Become a Driver
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Why Choose Ammani Delivery?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border bg-card">
              <CardHeader>
                <MapPin className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Real-time Tracking</CardTitle>
                <CardDescription>
                  Track your delivery in real-time with live GPS updates and estimated arrival times.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Fast Delivery</CardTitle>
                <CardDescription>
                  Get your items delivered quickly with our network of verified delivery agents.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Secure & Safe</CardTitle>
                <CardDescription>
                  All delivery agents are verified with background checks and secure payment processing.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Types */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Market to Home", desc: "Shopping and grocery deliveries" },
              { title: "Restaurant Delivery", desc: "Hot meals delivered fresh" },
              { title: "Bus Station Pickup", desc: "Travel assistance and luggage" },
              { title: "Custom Delivery", desc: "Any pickup and drop-off service" },
            ].map((service, index) => (
              <Card key={index} className="border-border bg-card hover:bg-accent/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription>{service.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of satisfied customers and delivery partners.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/customer/register">
              <Button size="lg" className="w-full sm:w-auto">
                Start Ordering
              </Button>
            </Link>
            <Link href="/agent/register">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                Drive with Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Truck className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">Ammani Delivery</span>
              </div>
              <p className="text-muted-foreground">
                Fast, reliable delivery services connecting customers with trusted delivery agents.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Customers</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/customer" className="hover:text-foreground">
                    Order Delivery
                  </Link>
                </li>
                <li>
                  <Link href="/customer/track" className="hover:text-foreground">
                    Track Order
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-foreground">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Drivers</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/agent" className="hover:text-foreground">
                    Driver App
                  </Link>
                </li>
                <li>
                  <Link href="/agent/register" className="hover:text-foreground">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link href="/agent/support" className="hover:text-foreground">
                    Driver Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="hover:text-foreground">
                    Admin
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 Ammani Delivery. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
