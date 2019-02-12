const Sequelize = require('sequelize');
const config = require('../config.json');

console.log(config.use_env_variable);

if (config.use_env_variable) {
  module.exports = new Sequelize(process.env[config.use_env_variable]);
} else {
  module.exports = new Sequelize('acme_users_db', '', '', {
    dialect: 'postgres', //telling the sequelize what kind of DB we are using
    logging: false,
  });
}
