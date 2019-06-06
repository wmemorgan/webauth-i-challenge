const router = require('express').Router()

// Import data models
const db = require('../data/models')

// Middleware
const { requiredData, validateUser, userAuthorization, validateId } = require('../middleware')
const userValidation = [requiredData, validateUser]
const protectedRoute = [userValidation, userAuthorization]

// User Resource Routes
// ==== GET ==== //
router.get('/', protectedRoute, async (req, res) => {
  try {
    let data = await db.find('users')
    res.send(data)
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

// ==== DELETE ==== //
router.delete('/:id', validateId, async (req, res) => {
  try {
    let data = await db.remove(req.data.id, 'Users')
    res.send(data)
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

module.exports = router