'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { useIncidentStore } from '@/store/incidentStore'
import { Incident } from '@/types'

export default function IncidentPlayer() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const timelineRef = useRef<SVGSVGElement | null>(null)

  const {
    incidents,
    setIncidents,
    scrubberPos,
    setScrubberPos,
    videoDuration,
    setVideoDuration,
  } = useIncidentStore()

  const [isDragging, setIsDragging] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await fetch('/api/incidents')
        const data = await res.json()
        if (!res.ok || data.error) {
          console.error('Error fetching incidents:', data.error || res.statusText)
          return
        }

        const valid = data.filter(
          (incident: Incident) =>
            incident.tsStart && typeof incident.type === 'string'
        )
        setIncidents(valid)
      } catch (err) {
        console.error('Fetch error:', err)
      }
    }

    fetchIncidents()
  }, [setIncidents])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateScrubber = () => {
      if (!isDragging) {
        setScrubberPos(video.currentTime)
      }
    }

    video.addEventListener('timeupdate', updateScrubber)
    return () => video.removeEventListener('timeupdate', updateScrubber)
  }, [isDragging, setScrubberPos])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !timelineRef.current || !videoRef.current) return

      const rect = timelineRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const width = rect.width
      const clampedX = Math.max(0, Math.min(x, width))
      const newTime = (clampedX / width) * videoDuration

      videoRef.current.currentTime = newTime
      setScrubberPos(newTime)
    }

    const handleMouseUp = () => setIsDragging(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, videoDuration, setScrubberPos])

  const handleScrubClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!timelineRef.current || !videoRef.current) return

    const rect = timelineRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const width = rect.width
    const newTime = (x / width) * videoDuration

    videoRef.current.currentTime = newTime
    setScrubberPos(newTime)
  }

  const togglePlay = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  // ⏱️ Memoize incident markers
  const incidentMarkers = useMemo(() => {
    if (!videoDuration || isNaN(videoDuration)) return []

    return incidents.map((incident) => {
      const ts = new Date(incident.tsStart).getTime() / 1000
      const pos = (ts / videoDuration) * 100
      return { ...incident, pos: Math.min(Math.max(pos, 0), 100) }
    })
  }, [incidents, videoDuration])

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-100">Incident Review</h2>
        <div className="text-sm text-gray-400">
          {incidents.length} {incidents.length === 1 ? 'incident' : 'incidents'} detected
        </div>
      </div>

      {/* Video Player */}
      <div className="relative aspect-video bg-black rounded-xl overflow-hidden group">
        <video
          ref={videoRef}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onLoadedMetadata={(e) => setVideoDuration(e.currentTarget.duration)}
          className="w-full h-full object-contain"
        >
          <source src="/videos/sample.mp4" type="video/mp4" />
          Your browser does not support video playback.
        </video>

        <button
          onClick={togglePlay}
          className={`absolute inset-0 m-auto w-16 h-16 bg-black/50 rounded-full flex items-center justify-center transition-all duration-200 ${
            isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
          }`}
        >
          {isPlaying ? (
            <PauseIcon className="w-8 h-8 text-white" />
          ) : (
            <PlayIcon className="w-8 h-8 text-white" />
          )}
        </button>
      </div>

      {/* Camera Thumbnails */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <Thumbnail src="/thumbs/gun1.jpg" label="Camera 2" />
        <Thumbnail src="/thumbs/face1.jpg" label="Camera 3" />
      </div>

      {/* Timeline */}
      <div className="mt-6">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>{formatTime(scrubberPos)}</span>
          <span>{formatTime(videoDuration)}</span>
        </div>

        <svg
          ref={timelineRef}
          onClick={handleScrubClick}
          className="w-full h-16 bg-gray-800 rounded-lg cursor-pointer"
        >
          <rect width="100%" height="100%" rx="8" fill="#1F2937" />
          <rect
            width={`${(scrubberPos / videoDuration) * 100 || 0}%`}
            height="100%"
            rx="8"
            fill="#3B82F6"
            fillOpacity="0.3"
          />

          {incidentMarkers.map((incident) => (
            <g key={incident.id}>
              <circle cx={`${incident.pos}%`} cy="8" r="4" fill="#EF4444" />
              <rect x={`${incident.pos}%`} y="16" width="1" height="100%" fill="#EF4444" />
            </g>
          ))}

          <circle
            cx={`${(scrubberPos / videoDuration) * 100 || 0}%`}
            cy="8"
            r="6"
            fill="white"
            stroke="#3B82F6"
            strokeWidth="2"
            onMouseDown={() => setIsDragging(true)}
            className="cursor-ew-resize hover:scale-110 transition-transform"
          />
        </svg>
      </div>
    </div>
  )
}

function Thumbnail({ src, label }: { src: string; label: string }) {
  return (
    <div className="relative">
      <img src={src} alt={label} className="w-full aspect-video object-cover rounded-lg" />
      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
        {label}
      </div>
    </div>
  )
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
