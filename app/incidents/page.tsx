import Timeline from '@/components/Timeline'
import IncidentPlayer from '@/components/IncidentPlayer'
import { AlertCircle, Clock, Filter, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function IncidentsPage() {
  const incidentStats = [
    { label: "Active Incidents", value: 4, trend: "up" },
    { label: "Resolved Today", value: 12, trend: "down" },
    { label: "Avg Response Time", value: "2.4m", trend: "improving" },
    { label: "False Positives", value: "18%", trend: "steady" },
  ]

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-red-400" />
              <span>Incident Management</span>
            </h1>
            <p className="text-gray-400 mt-1">Review and analyze security incidents</p>
          </div>
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            <Button variant="outline" className="gap-2">
              <Clock className="w-4 h-4" />
              Time Range
            </Button>
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search incidents..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {incidentStats.map((stat, index) => (
            <div key={index} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <p className="text-sm text-gray-400">{stat.label}</p>
              <div className="flex items-end justify-between mt-1">
                <p className="text-xl font-bold">{stat.value}</p>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    stat.trend === "up"
                      ? "bg-red-900/50 text-red-400"
                      : stat.trend === "down"
                      ? "bg-green-900/50 text-green-400"
                      : "bg-blue-900/50 text-blue-400"
                  }`}
                >
                  {stat.trend === "up" ? "↑" : stat.trend === "down" ? "↓" : "→"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Player */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-800">
              <IncidentPlayer />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Timeline */}
            <div className="bg-gray-900 p-5 rounded-xl shadow-lg border border-gray-800">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                Incident Timeline
              </h2>
              <Timeline />
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-900 p-5 rounded-xl shadow-lg border border-gray-800 space-y-3">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="text-xs h-9">
                  Export Report
                </Button>
                <Button variant="outline" className="text-xs h-9">
                  Create Alert
                </Button>
                <Button variant="outline" className="text-xs h-9">
                  Notify Team
                </Button>
                <Button variant="destructive" className="text-xs h-9">
                  Escalate
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
