const bcrypt = require('bcryptjs')

const db = require('../data/models')

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

function userAuthorization(req, res, next) {
  if (req.session && req.session.user) {
    next()
  } else {
    res.status(401).json({ message: 'You shall not pass!' })
  }
}

module.exports = {
  validateUser, userAuthorization, validateId, requiredData
}