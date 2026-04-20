import { useEffect, useState } from 'react'
import ImageOrPlaceholder from './ImageOrPlaceholder.jsx'

const SLIDES = [
  { title: 'Hırdavat Malzemeleri', subtitle: 'Geniş ürün yelpazesi ', color: 'from-gray-900 to-gray-700', image: 'public/images/store.jpg' },
  
]

export default function PromoCarousel() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 4000)
    return () => clearInterval(t)
  }, [])
  const s = SLIDES[i]
  return (
    <section className={`relative overflow-hidden bg-gradient-to-br ${s.color} text-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{s.title}</h1>
            <p className="mt-3 text-gray-200">{s.subtitle}</p>
          
          </div>
          <div className="relative">
            <div className="rounded-xl overflow-hidden shadow-md ring-1 ring-white/10 bg-white/5">
              <ImageOrPlaceholder src={s.image} alt={s.title} ratio="21/9" fit="cover" hideOnError />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
