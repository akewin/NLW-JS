// Import the Fastify framework
import fastify from 'fastify'

// Create an instance of a Fastify application
const app = fastify()

// Start the Fastify server on port 3333
app.listen({ port: 3333 }).then(() => {
  // Log a message to the console once the server is running
  console.log('HTTP server running')
})
