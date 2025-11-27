import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Globe, Shield, Users, Zap, Eye, Heart, Lightbulb, CheckCircle } from "lucide-react"
import Link from "next/link"
import { UnifiedHeader } from "@/components/shared/unified-header"
import { Footer } from "@/components/shared/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <UnifiedHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-secondary py-24 sm:py-32">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold tracking-tight text-white sm:text-6xl text-balance">
              Redefining Trust in the Digital Age
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90 max-w-3xl mx-auto text-pretty">
              We make it simple, secure, and affordable to register anything on the blockchain — across borders,
              languages, and industries.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold tracking-tight text-foreground sm:text-4xl">Our Story</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
              In a world where documents can be faked, lost, or tampered with, we set out to build something different:
              a global registry of truth. Our platform brings the power of blockchain to everyday people, businesses,
              and institutions, ensuring that ownership, identity, and proof can never be questioned.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold tracking-tight text-foreground sm:text-4xl">Our Mission</h2>
            <p className="mt-4 text-lg text-muted-foreground">To democratize blockchain registration by making it:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-2 hover:border-primary/30 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-primary/5 hover:from-primary/10 hover:to-secondary/10 transform hover:scale-105">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-primary mb-3">Accessible</h3>
                <p className="text-muted-foreground">Available in multiple languages & currencies</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-secondary/30 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-secondary/5 hover:from-secondary/10 hover:to-primary/10 transform hover:scale-105">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-primary mb-3">Affordable</h3>
                <p className="text-muted-foreground">Micro-pricing with transparent fees</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-primary/30 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-primary/5 hover:from-primary/10 hover:to-secondary/10 transform hover:scale-105">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-primary mb-3">Trustworthy</h3>
                <p className="text-muted-foreground">Powered by secure, verifiable smart contracts</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-secondary/30 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-secondary/5 hover:from-secondary/10 hover:to-primary/10 transform hover:scale-105">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-primary mb-3">Global</h3>
                <p className="text-muted-foreground">
                  Cross-border recognition for personal, business, and government use
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold tracking-tight text-foreground sm:text-4xl">What We Do</h2>
              <p className="mt-4 text-lg text-muted-foreground">We provide an easy-to-use platform where anyone can:</p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-semibold text-sm">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
                    Upload a document or choose from smart contract templates
                  </h3>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-semibold text-sm">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
                    Get a real-time cost estimate (gas + service fee)
                  </h3>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-semibold text-sm">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
                    Receive an immutable blockchain-backed proof of registration
                  </h3>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg text-muted-foreground text-pretty">
                From land titles in Kenya to diplomas in Europe to music rights in the U.S., our service scales with
                your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold tracking-tight text-foreground sm:text-4xl">Our Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-primary mb-3">Transparency</h3>
              <p className="text-muted-foreground">No hidden costs, no locked data.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-primary mb-3">Integrity</h3>
              <p className="text-muted-foreground">Once registered, your record is forever verifiable.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-primary mb-3">Innovation</h3>
              <p className="text-muted-foreground">Harnessing blockchain to solve real-world problems.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-primary mb-3">Inclusivity</h3>
              <p className="text-muted-foreground">Designed for everyone, from individuals to enterprises.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Future */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold tracking-tight text-foreground sm:text-4xl">The Future</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
              We believe blockchain will become the new notary of the world. Our goal is to be the bridge — making
              blockchain practical, usable, and universal for every registration need.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-secondary py-24 sm:py-32">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold tracking-tight text-white sm:text-4xl text-balance">
              Join Us in Building the Global Registry of Trust
            </h2>
            <div className="mt-10">
              <Button size="lg" variant="secondary" asChild className="bg-white text-primary hover:bg-gray-100">
                <Link href="/register" className="inline-flex items-center">
                  🚀 Start Registering Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
