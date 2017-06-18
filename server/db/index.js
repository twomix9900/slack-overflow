const Sequelize = require('sequelize');
const dbUrl = require('../../config');


const db = new Sequelize(dbUrl, {
    pool: {
      max: 3,
      min: 0,
      idle: 10000
    }
  }
);

module.exports = db;