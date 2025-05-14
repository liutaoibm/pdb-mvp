const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { createLogger, LogLevel } = require('common-logging-lib');

// Create logger instance
const logger = createLogger({
  minLevel: LogLevel.DEBUG,
  defaultContext: {
    app: 'product-definition-builder-db-setup',
    version: '1.0.0'
  },
  console: {
    colorize: true,
    format: 'text'
  }
});

// Path to the SQLite database
const dbPath = path.resolve(__dirname, 'database.sqlite');

// Create and setup SQLite database
let db = new sqlite3.Database(dbPath, async (err) => {
  if (err) {
    await logger.error('Database connection error', { error: err.message });
    process.exit(1);
  }
  await logger.info('Database connected', { path: dbPath });
});

// Create table schema
db.run('CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY, name TEXT, description TEXT, price REAL)', async (err) => {
  if (err) {
    await logger.error('Table creation error', { error: err.message });
    await logger.close();
    process.exit(1);
  } else {
    await logger.info('Products table created or verified');
  }
  
  db.close(async (err) => {
    if (err) {
      await logger.error('Error closing database', { error: err.message });
    } else {
      await logger.info('Database connection closed');
    }
    await logger.close();
  });
});

// Handle unexpected errors
process.on('uncaughtException', async (error) => {
  await logger.error('Uncaught exception', { 
    error: error.message,
    stack: error.stack
  });
  await logger.close();
  process.exit(1);
});
