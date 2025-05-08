const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3000;

// Create and setup SQLite database
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

// Create table
db.run('CREATE TABLE products(id INTEGER PRIMARY KEY, name TEXT, description TEXT, price REAL)', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Created products table.');
});

// Middleware to parse JSON
app.use(express.json());

// Get all products
app.get('/products', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) {
      res.status(400).send(err.message);
      return;
    }
    res.json(rows);
  });
});

// Add a product
app.post('/products', (req, res) => {
  const { name, description, price } = req.body;
  db.run('INSERT INTO products(name, description, price) VALUES(?, ?, ?)', [name, description, price], function(err) {
    if (err) {
      res.status(400).send(err.message);
      return;
    }
    res.json({ id: this.lastID });
  });
});

// Update a product
app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  db.run('UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?', [name, description, price, id], function(err) {
    if (err) {
      res.status(400).send(err.message);
      return;
    }
    res.json({ changes: this.changes });
  });
});

// Delete a product
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM products WHERE id = ?', id, function(err) {
    if (err) {
      res.status(400).send(err.message);
      return;
    }
    res.json({ changes: this.changes });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
