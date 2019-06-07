const router = require('express').Router()
const bcrypt = require('bcryptjs')

// Import data models
const db = require('../data/models')

// Import middleware
const { requiredData } = require('../middleware')

// Authorization Resource Route
router.post('/register', requiredData, async (req, res) => {
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 14)
  user.password = hash

  try {
    let data = await db.insert(user, 'Users')
    res.status(201).send(data)
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

router.post('/login', requiredData, async (req, res) => {
  let { username, password } = req.body
  try {
    let user = await db.findByUser(username, 'Users')
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = user
      res.json({ message: `Greetings ${username}!` })
    } else {
      res.status(401).json({ message: `You shall not pass!` })
    }
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/logout', (req, res) => {
  if(req.session) {
    req.session.destroy(err => {
      if(err) {
        res.status(500).json({ message: 'You can checkout anytime you like, but you can never leave.'})
      } else {
        res.json({ message: 'Bye, thanks for playing!' })
      }
    })
  } else {
    res.json({ message: `You were never here to begin with` })
  }
})

module.exports = router