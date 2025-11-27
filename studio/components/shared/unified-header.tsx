"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, LogOut } from "lucide-react"

interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  role?: {
    id: number
    name: string
  }
}

interface UnifiedHeaderProps {
  user?: User | null
  onLogout?: () => void
  showNavigation?: boolean
}

export function UnifiedHeader({ user, onLogout, showNavigation = true }: UnifiedHeaderProps) {
  const isAdmin = user?.role?.name === 'Admin'

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
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

          {/* Navigation */}
          {showNavigation && (
            <div className="hidden md:flex items-center space-x-8">
              {user ? (
                // Logged in state
                <div className="flex items-center space-x-4">
                  <div className="hidden md:flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">
                      Welcome, {user.first_name} {user.last_name}
                    </span>
                    {isAdmin && (
                      <Badge variant="default" className="bg-primary">
                        Admin
                      </Badge>
                    )}
                  </div>
                  {onLogout && (
                    <Button
                      onClick={onLogout}
                      variant="outline"
                      size="sm"
                      className="bg-transparent border-2 border-primary/30 hover:border-primary hover:bg-primary/10 text-primary font-medium"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  )}
                </div>
              ) : (
                // Logged out state
                <>
                  <div className="flex items-baseline space-x-8">
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
                  <div className="flex items-center space-x-4 ml-6">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="bg-transparent border-2 border-primary/30 hover:border-primary hover:bg-primary/10 text-primary font-medium"
                    >
                      <Link href="/login">
                        LOGIN
                      </Link>
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
