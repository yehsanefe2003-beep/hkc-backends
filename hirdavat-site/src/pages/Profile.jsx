import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { api } from '../lib/api.js'

export default function Profile() {
  const { user, logout, login } = useAuth()
  const navigate = useNavigate()

  const [nameForm, setNameForm] = useState({ full_name: user?.full_name || '' })
  const [nameMsg, setNameMsg] = useState('')
  const [nameLoading, setNameLoading] = useState(false)

  const [pwForm, setPwForm] = useState({ current_password: '', new_password: '', confirm_password: '' })
  const [pwMsg, setPwMsg] = useState('')
  const [pwError, setPwError] = useState('')
  const [pwLoading, setPwLoading] = useState(false)
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)

  if (!user) {
    navigate('/giris')
    return null
  }

  const [addresses, setAddresses] = useState([])
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [addressForm, setAddressForm] = useState({ title: '', full_name: '', phone: '', address: '', city: '', district: '' })
  const [editingAddressId, setEditingAddressId] = useState(null)
  
  useEffect(() => {
    if (user) fetchAddresses()
  }, [user])

  async function fetchAddresses() {
    try {
      const data = await api.getAddresses()
      setAddresses(data)
    } catch (err) {
      console.error(err)
    }
  }

  async function handleAddressSubmit(e) {
    e.preventDefault()
    try {
      if (editingAddressId) {
        await api.updateAddress(editingAddressId, addressForm)
      } else {
        await api.createAddress(addressForm)
      }
      setAddressForm({ title: '', full_name: '', phone: '', address: '', city: '', district: '' })
      setShowAddressForm(false)
      setEditingAddressId(null)
      fetchAddresses()
    } catch (err) {
      alert(err.message)
    }
  }

  async function handleDeleteAddress(id) {
    if (!confirm('Adresi silmek istediğinize emin misiniz?')) return
    try {
      await api.deleteAddress(id)
      fetchAddresses()
    } catch (err) {
      alert(err.message)
    }
  }

  function handleEditAddress(addr) {
    setAddressForm(addr)
    setEditingAddressId(addr.id)
    setShowAddressForm(true)
  }

  const isGoogle = !user.email // fallback — Google users don't have passwords

  async function handleNameSubmit(e) {
    e.preventDefault()
    if (!nameForm.full_name.trim()) return
    setNameLoading(true); setNameMsg('')
    try {
      const result = await api.updateProfile({ full_name: nameForm.full_name.trim() })
      // AuthContext'i güncelle
      localStorage.setItem('hkc_token', result.token)
      login(result.token, result.user)
      setNameMsg('✓ Ad Soyad güncellendi.')
      setTimeout(() => setNameMsg(''), 3000)
    } catch (err) {
      setNameMsg('Hata: ' + err.message)
    } finally {
      setNameLoading(false)
    }
  }

  async function handlePwSubmit(e) {
    e.preventDefault()
    setPwError(''); setPwMsg('')
    if (pwForm.new_password !== pwForm.confirm_password) return setPwError('Yeni şifreler eşleşmiyor.')
    if (pwForm.new_password.length < 6) return setPwError('Yeni şifre en az 6 karakter olmalıdır.')
    setPwLoading(true)
    try {
      await api.changePassword({
        current_password: pwForm.current_password,
        new_password: pwForm.new_password,
      })
      setPwMsg('✓ Şifreniz başarıyla değiştirildi.')
      setPwForm({ current_password: '', new_password: '', confirm_password: '' })
      setTimeout(() => setPwMsg(''), 4000)
    } catch (err) {
      setPwError(err.message)
    } finally {
      setPwLoading(false)
    }
  }

  const strength = (pw) => {
    if (!pw) return 0
    let s = 0
    if (pw.length >= 6) s++
    if (pw.length >= 10) s++
    if (/[A-Z]/.test(pw)) s++
    if (/[0-9]/.test(pw)) s++
    if (/[^A-Za-z0-9]/.test(pw)) s++
    return s
  }
  const sw = strength(pwForm.new_password)
  const strengthColors = ['', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-lime-400', 'bg-green-500']
  const strengthLabels = ['', 'Çok Zayıf', 'Zayıf', 'Orta', 'Güçlü', 'Çok Güçlü']

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xl">
          {user.full_name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || '?'}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hesabım</h1>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Profil Bilgileri */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-4">Profil Bilgileri</h2>
          <form onSubmit={handleNameSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
              <input
                value={nameForm.full_name}
                onChange={e => setNameForm({ full_name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                placeholder="Ad Soyad"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input value={user.email} disabled
                className="w-full border bg-gray-50 rounded-lg px-3 py-2.5 text-sm text-gray-400 cursor-not-allowed" />
              <p className="text-xs text-gray-400 mt-1">Email adresi değiştirilemez.</p>
            </div>
            {nameMsg && (
              <div className={`text-sm px-3 py-2 rounded-lg ${nameMsg.startsWith('✓') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {nameMsg}
              </div>
            )}
            <button type="submit" disabled={nameLoading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-60">
              {nameLoading ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </form>
        </div>

        {/* Adreslerim */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-800">Adreslerim</h2>
            <button onClick={() => { setShowAddressForm(!showAddressForm); setAddressForm({ title: '', full_name: '', phone: '', address: '', city: '', district: '' }); setEditingAddressId(null); }} className="text-sm bg-primary-50 text-primary-600 px-3 py-1.5 rounded-lg hover:bg-primary-100 font-medium">
              {showAddressForm ? 'İptal' : '+ Yeni Adres Ekle'}
            </button>
          </div>

          {showAddressForm && (
            <form onSubmit={handleAddressSubmit} className="mb-6 p-4 border border-gray-100 bg-gray-50 rounded-xl space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Adres Başlığı</label>
                  <input required value={addressForm.title} onChange={e => setAddressForm({...addressForm, title: e.target.value})} placeholder="Ev, İş vb." className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-400 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Ad Soyad</label>
                  <input required value={addressForm.full_name} onChange={e => setAddressForm({...addressForm, full_name: e.target.value})} placeholder="Teslim alacak kişi" className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-400 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Telefon</label>
                  <input required value={addressForm.phone} onChange={e => setAddressForm({...addressForm, phone: e.target.value.replace(/\D/g, '').slice(0, 11)})} maxLength={11} minLength={11} placeholder="05555555555" className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-400 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">İl</label>
                  <input required value={addressForm.city} onChange={e => setAddressForm({...addressForm, city: e.target.value})} placeholder="İstanbul" className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-400 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">İlçe</label>
                  <input required value={addressForm.district} onChange={e => setAddressForm({...addressForm, district: e.target.value})} placeholder="Kadıköy" className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-400 focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Açık Adres</label>
                <textarea required value={addressForm.address} onChange={e => setAddressForm({...addressForm, address: e.target.value})} placeholder="Mahalle, sokak, bina no..." className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-400 focus:outline-none h-20 resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 rounded-lg text-sm transition-colors">
                {editingAddressId ? 'Adresi Güncelle' : 'Adresi Kaydet'}
              </button>
            </form>
          )}

          <div className="space-y-3">
            {addresses.length === 0 && !showAddressForm && (
              <p className="text-sm text-gray-500 text-center py-4 border border-dashed rounded-lg">Henüz kayıtlı adresiniz bulunmuyor.</p>
            )}
            {addresses.map(addr => (
              <div key={addr.id} className="border border-gray-200 rounded-xl p-4 hover:border-primary-300 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">{addr.title}</h3>
                    <p className="text-xs text-gray-500 font-medium">{addr.full_name} - {addr.phone}</p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => handleEditAddress(addr)} className="text-xs text-blue-600 hover:underline">Düzenle</button>
                    <button onClick={() => handleDeleteAddress(addr.id)} className="text-xs text-red-600 hover:underline">Sil</button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{addr.address}</p>
                <p className="text-xs text-gray-500 mt-1">{addr.district} / {addr.city}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Şifre Değiştir */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-1">Şifre Değiştir</h2>
          <p className="text-sm text-gray-400 mb-4">Güvenliğiniz için şifrenizi düzenli olarak güncelleyin.</p>

          <form onSubmit={handlePwSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mevcut Şifre</label>
              <div className="relative">
                <input
                  type={showCurrent ? 'text' : 'password'}
                  value={pwForm.current_password}
                  onChange={e => setPwForm(f => ({ ...f, current_password: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                  placeholder="Mevcut şifrenizi girin"
                />
                <button type="button" onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showCurrent ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Yeni Şifre</label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  value={pwForm.new_password}
                  onChange={e => setPwForm(f => ({ ...f, new_password: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                  placeholder="Yeni şifrenizi girin"
                />
                <button type="button" onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showNew ? '🙈' : '👁️'}
                </button>
              </div>
              {/* Şifre gücü */}
              {pwForm.new_password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className={`flex-1 h-1.5 rounded-full transition-colors ${i <= sw ? strengthColors[sw] : 'bg-gray-200'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{strengthLabels[sw]}</p>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Yeni Şifre (Tekrar)</label>
              <input
                type="password"
                value={pwForm.confirm_password}
                onChange={e => setPwForm(f => ({ ...f, confirm_password: e.target.value }))}
                className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 ${pwForm.confirm_password && pwForm.confirm_password !== pwForm.new_password ? 'border-red-300' : 'border-gray-300'}`}
                placeholder="Yeni şifreyi tekrar girin"
              />
              {pwForm.confirm_password && pwForm.confirm_password !== pwForm.new_password && (
                <p className="text-xs text-red-500 mt-1">Şifreler eşleşmiyor.</p>
              )}
            </div>

            {pwError && <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{pwError}</div>}
            {pwMsg && <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">{pwMsg}</div>}

            <button type="submit" disabled={pwLoading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-60">
              {pwLoading ? 'Değiştiriliyor...' : 'Şifreyi Değiştir'}
            </button>
          </form>
        </div>

        {/* Hesap tehlike bölgesi */}
        <div className="bg-white border border-red-100 rounded-2xl p-6">
          <h2 className="font-semibold text-red-700 mb-1">Çıkış Yap</h2>
          <p className="text-sm text-gray-400 mb-4">Hesabınızdan güvenli şekilde çıkış yapın.</p>
          <button
            onClick={() => { logout(); navigate('/') }}
            className="px-5 py-2.5 border border-red-300 text-red-600 rounded-lg text-sm hover:bg-red-50 transition-colors font-medium"
          >
            Çıkış Yap
          </button>
        </div>
      </div>
    </div>
  )
}
