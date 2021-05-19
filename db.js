const Sequelize = require('sequelize');
require('dotenv').config();

//database username   password
//const sequelize = new Sequelize('gamedb', 'postgres', 'ghastb0i', {
const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    // host: 'localhost',
    host: process.env.DB_HOST,
    dialect: 'postgres',
  }
);

sequelize.authenticate().then(
  function success() {
    console.log('=============================');
    console.log('Connected to DB');
    console.log('=============================');
  },

  function fail(err) {
    console.log('=============================');
    console.log(`Error: ${err}`);
    console.log('=============================');
  }
);

module.exports = sequelize;
