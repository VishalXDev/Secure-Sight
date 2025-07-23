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
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch incident', detail: error.message }, { status: 500 })
  }
}

// PATCH /api/incidents/[id]/resolve
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params?.id

  if (!id || typeof id !== 'string') {
    return NextResponse.json({ error: 'Invalid or missing incident ID' }, { status: 400 })
  }

  try {
    const incident = await prisma.incident.findUnique({ where: { id } })

    if (!incident) {
      return NextResponse.json({ error: 'Incident not found' }, { status: 404 })
    }

    const updatedIncident = await prisma.incident.update({
      where: { id },
      data: { resolved: true },
    })

    return NextResponse.json(updatedIncident)
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update incident', detail: error.message }, { status: 500 })
  }
}
