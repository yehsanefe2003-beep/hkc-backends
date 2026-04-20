import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../lib/api.js'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // 1: email, 2: kod, 3: yeni şifre
  const [email, setEmail] = useState('')
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const codeRefs = useRef([])

  // Adım 1 – Email gönder
  async function handleSendCode(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.forgotPassword(email)
      setStep(2)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Kod input yönetimi
  function handleCodeChange(val, idx) {
    const v = val.replace(/\D/g, '').slice(-1)
    const next = [...code]
    next[idx] = v
    setCode(next)
    if (v && idx < 5) codeRefs.current[idx + 1]?.focus()
  }

  function handleCodeKeyDown(e, idx) {
    if (e.key === 'Backspace' && !code[idx] && idx > 0) {
      codeRefs.current[idx - 1]?.focus()
    }
  }

  function handleCodePaste(e) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted.length === 6) {
      setCode(pasted.split(''))
      codeRefs.current[5]?.focus()
    }
  }

  // Adım 2 – Kodu doğrula
  async function handleVerifyCode(e) {
    e.preventDefault()
    setError('')
    const fullCode = code.join('')
    if (fullCode.length < 6) {
      setError('Lütfen 6 haneli kodu eksiksiz girin.')
      return
    }
    setLoading(true)
    try {
      await api.verifyResetCode(email, fullCode)
      setStep(3)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Adım 3 – Yeni şifre
  async function handleResetPassword(e) {
    e.preventDefault()
    setError('')
    if (newPassword !== newPasswordConfirm) {
      setError('Şifreler eşleşmiyor.')
      return
    }
    if (newPassword.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır.')
      return
    }
    setLoading(true)
    try {
      await api.resetPassword(email, code.join(''), newPassword)
      setSuccess(true)
      setTimeout(() => navigate('/giris'), 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8">

          {/* Başarı ekranı */}
          {success ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Şifre Sıfırlandı!</h2>
              <p className="text-sm text-gray-500">Yeni şifreniz başarıyla belirlendi. Giriş sayfasına yönlendiriliyorsunuz...</p>
            </div>
          ) : (
            <>
              {/* Adım göstergesi */}
              <div className="flex items-center justify-center gap-2 mb-6">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                      step >= s ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {step > s ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : s}
                    </div>
                    {s < 3 && <div className={`w-8 h-0.5 ${step > s ? 'bg-primary-600' : 'bg-gray-200'}`} />}
                  </div>
                ))}
              </div>

              {/* Hata */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Adım 1: Email */}
              {step === 1 && (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">Şifremi Unuttum</h1>
                  <p className="text-sm text-gray-500 mb-6">Email adresinize 6 haneli doğrulama kodu göndereceğiz.</p>
                  <form onSubmit={handleSendCode} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Adresi</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                        placeholder="ornek@email.com"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-60"
                    >
                      {loading ? 'Gönderiliyor...' : 'Kod Gönder'}
                    </button>
                  </form>
                </>
              )}

              {/* Adım 2: Kod */}
              {step === 2 && (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">Doğrulama Kodu</h1>
                  <p className="text-sm text-gray-500 mb-6">
                    <span className="font-medium text-gray-700">{email}</span> adresine gönderilen 6 haneli kodu girin.
                  </p>
                  <form onSubmit={handleVerifyCode} className="space-y-6">
                    <div className="flex gap-2 justify-center" onPaste={handleCodePaste}>
                      {code.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={el => codeRefs.current[idx] = el}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={e => handleCodeChange(e.target.value, idx)}
                          onKeyDown={e => handleCodeKeyDown(e, idx)}
                          className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                        />
                      ))}
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-60"
                    >
                      {loading ? 'Doğrulanıyor...' : 'Kodu Doğrula'}
                    </button>
                  </form>
                  <button
                    onClick={() => { setStep(1); setCode(['','','','','','']); setError('') }}
                    className="mt-4 w-full text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    ← Farklı email kullan
                  </button>
                </>
              )}

              {/* Adım 3: Yeni şifre */}
              {step === 3 && (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">Yeni Şifre</h1>
                  <p className="text-sm text-gray-500 mb-6">Hesabınız için yeni bir şifre belirleyin.</p>
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Yeni Şifre</label>
                      <input
                        type="password"
                        required
                        minLength={6}
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                        placeholder="En az 6 karakter"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Şifre Tekrar</label>
                      <input
                        type="password"
                        required
                        minLength={6}
                        value={newPasswordConfirm}
                        onChange={e => setNewPasswordConfirm(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                        placeholder="Şifreyi tekrar girin"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-60"
                    >
                      {loading ? 'Kaydediliyor...' : 'Şifremi Sıfırla'}
                    </button>
                  </form>
                </>
              )}

              <p className="mt-6 text-center text-sm text-gray-500">
                <Link to="/giris" className="text-primary-600 hover:text-primary-700 font-medium">
                  ← Giriş sayfasına dön
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
