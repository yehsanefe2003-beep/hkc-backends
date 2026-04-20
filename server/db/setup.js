import { db } from './client.js'

async function setup() {
  console.log('Setting up database tables...')

  await db.executeMultiple(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS products_meta (
      product_id TEXT PRIMARY KEY,
      price REAL DEFAULT 0,
      stock INTEGER DEFAULT 100,
      active INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      items TEXT NOT NULL,
      total_amount REAL DEFAULT 0,
      status TEXT DEFAULT 'pending',
      customer_name TEXT,
      customer_email TEXT,
      phone TEXT,
      shipping_address TEXT,
      note TEXT,
      payment_method TEXT DEFAULT 'credit_card',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS catalog_products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      brand TEXT,
      category TEXT DEFAULT 'makineler',
      description TEXT,
      price REAL DEFAULT 0,
      stock INTEGER DEFAULT 100,
      image_url TEXT,
      active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)

  console.log('✅ Tables created successfully!')
  console.log('Database is ready.')
  process.exit(0)
}

setup().catch((err) => {
  console.error('❌ Setup failed:', err)
  process.exit(1)
})
