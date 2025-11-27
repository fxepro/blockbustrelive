"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Users, 
  Search, 
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Mail,
  Calendar
} from "lucide-react"

interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  is_kyc_verified: boolean
  subscription_type: string
  subscription_active: boolean
  created_at: string
  last_login: string
  role: {
    id: number
    name: string
  }
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in and is admin
    const token = localStorage.getItem("access_token")
    const userData = localStorage.getItem("user_data")
    
    if (!token || !userData) {
      router.push("/login")
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      const isAdmin = parsedUser.role && parsedUser.role.name === 'Admin'
      
      if (!isAdmin) {
        router.push("/dashboard")
        return
      }
      
      loadUsers(token)
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/login")
    }
  }, [router])

  const loadUsers = async (token: string) => {
    try {
      // Mock data for now - replace with actual API calls
      const mockUsers: User[] = [
        {
          id: 1,
          email: "john.doe@example.com",
          first_name: "John",
          last_name: "Doe",
          is_kyc_verified: true,
          subscription_type: "premium",
          subscription_active: true,
          created_at: "2024-01-15T10:30:00Z",
          last_login: "2024-01-20T14:22:00Z",
          role: { id: 2, name: "User" }
        },
        {
          id: 2,
          email: "jane.smith@example.com",
          first_name: "Jane",
          last_name: "Smith",
          is_kyc_verified: false,
          subscription_type: "basic",
          subscription_active: true,
          created_at: "2024-01-18T09:15:00Z",
          last_login: "2024-01-19T16:45:00Z",
          role: { id: 2, name: "User" }
        },
        {
          id: 3,
          email: "admin@block.com",
          first_name: "Block",
          last_name: "Admin",
          is_kyc_verified: true,
          subscription_type: "admin",
          subscription_active: true,
          created_at: "2024-01-01T00:00:00Z",
          last_login: "2024-01-20T15:30:00Z",
          role: { id: 1, name: "Admin" }
        }
      ]
      
      setUsers(mockUsers)
    } catch (error) {
      console.error("Error loading users:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("user_data")
    router.push("/")
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRole = filterRole === "all" || user.role.name.toLowerCase() === filterRole.toLowerCase()
    
    return matchesSearch && matchesRole
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading users...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <AdminSidebar onLogout={handleLogout} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-background border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">User Management</h1>
              <p className="text-muted-foreground">Manage users, roles, and permissions</p>
            </div>
            <Button>
              <UserCheck className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Search & Filter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>Users ({filteredUsers.length})</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {user.first_name[0]}{user.last_name[0]}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{user.first_name} {user.last_name}</h3>
                          <Badge variant={user.role.name === 'Admin' ? 'default' : 'secondary'}>
                            {user.role.name}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {user.email}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            Joined {new Date(user.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={user.is_kyc_verified ? 'default' : 'destructive'}>
                        {user.is_kyc_verified ? 'Verified' : 'Pending KYC'}
                      </Badge>
                      <Badge variant={user.subscription_active ? 'default' : 'secondary'}>
                        {user.subscription_type}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
