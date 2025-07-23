import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const resolved = searchParams.get('resolved')

    const whereClause =
      resolved === 'false'
        ? { resolved: false }
        : resolved === 'true'
        ? { resolved: true }
        : {}

    console.log('📦 Fetching incidents with where:', whereClause)

    const incidents = await prisma.incident.findMany({
      where: whereClause,
      include: { camera: true },
      orderBy: { tsStart: 'desc' },
    })

    console.log('✅ Incidents fetched:', incidents.length)

    if (!Array.isArray(incidents)) {
      console.error('❌ Expected incidents to be array but got:', incidents)
      return NextResponse.json(
        { error: 'Incidents is not an array.' },
        { status: 500 }
      )
    }

    return NextResponse.json(incidents, { status: 200 })
  } catch (error: any) {
    console.error('❌ Failed to fetch incidents:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch incidents',
        details: error?.message || String(error),
      },
      { status: 500 }
    )
  }
}
