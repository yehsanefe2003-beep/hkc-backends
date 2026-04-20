import { db } from './client.js'

async function migrate() {
  console.log('Running migrations...')
  try {
    await db.execute('ALTER TABLE catalog_products ADD COLUMN images TEXT DEFAULT \'[]\'')
    console.log('✅ images column added to catalog_products')
  } catch (e) {
    if (e.message.includes('duplicate column')) {
      console.log('ℹ️  images column already exists, skipping.')
    } else {
      console.log('ℹ️  Skipped:', e.message)
    }
  }
  console.log('Migration complete.')
  process.exit(0)
}

migrate().catch(err => { console.error(err); process.exit(1) })
