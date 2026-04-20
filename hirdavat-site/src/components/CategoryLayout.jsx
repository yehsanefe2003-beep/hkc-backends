import { useMemo, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductGrid from '../shared/ProductGrid.jsx'

export default function CategoryLayout({ title, items }) {
  const [params, setParams] = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)
  const normalize = (s) => (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
  const brands = useMemo(() => Array.from(new Set(items.map(i => i.brand))).filter(b => b && typeof b === 'string' && b.trim().length > 0), [items])
  const brandsNormSet = useMemo(() => new Set(brands.map(normalize)), [brands])
  const urlBrands = useMemo(() => {
    const all = params.getAll('brand')
    if (all.length) return all
    const single = params.get('brand')
    return single ? [single] : []
  }, [params])
  const activeNormSet = useMemo(() => {
    const set = new Set(urlBrands.map(normalize))
    return new Set([...set].filter(x => brandsNormSet.has(x)))
  }, [urlBrands, brandsNormSet])
  const activeBrands = useMemo(() => brands.filter(b => activeNormSet.has(normalize(b))), [brands, activeNormSet])
  useEffect(() => {
    const sp = new URLSearchParams(params)
    sp.delete('brand')
    activeBrands.forEach(v => sp.append('brand', v))
    if (sp.toString() !== params.toString()) {
      setParams(sp, { replace: true })
    }
  }, [activeBrands, params, setParams])

  const filtered = useMemo(() => {
    let list = items
    if (activeBrands.length) {
      list = list.filter(i => activeBrands.includes(i.brand) || activeNormSet.has(normalize(i.brand)))
    }
    return list
  }, [items, activeNormSet, activeBrands])

  const toggleBrand = (b) => {
    const current = new Set(urlBrands.map(normalize))
    const key = normalize(b)
    let nextKeys
    if (current.has(key)) {
      current.delete(key)
      nextKeys = [...current]
    } else {
      // Exclusive select: when adding a brand, make it the only active brand
      nextKeys = [key]
    }
    const next = brands.filter(x => nextKeys.includes(normalize(x)))
    const sp = new URLSearchParams(params)
    sp.delete('brand')
    next.forEach(v => sp.append('brand', v))
    setParams(sp, { replace: true })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <button 
          className="lg:hidden px-4 py-2 border rounded text-sm font-medium bg-white hover:bg-gray-50" 
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Filtreleri Gizle' : 'Filtrele'}
        </button>
      </div>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className={`lg:col-span-1 bg-white border rounded p-4 h-fit ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div>
            <div className="font-semibold">Marka</div>
            <div className="mt-3 space-y-2">
              {brands.map(b => (
                <label key={b} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={activeBrands.includes(b)} onChange={() => toggleBrand(b)} />
                  <span className={activeBrands.includes(b) ? 'font-medium text-primary-600' : 'text-gray-700 dark:text-gray-300'}>{b}</span>
                </label>
              ))}
            </div>
          </div>
          
        </aside>
        <div className="lg:col-span-3">
          <ProductGrid items={filtered} />
        </div>
      </div>
    </div>
  )
}
