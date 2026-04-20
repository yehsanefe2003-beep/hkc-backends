import { useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext.jsx'
import { useAuth } from '../contexts/AuthContext.jsx'
import { api } from '../lib/api.js'

function fmt(n) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(n)
}

function formatCardNumber(v) {
  return v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}
function formatExpiry(v) {
  const d = v.replace(/\D/g, '').slice(0, 4)
  if (d.length >= 3) return d.slice(0, 2) + '/' + d.slice(2)
  return d
}

// --- Kredi Kartı Görsel Bileşeni ---
function CreditCard({ number, name, expiry, cvv, flipped }) {
  const displayNumber = (number.replace(/ /g, '') || '').padEnd(16, '•')
  const chunks = [
    displayNumber.slice(0, 4),
    displayNumber.slice(4, 8),
    displayNumber.slice(8, 12),
    displayNumber.slice(12, 16),
  ]
  const exp = expiry || 'AA/YY'

  return (
    <div className="relative w-full" style={{ perspective: '1000px' }}>
      <div
        className="relative w-full transition-transform duration-700"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          height: '180px',
        }}
      >
        {/* Ön yüz */}
        <div
          className="absolute inset-0 rounded-2xl p-5 flex flex-col justify-between overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)',
            boxShadow: '0 20px 40px rgba(30, 58, 138, 0.4)',
          }}
        >
          {/* Chip ve logo */}
          <div className="flex items-start justify-between">
            <div className="w-10 h-8 rounded bg-yellow-300/80 border border-yellow-400/60" style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)' }} />
            <div className="text-white text-xs font-bold opacity-80 tracking-widest">VISA</div>
          </div>
          {/* Numara */}
          <div className="flex gap-3 text-white font-mono text-xl tracking-widest">
            {chunks.map((c, i) => <span key={i}>{c}</span>)}
          </div>
          {/* Alt bilgi */}
          <div className="flex justify-between items-end">
            <div>
              <p className="text-blue-200 text-xs mb-0.5 uppercase tracking-wider">Kart Sahibi</p>
              <p className="text-white font-medium text-sm truncate max-w-[140px]">
                {name || 'AD SOYAD'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-blue-200 text-xs mb-0.5">Son Kullanma</p>
              <p className="text-white font-medium text-sm">{exp}</p>
            </div>
          </div>
          {/* Dekoratif daireler */}
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/5" />
          <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/5" />
        </div>

        {/* Arka yüz */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)',
            boxShadow: '0 20px 40px rgba(30, 58, 138, 0.4)',
          }}
        >
          <div className="h-10 bg-gray-800/80 mt-8 w-full" />
          <div className="flex items-center gap-3 mt-4 px-6">
            <div className="flex-1 h-8 bg-white/20 rounded" />
            <div className="w-16 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-gray-800 font-bold text-sm tracking-widest">
                {cvv ? cvv.replace(/./g, '•') : '•••'}
              </span>
            </div>
          </div>
          <p className="text-center text-blue-300 text-xs mt-2">CVV</p>
        </div>
      </div>
    </div>
  )
}

// --- Ana Checkout Bileşeni ---
export default function Checkout() {
  const { cart, total, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState(1) // 1: Teslimat, 2: Ödeme
  const [shipping, setShipping] = useState({ shipping_address: '', phone: '', note: '' })
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' })
  const [cardFlipped, setCardFlipped] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(null)
  const [agreed, setAgreed] = useState(false)

  const handleCardChange = useCallback((field, value) => {
    setCard(prev => ({ ...prev, [field]: value }))
  }, [])

  if (!user) return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <h1 className="text-xl font-bold">Önce giriş yapmalısınız.</h1>
      <Link to="/giris" className="mt-4 inline-block px-5 py-2 bg-primary-600 text-white rounded-lg">Giriş Yap</Link>
    </div>
  )
  if (cart.length === 0 && !success) return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <h1 className="text-xl font-bold">Sepetiniz boş.</h1>
      <Link to="/" className="mt-4 inline-block px-5 py-2 bg-primary-600 text-white rounded-lg">Alışverişe Başla</Link>
    </div>
  )

  if (success) return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <div className="bg-white border rounded-2xl p-10 shadow-xl">
        {/* Animasyonlu tik */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Siparişiniz Alındı!</h1>
        <p className="mt-2 text-gray-500">
          Sipariş No: <span className="font-bold text-primary-600">#{success}</span>
        </p>
        <p className="mt-1 text-sm text-gray-400">
          Ödeme bilgileriniz güvenle işlendi. En kısa sürede sizinle iletişime geçeceğiz.
        </p>
        <div className="mt-8 flex gap-3 justify-center">
          <Link to="/siparislerim" className="px-5 py-2.5 border rounded-lg text-sm hover:bg-gray-50 font-medium">Siparişlerim</Link>
          <Link to="/" className="px-5 py-2.5 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 font-medium">Ana Sayfa</Link>
        </div>
      </div>
    </div>
  )

  async function handleSubmit(e) {
    e.preventDefault()
    if (!shipping.shipping_address) return setError('Teslimat adresi zorunludur.')
    if (!card.number || card.number.replace(/ /g,'').length < 16) return setError('Kart numarası 16 haneli olmalıdır.')
    if (!card.expiry || card.expiry.length < 5) return setError('Son kullanma tarihi geçersiz.')
    if (!card.cvv || card.cvv.length < 3) return setError('CVV en az 3 haneli olmalıdır.')
    if (!card.name) return setError('Kart üzerindeki isim zorunludur.')
    if (!agreed) return setError('Ön Bilgilendirme Formu ve Mesafeli Satış Sözleşmesini onaylamanız gerekmektedir.')
    setError('')
    setLoading(true)
    try {
      const result = await api.createOrder({
        items: cart,
        shipping_address: shipping.shipping_address,
        phone: shipping.phone,
        note: shipping.note,
        payment_method: 'credit_card',
      })
      clearCart()
      setSuccess(result.orderId)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Sipariş Tamamla</h1>

      {/* Adım göstergesi */}
      <div className="flex items-center gap-2 mb-8">
        {[{ n: 1, label: 'Teslimat' }, { n: 2, label: 'Ödeme' }].map(({ n, label }) => (
          <div key={n} className="flex items-center gap-2">
            <button
              onClick={() => { if (n < step || (n === 2 && shipping.shipping_address)) setStep(n) }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                step === n ? 'bg-primary-600 text-white' :
                n < step ? 'bg-primary-100 text-primary-700 hover:bg-primary-200 cursor-pointer' :
                'bg-gray-100 text-gray-400'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${step === n ? 'bg-white text-primary-600' : n < step ? 'bg-primary-600 text-white' : 'bg-gray-300 text-gray-500'}`}>
                {n < step ? '✓' : n}
              </span>
              {label}
            </button>
            {n === 1 && <div className={`flex-1 h-0.5 w-8 ${step >= 2 ? 'bg-primary-400' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2 space-y-5">

            {/* ADIM 1: Teslimat */}
            <div className={`transition-all duration-500 ${step === 1 ? 'opacity-100' : 'hidden'}`}>
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                <h2 className="font-semibold text-gray-800">Teslimat Bilgileri</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Ad Soyad</label>
                    <input value={user.full_name} disabled className="w-full border bg-gray-50 rounded-lg px-3 py-2.5 text-sm text-gray-500" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Email</label>
                    <input value={user.email} disabled className="w-full border bg-gray-50 rounded-lg px-3 py-2.5 text-sm text-gray-500" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Telefon</label>
                  <input type="tel" value={shipping.phone} onChange={e => setShipping(s => ({ ...s, phone: e.target.value }))}
                    placeholder="05XX XXX XX XX" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Teslimat Adresi *</label>
                  <textarea required value={shipping.shipping_address}
                    onChange={e => setShipping(s => ({ ...s, shipping_address: e.target.value }))}
                    rows={4} placeholder="Mahalle, bina no, daire, ilçe, şehir"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Not (opsiyonel)</label>
                  <input value={shipping.note} onChange={e => setShipping(s => ({ ...s, note: e.target.value }))}
                    placeholder="Kapıda bekleyeceğim, zil çalmasın..." className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
                </div>
                <div className="flex gap-3 pt-2">
                  <Link
                    to="/sepet"
                    className="px-5 py-3 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center text-gray-700"
                  >
                    ← Sepete Dön
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      if (!shipping.shipping_address) return setError('Teslimat adresi zorunludur.')
                      setError('')
                      setStep(2)
                    }}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-colors"
                  >
                    Ödemeye Geç →
                  </button>
                </div>
              </div>
            </div>

            {/* ADIM 2: Ödeme */}
            <div className={`transition-all duration-500 ${step === 2 ? 'opacity-100' : 'hidden'}`}>
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-5">
                <h2 className="font-semibold text-gray-800">Ödeme Bilgileri</h2>

                {/* Animasyonlu kart */}
                <CreditCard
                  number={card.number}
                  name={card.name}
                  expiry={card.expiry}
                  cvv={card.cvv}
                  flipped={cardFlipped}
                />

                {/* Kart form alanları */}
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Kart Numarası</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="0000 0000 0000 0000"
                      value={card.number}
                      onChange={e => handleCardChange('number', formatCardNumber(e.target.value))}
                      onFocus={() => setCardFlipped(false)}
                      maxLength={19}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-primary-400"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Kart Üzerindeki İsim</label>
                    <input
                      type="text"
                      placeholder="AD SOYAD"
                      value={card.name}
                      onChange={e => handleCardChange('name', e.target.value.toUpperCase())}
                      onFocus={() => setCardFlipped(false)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-primary-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Son Kullanma</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="AA/YY"
                        value={card.expiry}
                        onChange={e => handleCardChange('expiry', formatExpiry(e.target.value))}
                        onFocus={() => setCardFlipped(false)}
                        maxLength={5}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-400"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">CVV</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="•••"
                        value={card.cvv}
                        onChange={e => handleCardChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                        onFocus={() => setCardFlipped(true)}
                        onBlur={() => setCardFlipped(false)}
                        maxLength={4}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Güvenlik notu */}
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-100 rounded-lg">
                  <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <p className="text-xs text-green-700">256-bit SSL şifrelemeli güvenli ödeme</p>
                </div>

                {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}

                <div className="flex items-start gap-3 p-3 bg-gray-50 border rounded-xl">
                  <input
                    type="checkbox"
                    id="agreed"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 cursor-pointer"
                  />
                  <label htmlFor="agreed" className="text-xs text-gray-600 leading-tight select-none cursor-pointer">
                    <Link to="/bilgi/on-bilgilendirme" target="_blank" className="font-semibold text-primary-600 hover:underline">Ön Bilgilendirme Formunu</Link> okudum ve <Link to="/bilgi/iptal-iade" target="_blank" className="font-semibold text-primary-600 hover:underline">Mesafeli Satış Sözleşmesi ile İptal ve İade Koşullarını</Link> kabul ediyorum.
                  </label>
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => { setStep(1); setError('') }}
                    className="px-5 py-3 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                    ← Geri
                  </button>
                  <button type="submit" disabled={loading}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        İşleniyor...
                      </>
                    ) : `Siparişi Onayla — ${fmt(total)}`}
                  </button>
                </div>
              </div>
            </div>

            {step === 1 && error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>
            )}
          </div>

          {/* Sepet özeti — sabit */}
          <div className="mt-8 lg:mt-0">
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm sticky top-24">
              <h2 className="font-bold text-gray-900 mb-4">Sepet ({cart.length} ürün)</h2>
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="w-10 h-10 border rounded bg-gray-50 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      {item.image ? <img src={encodeURI(item.image.startsWith('/') ? item.image : `/${item.image}`)} alt={item.name} className="max-w-full max-h-full object-contain" onError={e => { e.currentTarget.style.display='none' }} /> : <span className="text-gray-300 font-bold">{item.name.charAt(0)}</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-700 line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-400">{item.quantity} adet × {fmt(item.price)}</p>
                    </div>
                    <p className="text-sm font-semibold flex-shrink-0">{fmt(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-4 flex justify-between font-bold text-gray-900">
                <span>Toplam</span>
                <span className="text-primary-600 text-lg">{fmt(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
