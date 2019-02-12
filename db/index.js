const db = require('./db');
const { Page, Content } = require('./models');

const initDb = (force = false) => {
  //remember to always return the promise since the connection will be used
  return db.authenticate().then(() => {
    Page.hasMany(Content);
    Content.belongsTo(Page);
    return db.sync({ force });
  });
};

module.exports = {
  initDb,
  models: {
    Page,
    Content,
  },
};
