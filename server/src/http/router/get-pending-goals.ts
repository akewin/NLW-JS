import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekPedingGoals } from '../../function/get-week-peding-goals';

export const getPendingGoalRoute: FastifyPluginAsyncZod = async app => {
  app.get('/pending-goals', async () => {
    const { pedingGoals } = await getWeekPedingGoals();
    return pedingGoals
  })
}