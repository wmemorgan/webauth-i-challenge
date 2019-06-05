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

// User Resource Routes
// ==== GET ==== //
router.get('/users', async (req, res) => {
  try {
    let data = await db.find('users')
    res.send(data)
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

// ==== DELETE ==== //
router.delete('/users/:id', validateId, async (req, res) => {
  try {
    let data = await db.remove(req.data.id, 'Users')
    res.send(data)
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

// Register Resource Route
router.post('/register', requiredData, async (req, res) => {
  let user = req.body

  const hash = bcrpyt.hashSync(user.password, 14)
  user.password = hash

  try {
    let data = await db.insert(user, 'Users')
    res.status(201).send(data)
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
server.use('/api', router)
server.use('/', (req, res) => {
  res.send(`<h1>WebAuth I Challenge API server</h1>`)
})

// Custom middleware
const inputDataChecker = (arr, target) => target.every(v => arr.includes(v))
const requiredFields = ['username', 'password']

function requiredData(req, res, next) {
  if (!req.body || !Object.keys(req.body).length) {
    res.status(400).json({ message: "Missing user data" })
  } else if (!inputDataChecker(Object.keys(req.body), requiredFields)) {
    res.status(400).json({ message: "Missing required field." })
  } else {
    next()
  }
}

async function validateId(req, res, next) {
  try {
    let data = await db.findById(req.params.id, 'Users')
    if (data) {
      req.data = data
      next()
    } else {
      res.status(404).json({ message: `User ID ${req.params.id} not found` })
    }
  }
  catch (err) {
    res.status(500).json(err.message)
  }
}

module.exports = server
