const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const logger = require('morgan')
const bcrypt = require('bcryptjs')

// Import data models
const db = require('../data/models')

// Instantiate server and router
const server = express()
const router = express.Router()

//==== Global Middleware ==== //
const { validateUser, userAuthorization, validateId } = require('../middleware')
const userValidation = [requiredData, validateUser]
const protectedRoute = [userValidation, userAuthorization]

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(logger('dev'))

// User Resource Routes
// ==== GET ==== //
router.get('/users', protectedRoute, async (req, res) => {
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

// Login Resource Route
router.post('/login', requiredData, async (req, res) => {
  let { username, password } = req.body
  try {
    let user = await db.findByUser(username, 'Users')
    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({ message: `Greetings ${username}!`})
    } else {
      res.status(401).json({ message: `You shall not pass!` })
    }
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

module.exports = server
