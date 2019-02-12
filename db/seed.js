const { Page, Content } = require('./models');
//must create this variable inside of the object brackets --- Deconstructing the exported object
const { initDb } = require('./index');

initDb(true)
  .then(() => {
    //seed the data with promises
    const createPage = Page.create({
      name: 'Home',
    });

    //Use promise.all to create multiple entreies
    const createContents = Promise.all([
      Content.create({
        heading: 'Welcome Home 1 ',
        text: 'xoxoxo',
      }),
      Content.create({
        heading: 'Welcome Home 2 ',
        text: 'xoxoxo',
      }),
    ]);

    return Promise.all([createPage, createContents]);
  })
  .then(([page, contents]) => {
    const [home1, home2] = contents;

    return page.setContents(contents);
  })
  .then(() => {
    console.log('I have seeded the DB');
  })
  .catch(e => {
    console.error(e);
  });
