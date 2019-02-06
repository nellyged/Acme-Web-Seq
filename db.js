//on your Prof solution client was place in {} like an object when declared at the top of the file .... why?
const pg = require('pg');
const client = new pg.Client('postgres://localhost/acme_users_db');

client.connect();

//check if the table is there already, if so then drop then recreate
const SEED = `
DROP TABLE IF EXISTS things;
DROP TABLE IF EXISTS tabs;
  CREATE TABLE tabs(
    id SERIAL PRIMARY KEY,
    name varchar(100)
  );
  CREATE TABLE things(
    id SERIAL PRIMARY KEY,
    heading varchar(100),
    content varchar(100),
    tab_id integer references tabs(id)
  );
  INSERT INTO tabs(name) values('Home');
  INSERT INTO tabs(name) values('Employees');
  INSERT INTO tabs(name) values('Contact');

  INSERT INTO things(heading,content,tab_id) values ('Welcome to the Home Page','So looking forward to having you browser our site',1);

  INSERT INTO things(heading,content,tab_id) values ('Moe','Moe is our CEO!!!',2);
  INSERT INTO things(heading,content,tab_id) values ('Larry','Larry is our CTO!!!',2);
  INSERT INTO things(heading,content,tab_id) values ('Curly','Curly is our COO!!!',2);

  INSERT INTO things(heading,content,tab_id) values ('Phone','calls us 212-555-1212',3);
  INSERT INTO things(heading,content,tab_id) values ('Fax','fax us 212-555-1212',3);`;

//we should have a catch here .... right? Why does adding a cath in the db file give me errors when getting the data
const getUsers = () => {
  return client.query('SELECT * FROM users;').then(response => response.rows);
};

const getUser = id => {
  return client
    .query('SELECT * FROM users WHERE id = $1;', [id])
    .then(response => response.rows[0]);
};

const getTabs = () => {
  return client.query('SELECT * FROM tabs').then(response => response.rows);
};

const getTab = id => {
  return client
    .query('SELECT * FROM tabs WHERE tabs.id = $1;', [id])
    .then(response => response.rows[0]);
};

const getThings = id => {
  return client
    .query(
      'SELECT * FROM tabs inner join things on tabs.id = things.tab_id WHERE tabs.id = $1;',
      [id]
    )
    .then(response => response.rows);
};

const sync = () => {
  return client.query(SEED);
};

//Testing that my sync function works fine
//sync();
//getUsers();
//getUser(1);

module.exports = {
  getUsers,
  getUser,
  sync,
  getTab,
  getTabs,
  getThings,
};
