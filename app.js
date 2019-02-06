//I was going to attmept a solition where I built buttons as the tabs but the document object was not avaliable -- why is that the case?
const express = require('express');
const db = require('./db');

const app = express();
module.exports = app;

const renderPage = (tab, tabs, things) => {
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
        ${things
          .map(page => {
            return `<h1> ${page.heading} </h1>
          <p> ${page.content} </p>`;
          })
          .join('')}
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
  let tab, things;
  db.getTab(req.params.id)
    .then(gotTab => {
      tab = gotTab;
      console.log(gotTab);
    })
    //.catch(ex => console.log(ex));
    .then(
      db.getThings(req.params.id).then(gotThings => {
        res.send(renderPage(tab, req.tabs, gotThings));
        //console.log(things);
      })
    )
    .catch(ex => console.log(ex));
});
