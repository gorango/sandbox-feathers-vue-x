require('dotenv').config()

const env = process.env.NODE_ENV || 'development'

module.exports = {
  [env]: {
    dialect: 'postgres',
    url: process.env.DATABASE_URL,
    migrationStorageTableName: '_migrations'
  }
}
