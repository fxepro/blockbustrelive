import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { UnifiedHeader } from "@/components/shared/unified-header"
import {
  ChevronDown,
  Shield,
  FileText,
  Zap,
  Building,
  Lightbulb,
  GraduationCap,
  Briefcase,
  Lock,
  Hash,
  Eye,
} from "lucide-react"

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <UnifiedHeader />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent text-balance">
            Learn How Blockchain Registration Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            From first-time users to advanced professionals, discover how to secure your documents and data on the
            blockchain.
          </p>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Getting Started</h2>
            <p className="text-lg text-muted-foreground">Beginner-friendly introduction to blockchain registration</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="font-serif">What is Blockchain Registration?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A secure way to create permanent, tamper-proof records of your important documents on the blockchain.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="font-serif">Why It's Safer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Unlike traditional records, blockchain entries cannot be altered, deleted, or lost, providing ultimate
                  security.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="font-serif">How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Upload your document, we create a unique hash, and register it permanently on the blockchain network.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="font-serif">Real Example</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Register a property deed to prove ownership with immutable blockchain verification.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Explained */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Categories Explained</h2>
            <p className="text-lg text-muted-foreground">Understanding different types of blockchain registration</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-primary" />
                  <CardTitle className="font-serif">Legal & Contracts</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  How smart contracts automate trust and eliminate intermediaries in legal agreements.
                </p>
                <Link href="/categories" className="text-primary hover:underline font-medium">
                  Learn more →
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Building className="w-8 h-8 text-primary" />
                  <CardTitle className="font-serif">Property & Titles</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Why immutability matters for ownership records and property transactions.
                </p>
                <Link href="/categories" className="text-primary hover:underline font-medium">
                  Learn more →
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Lightbulb className="w-8 h-8 text-primary" />
                  <CardTitle className="font-serif">Intellectual Property</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Protecting ideas and innovations in a digital-first world with blockchain proof.
                </p>
                <Link href="/categories" className="text-primary hover:underline font-medium">
                  Learn more →
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-8 h-8 text-primary" />
                  <CardTitle className="font-serif">Education & Credentials</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Fighting fake diplomas and certificates with verifiable blockchain credentials.
                </p>
                <Link href="/categories" className="text-primary hover:underline font-medium">
                  Learn more →
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Briefcase className="w-8 h-8 text-primary" />
                  <CardTitle className="font-serif">Business & Commerce</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Transparency for invoices, agreements, and commercial transactions.
                </p>
                <Link href="/categories" className="text-primary hover:underline font-medium">
                  Learn more →
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Explained */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Pricing Explained</h2>
            <p className="text-lg text-muted-foreground">Understanding the costs of blockchain registration</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="font-serif">Gas Fees</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Network fees paid to blockchain miners for processing your transaction. Varies with network
                  congestion.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="font-serif">Service Fees</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our platform fee for providing secure document processing, storage, and verification services.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="font-serif">Cost Estimation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Real-time cost calculator shows exact fees before you commit. No hidden charges or surprises.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Link href="/pricing">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              >
                View Detailed Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Security & Trust */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Security & Trust</h2>
            <p className="text-lg text-muted-foreground">How we protect your data and ensure privacy</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Hash className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="font-serif">Data Hashing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your documents are converted to unique hashes - your actual data is never exposed on the blockchain.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="font-serif">Immutability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Once registered, records cannot be altered or deleted, providing permanent proof of existence.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="font-serif">Privacy-First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your documents stay yours. We only store cryptographic proofs, never your actual files.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tutorials & How-Tos */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Step-by-Step Tutorial</h2>
            <p className="text-lg text-muted-foreground">Complete guide to registering your first document</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold mb-2">Register as a User</h3>
                  <p className="text-muted-foreground">
                    Create your account with email verification. Set up your secure profile and preferences.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold mb-2">Upload Your Document</h3>
                  <p className="text-muted-foreground">
                    Select your file, choose the appropriate category, and add any relevant metadata or descriptions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold mb-2">Review Fees & Confirm</h3>
                  <p className="text-muted-foreground">
                    See real-time cost breakdown including gas fees and service charges. Confirm when ready.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold mb-2">Get Your Certificate</h3>
                  <p className="text-muted-foreground">
                    Receive your blockchain verification certificate with transaction hash and permanent proof link.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">Common questions about blockchain registration</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left bg-background rounded-lg border hover:bg-muted/50 transition-colors">
                <span className="font-medium">What happens if gas prices spike?</span>
                <ChevronDown className="w-5 h-5" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0">
                <p className="text-muted-foreground">
                  Our system shows real-time gas prices before you confirm. You can choose to wait for lower fees or
                  proceed with current rates. We never charge hidden fees.
                </p>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left bg-background rounded-lg border hover:bg-muted/50 transition-colors">
                <span className="font-medium">Which blockchains do you support?</span>
                <ChevronDown className="w-5 h-5" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0">
                <p className="text-muted-foreground">
                  We currently support Ethereum mainnet and Polygon for cost-effective transactions. More blockchain
                  networks will be added based on user demand.
                </p>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left bg-background rounded-lg border hover:bg-muted/50 transition-colors">
                <span className="font-medium">Can I retrieve my certificate later?</span>
                <ChevronDown className="w-5 h-5" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0">
                <p className="text-muted-foreground">
                  Yes! Your certificates are permanently stored in your account dashboard. You can download, share, or
                  verify them anytime with the transaction hash.
                </p>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left bg-background rounded-lg border hover:bg-muted/50 transition-colors">
                <span className="font-medium">Is my data stored on-chain or off-chain?</span>
                <ChevronDown className="w-5 h-5" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0">
                <p className="text-muted-foreground">
                  Only cryptographic hashes are stored on-chain for verification. Your actual documents remain private
                  and are stored securely off-chain with enterprise-grade encryption.
                </p>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Ready to Move from Learning to Registering?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start securing your important documents with blockchain technology today.
          </p>
          <Link href="/register">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-lg px-8 py-3"
            >
              🚀 Start Registering Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-serif font-bold text-lg mb-4">BlockRegistry</h3>
              <p className="text-muted-foreground">
                Secure blockchain registration for your important documents and data.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Services</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/categories" className="hover:text-primary transition-colors">
                    Document Registration
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-primary transition-colors">
                    Legal Contracts
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-primary transition-colors">
                    Property Titles
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-primary transition-colors">
                    IP Protection
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/learn" className="hover:text-primary transition-colors">
                    Learn
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-primary transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 BlockRegistry. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
