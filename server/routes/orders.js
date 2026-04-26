import { Router } from 'express'
import { db } from '../db/client.js'
import { authMiddleware, adminMiddleware } from '../middleware/auth.js'

const router = Router()

// Sipariş oluştur (giriş yapılmış kullanıcı)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { items, shipping_address, phone, note } = req.body
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Sepet boş.' })
    }

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    // Stok kontrolü ve düşme
    for (const item of items) {
      const meta = await db.execute({
        sql: 'SELECT stock FROM products_meta WHERE product_id = ?',
        args: [item.id],
      })
      if (meta.rows.length > 0 && meta.rows[0].stock < item.quantity) {
        return res.status(400).json({ error: `"${item.name}" için yeterli stok yok.` })
      }
      if (meta.rows.length > 0) {
        await db.execute({
          sql: 'UPDATE products_meta SET stock = stock - ? WHERE product_id = ?',
          args: [item.quantity, item.id],
        })
      }
    }

    const result = await db.execute({
      sql: `INSERT INTO orders (user_id, items, total_amount, customer_name, customer_email, phone, shipping_address, note)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        req.user.id,
        JSON.stringify(items),
        total,
        req.user.full_name,
        req.user.email,
        phone || '',
        shipping_address || '',
        note || '',
      ],
    })

    res.status(201).json({ success: true, orderId: Number(result.lastInsertRowid), total })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Sunucu hatası.' })
  }
})

// Kullanıcının kendi siparişleri
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const result = await db.execute({
      sql: 'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      args: [req.user.id],
    })
    const orders = result.rows.map(o => ({ ...o, items: JSON.parse(o.items) }))
    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatası.' })
  }
})

// Admin: Tüm siparişler
router.get('/', adminMiddleware, async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM orders ORDER BY created_at DESC')
    const orders = result.rows.map(o => ({ ...o, items: JSON.parse(o.items) }))
    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatası.' })
  }
})

// Admin: Sipariş durumu güncelle
router.put('/:id/status', adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body
    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']
    if (!validStatuses.includes(status)) return res.status(400).json({ error: 'Geçersiz durum.' })

    await db.execute({
      sql: 'UPDATE orders SET status = ? WHERE id = ?',
      args: [status, req.params.id],
    })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatası.' })
  }
})

// Admin: Siparişi tamamen sil
router.delete('/:id', adminMiddleware, async (req, res) => {
  try {
    await db.execute({
      sql: 'DELETE FROM orders WHERE id = ?',
      args: [req.params.id],
    })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Sipariş silinemedi.' })
  }
})

// Admin: PTT AVM Barkod Oluştur
router.post('/:id/ptt-barcode', adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params
    // Parametre veya çevre değişkenden depo ID. Örnek dokümandan varsayılan
    const warehouse_id = req.body.warehouse_id || process.env.PTT_WAREHOUSE_ID || 100301619
    
    let authHeader = process.env.PTT_AUTH;
    if (!authHeader && process.env.PTT_USERNAME && process.env.PTT_PASSWORD) {
       authHeader = 'Basic ' + Buffer.from(process.env.PTT_USERNAME + ':' + process.env.PTT_PASSWORD).toString('base64');
    }
    
    if (!authHeader) {
      return res.status(401).json({ error: 'PTT API Kimlik bilgileri .env dosyasında bulunamadı (PTT_USERNAME ve PTT_PASSWORD)' })
    }

    const pttOrderId = `PTT-0BO${id}M672N-180925`

    const body = {
      orders: [
        {
          order_id: pttOrderId,
          warehouse_id: Number(warehouse_id)
        }
      ]
    }

    const response = await fetch('https://shipment.pttavm.com/api/v1/create-barcode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify(body)
    })

    const data = await response.json()

    if (data.success && data.tracking_id) {
      // Veritabanına kaydet
      await db.execute({
        sql: 'UPDATE orders SET tracking_id = ? WHERE id = ?',
        args: [data.tracking_id, id],
      })
      res.json({ success: true, tracking_id: data.tracking_id, code: data.code, message: data.message })
    } else {
      res.status(400).json({ error: data.message || 'PTT API isteği başarsız oldu (422)' })
    }
  } catch (err) {
    console.error('PTT API Error:', err)
    res.status(500).json({ error: 'Barkod oluşturulamadı: ' + err.message })
  }
})

// Admin: İstatistikler
router.get('/admin/stats', adminMiddleware, async (req, res) => {
  try {
    const [ordersRes, usersRes, revenueRes, pendingRes] = await Promise.all([
      db.execute('SELECT COUNT(*) as count FROM orders'),
      db.execute('SELECT COUNT(*) as count FROM users WHERE role = "user"'),
      db.execute('SELECT SUM(total_amount) as total FROM orders WHERE status != "cancelled"'),
      db.execute('SELECT COUNT(*) as count FROM orders WHERE status = "pending"'),
    ])

    res.json({
      totalOrders: Number(ordersRes.rows[0].count),
      totalUsers: Number(usersRes.rows[0].count),
      totalRevenue: Number(revenueRes.rows[0].total || 0),
      pendingOrders: Number(pendingRes.rows[0].count),
    })
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatası.' })
  }
})

export default router
