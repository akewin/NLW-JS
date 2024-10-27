// Import the `drizzle` function from the `drizzle-orm/postgres-js` package.
// This function is used to create a database instance with the specified schema and options.
import { drizzle } from 'drizzle-orm/postgres-js'

// Import the `postgres` function from the `postgres` package.
// This function is used to create a PostgreSQL client.
import postgres from 'postgres'

// Import everything from the `./schema` file as `schema`.
// This will include all the database schema definitions.
import * as schema from './schema'

// Import the `env` object from the `../env` file.
// This object contains environment variables, including the database URL.
import { env } from '../env'

// Create a PostgreSQL client using the connection string from the environment variables.
// `env.DATABASE_URL` should contain the URL to connect to the PostgreSQL database.
export const client = postgres(env.DATABASE_URL)

// Create a database instance using the `drizzle` function.
// Pass the PostgreSQL client and the schema to the `drizzle` function.
// Enable logging by setting `logger: true`.
export const db = drizzle(client, { schema, logger: true })
