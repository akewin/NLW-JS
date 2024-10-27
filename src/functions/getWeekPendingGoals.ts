import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { db } from '../db'
import { goals, goalsCompletions } from '../db/schema'
import { and, lte, gte, sql, count } from 'drizzle-orm'
import { start } from 'repl'

dayjs.extend(weekOfYear)

export async function getWeekPendingGoals() {
  const lastDayOfWeek = dayjs().endOf('week').toDate()
  const firstDayOfWeek = dayjs().startOf('week').toDate()

  const goalsCreatedUpToWeek = db.$with('goals_created_up_to_week').as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
        createdAt: goals.createdAt,
      })
      .from(goals)
      .where(lte(goals.createdAt, lastDayOfWeek))
  )

  const goalCompletionCounts = db.$with('goal_completion_counts').as(
    db
      .select({
        goalId: goalsCompletions.goalId,
        goalCompletionCount: count(goalsCompletions.id),
      })
      .from(goalsCompletions)
      .where(
        and(
          gte(goalsCompletions.createdAt, firstDayOfWeek),
          lte(goalsCompletions.createdAt, lastDayOfWeek)
        )
      )
      .groupBy(goalsCompletions.goalId)
  )

  const pendingGoals = await db
    .with(goalsCreatedUpToWeek, goalCompletionCounts)
    .select()
    .from(goalsCreatedUpToWeek)
  return pendingGoals
}
