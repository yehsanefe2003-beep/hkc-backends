import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useCart } from '../contexts/CartContext.jsx'
import { api } from '../lib/api.js'
import staticProducts from '../shared/products.js'
import { invalidateCatalogCache } from '../hooks/useCatalogProducts.js'

const CATEGORIES = [
  { value: 'makineler', label: '⚙️ Makineler' },
  { value: 'el-aletleri', label: '🔧 El Aletleri' },
  { value: 'hirdavat', label: '🔩 Hırdavat' },
  { value: 'bataryalar', label: '🚿 Bataryalar (Musluk)' },
]

const STATUS_LABELS = {
  pending:   { label: 'Beklemede',     color: 'bg-yellow-100 text-yellow-800' },
  confirmed: { label: 'Onaylandı',     color: 'bg-blue-100 text-blue-800' },
  shipped:   { label: 'Kargoda',       color: 'bg-purple-100 text-purple-800' },
  delivered: { label: 'Teslim Edildi', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'İptal Edildi',  color: 'bg-red-100 text-red-800' },
}

function fmt(n) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(n)
}

function resolveImg(src) {
  if (!src) return ''
  if (src.startsWith('http') || src.startsWith('//')) return src
  return encodeURI(src.startsWith('/') ? src : `/${src}`)
}

// ─── Statik Ürün Fiyat Satırı ────────────────────────────────────────────────
function PriceRow({ item, meta = {}, onEdit, onDelete }) {

  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${meta.active === 0 ? 'opacity-50 bg-gray-50' : 'bg-white hover:border-primary-200'}`}>
      <div className="w-10 h-10 rounded-lg border bg-gray-50 flex-shrink-0 flex items-center justify-center overflow-hidden">
        {item.image ? (
          <img src={resolveImg(item.image)} alt={meta.name_override || item.name} className="max-w-full max-h-full object-contain" onError={e => { e.currentTarget.style.display = 'none' }} />
        ) : <span className="text-gray-400 text-xs font-bold">{(meta.name_override || item.name)?.charAt(0)}</span>}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-900 line-clamp-1">{meta.name_override || item.name}</p>
        <div className="flex gap-1 mt-0.5 flex-wrap">
          {(meta.brand_override || item.brand) && <span className="text-xs px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded">{meta.brand_override || item.brand}</span>}
          <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">{item.category}</span>
          <span className="text-xs px-1.5 py-0.5 bg-gray-200 text-gray-400 rounded">Statik</span>
          {meta.active === 0 && <span className="text-xs px-1.5 py-0.5 bg-red-50 text-red-400 rounded">Pasif</span>}
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="text-right">
          <p className="text-sm font-bold text-primary-600">{meta.price > 0 ? fmt(meta.price) : <span className="text-gray-400 font-normal text-xs">Fiyatsız</span>}</p>
          <p className="text-xs text-gray-400">Stok: {meta.stock ?? '—'}</p>
        </div>
        <button onClick={() => onEdit(item)} className="px-3 py-1.5 border text-xs rounded hover:bg-gray-50 hover:border-primary-300 transition-colors">✏️ Düzenle</button>
        <button onClick={() => onDelete(item.id)} className="px-3 py-1.5 border border-red-200 text-red-500 text-xs rounded hover:bg-red-50 transition-colors">🗑️ Sil</button>
      </div>
    </div>
  )
}

// ─── Özellikler Düzenleyici ─────────────────────────────────────────────────
function SpecsEditor({ specs, onChange }) {
  const [newSpec, setNewSpec] = useState('')
  function add(e) {
    if (e) e.preventDefault()
    if (!newSpec.trim()) return
    onChange([...specs, newSpec.trim()])
    setNewSpec('')
  }
  function remove(idx) {
    onChange(specs.filter((_, i) => i !== idx))
  }
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Teknik Özellikler</label>
      <div className="flex gap-2">
        <input value={newSpec} onChange={e => setNewSpec(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add(e)}
          placeholder="Örn: 18V Kömürsüz Motor"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
        <button type="button" onClick={add} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium border border-gray-300">Ekle</button>
      </div>
      {specs.length > 0 && (
        <ul className="space-y-1.5 mt-2">
          {specs.map((s, i) => (
            <li key={i} className="flex items-center justify-between px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm">
              <span className="text-gray-700">• {s}</span>
              <button type="button" onClick={() => remove(i)} className="text-red-500 hover:text-red-700 text-xs font-bold px-2 py-1">Sil</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ─── Statik Ürün Fiyat/Stok Düzenleme Formu ─────────────────────────────────
function StaticEditPanel({ item, meta = {}, onSave, onCancel }) {
  const initSpecs = () => { try { return JSON.parse(meta.specs || '[]') } catch { return [] } }
  const [form, setForm] = useState({
    price: meta.price ?? 0,
    stock: meta.stock ?? 100,
    active: meta.active ?? 1,
    name_override: meta.name_override || '',
    brand_override: meta.brand_override || '',
    description_override: meta.description_override || '',
  })
  const [specs, setSpecs] = useState(initSpecs)
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    await onSave(item.id, {
      price: parseFloat(form.price) || 0,
      stock: parseInt(form.stock) || 0,
      active: form.active ? 1 : 0,
      name_override: form.name_override || null,
      brand_override: form.brand_override || null,
      description_override: form.description_override || null,
      specs: JSON.stringify(specs)
    })
    setSaving(false)
  }

  return (
    <div className="bg-white border-2 border-primary-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 rounded-xl border bg-gray-50 flex-shrink-0 overflow-hidden flex items-center justify-center">
          {item.image ? (
            <img src={resolveImg(item.image)} alt={item.name} className="max-w-full max-h-full object-contain" onError={e => { e.currentTarget.style.display = 'none' }} />
          ) : <span className="text-gray-300 text-2xl font-bold">{item.name?.charAt(0)}</span>}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-gray-900">✏️ Ürün Düzenle</h2>
          <p className="text-sm text-gray-600 line-clamp-1 mt-0.5">{item.name}</p>
          <div className="flex gap-1 mt-1 flex-wrap">
            {item.brand && <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded">{item.brand}</span>}
            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded">{item.category}</span>
            <span className="text-xs px-2 py-0.5 bg-amber-50 text-amber-600 rounded">Statik Ürün</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400 mb-4 border-l-2 border-primary-200 pl-3">
        Statik ürününüzün adını, markasını ve açıklamasını buradan web sitesine özel değiştirebilir ve teknik özellik ekleyebilirsiniz.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Yeni Ürün Adı</label>
            <input value={form.name_override} onChange={e => setForm(f => ({ ...f, name_override: e.target.value }))}
              placeholder={item.name}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Yeni Marka</label>
            <input value={form.brand_override} onChange={e => setForm(f => ({ ...f, brand_override: e.target.value }))}
              placeholder={item.brand}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fiyat (₺)</label>
            <input type="number" min="0" step="0.01" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Yeni Açıklama</label>
            <textarea value={form.description_override} onChange={e => setForm(f => ({ ...f, description_override: e.target.value }))}
              placeholder={item.description || "Varsayılan açıklama..."} rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stok</label>
            <input type="number" min="0" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input type="checkbox" checked={!!form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} />
              Sitede aktif göster
            </label>
          </div>
        </div>
        <div className="border-t pt-4">
          <SpecsEditor specs={specs} onChange={setSpecs} />
        </div>
        <div className="flex gap-3 mt-4">
          <button type="submit" disabled={saving}
            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-60">
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
          <button type="button" onClick={onCancel} className="px-5 py-2.5 border rounded-lg hover:bg-gray-50">İptal</button>
        </div>
      </form>
    </div>
  )
}

// ─── Katalog Ürün Satırı (edit + delete) ────────────────────────────────────
function CatalogRow({ item, onEdit, onDelete }) {
  let imgs = []
  try { imgs = JSON.parse(item.images || '[]') } catch {}
  const mainImg = imgs[0] || item.image_url

  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all bg-white hover:border-primary-200 ${item.active === 0 ? 'opacity-50' : ''}`}>
      <div className="w-10 h-10 rounded-lg border bg-gray-50 flex-shrink-0 flex items-center justify-center overflow-hidden">
        {mainImg ? (
          <img src={mainImg} alt={item.name} className="max-w-full max-h-full object-contain" onError={e => { e.currentTarget.style.display = 'none' }} />
        ) : <span className="text-gray-400 text-xs font-bold">{item.name?.charAt(0)}</span>}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-900 line-clamp-1">{item.name}</p>
        <div className="flex gap-1 mt-0.5 flex-wrap">
          {item.brand && <span className="text-xs px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded">{item.brand}</span>}
          <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">
            {CATEGORIES.find(c => c.value === item.category)?.label || item.category}
          </span>
          <span className="text-xs px-1.5 py-0.5 bg-green-50 text-green-600 rounded">Eklenen</span>
          {item.active === 0 && <span className="text-xs px-1.5 py-0.5 bg-red-50 text-red-400 rounded">Pasif</span>}
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="text-right">
          <p className="text-sm font-bold text-primary-600">{item.price > 0 ? fmt(item.price) : <span className="text-gray-400 font-normal text-xs">Fiyatsız</span>}</p>
          <p className="text-xs text-gray-400">Stok: {item.stock}</p>
        </div>
        <button onClick={() => onEdit(item)} className="px-3 py-1.5 border text-xs rounded hover:bg-gray-50 hover:border-primary-300 transition-colors">✏️ Düzenle</button>
        <button onClick={() => onDelete(item.id)} className="px-3 py-1.5 border border-red-200 text-red-500 text-xs rounded hover:bg-red-50 transition-colors">🗑️ Sil</button>
      </div>
    </div>
  )
}

// ─── Çoklu Resim Yükleyici ──────────────────────────────────────────────────
function ImageUploader({ images, onChange }) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  async function handleFiles(files) {
    if (!files || files.length === 0) return
    const remaining = 5 - images.length
    if (remaining <= 0) return alert('En fazla 5 resim eklenebilir.')
    const toUpload = Array.from(files).slice(0, remaining)
    setUploading(true)
    try {
      const urls = await api.uploadImages(toUpload)
      onChange([...images, ...urls])
    } catch (err) {
      alert('Yükleme hatası: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  function remove(url) { onChange(images.filter(u => u !== url)) }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Ürün Resimleri <span className="text-gray-400 font-normal">(en fazla 5 adet)</span>
      </label>
      {images.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {images.map((url, i) => (
            <div key={url} className="relative group">
              <div className={`w-20 h-20 rounded-lg border-2 overflow-hidden bg-gray-50 ${i === 0 ? 'border-primary-400' : 'border-gray-200'}`}>
                <img src={url} alt={`Resim ${i + 1}`} className="w-full h-full object-contain p-1" onError={e => { e.currentTarget.style.display = 'none' }} />
              </div>
              {i === 0 && <span className="absolute -top-1.5 left-0 right-0 text-center text-xs bg-primary-500 text-white rounded-t leading-tight">Ana</span>}
              <button type="button" onClick={() => remove(url)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow">×</button>
            </div>
          ))}
        </div>
      )}
      {images.length < 5 && (
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${dragOver ? 'border-primary-400 bg-primary-50' : 'border-gray-300 hover:border-primary-300 hover:bg-gray-50'}`}
          onClick={() => document.getElementById('img-upload-input').click()}
        >
          <input id="img-upload-input" type="file" accept="image/*" multiple className="hidden"
            onChange={e => { handleFiles(e.target.files); e.target.value = '' }} />
          {uploading ? (
            <div className="flex flex-col items-center gap-2 text-primary-600">
              <svg className="w-7 h-7 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span className="text-sm font-medium">Yükleniyor...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5 text-gray-500">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm font-medium text-primary-600">Dosya Seç</p>
              <p className="text-xs text-gray-400">veya sürükle bırak · JPG, PNG, WEBP · Max 10MB</p>
              <p className="text-xs text-gray-400">{images.length === 0 ? 'İlk resim ana resim olur' : `${images.length}/5 resim eklendi`}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Katalog Ürün Formu ─────────────────────────────────────────────────────
function CatalogForm({ initial, onSave, onCancel }) {
  const initImages = () => {
    if (!initial) return []
    try { return JSON.parse(initial.images || '[]') } catch { return initial.image_url ? [initial.image_url] : [] }
  }
  const initSpecs = () => {
    if (!initial) return []
    try { return JSON.parse(initial.specs || '[]') } catch { return [] }
  }
  const [form, setForm] = useState(initial || {
    name: '', brand: '', category: 'makineler', description: '', price: 0, stock: 100, active: 1,
  })
  const [images, setImages] = useState(initImages)
  const [specs, setSpecs] = useState(initSpecs)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name) return setError('Ürün adı zorunludur.')
    setSaving(true); setError('')
    try {
      await onSave({
        ...form,
        price: parseFloat(form.price) || 0,
        stock: parseInt(form.stock) || 0,
        image_url: images[0] || '',
        images: JSON.stringify(images),
        specs: JSON.stringify(specs),
      })
    } catch (err) { setError(err.message) }
    finally { setSaving(false) }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Ürün Adı *</label>
          <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" placeholder="Ürün adını girin" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Marka</label>
          <input value={form.brand} onChange={e => setForm(f => ({ ...f, brand: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" placeholder="ör. Bosch, Makita, Vignoli" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
          <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400">
            {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fiyat (₺)</label>
          <input type="number" min="0" step="0.01" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Stok</label>
          <input type="number" min="0" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
        </div>
        <div className="sm:col-span-2">
          <ImageUploader images={images} onChange={setImages} />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
          <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none" placeholder="Ürün açıklaması..." />
        </div>
        <div className="sm:col-span-2 border-t pt-4">
          <SpecsEditor specs={specs} onChange={setSpecs} />
        </div>
        <div className="sm:col-span-2">
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input type="checkbox" checked={!!form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} />
            Sitede aktif olarak göster
          </label>
        </div>
      </div>
      <div className="flex gap-3 pt-2 mt-2">
        <button type="submit" disabled={saving}
          className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-60">
          {saving ? 'Kaydediliyor...' : (initial ? 'Güncelle' : '+ Ürünü Ekle')}
        </button>
        {onCancel && <button type="button" onClick={onCancel} className="px-5 py-2.5 border rounded-lg hover:bg-gray-50">İptal</button>}
      </div>
    </form>
  )
}

// ─── Ana Admin Bileşeni ─────────────────────────────────────────────────────
export default function Admin() {
  const { user, isAdmin } = useAuth()
  const { refreshPrices } = useCart()
  const navigate = useNavigate()

  const [tab, setTab] = useState('dashboard')
  const [stats, setStats] = useState(null)
  const [orders, setOrders] = useState([])
  const [prices, setPrices] = useState({})
  const [catalog, setCatalog] = useState([])
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  // Mevcut ürünler filtreler
  const [catFilter, setCatFilter] = useState('all')
  const [brandFilter, setBrandFilter] = useState('')
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all') // 'all' | 'static' | 'catalog'

  // Form state
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingCatalog, setEditingCatalog] = useState(null)
  const [editingStatic, setEditingStatic] = useState(null)

  // Sipariş filtresi
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    if (!user || !isAdmin) { navigate('/giris'); return }
    loadAll()
  }, [user, isAdmin])

  async function loadAll() {
    const [s, o, p, c] = await Promise.all([
      api.getStats().catch(() => null),
      api.getAllOrders().catch(() => []),
      api.getPrices().catch(() => ({})),
      api.getCatalog().catch(() => []),
    ])
    setStats(s); setOrders(o); setPrices(p); setCatalog(c)
  }

  function flash(text) { setMsg(text); setTimeout(() => setMsg(''), 2500) }

  async function handleSavePrice(productId, data) {
    setSaving(true)
    try {
      await api.updateProduct(productId, data)
      setPrices(prev => ({ ...prev, [productId]: data }))
      refreshPrices()
      flash('✓ Fiyat güncellendi')
    } catch (err) { alert(err.message) }
    setSaving(false)
    setEditingStatic(null)
  }

  async function importAll() {
    if (!confirm(`${staticProducts.length} ürün aktarılsın mı?`)) return
    setSaving(true)
    try {
      await api.bulkUpdateProducts(staticProducts.map(p => ({
        id: p.id, price: prices[p.id]?.price ?? 0, stock: prices[p.id]?.stock ?? 100, active: prices[p.id]?.active ?? 1,
      })))
      const p = await api.getPrices()
      setPrices(p); refreshPrices()
      flash(`✓ ${staticProducts.length} ürün aktarıldı`)
    } catch (err) { alert(err.message) }
    setSaving(false)
  }

  async function handleAddCatalog(data) {
    await api.createCatalogProduct(data)
    invalidateCatalogCache()
    const c = await api.getCatalog()
    setCatalog(c)
    setShowAddForm(false)
    flash('✓ Ürün eklendi')
  }

  async function handleUpdateCatalog(id, data) {
    await api.updateCatalogProduct(id, data)
    invalidateCatalogCache()
    const c = await api.getCatalog()
    setCatalog(c)
    setEditingCatalog(null)
    flash('✓ Ürün güncellendi')
  }

  async function handleDeleteCatalog(id) {
    if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) return
    if (!confirm('Son kararınız mı? Bu ürün tamamen silinecek!')) return
    try {
      await api.deleteCatalogProduct(id)
      invalidateCatalogCache()
      setCatalog(prev => prev.filter(p => p.id !== id))
      flash('✓ Ürün silindi')
    } catch (err) { alert(err.message) }
  }

  async function handleDeleteStatic(id) {
    if (!confirm('Bu statik ürünü silmek istediğinize emin misiniz? (Ürün siteden kalıcı olarak gizlenecektir)')) return
    if (!confirm('Son kararınız mı? Bu işlem geri alınamaz!')) return
    setSaving(true)
    try {
      const meta = prices[id] || {}
      await api.updateProduct(id, { ...meta, price: meta.price || 0, stock: meta.stock || 0, deleted: 1 })
      setPrices(prev => ({ ...prev, [id]: { ...meta, deleted: 1 } }))
      refreshPrices()
      flash('✓ Ürün başarıyla silindi (gizlendi)')
    } catch (err) { alert(err.message) }
    setSaving(false)
  }

  async function handleOrderStatus(orderId, status) {
    try {
      await api.updateOrderStatus(orderId, status)
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o))
      flash('✓ Durum güncellendi')
    } catch (err) { alert(err.message) }
  }

  async function handlePttBarcode(orderId) {
    if (!confirm('Sipariş için PTT AVM barkodu oluşturulacak. Onaylıyor musunuz?')) return
    try {
      setSaving(true)
      const res = await api.createPttBarcode(orderId)
      if (res.tracking_id) {
         setOrders(prev => prev.map(o => o.id === orderId ? { ...o, tracking_id: res.tracking_id } : o))
         flash('✓ PTT Barkod oluşturuldu: ' + res.tracking_id)
      }
    } catch (err) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  // Tüm ürünler filtreli (statik + katalog)
  const brands = [...new Set([
    ...staticProducts.map(p => p.brand),
    ...catalog.map(p => p.brand),
  ].filter(Boolean))].sort()

  const filteredStatic = staticProducts.filter(p => {
    if (prices[p.id]?.deleted) return false
    if (typeFilter === 'catalog') return false
    if (catFilter !== 'all' && p.category !== catFilter) return false
    if (brandFilter && p.brand !== brandFilter) return false
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.brand?.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const filteredCatalog = catalog.filter(p => {
    if (typeFilter === 'static') return false
    if (catFilter !== 'all' && p.category !== catFilter) return false
    if (brandFilter && p.brand !== brandFilter) return false
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.brand?.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const filteredOrders = orders.filter(o => statusFilter === 'all' || o.status === statusFilter)
  const totalProducts = staticProducts.length + catalog.length

  const tabs = [
    { key: 'dashboard', label: '📊 Dashboard' },
    { key: 'products',  label: `📦 Tüm Ürünler (${totalProducts})` },
    { key: 'add',       label: '➕ Yeni Ürün Ekle' },
    { key: 'orders',    label: `🛒 Siparişler (${orders.length})` },
  ]

  if (!user || !isAdmin) return null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Paneli</h1>
          <p className="text-sm text-gray-500 mt-0.5">Hoş geldin, {user.full_name || user.email}</p>
        </div>
        {msg && <span className="text-sm text-green-700 font-medium bg-green-50 border border-green-200 px-4 py-2 rounded-lg">{msg}</span>}
      </div>

      <div className="flex gap-1 mb-8 border-b overflow-x-auto">
        {tabs.map(t => (
          <button key={t.key} onClick={() => { setTab(t.key); setEditingCatalog(null) }}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${tab === t.key ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* DASHBOARD */}
      {tab === 'dashboard' && (
        <div className="space-y-6">
          {stats ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Toplam Sipariş',   value: stats.totalOrders,           icon: '🛒', bg: 'bg-blue-50',   txt: 'text-blue-700' },
                { label: 'Bekleyen Sipariş', value: stats.pendingOrders,         icon: '⏳', bg: 'bg-yellow-50', txt: 'text-yellow-700' },
                { label: 'Toplam Kullanıcı', value: stats.totalUsers,            icon: '👥', bg: 'bg-purple-50', txt: 'text-purple-700' },
                { label: 'Toplam Ciro',      value: fmt(stats.totalRevenue || 0), icon: '💰', bg: 'bg-green-50',  txt: 'text-green-700' },
              ].map(s => (
                <div key={s.label} className={`${s.bg} rounded-2xl p-5`}>
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <div className={`text-2xl font-bold ${s.txt}`}>{s.value}</div>
                  <div className={`text-sm mt-1 ${s.txt} opacity-70`}>{s.label}</div>
                </div>
              ))}
            </div>
          ) : <div className="text-gray-400 py-8 text-center">Yükleniyor...</div>}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border rounded-xl p-5">
              <h3 className="font-semibold mb-1">Toplam Ürün</h3>
              <p className="text-3xl font-bold text-primary-600">{totalProducts}</p>
              <p className="text-sm text-gray-400 mt-1">{staticProducts.length} statik + {catalog.length} eklenen</p>
              <button onClick={() => setTab('products')} className="mt-3 text-sm text-primary-600 hover:underline">Ürünleri Yönet →</button>
            </div>
            <div className="bg-white border rounded-xl p-5">
              <h3 className="font-semibold mb-1">Bekleyen Siparişler</h3>
              <p className="text-3xl font-bold text-yellow-600">{stats?.pendingOrders ?? '...'}</p>
              <p className="text-sm text-gray-400 mt-1">Onay bekliyor</p>
              <button onClick={() => setTab('orders')} className="mt-3 text-sm text-primary-600 hover:underline">Siparişleri Gör →</button>
            </div>
            <div className="bg-white border rounded-xl p-5">
              <h3 className="font-semibold mb-1">Toplam Ciro</h3>
              <p className="text-3xl font-bold text-green-600">{stats ? fmt(stats.totalRevenue || 0) : '...'}</p>
              <p className="text-sm text-gray-400 mt-1">İptal hariç</p>
              <button onClick={() => setTab('add')} className="mt-3 text-sm text-primary-600 hover:underline">+ Ürün Ekle →</button>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-5">
            <h3 className="font-semibold mb-3">Hızlı İşlemler</h3>
            <div className="flex flex-wrap gap-3">
              <button onClick={importAll} disabled={saving}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 disabled:opacity-60">
                {saving ? '...' : `📥 ${staticProducts.length} Ürünü DB'ye Aktar`}
              </button>
              <button onClick={() => setTab('add')} className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
                ➕ Yeni Ürün Ekle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TÜM ÜRÜNLER */}
      {tab === 'products' && (
        <div className="space-y-4">
          {/* Düzenleme formu */}
          {/* Katalog ürün düzenleme paneli */}
          {editingCatalog && (
            <div className="bg-white border-2 border-primary-200 rounded-xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4">✏️ Düzenle: {editingCatalog.name}</h2>
              <CatalogForm
                initial={editingCatalog}
                onSave={(data) => handleUpdateCatalog(editingCatalog.id, data)}
                onCancel={() => setEditingCatalog(null)}
              />
            </div>
          )}

          {/* Statik ürün düzenleme paneli */}
          {editingStatic && (
            <StaticEditPanel
              item={editingStatic}
              meta={prices[editingStatic.id] || {}}
              onSave={handleSavePrice}
              onCancel={() => setEditingStatic(null)}
            />
          )}

          {!editingCatalog && !editingStatic && (
            <>
              {/* Filtreler */}
              <div className="bg-white border rounded-xl p-4 flex flex-wrap gap-3 items-end">
                <div className="flex-1 min-w-[150px]">
                  <label className="text-xs text-gray-500 mb-1 block">Ara</label>
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Ürün veya marka..."
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Kategori</label>
                  <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
                    className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400">
                    <option value="all">Tümü</option>
                    {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Marka</label>
                  <select value={brandFilter} onChange={e => setBrandFilter(e.target.value)}
                    className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400">
                    <option value="">Tüm Markalar</option>
                    {brands.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Tür</label>
                  <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
                    className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400">
                    <option value="all">Tümü</option>
                    <option value="static">Sadece Statik</option>
                    <option value="catalog">Sadece Eklenenler</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button onClick={importAll} disabled={saving}
                    className="px-3 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 disabled:opacity-60">
                    {saving ? '...' : '📥 Aktar'}
                  </button>
                  <span className="text-xs text-gray-400 self-center">
                    {filteredStatic.length + filteredCatalog.length} ürün
                  </span>
                </div>
              </div>

              {/* Tüm ürünler: eklenenler önce (edit/delete), statikler sonra (fiyat düzenle) */}
              {(filteredCatalog.length > 0 || filteredStatic.length > 0) ? (
                <div className="space-y-2">
                  {filteredCatalog.map(item => (
                    <CatalogRow key={item.id} item={item} onEdit={setEditingCatalog} onDelete={handleDeleteCatalog} />
                  ))}
                  {filteredStatic.map(item => (
                    <PriceRow key={item.id} item={item} meta={prices[item.id]} onEdit={setEditingStatic} onDelete={handleDeleteStatic} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <div className="text-3xl mb-2">🔍</div>
                  <p>Arama sonucu bulunamadı.</p>
                </div>
              )}

            </>
          )}
        </div>
      )}

      {/* YENİ ÜRÜN EKLE */}
      {tab === 'add' && (
        <div className="max-w-2xl">
          <div className="bg-white border-2 border-primary-200 rounded-xl p-6 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-1">➕ Yeni Ürün Ekle</h2>
            <p className="text-sm text-gray-400 mb-5">Eklediğiniz ürünler sitede ilgili kategori sayfasında görünür.</p>
            <CatalogForm
              key={Date.now()}
              onSave={async (data) => {
                await handleAddCatalog(data)
                setTab('products')
              }}
              onCancel={() => setTab('products')}
            />
          </div>
        </div>
      )}

      {/* SIPARISLER */}
      {tab === 'orders' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {['all', 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${statusFilter === s ? 'bg-primary-600 text-white' : 'border hover:bg-gray-50'}`}>
                {s === 'all' ? `Tümü (${orders.length})` : (STATUS_LABELS[s]?.label || s)}
              </button>
            ))}
          </div>
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <div className="text-4xl mb-3">📋</div>
              <p>Bu durumda sipariş yok.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredOrders.map(order => {
                const s = STATUS_LABELS[order.status] || STATUS_LABELS.pending
                return (
                  <div key={order.id} className="bg-white border rounded-xl shadow-sm overflow-hidden">
                    <div className="px-5 py-3 border-b bg-gray-50 flex flex-wrap items-center gap-3 justify-between">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-bold text-gray-900">#{order.id}</span>
                        <span className="text-sm font-medium text-gray-700">{order.customer_name}</span>
                        <span className="text-sm text-gray-400">{order.customer_email}</span>
                        {order.phone && <span className="text-sm text-gray-400">📞 {order.phone}</span>}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${s.color}`}>{s.label}</span>
                        <span className="font-bold text-primary-600">{fmt(order.total_amount)}</span>
                        <span className="text-xs text-gray-400">{new Date(order.created_at).toLocaleString('tr-TR')}</span>
                      </div>
                    </div>
                    <div className="px-5 py-3 flex flex-wrap gap-6 items-start">
                      <div className="flex-1 min-w-0 space-y-2">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-center gap-3 text-xs text-gray-700 bg-white p-2 border rounded-lg">
                            <div className="w-8 h-8 rounded bg-gray-50 flex items-center justify-center border flex-shrink-0">
                              {item.image ? (
                                <img src={resolveImg(item.image)} className="max-w-full max-h-full object-contain" onError={e => e.currentTarget.style.display = 'none'} />
                              ) : <span className="text-gray-300 font-bold">{item.name?.charAt(0)}</span>}
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-gray-500 font-medium">{item.quantity}×</span>
                              <span className="ml-1 truncate font-medium">{item.name}</span>
                            </div>
                            <span className="text-gray-500 font-bold flex-shrink-0">{fmt(item.price * item.quantity)} <span className="font-normal text-xs text-gray-400">({fmt(item.price)})</span></span>
                          </div>
                        ))}
                        {order.shipping_address && <p className="text-xs text-gray-500 mt-1">📍 {order.shipping_address}</p>}
                        {order.note && <p className="text-xs text-gray-500">💬 {order.note}</p>}
                      </div>
                      <div className="flex-shrink-0 flex flex-col gap-3 min-w-[140px]">
                        <div>
                          <label className="text-xs text-gray-500 mb-1 block">Durum Güncelle</label>
                          <select value={order.status} onChange={e => handleOrderStatus(order.id, e.target.value)}
                            className="w-full border rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary-400">
                            {Object.entries(STATUS_LABELS).map(([k, v]) => (
                              <option key={k} value={k}>{v.label}</option>
                            ))}
                          </select>
                        </div>
                        {order.tracking_id ? (
                          <div className="text-xs bg-yellow-50 text-yellow-700 p-2 rounded-lg border border-yellow-200">
                            PTT Kodu:<br /><span className="font-bold tracking-widest">{order.tracking_id}</span>
                          </div>
                        ) : (
                          <button onClick={() => handlePttBarcode(order.id)} disabled={saving} className="w-full text-xs bg-gray-800 text-white px-2 py-2 rounded-lg hover:bg-gray-900 disabled:opacity-60 font-medium">
                            📦 PTT Barkod Al
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
