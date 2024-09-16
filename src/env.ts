// Import the Zod library for schema validation
import z from 'zod'

// Define a schema for environment variables validation
const envSchema = z.object({
  // Validate that DATABASE_URL is a string and a valid URL
  DATABASE_URL: z.string().url(),
})

// Export the validated environment variables
export const env = envSchema.parse(process.env)
