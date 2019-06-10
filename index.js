require('dotenv').config()
const server = require('./api/server')

const PORT = process.env.PORT || 5500

server.listen(PORT, () => {
  console.log(`Web Auth I API server running on port ${PORT}`)
})