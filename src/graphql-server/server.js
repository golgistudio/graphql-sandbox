import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import fs from 'fs'
import https from 'https'
import http from 'http'

const dotenv = require('dotenv').config();

import typeDefs from "./schemas"; 
import resolvers from './resolvers';

const configurations = {
  // Note: You may need sudo to run on port 443
  production: { ssl: true, port: process.env.PROD_GRAPHQL_PORT, hostname: process.env.PROD_HOSTNAME },
  development: { ssl: false, port: process.env.DEV_GRAPHQL_PORT, hostname: process.env.DEV_HOSTNAME }
}

const environment = process.env.NODE_ENV || 'production'
const config = configurations[environment]

const apollo = new ApolloServer({ typeDefs, resolvers })

const app = express()
apollo.applyMiddleware({ app })

// Create the HTTPS or HTTP server, per configuration
var server
if (config.ssl) {
  // Assumes certificates are in .ssl folder from package root. Make sure the files
  // are secured.
  server = https.createServer(
    {
      key: fs.readFileSync(`./ssl/${environment}/key.pem`),
      cert: fs.readFileSync(`./ssl/${environment}/certificate.pem`)
    },
    app
  )
} else {
  server = http.createServer(app)
}

// Add subscription support
apollo.installSubscriptionHandlers(server)

server.listen({ port: config.port }, () =>
  console.log(
    '🚀 Server ready at',
    `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${apollo.graphqlPath}`
  )
)