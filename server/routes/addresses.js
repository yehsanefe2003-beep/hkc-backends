import express from 'express'
import { db } from '../db/client.js'
import { authMiddleware } from '../middleware/auth.js'

const router = express.Router()

router.use(authMiddleware)

// Get all addresses for the logged in user
router.get('/', async (req, res) => {
  try {
    const result = await db.execute({
      sql: 'SELECT * FROM addresses WHERE user_id = ? ORDER BY created_at DESC',
      args: [req.user.id]
    })
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching addresses:', error)
    res.status(500).json({ error: 'Adresler getirilemedi.' })
  }
})

// Create a new address
router.post('/', async (req, res) => {
  try {
    const { title, full_name, phone, address, city, district } = req.body
    
    if (!title || !full_name || !phone || !address || !city || !district) {
      return res.status(400).json({ error: 'Tüm alanları doldurunuz.' })
    }

    const result = await db.execute({
      sql: `INSERT INTO addresses (user_id, title, full_name, phone, address, city, district) 
            VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *`,
      args: [req.user.id, title, full_name, phone, address, city, district]
    })
    
    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Error creating address:', error)
    res.status(500).json({ error: 'Adres eklenemedi.' })
  }
})

// Update an existing address
router.put('/:id', async (req, res) => {
  try {
    const { title, full_name, phone, address, city, district } = req.body
    const id = req.params.id

    // Check ownership
    const check = await db.execute({
      sql: 'SELECT * FROM addresses WHERE id = ? AND user_id = ?',
      args: [id, req.user.id]
    })

    if (check.rows.length === 0) {
      return res.status(404).json({ error: 'Adres bulunamadı veya yetkiniz yok.' })
    }

    await db.execute({
      sql: `UPDATE addresses 
            SET title = ?, full_name = ?, phone = ?, address = ?, city = ?, district = ?
            WHERE id = ? AND user_id = ?`,
      args: [title, full_name, phone, address, city, district, id, req.user.id]
    })

    res.json({ success: true })
  } catch (error) {
    console.error('Error updating address:', error)
    res.status(500).json({ error: 'Adres güncellenemedi.' })
  }
})

// Delete an address
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    
    const result = await db.execute({
      sql: 'DELETE FROM addresses WHERE id = ? AND user_id = ?',
      args: [id, req.user.id]
    })

    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Adres bulunamadı veya yetkiniz yok.' })
    }

    res.json({ success: true })
  } catch (error) {
    console.error('Error deleting address:', error)
    res.status(500).json({ error: 'Adres silinemedi.' })
  }
})

export default router
