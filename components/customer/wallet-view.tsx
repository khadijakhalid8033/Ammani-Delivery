"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, CreditCard, Plus, ArrowUpRight, ArrowDownLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface WalletViewProps {
  balance: number
  onBack: () => void
}

export function WalletView({ balance, onBack }: WalletViewProps) {
  const [showAddFunds, setShowAddFunds] = useState(false)
  const [amount, setAmount] = useState("")

  const transactions = [
    {
      id: 1,
      type: "payment",
      description: "Delivery to Sabon Gari Market",
      amount: -14025, 
      date: "2025-01-15",
      status: "completed",
    },
    { id: 2, type: "topup", description: "Wallet Top-up", amount: 82500, date: "2025-01-14", status: "completed" },
    {
      id: 3,
      type: "payment",
      description: "Restaurant Delivery",
      amount: -20295,
      date: "2025-01-13",
      status: "completed",
    },
    {
      id: 4,
      type: "refund",
      description: "Cancelled Order Refund",
      amount: 11137.5,
      date: "2025-01-12",
      status: "completed",
    },
  ]

  const quickAmounts = [1650, 4125, 8250, 16500] 

  const handleAddFunds = () => {
    if (amount) {
      // Simulate payment processing
      alert(`Added ₦${amount} to your wallet!`)
      setAmount("")
      setShowAddFunds(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold">Wallet</h1>
          <p className="text-sm text-muted-foreground">Manage your payment methods</p>
        </div>
      </div>

      {/* Balance Card */}
      <Card className="border-border bg-gradient-to-r from-primary/10 to-primary/5">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Available Balance</p>
            <p className="text-4xl font-bold text-foreground mb-4">₦{(balance * 1650).toFixed(2)}</p>{" "}
            <Button onClick={() => setShowAddFunds(true)} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Funds
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Funds Modal */}
      {showAddFunds && (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg">Add Funds</CardTitle>
            <CardDescription>Choose an amount to add to your wallet</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {quickAmounts.map((quickAmount) => (
                <Button
                  key={quickAmount}
                  variant="outline"
                  onClick={() => setAmount(quickAmount.toString())}
                  className="h-12"
                >
                  ₦{quickAmount.toLocaleString()} 
                </Button>
              ))}
            </div>
            <div className="space-y-2">
              <Input
                type="number"
                placeholder="Enter custom amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-center text-lg"
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowAddFunds(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleAddFunds} disabled={!amount} className="flex-1">
                <CreditCard className="h-4 w-4 mr-2" />
                Add ₦{amount} {/* Updated currency symbol */}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Transaction History */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Recent Transactions</CardTitle>
          <CardDescription>Your payment history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 border border-border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      transaction.type === "payment"
                        ? "bg-red-500/20"
                        : transaction.type === "topup"
                          ? "bg-green-500/20"
                          : "bg-blue-500/20"
                    }`}
                  >
                    {transaction.type === "payment" ? (
                      <ArrowUpRight className="h-4 w-4 text-red-400" />
                    ) : (
                      <ArrowDownLeft className="h-4 w-4 text-green-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${transaction.amount > 0 ? "text-green-400" : "text-red-400"}`}>
                    {transaction.amount > 0 ? "+" : ""}₦{Math.abs(transaction.amount).toFixed(2)}{" "}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
