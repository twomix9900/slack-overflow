var dotenv = require('dotenv').config()

const dbUrl = process.env.dbUrl;
const secret = process.env.secret;
const audience = process.env.audience;

module.exports = {
  dbUrl: dbUrl,
  secret: secret,
  audience: audience,
}
