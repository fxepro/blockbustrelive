"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Users, Newspaper, Send, BookOpen, DollarSign, HelpCircle, Rocket } from "lucide-react"
import { UnifiedHeader } from "@/components/shared/unified-header"
import { Footer } from "@/components/shared/footer"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    setIsSubmitted(true)
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ fullName: "", email: "", subject: "", message: "" })
    }, 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <UnifiedHeader />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-balance">Get in Touch With Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Questions, partnerships, or support? We're here to help.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-4">General Inquiries</h3>
                <p className="text-muted-foreground mb-4">For account help, registration questions, or general info.</p>
                <a href="mailto:support@blockregistry.com" className="text-primary hover:underline font-medium">
                  support@blockregistry.com
                </a>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-4">Business & Partnerships</h3>
                <p className="text-muted-foreground mb-4">Interested in working with us? Let's talk collaborations.</p>
                <a href="mailto:partners@blockregistry.com" className="text-primary hover:underline font-medium">
                  partners@blockregistry.com
                </a>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Newspaper className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-4">Press & Media</h3>
                <p className="text-muted-foreground mb-4">For interviews, articles, or event requests.</p>
                <a href="mailto:media@blockregistry.com" className="text-primary hover:underline font-medium">
                  media@blockregistry.com
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-center mb-12">Send Us a Message</h2>

            {isSubmitted ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">Thanks! We'll reply within 24–48 hours.</p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl font-bold text-center mb-8">Need Something Else?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <BookOpen className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">How it Works</h3>
                  <p className="text-sm text-muted-foreground mb-4">Learn about our registration process</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/learn">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <DollarSign className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">See Plans</h3>
                  <p className="text-sm text-muted-foreground mb-4">Compare our pricing options</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/pricing">View Pricing</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <HelpCircle className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Common Questions</h3>
                  <p className="text-sm text-muted-foreground mb-4">Find answers to frequently asked questions</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/learn#faqs">View FAQs</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">We Speak Your Language</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our support is multi-lingual and global — wherever you are, we're here to help.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Ready to Register?</h2>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">
              <Rocket className="w-5 h-5 mr-2" />
              Start Registration
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
