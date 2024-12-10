import 'server-only'

import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'

export const emails = pgTable('emails', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  ip: varchar({ length: 255 }).notNull(),
  createdAt: varchar({ length: 255 }).notNull(),
})
