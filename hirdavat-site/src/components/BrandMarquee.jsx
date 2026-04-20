import { Link } from 'react-router-dom'
import products from '../shared/products.js'

export default function BrandMarquee() {
  const brandsDynamic = Array.from(new Set(products.map(p => p.brand))).filter(Boolean)
  const configuredBrands = ['HAIS', 'STECHEND', 'Bosch', 'Einhell', 'İzeltaş', ]
  const brandCategoryOverrides = {}
  const brands = configuredBrands.length ? configuredBrands : brandsDynamic
  const primaryCategory = (brand) => {
    if (brandCategoryOverrides[brand]) return brandCategoryOverrides[brand]
    const list = products.filter(p => p.brand === brand)
    const counts = list.reduce((acc, p) => { acc[p.category] = (acc[p.category] || 0) + 1; return acc }, {})
    const best = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0]
    return best || list[0]?.category || 'makineler'
  }
  return (
    <div className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-4 sm:gap-8 overflow-x-auto">
        {brands.map(b => {
          const cat = primaryCategory(b)
          const href = `/${cat}?brand=${encodeURIComponent(b)}`
          return (
            <Link key={b} to={href} className="shrink-0 px-4 py-2 border rounded text-sm text-gray-700 bg-gray-50 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700">
              {b}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
