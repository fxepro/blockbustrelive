"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UnifiedHeader } from "@/components/shared/unified-header"
import { 
  FileText, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Eye,
  Settings
} from "lucide-react"

interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  is_kyc_verified: boolean
  subscription_type: string
  subscription_active: boolean
  service_fee_percentage: number
  created_at: string
}

interface DashboardStats {
  total_contracts: number
  total_transactions: number
  kyc_verified: boolean
  subscription_active: boolean
  service_fee_percentage: number
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("access_token")
    const userData = localStorage.getItem("user_data")
    
    if (!token || !userData) {
      router.push("/login")
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      
      // Check if user is admin based on role name only
      const isAdmin = parsedUser.role && parsedUser.role.name === 'Admin'
      
      console.log("Dashboard - User role name:", parsedUser.role?.name)
      console.log("Dashboard - Is admin check:", isAdmin)

      if (isAdmin) {
        console.log("Admin user detected, redirecting to admin dashboard")
        router.push("/admin-dashboard")
        return
      }
      
      loadDashboardData(token)
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/login")
    }
  }, [router])

  const loadDashboardData = async (token: string) => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/dashboard/", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
      } else {
        console.error("Failed to load dashboard data")
      }
    } catch (error) {
      console.error("Error loading dashboard:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("user_data")
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <UnifiedHeader user={user} onLogout={handleLogout} />

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-primary/5 to-secondary/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 opacity-50"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-3 rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-6 text-balance">
              Your Dashboard
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 text-pretty max-w-3xl mx-auto">
              Manage your blockchain registrations and monitor your account activity.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/30 bg-gradient-to-br from-card to-primary/5 hover:from-primary/10 hover:to-secondary/10 transform hover:scale-105">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="font-serif text-xl text-primary">Total Contracts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">
                  {stats?.total_contracts || 0}
                </div>
                <CardDescription className="text-base">Smart contracts deployed</CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-secondary/30 bg-gradient-to-br from-card to-secondary/5 hover:from-secondary/10 hover:to-primary/10 transform hover:scale-105">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="font-serif text-xl text-primary">Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">
                  {stats?.total_transactions || 0}
                </div>
                <CardDescription className="text-base">Total payments made</CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/30 bg-gradient-to-br from-card to-primary/5 hover:from-primary/10 hover:to-secondary/10 transform hover:scale-105">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  {user.is_kyc_verified ? (
                    <CheckCircle className="h-6 w-6 text-white" />
                  ) : (
                    <AlertCircle className="h-6 w-6 text-white" />
                  )}
                </div>
                <CardTitle className="font-serif text-xl text-primary">KYC Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-primary mb-2">
                  {user.is_kyc_verified ? "Verified" : "Pending"}
                </div>
                <CardDescription className="text-base">Identity verification</CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-secondary/30 bg-gradient-to-br from-card to-secondary/5 hover:from-secondary/10 hover:to-primary/10 transform hover:scale-105">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="font-serif text-xl text-primary">Service Fee</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">
                  {user.service_fee_percentage}%
                </div>
                <CardDescription className="text-base">
                  {user.subscription_active ? "Subscriber rate" : "Standard rate"}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20 bg-gradient-to-r from-background via-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              Quick Actions
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Get started with your blockchain registration journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/30 bg-gradient-to-br from-card to-primary/5 hover:from-primary/10 hover:to-secondary/10 transform hover:scale-105">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Plus className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="font-serif text-xl text-primary">Register Document</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-6">Upload and register a new document on the blockchain.</CardDescription>
                <Button
                  asChild
                  variant="outline"
                  className="w-full bg-transparent border-2 border-primary/30 hover:border-primary hover:bg-primary/10"
                >
                  <Link href="/register-document">
                    Start Registration
                    <Plus className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-secondary/30 bg-gradient-to-br from-card to-secondary/5 hover:from-secondary/10 hover:to-primary/10 transform hover:scale-105">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="font-serif text-xl text-primary">View Contracts</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-6">Browse and manage your registered smart contracts.</CardDescription>
                <Button
                  asChild
                  variant="outline"
                  className="w-full bg-transparent border-2 border-secondary/30 hover:border-secondary hover:bg-secondary/10"
                >
                  <Link href="/contracts">
                    View All
                    <Eye className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/30 bg-gradient-to-br from-card to-primary/5 hover:from-primary/10 hover:to-secondary/10 transform hover:scale-105">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Settings className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="font-serif text-xl text-primary">Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-6">Manage your profile and subscription preferences.</CardDescription>
                <Button
                  asChild
                  variant="outline"
                  className="w-full bg-transparent border-2 border-primary/30 hover:border-primary hover:bg-primary/10"
                >
                  <Link href="/settings">
                    Manage Account
                    <Settings className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              Recent Activity
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="shadow-2xl border-2 border-primary/30 bg-gradient-to-br from-card to-primary/5">
              <CardHeader>
                <CardTitle className="font-serif text-xl text-primary">Welcome to BlockBustre!</CardTitle>
                <CardDescription>Your account was created successfully.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Account Created</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(user.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-primary border-primary">
                    Completed
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-foreground to-foreground/90 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-xl font-serif font-semibold mb-4 text-background">
              Your Records. Your Chain. Your Future.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <Link href="/services" className="text-background hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="/pricing" className="text-background hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/learn" className="text-background hover:text-primary transition-colors">
              Learn
            </Link>
            <Link href="/about" className="text-background hover:text-primary transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-background hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          <div className="text-center mt-8 pt-8 border-t border-background/20">
            <p className="text-sm opacity-75 text-background">
              © 2024 Blockchain Registration Service. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
