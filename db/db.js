const Sequelize = require('sequelize');
//const config = require('../config.json');

if (process.env.DATABASE_URL) {
  module.exports = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: true, //false
  });
} else {
  module.exports = new Sequelize('acme_users_db', '', '', {
    dialect: 'postgres', //telling the sequelize what kind of DB we are using
    logging: false,
  });
}
