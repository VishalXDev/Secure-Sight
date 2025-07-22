import { Camera, Eye, WifiOff, Video } from "lucide-react"
import { Card } from "@/components/ui/card"

const cameraData = [
  {
    id: 1,
    name: "Front Entrance",
    status: "Online",
    resolution: "1080p",
    lastActive: "2 mins ago",
  },
  {
    id: 2,
    name: "Parking Lot",
    status: "Offline",
    resolution: "720p",
    lastActive: "10 mins ago",
  },
  {
    id: 3,
    name: "Lobby",
    status: "Online",
    resolution: "4K",
    lastActive: "Just now",
  },
  {
    id: 4,
    name: "Warehouse",
    status: "Offline",
    resolution: "1080p",
    lastActive: "30 mins ago",
  },
]

export default function CamerasPage() {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <Video className="w-6 h-6 text-green-400" />
              <span>Camera Monitoring</span>
            </h1>
            <p className="text-gray-400 text-sm">Live status of all security cameras</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
            Add New Camera
          </button>
        </div>

        {/* Cameras Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cameraData.map((cam) => (
            <Card key={cam.id} title={
              <div className="flex items-center justify-between">
                <span>{cam.name}</span>
                {cam.status === "Online" ? (
                  <span className="text-green-400 text-sm flex items-center gap-1">
                    <Eye className="w-4 h-4" /> Online
                  </span>
                ) : (
                  <span className="text-red-400 text-sm flex items-center gap-1">
                    <WifiOff className="w-4 h-4" /> Offline
                  </span>
                )}
              </div>
            }>
              <div className="text-sm text-gray-400 mt-2 space-y-1">
                <p>Resolution: {cam.resolution}</p>
                <p>Last Active: {cam.lastActive}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
