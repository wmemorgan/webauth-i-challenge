require('dotenv').config()
// Update with your config settings.
module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/auth.db3'
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    debug: true
  },

  staging: {
    client: 'pg',
    useNullAsDefault: true,    
    connection: {
      connectionString: process.env.AWS_DATABASE_URL,
      ssl: true
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    debug: true
  },

  production: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }
}
