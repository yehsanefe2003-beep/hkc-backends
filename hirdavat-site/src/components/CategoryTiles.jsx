import { Link } from 'react-router-dom'

export default function CategoryTiles() {
  const cats = [
    { name: 'Makineler', href: '/makineler' },
    { name: 'El Aletleri', href: '/el-aletleri' },
    { name: 'Hırdavat', href: '/hirdavat' },
    { name: 'Bataryalar', href: '/bataryalar' },
  ]
  return (
    <section className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cats.map(c => (
            <Link key={c.name} to={c.href} className="border rounded p-5 text-center hover:bg-gray-50">
              <div className="font-medium">{c.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
