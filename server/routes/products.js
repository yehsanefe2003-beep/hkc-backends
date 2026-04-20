import { Router } from 'express'
import { db } from '../db/client.js'
import { adminMiddleware } from '../middleware/auth.js'

const router = Router()

// GET tüm fiyatlar (static products için) — PUBLIC
router.get('/prices', async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM products_meta')
    const map = {}
    result.rows.forEach(r => {
      map[r.product_id] = {
        price: Number(r.price),
        stock: Number(r.stock),
        active: Number(r.active),
        name_override: r.name_override || null,
        brand_override: r.brand_override || null,
        description_override: r.description_override || null,
        specs: r.specs || '[]',
        deleted: Number(r.deleted || 0),
      }
    })
    res.json(map)
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatası.' })
  }
})

// POST bulk upsert — ADMIN
router.post('/bulk', adminMiddleware, async (req, res) => {
  try {
    const { products } = req.body
    for (const p of products) {
      await db.execute({
        sql: `INSERT INTO products_meta (product_id, price, stock, active)
              VALUES (?, ?, ?, ?)
              ON CONFLICT(product_id) DO UPDATE SET price = ?, stock = ?, active = ?`,
        args: [p.id, p.price ?? 0, p.stock ?? 100, p.active ?? 1, p.price ?? 0, p.stock ?? 100, p.active ?? 1],
      })
    }
    res.json({ success: true, count: products.length })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Sunucu hatası.' })
  }
})

// GET public storefront catalog products — PUBLIC (no auth)
router.get('/storefront', async (req, res) => {
  try {
    const { category } = req.query
    let sql = 'SELECT * FROM catalog_products WHERE active = 1'
    const args = []
    if (category) { sql += ' AND category = ?'; args.push(category) }
    sql += ' ORDER BY created_at DESC'
    const result = await db.execute({ sql, args })
    res.json(result.rows.map(r => ({
      id: `cat-${Number(r.id)}`,
      name: r.name,
      brand: r.brand || '',
      category: r.category,
      description: r.description || '',
      price: Number(r.price),
      stock: Number(r.stock),
      image: r.image_url || '',
      images: (() => { try { return JSON.parse(r.images || '[]') } catch { return r.image_url ? [r.image_url] : [] } })(),
      specs: (() => { try { return JSON.parse(r.specs || '[]') } catch { return [] } })(),
    })))
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Sunucu hatası.' })
  }
})

// GET single catalog product — PUBLIC
router.get('/storefront/:id', async (req, res) => {
  try {
    const numId = req.params.id.replace('cat-', '')
    const result = await db.execute({ sql: 'SELECT * FROM catalog_products WHERE id = ? AND active = 1', args: [numId] })
    if (result.rows.length === 0) return res.status(404).json({ error: 'Ürün bulunamadı.' })
    const r = result.rows[0]
    res.json({
      id: `cat-${Number(r.id)}`,
      name: r.name,
      brand: r.brand || '',
      category: r.category,
      description: r.description || '',
      price: Number(r.price),
      stock: Number(r.stock),
      image: r.image_url || '',
      images: (() => { try { return JSON.parse(r.images || '[]') } catch { return r.image_url ? [r.image_url] : [] } })(),
      specs: (() => { try { return JSON.parse(r.specs || '[]') } catch { return [] } })(),
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Sunucu hatası.' })
  }
})

// ─── CATALOG (Admin yönetimli ürünler) ───────────────────────────────────────

// GET tüm katalog ürünleri — ADMIN
router.get('/catalog', adminMiddleware, async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM catalog_products ORDER BY created_at DESC')
    res.json(result.rows.map(r => ({
      ...r,
      id: Number(r.id),
      price: Number(r.price),
      stock: Number(r.stock),
      active: Number(r.active),
    })))
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Sunucu hatası.' })
  }
})

// POST yeni katalog ürünü — ADMIN
router.post('/catalog', adminMiddleware, async (req, res) => {
  try {
    const { name, brand, category, description, price, stock, image_url, images, active, specs } = req.body
    if (!name) return res.status(400).json({ error: 'Ürün adı zorunludur.' })

    const result = await db.execute({
      sql: `INSERT INTO catalog_products (name, brand, category, description, price, stock, image_url, images, active, specs)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        name,
        brand || '',
        category || 'makineler',
        description || '',
        price ?? 0,
        stock ?? 100,
        image_url || '',
        images || '[]',
        active != null ? (active ? 1 : 0) : 1,
        specs || '[]',
      ],
    })
    res.status(201).json({ success: true, id: Number(result.lastInsertRowid) })
  } catch (err) {
    console.error('CREATE CATALOG ERROR:', err)
    res.status(500).json({ error: 'Sunucu hatası: ' + err.message })
  }
})

// PUT katalog ürünü güncelle — ADMIN
router.put('/catalog/:id', adminMiddleware, async (req, res) => {
  try {
    const { name, brand, category, description, price, stock, image_url, images, active, specs } = req.body
    await db.execute({
      sql: `UPDATE catalog_products SET name=?, brand=?, category=?, description=?, price=?, stock=?, image_url=?, images=?, active=?, specs=? WHERE id=?`,
      args: [
        name,
        brand || '',
        category || 'makineler',
        description || '',
        price ?? 0,
        stock ?? 100,
        image_url || '',
        images || '[]',
        active != null ? (active ? 1 : 0) : 1,
        specs || '[]',
        req.params.id,
      ],
    })
    res.json({ success: true })
  } catch (err) {
    console.error('UPDATE CATALOG ERROR:', err)
    res.status(500).json({ error: 'Sunucu hatası: ' + err.message })
  }
})

// DELETE katalog ürünü — ADMIN
router.delete('/catalog/:id', adminMiddleware, async (req, res) => {
  try {
    const numId = Number(req.params.id)
    if (!numId) return res.status(400).json({ error: 'Geçersiz ürün ID.' })
    await db.execute({ sql: 'DELETE FROM catalog_products WHERE id = ?', args: [numId] })
    res.json({ success: true })
  } catch (err) {
    console.error('DELETE CATALOG ERROR:', err)
    res.status(500).json({ error: 'Sunucu hatası: ' + err.message })
  }
})

// PUT statik ürün meta güncelle — ADMIN (en sona alındı, /catalog/:id ile çakışmasın)
router.put('/:id', adminMiddleware, async (req, res) => {
  try {
    const { price, stock, active, name_override, brand_override, description_override, specs, deleted } = req.body
    await db.execute({
      sql: `INSERT INTO products_meta (product_id, price, stock, active, name_override, brand_override, description_override, specs, deleted)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(product_id) DO UPDATE SET
              price = ?, stock = ?, active = ?,
              name_override = ?, brand_override = ?, description_override = ?, specs = ?, deleted = ?`,
      args: [
        req.params.id, price ?? 0, stock ?? 100, active ?? 1,
        name_override || null, brand_override || null, description_override || null, specs || '[]', deleted ?? 0,
        price ?? 0, stock ?? 100, active ?? 1,
        name_override || null, brand_override || null, description_override || null, specs || '[]', deleted ?? 0,
      ],
    })
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Sunucu hatası.' })
  }
})

export default router
