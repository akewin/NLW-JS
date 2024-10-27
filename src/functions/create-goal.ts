// Import the `db` object from the `../db` file.
// `db` is the database instance used to interact with the database.
import { db } from '../db'

// Import the `goals` schema definition from the `../db/schema` file.
// This schema defines the structure of the `goals` table.
import { goals } from '../db/schema'

// Define an interface `CreateGoalRequest` to specify the shape of the request object.
// This interface includes the `title` and `desiredWeeklyFrequency` properties.
interface CreateGoalRequest {
  title: string
  desiredWeeklyFrequency: number
}

// Define an asynchronous function `createGoal` to create a new goal in the database.
// The function takes an object of type `CreateGoalRequest` as an argument.
export async function createGoal({
  title,
  desiredWeeklyFrequency,
}: CreateGoalRequest) {
  // Insert a new record into the `goals` table with the provided `title` and `desiredWeeklyFrequency`.
  // Use the `returning` method to return the inserted record.
  const result = await db
    .insert(goals)
    .values({
      title,
      desiredWeeklyFrequency,
    })
    .returning()

  // Extract the first inserted record from the result.
  const goal = result[0]

  // Return an object containing the inserted goal.
  return {
    goal,
  }
}
