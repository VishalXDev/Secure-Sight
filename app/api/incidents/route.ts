import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const resolved = searchParams.get('resolved')

    let whereClause = {}
    if (resolved === 'false') whereClause = { resolved: false }
    else if (resolved === 'true') whereClause = { resolved: true }

    console.log('✅ Incoming /api/incidents request')
    console.log('📌 Query resolved =', resolved)
    console.log('🔎 Where clause =', whereClause)

    const incidents = await prisma.incident.findMany({
      where: whereClause,
      include: { camera: true },
      orderBy: { tsStart: 'desc' },
    })

    console.log('✅ Incidents fetched:', incidents.length)
    return NextResponse.json(incidents, { status: 200 })
  } catch (error: any) {
    console.error('❌ Failed to fetch incidents:', error.message || error)
    return NextResponse.json(
      { error: 'Failed to fetch incidents', detail: error.message },
      { status: 500 }
    )
  }
}
