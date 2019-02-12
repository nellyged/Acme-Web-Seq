const db = require('../db');
const Content = db.define('content', {
  //value for each column is an object so we can define
  heading: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  text: {
    type: db.Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Content;
