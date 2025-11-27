"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "../../lib/utils"
import { 
  LayoutDashboard, 
  Users, 
  Network, 
  FileText, 
  LogOut 
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdminSidebarProps {
  onLogout: () => void
}

export function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const pathname = usePathname()

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin-dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      href: "/admin-dashboard/users",
      icon: Users,
    },
    {
      name: "API Gateway",
      href: "/admin-dashboard/api-gateway",
      icon: Network,
    },
    {
      name: "Contracts",
      href: "/admin-dashboard/contracts",
      icon: FileText,
    },
  ]

  return (
    <div className="flex h-full w-64 flex-col bg-background border-r border-border">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-border">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg mr-3">
            <LayoutDashboard className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-serif font-bold text-primary">Admin Panel</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 py-6">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0",
                  isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                )}
              />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full justify-start bg-transparent border-2 border-primary/30 hover:border-primary hover:bg-primary/10 text-primary font-medium"
        >
          <LogOut className="mr-3 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}
