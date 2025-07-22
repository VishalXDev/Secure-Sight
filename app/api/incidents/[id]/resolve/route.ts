// app/api/incidents/[id]/resolve/route.ts

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/incidents/[id]/resolve
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const incident = await prisma.incident.findUnique({
      where: { id: params.id },
      include: { camera: true },
    })

    if (!incident) {
      return NextResponse.json({ error: 'Incident not found' }, { status: 404 })
    }

    return NextResponse.json(incident)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch incident' }, { status: 500 })
  }
}

// PATCH /api/incidents/[id]/resolve
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updatedIncident = await prisma.incident.update({
      where: { id: params.id },
      data: { resolved: true },
    })

    return NextResponse.json(updatedIncident)
  } catch (error) {
    return NextResponse.json({ error: 'Incident not found' }, { status: 404 })
  }
}
