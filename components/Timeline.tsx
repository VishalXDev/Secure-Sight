'use client'

import { useIncidentStore } from '@/store/incidentStore'
import { useRef, useState, useCallback, useEffect } from 'react' // ✅ useEffect added
import { formatDuration } from '../lib/utils'

export default function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { timelinePosition, setTimelinePosition, selectedIncident } = useIncidentStore()
  const [hoverTime, setHoverTime] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const duration = selectedIncident?.duration || 0

  const calculatePosition = useCallback((clientX: number) => {
    if (!timelineRef.current) return 0
    const rect = timelineRef.current.getBoundingClientRect()
    const position = Math.max(0, Math.min(clientX - rect.left, rect.width))
    return (position / rect.width) * duration
  }, [duration])

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const newTime = calculatePosition(e.clientX)
    setTimelinePosition(newTime)
  }, [calculatePosition, setTimelinePosition])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const newTime = calculatePosition(e.clientX)
      setTimelinePosition(newTime)
    } else {
      setHoverTime(calculatePosition(e.clientX))
    }
  }, [calculatePosition, isDragging, setTimelinePosition])

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)
  const handleMouseLeave = () => {
    setHoverTime(null)
    setIsDragging(false)
  }

  const progressPercent = duration ? (timelinePosition / duration) * 100 : 0
  const hoverPercent = hoverTime !== null ? (hoverTime / duration) * 100 : null

  // ✅ Drag release listener
  useEffect(() => {
    const handleWindowMouseUp = () => setIsDragging(false)
    window.addEventListener('mouseup', handleWindowMouseUp)
    return () => window.removeEventListener('mouseup', handleWindowMouseUp)
  }, [])

  return (
    <div className="w-full px-4 py-3 bg-gray-900 rounded-lg">
      <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
        <span>{formatDuration(timelinePosition)}</span>
        <span>{formatDuration(duration)}</span>
      </div>

      <div
        ref={timelineRef}
        onClick={handleSeek}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className={`relative h-2 bg-gray-700 rounded-full cursor-pointer group ${isDragging ? 'cursor-grabbing' : ''}`}
      >
        {/* Track background */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gray-700" />
          <div 
            className="absolute top-0 left-0 h-full bg-green-500/80 transition-all duration-100"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Hover line */}
        {hoverPercent !== null && (
          <div
            className="absolute top-0 h-full w-0.5 bg-white/50"
            style={{ left: `${hoverPercent}%` }}
          />
        )}

        {/* Handle knob */}
        <div
          className={`absolute top-1/2 -mt-2 w-4 h-4 bg-green-500 rounded-full shadow-md transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ${
            isDragging ? 'scale-125' : 'group-hover:scale-110'
          }`}
          style={{ left: `${progressPercent}%` }}
        />

        {/* Time tooltip */}
        {hoverTime !== null && (
          <div
            className="absolute -top-7 text-xs font-medium text-white bg-gray-800 px-2 py-1 rounded shadow-lg pointer-events-none"
            style={{
              left: `${hoverPercent}%`,
              transform: 'translateX(-50%)',
            }}
          >
            {formatDuration(hoverTime)}
          </div>
        )}
      </div>
    </div>
  )
}
