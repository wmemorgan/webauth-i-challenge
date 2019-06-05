const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const logger = require('morgan')
const serverless = require('serverless-http')
const bcrpyt = require('bcryptjs')

// Instantiate server and router
const server = express()
const router = express.Router()

//==== Global Middleware ==== //
server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(logger('dev'))

// Routes

// Activate routes
server.use('/.netlify/functions/server/api', router)
server.use('/', (req, res) => {
  res.send(`<h1>WebAuth I Challenge API server</h1>`)
})

module.exports = server
module.exports.handler = serverless(server)
