const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const logger = require('morgan')
const session = require('express-session')
const SessionStore = require('connect-session-knex')(session)

// Import routes
const authRoutes = require('../routes/authRoutes')
const usersRoutes = require('../routes/usersRoutes')

// Instantiate server and router
const server = express()

const sessionConfig = {
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 30,
    secure: process.env.NODE_ENV !== 'development',
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false,
  store: new SessionStore({
    knex: require('../data/dbConfig'),
    tablename: 'sessions',
    sidfieldName: 'sid',
    createtable: true,
    clearInterval: 60 * 60 * 1000
  })
}

//==== Global Middleware ==== //
server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(session(sessionConfig))
server.use(logger('dev'))

// Activate routes
server.use('/api/auth', authRoutes)
server.use('/api/users', usersRoutes)
server.use('/', (req, res) => {
  res.send(`<h1>WebAuth I Challenge API server</h1>`)
})

module.exports = server
