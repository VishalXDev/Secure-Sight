const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const camerasData = [
    { name: 'Vault', location: 'Back Room' },
    { name: 'Shop Floor A', location: 'Main Hall' },
    { name: 'Entrance', location: 'Front Door' },
  ]

  const createdCameras = []

  for (const cam of camerasData) {
    const created = await prisma.camera.create({ data: cam })
    createdCameras.push(created)
  }

  const incidentsData = [
    {
      cameraId: createdCameras[0].id,
      type: 'Unauthorized Access',
      tsStart: new Date('2025-07-21T01:12:00'),
      tsEnd: new Date('2025-07-21T01:15:00'),
      thumbnailUrl: '/thumbs/unauth1.jpg',
      resolved: false,
    },
    {
      cameraId: createdCameras[1].id,
      type: 'Gun Threat',
      tsStart: new Date('2025-07-21T02:12:00'),
      tsEnd: new Date('2025-07-21T02:15:00'),
      thumbnailUrl: '/thumbs/gun1.jpg',
      resolved: false,
    },
    {
      cameraId: createdCameras[2].id,
      type: 'Face Recognized',
      tsStart: new Date('2025-07-21T03:12:00'),
      tsEnd: new Date('2025-07-21T03:15:00'),
      thumbnailUrl: '/thumbs/face1.jpg',
      resolved: true,
    },
    {
      cameraId: createdCameras[0].id,
      type: 'Loitering',
      tsStart: new Date('2025-07-21T04:00:00'),
      tsEnd: new Date('2025-07-21T04:15:00'),
      thumbnailUrl: '/thumbs/loitering.jpg',
      resolved: false,
    },
    {
      cameraId: createdCameras[1].id,
      type: 'Fire Detected',
      tsStart: new Date('2025-07-21T05:30:00'),
      tsEnd: new Date('2025-07-21T05:45:00'),
      thumbnailUrl: '/thumbs/fire.jpg',
      resolved: false,
    },
    {
      cameraId: createdCameras[2].id,
      type: 'Slip and Fall',
      tsStart: new Date('2025-07-21T06:00:00'),
      tsEnd: new Date('2025-07-21T06:10:00'),
      thumbnailUrl: '/thumbs/slip.jpg',
      resolved: true,
    },
    {
      cameraId: createdCameras[0].id,
      type: 'Door Forced Open',
      tsStart: new Date('2025-07-21T07:00:00'),
      tsEnd: new Date('2025-07-21T07:15:00'),
      thumbnailUrl: '/thumbs/doorforce.jpg',
      resolved: false,
    },
    {
      cameraId: createdCameras[1].id,
      type: 'Tampering Detected',
      tsStart: new Date('2025-07-21T08:00:00'),
      tsEnd: new Date('2025-07-21T08:20:00'),
      thumbnailUrl: '/thumbs/tamper.jpg',
      resolved: false,
    },
    {
      cameraId: createdCameras[2].id,
      type: 'Unknown Face Detected',
      tsStart: new Date('2025-07-21T09:00:00'),
      tsEnd: new Date('2025-07-21T09:10:00'),
      thumbnailUrl: '/thumbs/unknown.jpg',
      resolved: true,
    },
    {
      cameraId: createdCameras[1].id,
      type: 'Suspicious Package',
      tsStart: new Date('2025-07-21T10:00:00'),
      tsEnd: new Date('2025-07-21T10:20:00'),
      thumbnailUrl: '/thumbs/package.jpg',
      resolved: false,
    },
  ]

  for (const inc of incidentsData) {
    await prisma.incident.create({ data: inc })
  }

  console.log('✅ Seeded cameras and incidents successfully.')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
