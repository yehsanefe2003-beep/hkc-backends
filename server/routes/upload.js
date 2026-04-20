import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { adminMiddleware } from '../middleware/auth.js'

const router = Router()

// Yükleme klasörü
const uploadDir = path.resolve('uploads')
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

// Multer yapılandırması
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    const name = `${Date.now()}_${Math.random().toString(36).slice(2)}${ext}`
    cb(null, name)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
    const ext = path.extname(file.originalname).toLowerCase()
    if (allowed.includes(ext)) cb(null, true)
    else cb(new Error('Sadece resim dosyaları yüklenebilir.'))
  },
})

// POST /api/upload — max 5 dosya
router.post('/', adminMiddleware, upload.array('images', 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'Dosya seçilmedi.' })
  }
  const BASE = process.env.SERVER_URL || `http://localhost:${process.env.PORT || 3001}`
  const urls = req.files.map(f => `${BASE}/uploads/${f.filename}`)
  res.json({ urls })
})

// DELETE /api/upload/:filename — dosya sil
router.delete('/:filename', adminMiddleware, (req, res) => {
  const filePath = path.join(uploadDir, path.basename(req.params.filename))
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
  res.json({ success: true })
})

export default router
