const express = require('express');
const db = require('./db');

const app = express();
module.exports = app;

const renderPage = (tab, tabs) => {
  return `
      <html>
      <head>
        <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css' />
      </head>
      <body>

        <div class='container'>
        <h1>Acme Web</h1>
        <ul class='nav nav-tabs'>
          ${tabs
            .map(tab => {
              return `
              <li class='nav-item'>
                <a href='/pages/${tab.id}' class='nav-link'>
                ${tab.name}
                </a>
              </li>
            `;
            })
            .join('')}
        </ul>
        <div id = 'tabContent'>

        <h1>${tab.heading}</h1>
        <p>${tab.content}</p>

        </div>
      </div>
      </body>
      </html>
    `;
};

app.use((req, res, next) => {
  db.getTabs()
    .then(tabs => {
      req.tabs = tabs;
      next();
    })
    .catch(next);
});

//I had to add toStsing in order for the id value to generate
app.get('/', (req, res, next) => {
  const tab = req.tabs[0];
  res.redirect(`/pages/${tab.id}`);
});

app.get('/pages/:id', (req, res, next) => {
  db.getTab(req.params.id)
    .then(tab => res.send(renderPage(tab, req.tabs)))
    .catch(next);
});
