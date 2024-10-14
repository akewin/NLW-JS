// Import the Fastify framework
import fastify from 'fastify'
import { createGoal } from '../functions/create-goal'
import z from 'zod'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'

// Create an instance of a Fastify application
const app = fastify().withTypeProvider<ZodTypeProvider>()

// Add schema validator and serializer -- FROM fastify type provider zod
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.post(
  '/goals',
  {
    schema: {
      body: z.object({
        title: z.string(),
        desiredWeeklyFrequency: z.number().int().min(1).max(7),
      }),
    },
  },
  async request => {
    const { title, desiredWeeklyFrequency } = request.body

    await createGoal({
      title,
      desiredWeeklyFrequency,
    })
  }
)

// Start the Fastify server on port 3333
app.listen({ port: 3333 }).then(() => {
  // Log a message to the console once the server is running
  console.log('HTTP server running')
})
