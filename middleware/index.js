const bcrypt = require('bcryptjs')

const db = require('../data/models')

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

//==== Authentication ====//
async function validateUser(req, res, next) {
  let { username } = req.headers
  try {
    let data = await db.findByUser(username, 'Users')
    if (data) {
      req.data = data
      next()
    } else {
      res.status(404).json({ message: `You shall not pass!` })
    }
  }
  catch (err) {
    res.status(500).json(err.message)
  }
}

async function userAuthorization(req, res, next) {
  let { username, password } = req.body
  try {
    let user = await db.findByUser(username, 'Users')
    if (user && bcrypt.compareSync(password, user.password)) {
      next()
    } else {
      res.status(401).json({ message: 'You shall not pass!' })
    }
  }
  catch (err) {
    res.status(500).send(err.message)
  }
}

module.exports = {
  validateUser, userAuthorization, validateId
}