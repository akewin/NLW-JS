// Import the `client` and `db` objects from the current directory.
// `client` is the PostgreSQL client, and `db` is the database instance.
import { client, db } from '.'

// Import the `goalsCompletions` and `goals` schema definitions from the `./schema` file.
import { goalsCompletions, goals } from './schema'

// Import the `dayjs` library for date manipulation.
import dayjs from 'dayjs'

// Define an asynchronous function `seed` to seed the database with initial data.
async function seed() {
  // Delete all records from the `goalsCompletions` table.
  await db.delete(goalsCompletions)

  // Delete all records from the `goals` table.
  await db.delete(goals)

  // Insert new records into the `goals` table and store the result.
  const result = await db
    .insert(goals)
    .values([
      { title: 'acordar cedo', desiredWeeklyFrequency: 5 },
      { title: 'estudar ingles', desiredWeeklyFrequency: 6 },
      { title: 'fazer exercicios', desiredWeeklyFrequency: 4 },
    ])
    .returning() // Return the inserted records.

  // Get the start of the current week using `dayjs`.
  const startOfWeek = dayjs().startOf('week')

  // Insert new records into the `goalsCompletions` table.
  await db.insert(goalsCompletions).values([
    { goalId: result[0].id, createdAt: startOfWeek.toDate() }, // Use the start of the week as the creation date.
    {
      goalId: result[1].id,
      createdAt: startOfWeek.add(1, 'day').toDate(), // Add one day to the start of the week for the creation date.
    },
  ])
}

// Call the `seed` function and ensure the PostgreSQL client is closed when done.
seed().finally(() => {
  client.end()
})
