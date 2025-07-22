import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import IncidentPlayer from "@/components/IncidentPlayer";
import IncidentList from "@/components/IncidentList";
import SmartSight3D from "@/components/SmartSight3D";
import Footer from "@/components/Footer";
import { Activity, AlertCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Navbar />

      <main className="container mx-auto p-4 md:p-6 space-y-6">
        {/* Compact Dashboard Header */}
        <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-lg font-semibold flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-400" />
                <span>Security Dashboard</span>
              </h1>
              <p className="text-xs text-gray-400">
                Real-time monitoring and incident management
              </p>
            </div>
            {/* Buttons removed here */}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-2">
            <StatCard label="Active Incidents" value="3" />
            <StatCard label="Cameras Online" value="12/15" />
            <StatCard label="Avg Response" value="2.4m" />
            <StatCard label="Alerts Today" value="5" />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Incident Player */}
          <div className="flex-1">
            <Card
              title={
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span>Live Incident Viewer</span>
                </div>
              }
              className="border border-gray-800"
            >
              <IncidentPlayer />
            </Card>
          </div>

          {/* Right Column - Secondary Components */}
          <div className="w-full lg:w-96 xl:w-[28rem] space-y-6">
            <Card title="Recent Incidents" className="border border-gray-800">
              <IncidentList />
            </Card>

            <Card title="3D System Overview" className="border border-gray-800">
              <SmartSight3D />
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-800/50 hover:bg-gray-800/70 p-2 rounded-md transition-colors">
      <p className="text-[0.7rem] text-gray-400 mb-1">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}
