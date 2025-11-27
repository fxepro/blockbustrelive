"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UnifiedHeader } from "@/components/shared/unified-header"
import { Shield, FileText, Globe, Users, Building, Gavel, Palette, ArrowRight } from "lucide-react"

export default function CategoriesPage() {
  const categories = [
    {
      id: "legal-agreements",
      title: "Legal Agreements",
      description: "Secure contracts, NDAs, and legal documents with immutable blockchain verification",
      icon: Gavel,
      image: "/placeholder-fi2bu.png",
      buttonText: "SECURE & NOTARIZE",
      gradient: "from-primary to-primary/80",
    },
    {
      id: "property-titles",
      title: "Property & Titles",
      description: "Register land, vehicles, real estate, and digital assets with permanent ownership proof",
      icon: Building,
      image: "/placeholder-qiscy.png",
      buttonText: "REGISTER PROPERTY",
      gradient: "from-secondary to-secondary/80",
    },
    {
      id: "copyright-patents",
      title: "Copyright & Patents",
      description: "Protect your intellectual property, creative works, and innovations worldwide",
      icon: Palette,
      image: "/placeholder-9usmv.png",
      buttonText: "PROTECT IP",
      gradient: "from-primary/80 to-secondary/80",
    },
    {
      id: "identity-credentials",
      title: "Identity & Credentials",
      description: "Verify educational certificates, professional licenses, and personal identity documents",
      icon: Users,
      image: "/placeholder-1i0j5.png",
      buttonText: "VERIFY IDENTITY",
      gradient: "from-secondary/80 to-primary/80",
    },
    {
      id: "business-documents",
      title: "Business Documents",
      description: "Secure corporate filings, partnership agreements, and business registrations",
      icon: Building,
      image: "/placeholder-qov5y.png",
      buttonText: "REGISTER BUSINESS",
      gradient: "from-primary to-secondary",
    },
    {
      id: "medical-records",
      title: "Medical Records",
      description: "Protect patient data, medical histories, and healthcare documentation with privacy",
      icon: FileText,
      image: "/placeholder-fcgz5.png",
      buttonText: "SECURE RECORDS",
      gradient: "from-secondary to-primary",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <UnifiedHeader />

      <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-primary/5 to-secondary/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 opacity-50"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-3 rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg">
                <Globe className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-6 text-balance">
              Registration Categories
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 text-pretty max-w-3xl mx-auto">
              Choose the perfect blockchain registration solution for your specific document type and industry needs.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {categories.map((category, index) => (
              <Card
                key={category.id}
                className="break-inside-avoid group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 hover:border-primary/30 bg-gradient-to-br from-card to-primary/5 overflow-hidden p-0"
                style={{ marginBottom: "24px" }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 rounded-t-lg"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300 rounded-t-lg`}
                  ></div>
                </div>

                <CardHeader className="pb-4 px-6 pt-6">
                  <CardTitle className="text-xl font-serif text-foreground group-hover:text-primary transition-colors duration-300">
                    {category.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-0 px-6 pb-6">
                  <CardDescription className="text-muted-foreground mb-6 leading-relaxed">
                    {category.description}
                  </CardDescription>

                  <Button
                    asChild
                    className={`w-full bg-gradient-to-r ${category.gradient} hover:shadow-lg text-white border-0 group-hover:scale-105 transition-all duration-300`}
                  >
                    <Link href={`/register?category=${category.id}`}>
                      {category.buttonText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-card to-primary/5 p-12 rounded-3xl shadow-2xl border border-primary/20">
              <h2 className="text-3xl md:text-4xl font-serif font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
                Don't See Your Category?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We support custom document types and can create specialized registration templates for your unique
                needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  <Link href="/contact">
                    Request Custom Category
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 bg-transparent border-2 border-primary/30 hover:border-primary hover:bg-primary/10 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  <Link href="/learn">Learn More</Link>
                </Button>
              </div>
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
