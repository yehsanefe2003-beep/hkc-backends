import { useState } from 'react'
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
