const dotenv = require('dotenv')
const parsedEnv = dotenv.config().parsed

module.exports = function () {
  const value = key => JSON.stringify(process.env[key] || parsedEnv[key])

  return Object.keys(parsedEnv).reduce((obj, key) => ({...obj, [key]: value(key)}), {})
}
