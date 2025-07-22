// app/users/page.tsx

import { Users, UserPlus, Shield, Search, Mail, Lock, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function UsersPage() {
  const users = [
    {
      id: 1,
      name: "Arjun Mehta",
      email: "arjun.mehta@securesight.in",
      role: "Administrator",
      lastActive: "2 mins ago",
      status: "active",
      avatar: "/avatars/1.jpg"
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@securesight.in",
      role: "Security Manager",
      lastActive: "15 mins ago",
      status: "active",
      avatar: "/avatars/2.jpg"
    },
    {
      id: 3,
      name: "Rohit Verma",
      email: "rohit.verma@securesight.in",
      role: "Operator",
      lastActive: "1 hour ago",
      status: "active",
      avatar: "/avatars/3.jpg"
    },
    {
      id: 4,
      name: "Neha Patel",
      email: "neha.patel@securesight.in",
      role: "Viewer",
      lastActive: "2 days ago",
      status: "inactive",
      avatar: "/avatars/4.jpg"
    },
    {
      id: 5,
      name: "Kabir Singh",
      email: "kabir.singh@securesight.in",
      role: "Auditor",
      lastActive: "1 week ago",
      status: "suspended",
      avatar: "/avatars/5.jpg"
    }
  ]

  const roles = [
    { name: "Administrator", count: 2, permissions: "Full access" },
    { name: "Security Manager", count: 5, permissions: "Incident management" },
    { name: "Operator", count: 8, permissions: "Monitoring" },
    { name: "Viewer", count: 12, permissions: "Read-only" }
  ]

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-400" />
              <span>User Management</span>
            </h1>
            <p className="text-gray-400 mt-1">Manage system access and permissions</p>
          </div>
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <Button className="gap-2">
              <UserPlus className="w-4 h-4" />
              Add User
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 hover:bg-gray-800/50 transition-colors">
            <p className="text-sm text-gray-400">Total Users</p>
            <p className="text-2xl font-bold mt-1">28</p>
          </Card>
          <Card className="p-4 hover:bg-gray-800/50 transition-colors">
            <p className="text-sm text-gray-400">Active Sessions</p>
            <p className="text-2xl font-bold mt-1">12</p>
          </Card>
          <Card className="p-4 hover:bg-gray-800/50 transition-colors">
            <p className="text-sm text-gray-400">Roles</p>
            <p className="text-2xl font-bold mt-1">5</p>
          </Card>
          <Card className="p-4 hover:bg-gray-800/50 transition-colors">
            <p className="text-sm text-gray-400">Recent Activity</p>
            <p className="text-2xl font-bold mt-1">3 alerts</p>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Users List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">All Users</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Export</Button>
                <Button variant="outline" size="sm">Filter</Button>
              </div>
            </div>
            <Card className="overflow-hidden">
              <div className="divide-y divide-gray-800">
                {users.map(user => (
                  <div key={user.id} className="p-4 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-gray-900 ${
                          user.status === "active" ? "bg-green-500" :
                          user.status === "inactive" ? "bg-gray-500" :
                          "bg-red-500"
                        }`}></span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-medium truncate">{user.name}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            user.role === "Administrator" ? "bg-purple-900/50 text-purple-400" :
                            user.role === "Security Manager" ? "bg-blue-900/50 text-blue-400" :
                            "bg-gray-700 text-gray-300"
                          }`}>
                            {user.role}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Mail className="w-3 h-3" />
                          <p className="truncate">{user.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Last active</p>
                        <p className="text-sm">{user.lastActive}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Roles & Permissions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Shield className="w-5 h-5 text-yellow-400" />
                Roles
              </h2>
              <Button variant="outline" size="sm">Manage</Button>
            </div>
            <Card className="p-4 space-y-4">
              {roles.map(role => (
                <div key={role.name} className="p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{role.name}</h3>
                      <p className="text-xs text-gray-400">{role.permissions}</p>
                    </div>
                    <span className="text-sm bg-gray-700 px-2 py-0.5 rounded-full">
                      {role.count} users
                    </span>
                  </div>
                </div>
              ))}
            </Card>

            {/* Recent Activity */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-400" />
                Recent Activity
              </h2>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <Card className="p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-blue-900/30 rounded-full">
                  <Lock className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Password reset</p>
                  <p className="text-xs text-gray-400">Arjun Mehta - 10 mins ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-green-900/30 rounded-full">
                  <UserPlus className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">New user added</p>
                  <p className="text-xs text-gray-400">Priya Sharma - 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-red-900/30 rounded-full">
                  <Shield className="w-4 h-4 text-red-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Permission changed</p>
                  <p className="text-xs text-gray-400">Rohit Verma - 1 day ago</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
