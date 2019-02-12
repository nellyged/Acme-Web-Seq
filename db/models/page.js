const db = require('../db');
const Page = db.define('page', {
  //value for each column is an object so we can define multiple properties for that coulmn
  name: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Page;
