import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ImageOrPlaceholder from '../components/ImageOrPlaceholder.jsx'
import { useCart, usePrices } from '../contexts/CartContext.jsx'

function fmt(n) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(n)
}

export default function ProductGrid({ items = [] }) {
  const [sort, setSort] = useState('default')
  const prices = usePrices()
  const { addToCart } = useCart()
  const [added, setAdded] = useState({})

  // Hem static (prices context) hem catalog (item.price) destekler
  function getPrice(item) {
    const meta = prices[item.id]
    if (meta?.price > 0) return meta.price
    if (item.price > 0) return item.price
    return 0
  }

  // http(s):// veya // ile başlayanlar olduğu gibi, geri kalanlar /src prefix alır
  function resolveImg(src) {
    if (!src) return ''
    if (src.startsWith('http') || src.startsWith('//')) return src
    return encodeURI(src.startsWith('/') ? src : `/${src}`)
  }

  const sorted = useMemo(() => {
    let list = items.filter(item => {
      const meta = prices[item.id] || {}
      if (meta.deleted || meta.active === 0) return false
      return true
    })
    if (sort === 'name-asc') list.sort((a, b) => a.name.localeCompare(b.name))
    else if (sort === 'name-desc') list.sort((a, b) => b.name.localeCompare(a.name))
    else if (sort === 'price-asc') list.sort((a, b) => getPrice(a) - getPrice(b))
    else if (sort === 'price-desc') list.sort((a, b) => getPrice(b) - getPrice(a))
    return list
  }, [items, sort, prices])

  function handleAdd(e, item) {
    e.preventDefault()
    e.stopPropagation()
    addToCart(item)
    setAdded(prev => ({ ...prev, [item.id]: true }))
    setTimeout(() => setAdded(prev => ({ ...prev, [item.id]: false })), 1500)
  }

  return (
    <div>
      <div className="mt-4 flex items-center justify-end gap-2">
        <label className="text-sm text-gray-600">Sırala</label>
        <select value={sort} onChange={e => setSort(e.target.value)} className="border rounded px-2 py-1 text-sm">
          <option value="default">Varsayılan</option>
          <option value="name-asc">Ad (A-Z)</option>
          <option value="name-desc">Ad (Z-A)</option>
          <option value="price-asc">Fiyat (Düşük-Yüksek)</option>
          <option value="price-desc">Fiyat (Yüksek-Düşük)</option>
        </select>
      </div>
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {sorted.map(item => {
          const meta = prices[item.id] || {}
          const price = getPrice(item)
          const hasPrice = price > 0
          const isAdded = added[item.id]
          const imgUrl = resolveImg(item.image)
          
          const displayName = meta.name_override || item.name
          const displayBrand = meta.brand_override || item.brand

          return (
            <Link to={`/urun/${item.id}`} key={item.id} className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:ring-1 hover:ring-primary-200 hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
              <div className="p-3">
                <div className="h-28 bg-white border rounded flex items-center justify-center overflow-hidden transition-colors group-hover:bg-gray-50">
                  {imgUrl ? (
                    <img src={imgUrl} alt={displayName} className="max-h-full max-w-full object-contain transition-transform duration-200 group-hover:scale-105" onError={e => { e.currentTarget.style.display = 'none' }} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-300 text-2xl font-bold">{displayName.charAt(0)}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-medium text-sm line-clamp-2 flex-1">{displayName}</h3>
                {displayBrand && (
                  <div className="mt-1">
                    <span className="text-xs px-2 py-0.5 rounded bg-primary-50 text-primary-700 border border-primary-200">{displayBrand}</span>
                  </div>
                )}
                <div className="mt-3">
                  {hasPrice ? (
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-lg font-bold text-primary-600">{fmt(price)}</span>
                      <button
                        onClick={e => handleAdd(e, { ...item, name: displayName, price, brand: displayBrand })}
                        className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all duration-200 flex-shrink-0 ${isAdded ? 'bg-green-500 text-white' : 'bg-primary-600 text-white hover:bg-primary-700'}`}
                      >
                        {isAdded ? '✓ Eklendi' : '+ Sepet'}
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400 italic">Fiyat için iletişim</span>
                      <span className="px-3 py-1 border rounded text-xs hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700 transition-colors">Detay</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
