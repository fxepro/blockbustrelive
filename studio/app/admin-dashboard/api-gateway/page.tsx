"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Network, 
  Activity, 
  Shield, 
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Server,
  Key,
  Settings
} from "lucide-react"

interface ApiEndpoint {
  id: number
  name: string
  path: string
  method: string
  status: 'active' | 'maintenance' | 'error'
  requests_today: number
  avg_response_time: number
  success_rate: number
  last_updated: string
}

interface ApiStats {
  total_requests: number
  active_endpoints: number
  avg_response_time: number
  error_rate: number
  uptime: number
}

export default function AdminApiGatewayPage() {
  const [endpoints, setEndpoints] = useState<ApiEndpoint[]>([])
  const [stats, setStats] = useState<ApiStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
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
      
      loadApiData(token)
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/login")
    }
  }, [router])

  const loadApiData = async (token: string) => {
    try {
      // Mock data for now - replace with actual API calls
      const mockEndpoints: ApiEndpoint[] = [
        {
          id: 1,
          name: "User Authentication",
          path: "/api/v1/auth/login/",
          method: "POST",
          status: "active",
          requests_today: 1247,
          avg_response_time: 245,
          success_rate: 99.2,
          last_updated: "2024-01-20T15:30:00Z"
        },
        {
          id: 2,
          name: "User Registration",
          path: "/api/v1/auth/register/",
          method: "POST",
          status: "active",
          requests_today: 89,
          avg_response_time: 312,
          success_rate: 98.8,
          last_updated: "2024-01-20T15:25:00Z"
        },
        {
          id: 3,
          name: "User Dashboard",
          path: "/api/v1/auth/dashboard/",
          method: "GET",
          status: "active",
          requests_today: 2341,
          avg_response_time: 156,
          success_rate: 99.5,
          last_updated: "2024-01-20T15:28:00Z"
        },
        {
          id: 4,
          name: "Contract Management",
          path: "/api/v1/contracts/",
          method: "GET",
          status: "maintenance",
          requests_today: 456,
          avg_response_time: 0,
          success_rate: 0,
          last_updated: "2024-01-20T14:00:00Z"
        },
        {
          id: 5,
          name: "Transaction History",
          path: "/api/v1/transactions/",
          method: "GET",
          status: "error",
          requests_today: 123,
          avg_response_time: 0,
          success_rate: 0,
          last_updated: "2024-01-20T13:45:00Z"
        }
      ]

      const mockStats: ApiStats = {
        total_requests: 4256,
        active_endpoints: 3,
        avg_response_time: 238,
        error_rate: 0.8,
        uptime: 99.9
      }
      
      setEndpoints(mockEndpoints)
      setStats(mockStats)
    } catch (error) {
      console.error("Error loading API data:", error)
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500'
      case 'maintenance':
        return 'bg-yellow-500'
      case 'error':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-500">Active</Badge>
      case 'maintenance':
        return <Badge variant="secondary" className="bg-yellow-500">Maintenance</Badge>
      case 'error':
        return <Badge variant="destructive">Error</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading API gateway...</p>
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
              <h1 className="text-2xl font-bold text-foreground">API Gateway</h1>
              <p className="text-muted-foreground">Monitor and manage API endpoints</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button>
                <Key className="h-4 w-4 mr-2" />
                API Keys
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* API Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.total_requests.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Today</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Endpoints</CardTitle>
                <Server className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.active_endpoints}</div>
                <p className="text-xs text-muted-foreground">of {endpoints.length} total</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.avg_response_time}ms</div>
                <p className="text-xs text-muted-foreground">Last 24 hours</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Uptime</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.uptime}%</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
          </div>

          {/* API Endpoints */}
          <Card>
            <CardHeader>
              <CardTitle>API Endpoints</CardTitle>
              <CardDescription>Monitor endpoint status and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {endpoints.map((endpoint) => (
                  <div key={endpoint.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(endpoint.status)}`}></div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{endpoint.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {endpoint.method}
                          </Badge>
                          {getStatusBadge(endpoint.status)}
                        </div>
                        <p className="text-sm text-muted-foreground font-mono">
                          {endpoint.path}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-medium">{endpoint.requests_today.toLocaleString()}</div>
                        <div className="text-muted-foreground">Requests</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{endpoint.avg_response_time}ms</div>
                        <div className="text-muted-foreground">Avg Time</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{endpoint.success_rate}%</div>
                        <div className="text-muted-foreground">Success</div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* API Documentation */}
          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>Access and manage API documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">OpenAPI Specification</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Download the complete API specification in OpenAPI 3.0 format
                  </p>
                  <Button variant="outline" size="sm">
                    Download OpenAPI
                  </Button>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">Interactive Docs</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Access the interactive API documentation and testing interface
                  </p>
                  <Button variant="outline" size="sm">
                    View Docs
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
