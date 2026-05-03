import { useEffect, useCallback } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

export default function GoogleAuthButton({ onSuccess, onError }) {
  const { googleLogin } = useAuth()

  const handleCredentialResponse = useCallback(async (response) => {
    try {
      const user = await googleLogin(response.credential)
      onSuccess?.(user)
    } catch (err) {
      onError?.(err.message || 'Google girişi başarısız.')
    }
  }, [googleLogin, onSuccess, onError])

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return

    const loadGsi = () => {
      if (!window.google) return
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        ux_mode: 'popup',
      })
      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-btn'),
        {
          theme: 'outline',
          size: 'large',
          width: '100%',
          text: 'continue_with',
          locale: 'tr',
        }
      )
    }

    if (window.google) {
      loadGsi()
    } else {
      // Script yoksa yükle
      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      script.onload = loadGsi
      document.head.appendChild(script)
    }
  }, [handleCredentialResponse])

  if (!GOOGLE_CLIENT_ID) {
    return (
      <div className="w-full p-3 bg-gray-50 border border-dashed border-gray-300 rounded-lg text-center text-xs text-gray-400">
        Google OAuth: VITE_GOOGLE_CLIENT_ID ayarlanmadı
      </div>
    )
  }

  return (
    <div className="w-full">
      <div
        id="google-signin-btn"
        className="w-full flex justify-center"
        style={{ minHeight: '44px' }}
      />
    </div>
  )
}
