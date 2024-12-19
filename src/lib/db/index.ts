'server-only'

import 'dotenv/config'

import { drizzle } from 'drizzle-orm/neon-http'
import { emails } from './schema'
import { z } from 'zod'
import { desc, eq } from 'drizzle-orm'

const db = drizzle(process.env.DATABASE_URL!)

export async function createMailRecord(ipAddress: string) {
  const ip = z.string().ip().safeParse(ipAddress)

  if (ip.error) throw new Error('Invalid IP address')

  try {
    await db
      .insert(emails)
      .values({ ip: ip.data, createdAt: new Date().toISOString() })
  } catch (error) {
    throw new Error('Failed to create record')
  }
}

export async function getLatestMailRecordByIp(ipAddress: string) {
  try {
    const ip = z.string().ip().parse(ipAddress)

    const record = await db
      .select()
      .from(emails)
      .where(eq(emails.ip, ip))
      .orderBy(desc(emails.createdAt))
      .limit(1)

    return record
  } catch (error) {
    throw new Error('Failed to get record')
  }
}
