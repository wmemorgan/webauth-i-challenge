const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const logger = require('morgan')
const bcrpyt = require('bcryptjs')

// Import data models
const db = require('../data/models')

// Instantiate server and router
const server = express()
const router = express.Router()

//==== Global Middleware ==== //
server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(logger('dev'))

// Routes
router.get('/users', async (req, res) => {
  try {
    let data = await db.find('users')
    res.send(data)
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

router.post('/register', requiredData, async (req, res) => {
  try {

  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

router.post('/login', async (req, res) => {
  try {

  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

// Activate routes
server.use('/.netlify/functions/server/api', router)
server.use('/', (req, res) => {
  res.send(`<h1>WebAuth I Challenge API server</h1>`)
})

// Custom middleware
const inputDataChecker = (arr, target) => target.every(v => arr.includes(v))
const requiredFields = ['name', 'is_complete']

function requiredData(req, res, next) {
  if (!req.body || !Object.keys(req.body).length) {
    res.status(400).json({ message: "Missing user data" })
  } else if (!inputDataChecker(Object.keys(req.body), requiredFields)) {
    res.status(400).json({ message: "Missing required field." })
  } else {
    next()
  }
}

module.exports = server
