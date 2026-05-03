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
        <label className="text-sm text-gray-400 font-medium">Sırala</label>
        <select value={sort} onChange={e => setSort(e.target.value)} className="glass rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500">
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
            <Link to={`/urun/${item.id}`} key={item.id} className="group glass-card rounded-xl overflow-hidden flex flex-col relative z-10">
              <div className="p-3 relative">
                <div className="h-36 glass rounded-lg flex items-center justify-center overflow-hidden transition-all duration-300 relative z-0">
                  {imgUrl ? (
                    <img src={imgUrl} alt={displayName} className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-xl" onError={e => { e.currentTarget.style.display = 'none' }} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-500 text-3xl font-bold">{displayName.charAt(0)}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1 z-10">
                <h3 className="font-semibold text-sm line-clamp-2 flex-1 text-gray-900">{displayName}</h3>
                {displayBrand && (
                  <div className="mt-2">
                    <span className="text-xs px-2.5 py-1 rounded-md bg-primary-50 text-primary-700 border border-primary-100 font-medium tracking-wide uppercase">{displayBrand}</span>
                  </div>
                )}
                <div className="mt-4">
                  {hasPrice ? (
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-lg font-bold text-gradient drop-shadow-md">{fmt(price)}</span>
                      <button
                        onClick={e => handleAdd(e, { ...item, name: displayName, price, brand: displayBrand })}
                        className={`px-4 py-2 text-xs rounded-lg font-semibold transition-all duration-300 flex-shrink-0 ${isAdded ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'btn-premium'}`}
                      >
                        {isAdded ? '✓' : '+ SEPET'}
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-500">Fiyat Sorunuz</span>
                      <span className="px-3 py-1.5 glass rounded-lg text-xs hover:border-primary-500/50 hover:text-primary-600 transition-colors cursor-pointer text-gray-700 border border-gray-200">Detay</span>
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
