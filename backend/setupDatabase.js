const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Path to the SQLite database
const dbPath = path.resolve(__dirname, 'database.sqlite');

// Create and setup SQLite database
let db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log(`Connected to the SQLite database at ${dbPath}.`);
});

// Create table schema
db.run('CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY, name TEXT, description TEXT, price REAL)', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Created products table.');
  }
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Closed the database connection.');
  });
});
