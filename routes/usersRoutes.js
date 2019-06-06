const router = require('express').Router()

// Import data models
const db = require('../data/models')

// Middleware
const { userAuthorization, validateId } = require('../middleware')

// User Resource Routes
// ==== GET ==== //
router.get('/', userAuthorization, async (req, res) => {
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