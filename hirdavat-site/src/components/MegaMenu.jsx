import { Link } from 'react-router-dom'

const slug = (s) => (s || '')
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/ı/g, 'i')
  .replace(/ğ/g, 'g')
  .replace(/ş/g, 's')
  .replace(/ç/g, 'c')
  .replace(/ö/g, 'o')
  .replace(/ü/g, 'u')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')

const subSlug = (x) => {
  const s = slug(x)
  if (s === 'matkaplar') return 'matkap'
  if (s === 'penseler') return 'pense'
  return s
}

export default function MegaMenu({ open = false, onClose }) {
  if (!open) return null
  const columns = [
    { title: 'Makineler', items: ['Matkaplar', 'Taşlama', 'Testere', 'Kompresör', 'Yıkama Makineleri'] },
    { title: 'El Aletleri', items: ['Lokma Setleri', 'Tornavidalar', 'Penseler', 'Çekiçler'] },
    { title: 'Hırdavat', items: ['Vida', '', 'Koli Bandı', 'Mastik'] },
    { title: 'Bataryalar', items: [''] },
  ]
  const mapHref = (title) => {
    const t = title.toLowerCase()
    if (t.includes('makine')) return '/makineler'
    if (t.includes('el')) return '/el-aletleri'
    if (t.includes('hırdavat')) return '/hirdavat'
    return '/bataryalar'
  }
  return (
    <div className="absolute left-0 right-0 top-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {columns.map(col => (
          <div key={col.title}>
            <Link to={mapHref(col.title)} className="font-semibold text-gray-900" onClick={onClose}
            >
              {col.title}
            </Link>
            <ul className="mt-3 space-y-2 text-sm">
              {col.items.map(x => (
                <li key={x}>
                  <Link
                    to={`${mapHref(col.title)}?sub=${subSlug(x)}`}
                    className="text-gray-700 hover:text-primary-700"
                    onClick={onClose}
                  >
                    {x}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
