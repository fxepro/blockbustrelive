"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Shield, Globe, Puzzle, Sparkles, Zap, Lock, Users } from "lucide-react"
import { UnifiedHeader } from "@/components/shared/unified-header"
import { Footer } from "@/components/shared/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <UnifiedHeader />

      {/* Hero Section */}
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
              Blockchain Registration, Made Simple.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 text-pretty max-w-3xl mx-auto">
              Securely notarize documents, records, and ownership on trusted blockchains — in minutes, not months.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                🚀 Start Registration
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 bg-transparent border-2 border-primary/30 hover:border-primary hover:bg-primary/10 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                🔍 Verify a Record
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Blockchain Templates */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              Your Records, Future-Proofed.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              From legal contracts to property deeds, from patents to digital identities — choose from ready-made smart
              contract templates designed for real-world trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/30 bg-gradient-to-br from-card to-primary/5 hover:from-primary/10 hover:to-secondary/10 transform hover:scale-105">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="font-serif text-xl text-primary">Legal Agreements</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">Ensure contracts are tamper-proof.</CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-secondary/30 bg-gradient-to-br from-card to-secondary/5 hover:from-secondary/10 hover:to-primary/10 transform hover:scale-105">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="font-serif text-xl text-primary">Property & Titles</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">Register land, vehicles, or digital assets.</CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/30 bg-gradient-to-br from-card to-primary/5 hover:from-primary/10 hover:to-secondary/10 transform hover:scale-105">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Puzzle className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="font-serif text-xl text-primary">Copyright & Patents</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">Protect your creations worldwide.</CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-secondary/30 bg-gradient-to-br from-card to-secondary/5 hover:from-secondary/10 hover:to-primary/10 transform hover:scale-105">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="font-serif text-xl text-primary">Identity & Credentials</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">Prove and preserve who you are.</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-r from-background via-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              3 Steps. Infinite Security.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="h-16 w-16 rounded-full bg-primary bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                1
              </div>
              <h3 className="text-xl font-serif font-semibold mb-4 text-primary">Upload</h3>
              <p className="text-muted-foreground">Submit your document or details.</p>
            </div>

            <div className="text-center group">
              <div className="h-16 w-16 rounded-full bg-secondary bg-gradient-to-br from-secondary to-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                2
              </div>
              <h3 className="text-xl font-serif font-semibold mb-4 text-primary">Quote</h3>
              <p className="text-muted-foreground">Instantly see costs and blockchain options.</p>
            </div>

            <div className="text-center group">
              <div className="h-16 w-16 rounded-full bg-primary bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                3
              </div>
              <h3 className="text-xl font-serif font-semibold mb-4 text-primary">Register</h3>
              <p className="text-muted-foreground">Get your record notarized on the chain of your choice.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              Why Register With Us?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-4 text-primary">Fast & Simple</h3>
              <p className="text-muted-foreground">AI-powered automation reduces weeks to minutes.</p>
            </div>

            <div className="text-center group">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-4 text-primary">Immutable Trust</h3>
              <p className="text-muted-foreground">Records secured by top blockchains.</p>
            </div>

            <div className="text-center group">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-4 text-primary">Global Reach</h3>
              <p className="text-muted-foreground">Accessible anytime, anywhere.</p>
            </div>

            <div className="text-center group">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                <Puzzle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-4 text-primary">Custom Templates</h3>
              <p className="text-muted-foreground">Tailored to your industry needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-card to-primary/5 p-8 rounded-2xl shadow-xl border border-primary/20">
              <blockquote className="text-2xl md:text-3xl font-serif bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-8 text-balance">
                "Finally, a service that makes blockchain practical. I registered my IP in minutes!"
              </blockquote>
              <cite className="text-muted-foreground font-medium">— Early Adopter, Tech Founder</cite>
            </div>
          </div>
        </div>
      </section>

      {/* Separator Graphic */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

      {/* Blog/News */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              Stay Ahead in Blockchain Registration.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-card to-primary/5 border-2 hover:border-primary/30 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="font-serif text-primary">5 Ways Blockchain Is Changing Ownership</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Discover how blockchain technology is revolutionizing the way we think about ownership and property
                  rights.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-card to-secondary/5 border-2 hover:border-secondary/30 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="font-serif text-primary">Smart Contracts 101: What You Need to Know</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  A beginner's guide to understanding smart contracts and how they power blockchain registration.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-card to-primary/5 border-2 hover:border-primary/30 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="font-serif text-primary">How AI Makes Registration Faster</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Learn how artificial intelligence streamlines the document verification and registration process.
                </CardDescription>
              </CardContent>
            </Card>
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
                Ready to Secure Your Records?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands who trust blockchain registration for their most important documents.
              </p>
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
