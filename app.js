const express = require('express');
const { models } = require('./db');
const app = express();
module.exports = app;

// app.get('/', (req, res, next) => {
//   //returns a promise from the db
//   models.Content.findAll()
//     .then(contents => {
//       res.send({
//         contents: contents.map(({ heading, text }) => ({ heading, text })),
//       });
//     })
//     .catch(next);
// });

app.use((req, res, next) => {
  models.Page.findAll()
    .then(pages => {
      req.pages = pages;
      next();
    })
    .catch(next);
});

app.get('/', (req, res, next) => {
  const page = req.pages[0];
  res.redirect(`/pages/${page.id}`);
});

app.get('/pages/:id', (req, res, next) => {
  let pageWithContent;
  models.Page.findByPk(
    parseInt(req.params.id, 10),
    //this is grabbing all the contents asscoiated with this page
    { include: [models.Content] }
  )
    .then(pageFromDb => {
      pageWithContent = pageFromDb;
      if (!pageWithContent) res.sendStatus(404);
      const { name, contents } = pageWithContent;

      //res.send(contents);

      res.send(renderPage(name, req.pages, contents));
    })
    .catch(ex => console.log(ex));
});

const renderPage = (page, pages, contents) => {
  return `
      <html>
      <head>
        <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css' />
      </head>
      <body>
        <div class='container'>
        <h1>Acme Web</h1>
        <h1>${page}</h1>
        <ul class='nav nav-tabs'>
          ${pages
            .map(page => {
              return `
              <li class='nav-item'>
                <a href='/pages/${page.id}' class='nav-link'>
                ${page.name}
                </a>
              </li>
            `;
            })
            .join('')}
        </ul>
        <div id = 'tabContent'>
        ${contents
          .map(content => {
            return `<p> ${content.heading} <br> ${content.text} </p>`;
          })
          .join('')}
        </div>
      </div>
      </body>
      </html>
    `;
};
