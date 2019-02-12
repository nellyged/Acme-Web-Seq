const Sequelize = require('sequelize');

//later on I want to try the singleton approach
module.exports = new Sequelize('acme_users_db', '', '', {
  dialect: 'postgres', //telling the sequelize what kind of DB we are using
  logging: false,
});
