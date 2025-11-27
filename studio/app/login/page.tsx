"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, ArrowRight, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("") // Clear error when user types
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        // Store tokens in localStorage
        localStorage.setItem("access_token", data.access)
        localStorage.setItem("refresh_token", data.refresh)
        localStorage.setItem("user_data", JSON.stringify(data.user))
        
        // Debug: Log user data to see what's available
        console.log("User data:", data.user)
        console.log("Is superuser:", data.user.is_superuser)
        console.log("Is staff:", data.user.is_staff)
        console.log("Role object:", data.user.role)
        console.log("Role name:", data.user.role?.name)
        console.log("Role name type:", typeof data.user.role?.name)
        console.log("Role name length:", data.user.role?.name?.length)
        
        // Check if user is admin and redirect accordingly
        const user = data.user
        const roleName = user.role?.name
        const roleId = user.role?.id
        
        // Check if user is admin based on role name only
        const isAdmin = roleName && roleName.trim() === 'Admin'
        
        console.log("Role name:", roleName)
        console.log("Is admin check:", isAdmin)
        
        if (isAdmin) {
          console.log("Admin user detected, redirecting to admin dashboard")
          router.push("/admin-dashboard")
        } else {
          console.log("Regular user, redirecting to user dashboard")
          router.push("/dashboard")
        }
      } else {
        setError(data.detail || "Login failed. Please check your credentials.")
      }
    } catch (err) {
      setError("Network error. Please try again.")
      console.error("Login error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg mr-3">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-serif font-bold text-primary">BlockBustre</span>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link
                  href="/register"
                  className="text-foreground hover:text-primary transition-colors font-medium hover:scale-105 transform duration-200"
                >
                  REGISTER
                </Link>
                <Link
                  href="/categories"
                  className="text-foreground hover:text-primary transition-colors font-medium hover:scale-105 transform duration-200"
                >
                  CATEGORIES
                </Link>
                <Link
                  href="/pricing"
                  className="text-foreground hover:text-primary transition-colors font-medium hover:scale-105 transform duration-200"
                >
                  PRICING
                </Link>
                <Link
                  href="/learn"
                  className="text-foreground hover:text-primary transition-colors font-medium hover:scale-105 transform duration-200"
                >
                  LEARN
                </Link>
                <Link
                  href="/about"
                  className="text-foreground hover:text-primary transition-colors font-medium hover:scale-105 transform duration-200"
                >
                  ABOUT US
                </Link>
                <Link
                  href="/contact"
                  className="text-foreground hover:text-primary transition-colors font-medium hover:scale-105 transform duration-200"
                >
                  CONTACT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

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
              Welcome Back
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 text-pretty max-w-3xl mx-auto">
              Sign in to your BlockBustre account and continue securing your documents on the blockchain.
            </p>
          </div>
        </div>
      </section>

      {/* Login Form */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <Card className="shadow-2xl border-2 hover:border-primary/30 bg-gradient-to-br from-card to-primary/5">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-serif">Sign In</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <p className="text-destructive text-sm">{error}</p>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="h-12"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="h-12 pr-12"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="remember"
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="remember" className="text-sm">
                        Remember me
                      </Label>
                    </div>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary hover:text-primary/80 font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 text-lg font-medium bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50"
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-primary hover:text-primary/80 font-medium">
                      Create one here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-background via-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              Secure & Reliable
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Your blockchain registration data is protected with enterprise-grade security
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-4 text-primary">Secure Login</h3>
              <p className="text-muted-foreground">JWT-based authentication with secure token management</p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-4 text-primary">Data Protection</h3>
              <p className="text-muted-foreground">Your documents and personal information are encrypted and secure</p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-4 text-primary">24/7 Access</h3>
              <p className="text-muted-foreground">Access your blockchain records anytime, anywhere</p>
            </div>
          </div>
        </div>
      </section>

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
