import { useSearchParams } from 'react-router-dom'
import { useMemo } from 'react'
import products from '../shared/products.js'
import CategoryLayout from '../components/CategoryLayout.jsx'
import { useCatalogProducts } from '../hooks/useCatalogProducts.js'

const slug = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

export default function Bataryalar() {
  const [params] = useSearchParams()
  const sub = params.get('sub')
  const { catalogItems } = useCatalogProducts('bataryalar')

  const items = useMemo(() => {
    let staticItems = products.filter(p => p.category === 'bataryalar')
    if (sub) staticItems = staticItems.filter(p => slug(p.subcategory) === sub)
    return [...staticItems, ...catalogItems]
  }, [sub, catalogItems])

  return <CategoryLayout title="Bataryalar (Musluk)" items={items} />
}
