import { useSearchParams } from 'react-router-dom'
import BrandMarquee from '../components/BrandMarquee.jsx'
import PromoCarousel from '../components/PromoCarousel.jsx'
import products from '../shared/products.js'
import ProductGrid from '../shared/ProductGrid.jsx'

export default function Home() {
  const [params] = useSearchParams()
  const featuredParam = (params.get('featured') || '').toLowerCase()
  const isStatic = ['0', 'false', 'static'].includes(featuredParam)
  const featuredItems = products.filter(p => p.featured)
  const itemsToShow = (featuredItems.length ? featuredItems.slice(0, 64) : products.slice(0, 64))
  return (
    <div>
      <PromoCarousel />
      <BrandMarquee />
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient tracking-tight">Öne Çıkan Ürünler</h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-primary-500/50 to-transparent ml-8 rounded-full hidden sm:block" />
          </div>
          {!isStatic ? (
            <div>
              <ProductGrid items={itemsToShow} />
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white border rounded-xl overflow-hidden shadow-sm">
                  <div className="h-1.5 bg-gray-200" />
                  <div className="p-3">
                    <div className="h-28 bg-white border rounded flex items-center justify-center overflow-hidden">
                      <span className="text-gray-300 text-2xl font-bold">—</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="h-5 bg-gray-100 rounded" />
                    <div className="mt-2 h-4 bg-gray-100 rounded w-2/3" />
                    <div className="mt-3 flex items-center justify-end">
                      <span className="px-3 py-1 border rounded text-sm">Detay</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
