import { CameraIcon, WifiIcon, WifiOffIcon, VideoIcon, SettingsIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function CamerasPage() {
  const cameras = [
    {
      id: 1,
      name: "Front Entrance",
      status: "online",
      lastActive: "2 mins ago",
      location: "Lobby",
      model: "Hikvision DS-2CD2347G2-LU",
    },
    {
      id: 2,
      name: "Back Parking",
      status: "online",
      lastActive: "5 mins ago",
      location: "Parking Lot",
      model: "Dahua IPC-HDW3849H-AS-PV",
    },
    {
      id: 3,
      name: "Warehouse",
      status: "offline",
      lastActive: "1 hour ago",
      location: "Building B",
      model: "Axis M3045-V",
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <CameraIcon className="w-8 h-8 text-blue-400" />
            <span>Camera Dashboard</span>
          </h1>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <SettingsIcon className="w-4 h-4" />
            <span>Manage Cameras</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cameras.map((camera) => (
            <Card
              key={camera.id}
              title={
                <div className="flex items-center justify-between">
                  <span>{camera.name}</span>
                  <span
                    className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                      camera.status === "online"
                        ? "bg-green-900/50 text-green-400"
                        : "bg-red-900/50 text-red-400"
                    }`}
                  >
                    {camera.status === "online" ? (
                      <WifiIcon className="w-3 h-3" />
                    ) : (
                      <WifiOffIcon className="w-3 h-3" />
                    )}
                    {camera.status}
                  </span>
                </div>
              }
            >
              <div className="space-y-4">
                <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center relative">
                  {camera.status === "online" ? (
                    <>
                      <div className="absolute inset-0 bg-gray-700/50 flex items-center justify-center">
                        <VideoIcon className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        LIVE
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-4 text-gray-400">
                      <WifiOffIcon className="w-8 h-8 mx-auto mb-2" />
                      <p>Camera offline</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-400">Location</p>
                    <p className="font-medium">{camera.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Model</p>
                    <p className="font-medium truncate">{camera.model}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Last Active</p>
                    <p className="font-medium">{camera.lastActive}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Status</p>
                    <p
                      className={`font-medium ${
                        camera.status === "online"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {camera.status}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button className="flex-1 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded text-sm transition-colors">
                    View Recordings
                  </button>
                  <button className="flex-1 bg-blue-600/90 hover:bg-blue-600 px-3 py-2 rounded text-sm transition-colors">
                    Configure
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
