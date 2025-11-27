"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UnifiedHeader } from "@/components/shared/unified-header"
import { Shield, FileText, Search, BookOpen, ArrowRight } from "lucide-react"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    language: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-background">
      <UnifiedHeader />

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
              Join the Future of Registration
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 text-pretty max-w-3xl mx-auto">
              Create your account and secure your documents on the blockchain — fast, private, and global.
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <Card className="shadow-2xl border-2 hover:border-primary/30 bg-gradient-to-br from-card to-primary/5">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-serif">Create Your Account</CardTitle>
                <CardDescription>Start your blockchain registration journey</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Country</Label>
                      <Select onValueChange={(value) => handleInputChange("country", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="de">Germany</SelectItem>
                          <SelectItem value="fr">France</SelectItem>
                          <SelectItem value="jp">Japan</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select onValueChange={(value) => handleInputChange("language", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                          <SelectItem value="ja">日本語</SelectItem>
                          <SelectItem value="zh">中文</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-lg font-medium bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    Create My Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary hover:text-primary/80 font-medium">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What's Next Section */}
      <section className="py-20 bg-gradient-to-r from-background via-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              What's Next?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Choose your next step to start securing your documents on the blockchain
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/30 bg-gradient-to-br from-card to-primary/5 hover:from-primary/10 hover:to-secondary/10 transform hover:scale-105">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="font-serif text-xl text-primary">Register a Document</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-6">Upload and notarize instantly.</CardDescription>
                <Button
                  asChild
                  variant="outline"
                  className="w-full bg-transparent border-2 border-primary/30 hover:border-primary hover:bg-primary/10"
                >
                  <Link href="/register-document">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-secondary/30 bg-gradient-to-br from-card to-secondary/5 hover:from-secondary/10 hover:to-primary/10 transform hover:scale-105">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="font-serif text-xl text-primary">Verify a Record</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-6">Look up existing blockchain entries.</CardDescription>
                <Button
                  asChild
                  variant="outline"
                  className="w-full bg-transparent border-2 border-secondary/30 hover:border-secondary hover:bg-secondary/10"
                >
                  <Link href="/verify">
                    Verify Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/30 bg-gradient-to-br from-card to-primary/5 hover:from-primary/10 hover:to-secondary/10 transform hover:scale-105">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="font-serif text-xl text-primary">Learn More</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-6">See how blockchain registration works.</CardDescription>
                <Button
                  asChild
                  variant="outline"
                  className="w-full bg-transparent border-2 border-primary/30 hover:border-primary hover:bg-primary/10"
                >
                  <Link href="/learn">
                    Learn Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Marketing Strip */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-card to-primary/5 p-8 rounded-2xl shadow-xl border border-primary/20">
              <blockquote className="text-2xl md:text-3xl font-serif bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-8 text-balance">
                "Immutable. Borderless. Trustworthy."
              </blockquote>
              <cite className="text-muted-foreground font-medium">
                Your records deserve security that lasts forever.
              </cite>
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
