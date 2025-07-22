'use client'

import { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { useIncidentStore } from '@/store/incidentStore'
import { Incident } from '@/types'

export default function IncidentList() {
  const [loading, setLoading] = useState(true)
  const { incidents, setIncidents, reorderIncidents, selectIncident } = useIncidentStore()

  useEffect(() => {
    const fetchIncidents = async () => {
      const res = await fetch('/api/incidents?resolved=false')
      const data = await res.json()
      setIncidents(data as Incident[])
      setLoading(false)
    }

    fetchIncidents()
  }, [setIncidents])

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return
    reorderIncidents(source.index, destination.index)
  }

  const resolveIncident = async (id: string) => {
    setIncidents(incidents.filter((i) => i.id !== id))
    await fetch(`/api/incidents/${id}/resolve`, { method: 'PATCH' })
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-100">Active Incidents</h2>
        {!loading && (
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-800 text-gray-300">
            {incidents.length} {incidents.length === 1 ? 'incident' : 'incidents'}
          </span>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-sm text-gray-400">Loading incidents...</p>
        </div>
      ) : incidents.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400">No active incidents to display</p>
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="incident-list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
                {incidents.map((incident, index) => (
                  <Draggable key={incident.id} draggableId={incident.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => selectIncident(incident)}
                        className={`group flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                          snapshot.isDragging
                            ? 'bg-gray-800 border-2 border-blue-500 shadow-lg'
                            : 'bg-gray-800/80 hover:bg-gray-800 border border-gray-700'
                        }`}
                      >
                        <div className="relative flex-shrink-0">
                          <img
                            src={incident.thumbnail}
                            alt="Thumbnail"
                            className="w-20 h-16 rounded-lg object-cover"
                          />
                          <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xxs px-1 rounded">
                            {incident.confidence}%
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-100 truncate">
                              {incident.type}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(incident.tsStart).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                          <div className="text-xs text-gray-400 truncate">
                            {incident.camera?.location || 'Unknown location'}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Duration:{' '}
                            {Math.round(
                              (new Date(incident.tsEnd).getTime() -
                                new Date(incident.tsStart).getTime()) /
                                1000
                            )}
                            s
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            resolveIncident(incident.id)
                          }}
                          className="text-xs font-medium bg-green-600/90 hover:bg-green-600 px-3 py-1.5 rounded-md text-white transition-colors duration-200 group-hover:opacity-100 opacity-90"
                        >
                          Resolve
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  )
}
