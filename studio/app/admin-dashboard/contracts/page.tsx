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
  FileText, 
  Search, 
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  Users,
  DollarSign
} from "lucide-react"

interface Contract {
  id: number
  title: string
  category: string
  status: 'active' | 'pending' | 'expired' | 'draft'
  owner: {
    id: number
    name: string
    email: string
  }
  created_at: string
  updated_at: string
  transaction_hash: string
  gas_used: number
  deployment_cost: number
  views: number
}

interface ContractStats {
  total_contracts: number
  active_contracts: number
  pending_contracts: number
  total_gas_used: number
  total_deployment_cost: number
  total_views: number
}

export default function AdminContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [stats, setStats] = useState<ContractStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
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
      
      loadContracts(token)
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/login")
    }
  }, [router])

  const loadContracts = async (token: string) => {
    try {
      // Mock data for now - replace with actual API calls
      const mockContracts: Contract[] = [
        {
          id: 1,
          title: "Legal Agreement Contract",
          category: "Legal",
          status: "active",
          owner: {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com"
          },
          created_at: "2024-01-15T10:30:00Z",
          updated_at: "2024-01-20T14:22:00Z",
          transaction_hash: "0x1234567890abcdef...",
          gas_used: 125000,
          deployment_cost: 0.05,
          views: 45
        },
        {
          id: 2,
          title: "Property Deed Contract",
          category: "Real Estate",
          status: "pending",
          owner: {
            id: 2,
            name: "Jane Smith",
            email: "jane.smith@example.com"
          },
          created_at: "2024-01-18T09:15:00Z",
          updated_at: "2024-01-19T16:45:00Z",
          transaction_hash: "0xabcdef1234567890...",
          gas_used: 0,
          deployment_cost: 0,
          views: 12
        },
        {
          id: 3,
          title: "Business Partnership Agreement",
          category: "Business",
          status: "active",
          owner: {
            id: 3,
            name: "Block Admin",
            email: "admin@block.com"
          },
          created_at: "2024-01-10T08:00:00Z",
          updated_at: "2024-01-20T15:30:00Z",
          transaction_hash: "0x9876543210fedcba...",
          gas_used: 98000,
          deployment_cost: 0.03,
          views: 78
        },
        {
          id: 4,
          title: "Will and Testament",
          category: "Legal",
          status: "expired",
          owner: {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com"
          },
          created_at: "2023-12-01T12:00:00Z",
          updated_at: "2024-01-01T00:00:00Z",
          transaction_hash: "0xfedcba0987654321...",
          gas_used: 156000,
          deployment_cost: 0.08,
          views: 23
        }
      ]

      const mockStats: ContractStats = {
        total_contracts: 3421,
        active_contracts: 2890,
        pending_contracts: 531,
        total_gas_used: 1250000,
        total_deployment_cost: 45.67,
        total_views: 12543
      }
      
      setContracts(mockContracts)
      setStats(mockStats)
    } catch (error) {
      console.error("Error loading contracts:", error)
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

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.owner.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === "all" || contract.status === filterStatus
    const matchesCategory = filterCategory === "all" || contract.category.toLowerCase() === filterCategory.toLowerCase()
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-500">Active</Badge>
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-500">Pending</Badge>
      case 'expired':
        return <Badge variant="destructive">Expired</Badge>
      case 'draft':
        return <Badge variant="outline">Draft</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading contracts...</p>
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
              <h1 className="text-2xl font-bold text-foreground">Contract Management</h1>
              <p className="text-muted-foreground">Monitor and manage smart contracts</p>
            </div>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Deploy Contract
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Contract Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Contracts</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.total_contracts.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">All time</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats?.active_contracts.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Currently deployed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Gas Used</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.total_gas_used.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Gas units</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.total_views.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Contract views</p>
              </CardContent>
            </Card>
          </div>

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
                      placeholder="Search by title, owner name, or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="expired">Expired</option>
                    <option value="draft">Draft</option>
                  </select>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    <option value="all">All Categories</option>
                    <option value="legal">Legal</option>
                    <option value="real estate">Real Estate</option>
                    <option value="business">Business</option>
                  </select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contracts Table */}
          <Card>
            <CardHeader>
              <CardTitle>Contracts ({filteredContracts.length})</CardTitle>
              <CardDescription>Manage smart contract deployments and monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredContracts.map((contract) => (
                  <div key={contract.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{contract.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {contract.category}
                          </Badge>
                          {getStatusBadge(contract.status)}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Owner: {contract.owner.name}</span>
                          <span>•</span>
                          <span>Created: {new Date(contract.created_at).toLocaleDateString()}</span>
                          {contract.transaction_hash && (
                            <>
                              <span>•</span>
                              <span className="font-mono text-xs">
                                {contract.transaction_hash.slice(0, 10)}...
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="text-center">
                        <div className="font-medium">{contract.gas_used.toLocaleString()}</div>
                        <div className="text-muted-foreground">Gas</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">${contract.deployment_cost}</div>
                        <div className="text-muted-foreground">Cost</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{contract.views}</div>
                        <div className="text-muted-foreground">Views</div>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
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
