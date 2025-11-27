import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UnifiedHeader } from "@/components/shared/unified-header"
import { Check, ArrowRight, Upload, Calculator, Shield, LinkIcon, Sparkles } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <UnifiedHeader />

      <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-primary/5 to-secondary/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 opacity-50"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-3 rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-6 text-balance">
              Fair, Transparent Pricing
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 text-pretty max-w-3xl mx-auto">
              Pay only for what you register — no hidden charges, no inflated fees.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Pay-As-You-Go Plan */}
            <Card className="relative overflow-hidden border-2 hover:border-primary/30 bg-gradient-to-br from-card to-primary/5 transition-all duration-300 hover:shadow-2xl transform hover:scale-105 h-full flex flex-col">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold font-serif mb-2 text-primary">Pay-As-You-Go</CardTitle>
                <CardDescription className="text-base">Perfect for occasional registrations</CardDescription>
                <div className="mt-4">
                  <div className="text-3xl font-bold font-serif text-primary">15%</div>
                  <div className="text-sm text-muted-foreground">service fee added to blockchain gas cost</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>No monthly commitment</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Includes certificate of blockchain verification</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Real-time gas fee calculation</span>
                  </div>
                  <div className="flex items-center gap-3 opacity-0">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Placeholder feature</span>
                  </div>
                </div>
                <Button
                  className="w-full mt-6 bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  size="lg"
                >
                  Register Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Subscription Pro Plan */}
            <Card className="relative overflow-hidden border-2 border-primary bg-gradient-to-br from-primary/5 to-secondary/5 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 h-full flex flex-col">
              <div className="absolute top-4 right-4">
                <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold font-serif mb-2 text-primary">
                  Subscription (Pro Plan)
                </CardTitle>
                <CardDescription className="text-base">Best for regular registrants</CardDescription>
                <div className="mt-4">
                  <div className="text-3xl font-bold font-serif text-primary">$20</div>
                  <div className="text-sm text-muted-foreground">per month</div>
                  <div className="text-lg font-semibold text-secondary mt-2">+ 10% service fee</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Reduced 10% service fee on all gas costs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Priority processing + support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Access to smart contract templates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Advanced analytics dashboard</span>
                  </div>
                </div>
                <Button
                  className="w-full mt-6 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  size="lg"
                >
                  Subscribe & Save
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-r from-background via-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              How It Works
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Simple, transparent process from upload to blockchain registration
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="h-16 w-16 rounded-full bg-primary bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                <Upload className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-4 text-primary">1. Choose & Upload</h3>
              <p className="text-muted-foreground">Choose a category and upload your document</p>
            </div>
            <div className="text-center group">
              <div className="h-16 w-16 rounded-full bg-secondary bg-gradient-to-br from-secondary to-primary text-white flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                <Calculator className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-4 text-primary">2. Calculate Fees</h3>
              <p className="text-muted-foreground">We calculate blockchain gas fees in real-time</p>
            </div>
            <div className="text-center group">
              <div className="h-16 w-16 rounded-full bg-primary bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-4 text-primary">3. Apply Service Fee</h3>
              <p className="text-muted-foreground">Service fee is applied (15% or 10%)</p>
            </div>
            <div className="text-center group">
              <div className="h-16 w-16 rounded-full bg-secondary bg-gradient-to-br from-secondary to-primary text-white flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                <LinkIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-4 text-primary">4. Register On-Chain</h3>
              <p className="text-muted-foreground">Your record is permanently registered on-chain</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-card to-primary/5 p-8 rounded-2xl shadow-xl border border-primary/20">
              <h2 className="text-3xl md:text-4xl font-serif font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
                Always Transparent, Always Secure
              </h2>
              <p className="text-lg text-muted-foreground text-pretty">
                You see the gas fee and service fee before payment. Nothing hidden, nothing extra. Your data is sealed
                on-chain with proof you can access forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-card to-primary/5 p-12 rounded-3xl shadow-2xl border border-primary/20">
              <h2 className="text-3xl md:text-4xl font-serif font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
                Start with Pay-As-You-Go or Save with Subscription
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  🚀 Try Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 bg-transparent border-2 border-primary/30 hover:border-primary hover:bg-primary/10 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  💼 Subscribe & Save
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
