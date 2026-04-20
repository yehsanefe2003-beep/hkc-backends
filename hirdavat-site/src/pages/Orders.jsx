import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { api } from '../lib/api.js'

function fmt(n) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(n)
}

const STATUS_LABELS = {
  pending: { label: 'Beklemede', color: 'bg-yellow-100 text-yellow-800' },
  confirmed: { label: 'Onaylandı', color: 'bg-blue-100 text-blue-800' },
  shipped: { label: 'Kargoda', color: 'bg-purple-100 text-purple-800' },
  delivered: { label: 'Teslim Edildi', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'İptal Edildi', color: 'bg-red-100 text-red-800' },
}

function resolveImg(src) {
  if (!src) return ''
  if (src.startsWith('http') || src.startsWith('//')) return src
  return encodeURI(src.startsWith('/') ? src : `/${src}`)
}

export default function Orders() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    api.getMyOrders()
      .then(setOrders)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [user])

  if (!user) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <h1 className="text-xl font-bold">Giriş yapmanız gerekiyor.</h1>
        <Link to="/giris" className="mt-4 inline-block px-5 py-2 bg-primary-600 text-white rounded-lg">Giriş Yap</Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Siparişlerim</h1>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Yükleniyor...</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">📦</div>
          <p className="text-gray-500 text-lg">Henüz siparişiniz yok.</p>
          <Link to="/" className="mt-4 inline-block px-5 py-2 bg-primary-600 text-white rounded-lg text-sm">Alışverişe Başla</Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => {
            const s = STATUS_LABELS[order.status] || STATUS_LABELS.pending
            return (
              <div key={order.id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-sm text-gray-500">Sipariş No:</span>
                    <span className="ml-1 font-bold text-gray-900">#{order.id}</span>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${s.color}`}>{s.label}</span>
                  <div className="text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString('tr-TR')}
                  </div>
                  <div className="font-bold text-primary-600">{fmt(order.total_amount)}</div>
                </div>
                <div className="px-6 py-4">
                  <div className="space-y-2">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <div className="w-10 h-10 border rounded bg-gray-50 flex-shrink-0 flex items-center justify-center overflow-hidden">
                          {item.image ? (
                            <img src={resolveImg(item.image)} alt={item.name} className="max-w-full max-h-full object-contain" onError={e => { e.currentTarget.style.display = 'none' }} />
                          ) : <span className="text-gray-300">{item.name?.charAt(0)}</span>}
                        </div>
                        <span className="flex-1 text-gray-700">{item.name}</span>
                        <span className="text-gray-500">{item.quantity} adet</span>
                        <span className="font-medium">{fmt(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  {order.shipping_address && (
                    <div className="mt-3 pt-3 border-t text-sm text-gray-500">
                      <span className="font-medium">Adres: </span>{order.shipping_address}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
