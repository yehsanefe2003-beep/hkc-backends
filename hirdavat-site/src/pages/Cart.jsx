import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext.jsx'
import { useAuth } from '../contexts/AuthContext.jsx'

function fmt(n) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(n)
}

function resolveImg(src) {
  if (!src) return ''
  if (src.startsWith('http') || src.startsWith('//')) return src
  return encodeURI(src.startsWith('/') ? src : `/${src}`)
}

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total, itemCount } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold text-gray-900">Sepetiniz boş</h1>
        <p className="mt-2 text-gray-500">Ürünleri inceleyip sepete ekleyebilirsiniz.</p>
        <Link to="/" className="mt-6 inline-block px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          Alışverişe Başla
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Sepetim ({itemCount} ürün)</h1>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Ürün listesi */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="w-20 h-20 border rounded-lg overflow-hidden flex-shrink-0 bg-gray-50 flex items-center justify-center">
                {item.image ? (
                  <img
                    src={resolveImg(item.image)}
                    alt={item.name}
                    className="max-w-full max-h-full object-contain"
                    onError={e => { e.currentTarget.style.display = 'none' }}
                  />
                ) : (
                  <span className="text-gray-300 text-2xl font-bold">{item.name.charAt(0)}</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <Link to={`/urun/${item.id}`} className="font-medium text-gray-900 hover:text-primary-600 text-sm line-clamp-2">
                  {item.name}
                </Link>
                <p className="mt-1 text-primary-600 font-semibold">{fmt(item.price)}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full border flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
                >−</button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full border flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
                >+</button>
              </div>

              <div className="text-right">
                <p className="font-semibold text-gray-900">{fmt(item.price * item.quantity)}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-1 text-xs text-red-500 hover:text-red-700"
                >Kaldır</button>
              </div>
            </div>
          ))}
        </div>

        {/* Özet */}
        <div className="mt-8 lg:mt-0">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Sipariş Özeti</h2>
            <div className="space-y-2 text-sm">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-gray-600">
                  <span className="truncate mr-2">{item.name} × {item.quantity}</span>
                  <span className="flex-shrink-0">{fmt(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4 flex justify-between font-bold text-gray-900">
              <span>Toplam</span>
              <span className="text-primary-600">{fmt(total)}</span>
            </div>
            <button
              onClick={() => {
                if (!user) return navigate('/giris')
                navigate('/odeme')
              }}
              className="mt-6 w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              {user ? 'Siparişi Tamamla' : 'Giriş Yaparak Devam Et'}
            </button>
            <Link to="/" className="mt-3 block text-center text-sm text-gray-500 hover:text-gray-700">
              Alışverişe Devam Et
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
