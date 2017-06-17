const Sequelize = require('sequelize');
const dbUrl = require('../../config');


const db = new Sequelize(dbUrl);

db.authenticate()
  .then(() => {
    console.log('db connected succesfully');
  })
  .catch((err) => {
    console.log('db fucked up');
  })

module.exports = db;