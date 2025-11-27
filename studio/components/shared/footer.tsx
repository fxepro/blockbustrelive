import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-foreground to-foreground/90 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-xl font-serif font-semibold mb-4 text-white">Your Records. Your Chain. Your Future.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-sm">
          <Link href="/register" className="text-white hover:text-primary transition-colors">
            Register
          </Link>
          <Link href="/categories" className="text-white hover:text-primary transition-colors">
            Categories
          </Link>
          <Link href="/pricing" className="text-white hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link href="/learn" className="text-white hover:text-primary transition-colors">
            Learn
          </Link>
          <Link href="/about" className="text-white hover:text-primary transition-colors">
            About Us
          </Link>
          <Link href="/contact" className="text-white hover:text-primary transition-colors">
            Contact
          </Link>
        </div>

        <div className="text-center mt-8 pt-8 border-t border-white/20">
          <p className="text-sm opacity-75 text-white">© 2024 BlockBustre. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
