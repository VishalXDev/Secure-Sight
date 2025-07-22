// lib/prisma.ts

import { PrismaClient } from '@prisma/client'

declare global {
  // Allow global prisma instance in development
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'], // optional: logs all queries to console
  })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma
