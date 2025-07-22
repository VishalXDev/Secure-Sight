'use client'

import { LayoutGrid, Plus, Search, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function ScenesPage() {
  const scenes = [
    {
      id: 1,
      name: 'Lobby Overview',
      cameras: 4,
      lastModified: '2 hours ago',
      thumbnail: '/scenes/lobby.jpg',
    },
    {
      id: 2,
      name: 'Warehouse Security',
      cameras: 6,
      lastModified: '1 day ago',
      thumbnail: '/scenes/warehouse.jpg',
    },
    {
      id: 3,
      name: 'Parking Lot',
      cameras: 3,
      lastModified: '3 days ago',
      thumbnail: '/scenes/parking.jpg',
    },
    {
      id: 4,
      name: 'Office Entrance',
      cameras: 2,
      lastModified: '1 week ago',
      thumbnail: '/scenes/office.jpg',
    },
  ]

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <LayoutGrid className="w-8 h-8 text-blue-400" />
              <span>Scene Configurations</span>
            </h1>
            <p className="text-gray-400 mt-1">
              Manage and monitor your security scenes
            </p>
          </div>

          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search scenes..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Scene
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 hover:bg-gray-800/50 transition-colors">
            <p className="text-sm text-gray-400">Total Scenes</p>
            <p className="text-2xl font-bold mt-1">12</p>
          </Card>
          <Card className="p-4 hover:bg-gray-800/50 transition-colors">
            <p className="text-sm text-gray-400">Active Cameras</p>
            <p className="text-2xl font-bold mt-1">24/32</p>
          </Card>
          <Card className="p-4 hover:bg-gray-800/50 transition-colors">
            <p className="text-sm text-gray-400">Last Updated</p>
            <p className="text-2xl font-bold mt-1">2h ago</p>
          </Card>
          <Card className="p-4 hover:bg-gray-800/50 transition-colors">
            <p className="text-sm text-gray-400">Alerts Today</p>
            <p className="text-2xl font-bold mt-1">5</p>
          </Card>
        </div>

        {/* Scene Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {scenes.map((scene) => (
            <Card key={scene.id} className="overflow-hidden hover:shadow-lg transition-all p-0">
              <div className="relative aspect-video bg-gray-800">
                <img
                  src={scene.thumbnail}
                  alt={scene.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="font-semibold">{scene.name}</h3>
                </div>
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <Camera className="w-3 h-3" />
                  <span>{scene.cameras}</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>Modified</span>
                  <span>{scene.lastModified}</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    Configure
                  </Button>
                  <Button size="sm" className="flex-1">
                    View
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
