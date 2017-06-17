const Sequelize = require('sequelize');


const db = new Sequelize('postgres://nrztuxhj:PqF8Vwctuct4Sbp0tBd2YKdmdni-rATv@stampy.db.elephantsql.com:5432/nrztuxhj');

db.authenticate()
  .then(() => {
    console.log('db connected succesfully');
  })
  .catch((err) => {
    console.log('db fucked up');
  })

module.exports = db;