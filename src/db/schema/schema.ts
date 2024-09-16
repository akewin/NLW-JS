// Import necessary functions and types from 'drizzle-orm/pg-core'
import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core'

// Define a table named 'goals' with its schema
export const goals = pgTable('goals', {
  // Define a text column 'id' as the primary key
  id: text('id').primaryKey(),
  // Define a text column 'title' that cannot be null
  title: text('title').notNull(),
  // Define an integer column 'desiredWeeklyFrequency' that cannot be null
  desiredWeeklyFrequency: integer('desired_weekly_frequency').notNull(),
  // Define a timestamp column 'createdAt' with timezone, cannot be null, and defaults to the current time
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
