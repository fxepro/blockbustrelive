"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"

export function Header() {
  return (
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
          <div className="hidden md:flex items-center space-x-8">
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
          </div>
        </div>
      </div>
    </nav>
  )
}
