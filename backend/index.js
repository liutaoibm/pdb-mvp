const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { createLogger, LogLevel } = require('common-logging-lib');

// Create logger instance
const logger = createLogger({
  minLevel: LogLevel.DEBUG,
  defaultContext: {
    app: 'product-definition-builder-backend',
    version: '1.0.0'
  },
  console: {
    colorize: true,
    format: 'text'
  }
});

const app = express();
const port = process.env.PORT || 3000;

// Create and setup SQLite database
const dbPath = path.resolve(__dirname, 'database.sqlite');
let db = new sqlite3.Database(dbPath, async (err) => {
  if (err) {
    await logger.error('Database connection error', { error: err.message });
    return;
  }
  await logger.info('Database connected', { path: dbPath });
});

// Create table
db.run('CREATE TABLE products(id INTEGER PRIMARY KEY, name TEXT, description TEXT, price REAL)', async (err) => {
  if (err) {
    await logger.error('Table creation error', { error: err.message });
    return;
  }
  await logger.info('Products table created or already exists');
});

// Middleware to parse JSON
app.use(express.json());

// Request logging middleware
app.use(async (req, res, next) => {
  const start = Date.now();
  await logger.info('Request received', { 
    method: req.method,
    path: req.path,
    ip: req.ip
  });
  
  res.on('finish', async () => {
    const duration = Date.now() - start;
    await logger.info('Request completed', { 
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`
    });
  });
  
  next();
});

// Get all products
app.get('/products', async (req, res) => {
  db.all('SELECT * FROM products', [], async (err, rows) => {
    if (err) {
      await logger.error('Error fetching products', { error: err.message });
      res.status(400).send(err.message);
      return;
    }
    await logger.debug('Retrieved all products', { count: rows.length });
    res.json(rows);
  });
});

// Add a product
app.post('/products', async (req, res) => {
  const { name, description, price } = req.body;
  
  await logger.debug('Creating new product', { 
    name, 
    description: description ? description.substring(0, 30) + '...' : null,
    price 
  });
  
  db.run('INSERT INTO products(name, description, price) VALUES(?, ?, ?)', 
    [name, description, price], 
    async function(err) {
      if (err) {
        await logger.error('Error creating product', { 
          error: err.message,
          product: { name, price }
        });
        res.status(400).send(err.message);
        return;
      }
      
      await logger.info('Product created', { 
        productId: this.lastID,
        name
      });
      
      res.json({ id: this.lastID });
    }
  );
});

// Update a product
app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  
  await logger.debug('Updating product', { id, name, price });
  
  db.run(
    'UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?',
    [name, description, price, id],
    async function(err) {
      if (err) {
        await logger.error('Error updating product', { 
          error: err.message,
          productId: id
        });
        res.status(400).send(err.message);
        return;
      }
      
      if (this.changes === 0) {
        await logger.warn('Product update attempted but no changes made', { productId: id });
      } else {
        await logger.info('Product updated', { 
          productId: id,
          changes: this.changes
        });
      }
      
      res.json({ changes: this.changes });
    }
  );
});

// Delete a product
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  
  await logger.debug('Deleting product', { id });
  
  db.run('DELETE FROM products WHERE id = ?', id, async function(err) {
    if (err) {
      await logger.error('Error deleting product', { 
        error: err.message,
        productId: id
      });
      res.status(400).send(err.message);
      return;
    }
    
    if (this.changes === 0) {
      await logger.warn('Product deletion attempted but no changes made', { productId: id });
    } else {
      await logger.info('Product deleted', { 
        productId: id,
        changes: this.changes
      });
    }
    
    res.json({ changes: this.changes });
  });
});

// API endpoints (duplicated functionality with different path)
app.get('/api/products', async (req, res) => {
  await logger.debug('API: Fetching all products');
  
  db.all('SELECT * FROM products', [], async (err, rows) => {
    if (err) {
      await logger.error('API: Error fetching products', { error: err.message });
      res.status(400).send(err.message);
      return;
    }
    
    await logger.debug('API: Retrieved all products', { count: rows.length });
    res.json(rows);
  });
});

app.post('/api/products', async (req, res) => {
  const { name, description, price } = req.body;
  
  await logger.debug('API: Creating new product', { 
    name, 
    description: description ? description.substring(0, 30) + '...' : null,
    price 
  });
  
  db.run('INSERT INTO products(name, description, price) VALUES(?, ?, ?)', 
    [name, description, price], 
    async function (err) {
      if (err) {
        await logger.error('API: Error creating product', { 
          error: err.message,
          product: { name, price }
        });
        res.status(400).send(err.message);
        return;
      }
      
      await logger.info('API: Product created', { 
        productId: this.lastID,
        name
      });
      
      res.json({ id: this.lastID });
    }
  );
});

app.listen(port, async () => {
  await logger.info('Server started', { 
    port,
    environment: process.env.NODE_ENV || 'development', 
    dbPath
  });
});

// Handle process shutdown
process.on('SIGINT', async () => {
  await logger.info('Application shutting down');
  await logger.close();
  process.exit(0);
});

process.on('uncaughtException', async (error) => {
  await logger.error('Uncaught exception', { 
    error: error.message,
    stack: error.stack
  });
  await logger.close();
  process.exit(1);
});
