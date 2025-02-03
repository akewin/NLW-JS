import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";
import { lte, count, and, gte, eq, sql} from "drizzle-orm";

dayjs.extend(weekOfYear);

export async function getWeekPedingGoals(){
    const fistDayOfWeek = dayjs().startOf("week").toDate();
    const lastDayOfWeek = dayjs().endOf("week").toDate();

    const goalsCreateUpToWeek = db.$with("goals_create_up_to_week").as(
        db.select({
            id: goals.id,
            title: goals.title,
            desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
            createdAt: goals.createdAt,
        })
        .from(goals)
        .where(lte(goals.createdAt, lastDayOfWeek))
    ) 

    const  goalsCompletingCounts = db.$with('goals_completion_counts').as(
        db.select({
            goalId: goalCompletions.goalId,
            completionCount: count(goalCompletions.id).as("completionCount"),
        })
        .from(goalCompletions)
        .where(and(
            gte(goalCompletions.createdAt, fistDayOfWeek),
            lte(goalCompletions.createdAt, lastDayOfWeek)
        ))
        .groupBy(goalCompletions.goalId)
    )

    const pedingGoals = await db
    .with(goalsCreateUpToWeek, goalsCompletingCounts)
    .select({
        id: goalsCreateUpToWeek.id,
        title: goalsCreateUpToWeek.title,
        desiredWeeklyFrequency: goalsCreateUpToWeek.desiredWeeklyFrequency,
        completion: sql`
            COALESCE(${goalsCompletingCounts.completionCount}, 0)
        `.mapWith(Number),
     })
    .from(goalsCreateUpToWeek)
    .leftJoin(goalsCompletingCounts,eq(goalsCompletingCounts.goalId, goalsCreateUpToWeek.id))

    return {
        pedingGoals
    }

}