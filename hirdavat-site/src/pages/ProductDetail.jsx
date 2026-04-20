import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import products from '../shared/products.js'
import ImageOrPlaceholder from '../components/ImageOrPlaceholder.jsx'
import RichDescription from '../components/RichDescription.jsx'
import { useCart, usePrices } from '../contexts/CartContext.jsx'

const BASE = import.meta.env.VITE_API_URL || ''

function fmt(n) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(n)
}

// Hem tam URL hem relative path'i handle eder
function imgSrc(src) {
  if (!src) return ''
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//')) return src
  return encodeURI(src.startsWith('/') ? src : `/${src}`)
}

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const prices = usePrices()
  const { addToCart } = useCart()

  const isCatalog = id.startsWith('cat-')
  const staticProduct = isCatalog ? null : products.find(p => p.id === id)

  const [catalogProduct, setCatalogProduct] = useState(null)
  const [loading, setLoading] = useState(isCatalog)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!isCatalog) return
    setLoading(true); setNotFound(false); setCatalogProduct(null)
    fetch(`${BASE}/api/products/storefront/${id}`)
      .then(r => r.json())
      .then(data => { if (data.error) setNotFound(true); else setCatalogProduct(data) })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [id, isCatalog])

  const productRaw = isCatalog ? catalogProduct : staticProduct
  const meta = isCatalog ? {} : (prices[id] || {})

  const product = productRaw ? {
    ...productRaw,
    name: meta.name_override || productRaw.name,
    brand: meta.brand_override || productRaw.brand,
    description: meta.description_override || productRaw.description,
    features: isCatalog 
      ? (productRaw.specs?.length ? productRaw.specs : productRaw.features)
      : (() => {
          try {
            const parsed = JSON.parse(meta.specs || '[]')
            return parsed.length > 0 ? parsed : productRaw.features
          } catch { return productRaw.features }
        })() || productRaw.features
  } : null

  const [idx, setIdx] = useState(0)
  const [light, setLight] = useState(false)
  const [spin, setSpin] = useState(false)
  const [sidx, setSidx] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [cartAdded, setCartAdded] = useState(false)

  useEffect(() => { setIdx(0) }, [id])

  const gallery = product
    ? Array.from(new Set([product.image, ...(product.images || [])].filter(Boolean)))
    : []
  const spinFrames = Array.from(new Set([...(product?.images360 || [])].filter(Boolean)))

  const displayPrice = isCatalog ? (product?.price || 0) : (meta.price || 0)
  const displayStock = isCatalog ? (product?.stock ?? 100) : (meta.stock ?? 100)
  const hasPrice = displayPrice > 0

  function handleAddToCart() {
    if (!product) return
    addToCart({ ...product, price: displayPrice })
    setCartAdded(true)
    setTimeout(() => setCartAdded(false), 2000)
  }

  useEffect(() => { if (product) document.title = `${product.name} | Hırdavat` }, [product])

  useEffect(() => {
    const onKey = (e) => {
      if (!light) return
      if (e.key === 'Escape') setLight(false)
      if (e.key === 'ArrowRight') setIdx(i => (i + 1) % gallery.length)
      if (e.key === 'ArrowLeft') setIdx(i => (i - 1 + gallery.length) % gallery.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [light, gallery.length])

  useEffect(() => {
    const onKey = (e) => {
      if (!spin) return
      if (e.key === 'Escape') setSpin(false)
      if (e.key === 'ArrowRight') setSidx(i => (i + 1) % spinFrames.length)
      if (e.key === 'ArrowLeft') setSidx(i => (i - 1 + spinFrames.length) % spinFrames.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [spin, spinFrames.length])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="inline-block w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
        <p className="mt-3 text-gray-400">Ürün yükleniyor...</p>
      </div>
    )
  }

  if (!product || notFound) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Ürün bulunamadı</h1>
          <p className="mt-2 text-gray-600">Aradığınız ürün mevcut değil.</p>
          <Link to="/" className="mt-4 inline-block px-4 py-2 bg-primary-600 text-white rounded">Anasayfa</Link>
        </div>
      </div>
    )
  }

  return (
    <>
    <div key={id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigate(-1)} className="button"><span>Geri</span></button>
      </div>
      <nav className="text-sm text-gray-600 mb-6">
        <Link to="/" className="hover:text-gray-900">Anasayfa</Link>
        <span className="mx-2">/</span>
        <Link to={`/${product.category}`} className="hover:text-gray-900 capitalize">{product.category}</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="max-w-xs mx-auto">
          <div className="rounded border border-gray-200 overflow-hidden relative">
            <ImageOrPlaceholder src={gallery[idx]} alt={product.name} ratio="4/3" fit="contain" />
            {gallery.length > 0 && (
              <button
                type="button"
                onClick={() => (idx===0 && spinFrames.length>0) ? setSpin(true) : setLight(true)}
                className="absolute inset-0 z-10 cursor-zoom-in"
                aria-label="Büyüt"
              />
            )}
            {gallery.length > 1 && (
              <>
                <button onClick={() => setIdx(i => (i - 1 + gallery.length) % gallery.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 border flex items-center justify-center text-gray-700 z-10">‹</button>
                <button onClick={() => setIdx(i => (i + 1) % gallery.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 border flex items-center justify-center text-gray-700 z-10">›</button>
              </>
            )}
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {gallery.map((src, i) => (
              <button key={i} onClick={() => setIdx(i)} className={`w-12 h-12 rounded overflow-hidden border transition-all ${gallery[idx]===src?'border-primary-600 ring-1 ring-primary-300':'border-gray-200 hover:border-primary-400'}`}>
                <img src={imgSrc(src)} alt="thumb" className="w-full h-full object-contain" onError={e => { e.currentTarget.style.display='none' }} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <div className="mt-1">
            {product.brand && <span className="inline-block text-xs px-2 py-0.5 rounded bg-primary-50 text-primary-700 border border-primary-200">{product.brand}</span>}
          </div>

          {/* Fiyat ve Sepet */}
          <div className="mt-4 rounded-xl border border-gray-200 overflow-hidden">
            {hasPrice ? (
              <div className="p-4 bg-gradient-to-r from-primary-50 to-white">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary-600">{fmt(displayPrice)}</span>
                  <span className="text-sm text-gray-400">KDV Dahil</span>
                </div>
                <p className={`mt-1 text-sm font-medium ${displayStock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {displayStock > 0 ? `✓ Stokta ${displayStock} adet mevcut` : '✗ Stok tükendi'}
                </p>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={displayStock === 0}
                    className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${cartAdded ? 'bg-green-500 text-white' : 'bg-primary-600 hover:bg-primary-700 text-white'} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {cartAdded ? '✓ Sepete Eklendi!' : '🛒 Sepete Ekle'}
                  </button>
                  <Link to="/sepet" className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                    Sepete Git
                  </Link>
                </div>
              </div>
            ) : (
              <div className="p-4 flex items-center justify-between gap-4 bg-gray-50">
                <div>
                  <div className="text-2xl font-bold text-gray-400">Fiyat Soran Kazan</div>
                  <p className="text-xs text-gray-400">Fiyat bilgisi için bize ulaşın.</p>
                </div>
                <button
                  onClick={handleAddToCart}
                  className={`flex-shrink-0 px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${cartAdded ? 'bg-green-500 text-white' : 'bg-primary-600 hover:bg-primary-700 text-white'}`}
                >
                  {cartAdded ? '✓ Eklendi' : '🛒 Sepete Ekle'}
                </button>
              </div>
            )}
          </div>

          {/* Ürün Açıklaması */}
          <RichDescription text={product.description ?? 'Ürün açıklaması yakında.'} />

          {product.features && product.features.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold">Özellikler</h2>
              <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
                {product.features.map((f, i) => <li key={i}>• {f}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {light && gallery[idx] && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" onClick={() => setLight(false)}>
          <div className="relative" onClick={e => e.stopPropagation()}>
            <img src={imgSrc(gallery[idx])} alt={product.name} className="max-h-[80vh] max-w-[90vw] object-contain" />
            <button type="button" onClick={() => setLight(false)} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 border flex items-center justify-center">×</button>
            {gallery.length > 1 && (
              <>
                <button onClick={() => setIdx(i => (i - 1 + gallery.length) % gallery.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 border flex items-center justify-center">‹</button>
                <button onClick={() => setIdx(i => (i + 1) % gallery.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 border flex items-center justify-center">›</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* 360° spin */}
      {spin && spinFrames.length > 0 && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onMouseUp={() => setDragging(false)} onTouchEnd={() => setDragging(false)} onClick={() => setSpin(false)}>
          <div className="relative" onClick={e => e.stopPropagation()}
            onMouseDown={e => { setDragging(true); setStartX(e.clientX) }}
            onMouseMove={e => { if(!dragging) return; const dx = e.clientX - startX; const step = Math.floor(Math.abs(dx)/20); if(step>0){ setStartX(e.clientX); setSidx(i => (dx>0 ? (i + step) % spinFrames.length : (i - step + spinFrames.length) % spinFrames.length)) } }}
            onTouchStart={e => { const x=e.touches[0].clientX; setDragging(true); setStartX(x) }}
            onTouchMove={e => { if(!dragging) return; const x=e.touches[0].clientX; const dx = x - startX; const step = Math.floor(Math.abs(dx)/20); if(step>0){ setStartX(x); setSidx(i => (dx>0 ? (i + step) % spinFrames.length : (i - step + spinFrames.length) % spinFrames.length)) } }}>
            <img src={imgSrc(spinFrames[sidx])} alt={product.name} className="max-h-[80vh] max-w-[90vw] object-contain select-none" draggable="false" />
            <button type="button" onClick={() => setSpin(false)} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 border flex items-center justify-center">×</button>
          </div>
        </div>
      )}
    </div>

    {/* Benzer Ürünler */}
    {(() => {
      const related = products
        .filter(p => p.id !== product.id && p.category === product.category)
        .slice(0, 8)
      if (related.length === 0) return null
      return (
        <section className="mt-12 border-t pt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Benzer Ürünler</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map(item => (
                <Link key={item.id} to={`/urun/${item.id}`} onClick={() => window.scrollTo(0, 0)}
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:ring-1 hover:ring-primary-200 hover:-translate-y-0.5 transition-all duration-200">
                  <div className="p-3">
                    <div className="h-28 bg-gray-50 rounded flex items-center justify-center overflow-hidden">
                      {item.image ? (
                        <img src={imgSrc(item.image)} alt={item.name} className="max-h-full max-w-full object-contain transition-transform duration-200 group-hover:scale-105" onError={e => { e.currentTarget.style.display = 'none' }} />
                      ) : (
                        <span className="text-gray-300 text-2xl font-bold">{item.name.charAt(0)}</span>
                      )}
                    </div>
                  </div>
                  <div className="px-3 pb-4">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</h3>
                    <span className="mt-1 inline-block text-xs px-2 py-0.5 rounded bg-primary-50 text-primary-700 border border-primary-200">{item.brand}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )
    })()}
    </>
  )
}
