import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/auth.js'
import productRoutes from './routes/products.js'
import orderRoutes from './routes/orders.js'
import uploadRoutes from './routes/upload.js'
import { db } from './db/client.js'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001

const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173').split(',')

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true)
    cb(new Error('CORS engellendi'))
  },
  credentials: true,
}))

app.use(express.json())

// Yüklenen görseller için statik sunucu
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

// DB migrasyonu – eksik kolonları ekle (hata olursa zaten vardır)
async function migrateDB() {
  const migrations = [
    `ALTER TABLE catalog_products ADD COLUMN specs TEXT DEFAULT '[]'`,
    `ALTER TABLE products_meta ADD COLUMN name_override TEXT`,
    `ALTER TABLE products_meta ADD COLUMN brand_override TEXT`,
    `ALTER TABLE products_meta ADD COLUMN description_override TEXT`,
    `ALTER TABLE products_meta ADD COLUMN specs TEXT DEFAULT '[]'`,
    `ALTER TABLE products_meta ADD COLUMN deleted INTEGER DEFAULT 0`,
    `ALTER TABLE orders ADD COLUMN tracking_id TEXT`,
  ]
  for (const sql of migrations) {
    try { await db.execute(sql) } catch { /* kolon zaten var */ }
  }
}

migrateDB()
  .then(() => app.listen(PORT, () => console.log(`🚀 HKC API server running on port ${PORT}`)))
  .catch(err => { console.error('Migration hatası:', err); process.exit(1) })
