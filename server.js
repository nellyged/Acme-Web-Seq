const { models, initDb } = require('./db');
const app = require('./app');
const port = process.env.PORT || 1337;

initDb(true)
  .then(() => {
    //seed the data with promises
    const createPage = models.Page.create({
      name: 'Home',
    });

    //Use promise.all to create multiple entreies
    const createContents = Promise.all([
      models.Content.create({
        heading: 'Welcome Home 1',
        text: 'xoxoxo',
      }),
      models.Content.create({
        heading: 'Welcome Home 2',
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
    //seed the data with promises
    const createPage = models.Page.create({
      name: 'Contact',
    });

    //Use promise.all to create multiple entreies
    const createContents = Promise.all([
      models.Content.create({
        heading: 'Phone',
        text: '212-555-1212',
      }),
      models.Content.create({
        heading: 'Telex',
        text: '212-555-1213',
      }),
      models.Content.create({
        heading: 'FAX',
        text: '212-555-1213',
      }),
    ]);

    return Promise.all([createPage, createContents]);
  })
  .then(([page, contents]) => {
    const [contact1, contact2, contact3] = contents;

    return page.setContents(contents);
  })
  .then(() => {
    //seed the data with promises
    const createPage = models.Page.create({
      name: 'Employees',
    });

    //Use promise.all to create multiple entreies
    const createContents = Promise.all([
      models.Content.create({
        heading: 'MOE',
        text: 'CEO',
      }),
      models.Content.create({
        heading: 'LARRY',
        text: 'CTO',
      }),
      models.Content.create({
        heading: 'CURLY',
        text: 'COO',
      }),
    ]);

    return Promise.all([createPage, createContents]);
  })
  .then(([page, contents]) => {
    const [employee1, employee2, employee3] = contents;

    return page.setContents(contents);
  })
  .then(() => {
    console.log('DB Connected & Seeded');

    //dont start the app until the DB is running
    app.listen(port, () => console.log(`listening on port ${port}`));
  })
  .catch(e => {
    console.log('DB Not Connected');
    console.error(e);
  });
