const Sequelize = require('sequelize');
require('dotenv').config();
//database username   password
const sequelize = new Sequelize('gamedb', 'postgres', 'ghastb0i', {
  // host: 'localhost',
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

sequelize.authenticate().then(
  function success() {
    console.log('Connected to DB');
  },

  function fail(err) {
    console.log(`Error: ${err}`);
  }
);

module.exports = sequelize;
