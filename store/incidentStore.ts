// store/incidentStore.ts
import { create } from 'zustand'
import { Incident } from '@/types'

type IncidentStore = {
  incidents: Incident[]
  selectedIncident: Incident | null
  timelinePosition: number
  scrubberPos: number
  videoDuration: number
  filters: { resolved?: boolean }

  setIncidents: (data: Incident[]) => void
  reorderIncidents: (from: number, to: number) => void

  selectIncident: (incident: Incident | null) => void
  setTimelinePosition: (pos: number) => void
  setScrubberPos: (pos: number) => void
  setVideoDuration: (duration: number) => void
  setFilters: (filters: Partial<{ resolved: boolean }>) => void
}

export const useIncidentStore = create<IncidentStore>((set) => ({
  incidents: [],
  selectedIncident: null,
  timelinePosition: 0,
  scrubberPos: 0,
  videoDuration: 0,
  filters: {},

  setIncidents: (data) => set({ incidents: data }),
  reorderIncidents: (from, to) =>
    set((state) => {
      const updated = [...state.incidents]
      const [moved] = updated.splice(from, 1)
      updated.splice(to, 0, moved)
      return { incidents: updated }
    }),

  selectIncident: (incident) => set({ selectedIncident: incident }),
  setTimelinePosition: (pos) => set({ timelinePosition: pos }),
  setScrubberPos: (pos) => set({ scrubberPos: pos }),
  setVideoDuration: (duration) => set({ videoDuration: duration }),
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
}))
