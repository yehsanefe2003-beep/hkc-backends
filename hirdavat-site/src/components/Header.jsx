import { Link, useNavigate } from 'react-router-dom'
import { useMemo, useState, useEffect, useRef } from 'react'
import MegaMenu from './MegaMenu.jsx'
import products from '../shared/products.js'
import Logo from './Logo.jsx'
import OfferModal from './OfferModal.jsx'
import PromoBar from './PromoBar.jsx'
import { useCart } from '../contexts/CartContext.jsx'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useCatalogProducts } from '../hooks/useCatalogProducts.js'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [offerOpen, setOfferOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const navRef = useRef(null)
  const userMenuRef = useRef(null)
  const navigate = useNavigate()
  const { itemCount, prices } = useCart()
  const { user, logout, isAdmin } = useAuth()

  const normalize = (s) => s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ş/g, 's')
    .replace(/ç/g, 'c')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
  const { catalogItems } = useCatalogProducts('all') // Use the hook to get dynamic products
  const allProducts = useMemo(() => [...products.filter(p => !prices[p.id]?.deleted), ...catalogItems], [catalogItems, prices])

  const results = useMemo(() => {
    const q = normalize(query.trim())
    if (q.length < 1) return []
    const scored = allProducts.map(p => {
      const name = normalize(p.name)
      const brand = normalize(p.brand || '')
      const cat = normalize(p.category || '')
      const hay = `${name} ${brand} ${cat}`
      const match = hay.includes(q)
      const score = match ? (name.startsWith(q) ? 2 : brand.startsWith(q) ? 1 : 0) : -1
      return { p, score }
    }).filter(x => x.score >= 0)
    scored.sort((a, b) => b.score - a.score)
    return scored.slice(0, 8).map(x => x.p)
  }, [query, allProducts])

  const primaryCategory = (brand) => {
    const list = allProducts.filter(p => p.brand === brand)
    const counts = list.reduce((acc, p) => { acc[p.category] = (acc[p.category] || 0) + 1; return acc }, {})
    const best = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0]
    return best || list[0]?.category || 'makineler'
  }
  const submit = (e) => {
    e.preventDefault()
    const q = normalize(query.trim())
    const brands = Array.from(new Set(products.map(p => p.brand))).filter(Boolean)
    const found = brands.find(b => normalize(b) === q)
    if (found) {
      const cat = primaryCategory(found)
      navigate(`/${cat}?brand=${encodeURIComponent(found)}`)
      setQuery('')
      return
    }
    if (results[0]) {
      navigate(`/urun/${results[0].id}`)
      setQuery('')
    }
  }
  useEffect(() => {
    if (!open) return
    const onClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('touchstart', onClickOutside)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('touchstart', onClickOutside)
    }
  }, [open])
  return (
    <header className="w-full">
      <PromoBar />
      <div className="border-b border-gray-200 bg-white/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between text-sm">
          <span className="text-gray-600 font-medium tracking-wide text-xs uppercase"> Oto Bakım ve Yapı Market Ürünleri</span>
          <a href="tel:05448765907" className="text-gray-600 hover:text-gray-900 transition-colors">İletişim</a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center gap-4 sm:gap-6">
        <button
          className="md:hidden p-2 -ml-2 text-gray-700"
          onClick={() => setMobileMenuOpen(true)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Logo />
        <div className="flex-1">
          <form className="relative" onSubmit={submit}>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                type="search"
                placeholder="Ürün, kategori veya marka ara..."
                className="w-full glass rounded-xl h-11 pl-11 pr-4 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500 text-gray-900 placeholder-gray-500 transition-all shadow-sm"
              />
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
            {results.length > 0 && (
              <div className="absolute left-0 right-0 top-full bg-white border rounded mt-2 shadow z-50">
                {results.map(r => (
                  <Link key={r.id} to={`/urun/${r.id}`} onClick={() => setQuery('')} className="block px-3 py-2 text-sm hover:bg-gray-50">
                    <span className="font-medium">{r.name}</span>
                    <span className="text-gray-500"> — {r.brand}</span>
                  </Link>
                ))}
              </div>
            )}
          </form>
        </div>
        <div className="flex items-center gap-4">
          {/* Sepet ikonu */}
          <Link to="/sepet" className="relative p-2.5 glass rounded-xl text-gray-700 hover:text-primary-600 hover:border-primary-500/50 transition-all group">
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </Link>

          {/* Kullanıcı menüsü */}
          <div className="relative" ref={userMenuRef}>
            {user ? (
              <>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 hover:text-primary-600 border rounded-lg hover:border-primary-300 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="hidden sm:block max-w-[100px] truncate">{user.full_name || user.email}</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded-xl shadow-xl z-50 py-1">
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm text-purple-700 hover:bg-purple-50 font-medium">
                        🛡️ Admin Paneli
                      </Link>
                    )}
                    <Link to="/siparislerim" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      📦 Siparişlerim
                    </Link>
                    <Link to="/profil" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      ⚙️ Hesabım
                    </Link>
                    <div className="border-t my-1" />
                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); navigate('/') }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Çıkış Yap
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/giris" className="text-sm font-medium text-gray-700 hover:text-primary-600 px-4 py-2 glass rounded-xl hover:border-primary-500/50 transition-all">
                  Giriş
                </Link>
                <Link to="/kayit" className="hidden sm:block text-sm btn-premium px-5 py-2 rounded-xl">
                  Kayıt Ol
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <nav className="hidden md:block border-t border-gray-200 relative bg-white/20" ref={navRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center gap-8 text-sm font-medium tracking-wide">
          <button onClick={() => setOpen(!open)} className="text-gray-700 hover:text-primary-600 transition-colors flex items-center gap-2">
            <span>Tüm Kategoriler</span>
            <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          <div className="w-px h-4 bg-gray-300" />
          <Link to="/makineler" className="text-gray-700 hover:text-primary-600 hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.3)] transition-all">Makineler</Link>
          <Link to="/el-aletleri" className="text-gray-700 hover:text-primary-600 hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.3)] transition-all">El Aletleri</Link>
          <Link to="/hirdavat" className="text-gray-700 hover:text-primary-600 hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.3)] transition-all">Hırdavat</Link>
          <Link to="/bataryalar" className="text-gray-700 hover:text-primary-600 hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.3)] transition-all">Bataryalar (Musluk)</Link>
        </div>
        <MegaMenu open={open} onClose={() => setOpen(false)} />
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-xl flex flex-col overflow-y-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <span className="font-semibold text-lg">Menü</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-4">
              <Link to="/makineler" className="block text-gray-800 font-medium" onClick={() => setMobileMenuOpen(false)}>Makineler</Link>
              <Link to="/el-aletleri" className="block text-gray-800 font-medium" onClick={() => setMobileMenuOpen(false)}>El Aletleri</Link>
              <Link to="/hirdavat" className="block text-gray-800 font-medium" onClick={() => setMobileMenuOpen(false)}>Hırdavat</Link>
              <Link to="/bataryalar" className="block text-gray-800 font-medium" onClick={() => setMobileMenuOpen(false)}>Bataryalar (Musluk)</Link>
              <div className="border-t pt-4 mt-4 space-y-2">
                <Link to="/sepet" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between w-full px-4 py-2 border rounded font-medium">
                  <span>🛒 Sepetim</span>
                  {itemCount > 0 && <span className="bg-primary-600 text-white text-xs px-2 py-0.5 rounded-full">{itemCount}</span>}
                </Link>
                {user ? (
                  <>
                    <Link to="/siparislerim" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 border rounded text-gray-700">📦 Siparişlerim</Link>
                    {isAdmin && <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 border rounded text-purple-700">🛡️ Admin</Link>}
                    <button onClick={() => { logout(); setMobileMenuOpen(false); navigate('/') }} className="w-full px-4 py-2 border rounded text-red-600 text-left">Çıkış Yap</button>
                  </>
                ) : (
                  <>
                    <Link to="/giris" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 border rounded text-center">Giriş Yap</Link>
                    <Link to="/kayit" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 bg-primary-600 text-white rounded text-center">Kayıt Ol</Link>
                  </>
                )}
                <div className="pt-2 text-sm text-gray-600">
                  <p>İletişim: <a href="tel:05448765907" className="text-primary-600">0544 876 59 07</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <OfferModal open={offerOpen} onClose={() => setOfferOpen(false)} />
    </header>
  )
}
