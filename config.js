var dotenv = require('dotenv').config()

const dbUrl = process.env.dbUrl;
const secret = process.env.secret;
const audience = process.env.audience;
// const dbUrl = 'postgres://xdgesjhq:mn4Uoodn3Lk_LKoExtxKQsPz8s0Un73a@babar.elephantsql.com:5432/xdgesjhq';
// const secret = '-XahIl2khiGKX03hSIHpJXRCA_htarXmjtEQmg-Paz04cBVA-lQjHEgQBLE7uN6C';
// const audience = 'sI5ktAqaNr9Fo4Mr9NWKPDCQGNE9cGLT';

module.exports = {
  dbUrl: dbUrl,
  secret: secret,
  audience: audience,
}
