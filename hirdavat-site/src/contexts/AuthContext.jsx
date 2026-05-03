import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../lib/api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('hkc_user')
    const token = localStorage.getItem('hkc_token')
    if (stored && token) {
      try { setUser(JSON.parse(stored)) } catch { logout() }
    }
    setLoading(false)
  }, [])

  async function login(email, password) {
    const data = await api.login({ email, password })
    localStorage.setItem('hkc_token', data.token)
    localStorage.setItem('hkc_user', JSON.stringify(data.user))
    setUser(data.user)
    return data.user
  }

  async function register(full_name, email, password) {
    const data = await api.register({ full_name, email, password })
    localStorage.setItem('hkc_token', data.token)
    localStorage.setItem('hkc_user', JSON.stringify(data.user))
    setUser(data.user)
    return data.user
  }

  async function googleLogin(credential) {
    const data = await api.googleAuth(credential)
    localStorage.setItem('hkc_token', data.token)
    localStorage.setItem('hkc_user', JSON.stringify(data.user))
    setUser(data.user)
    return data.user
  }

  function logout() {
    localStorage.removeItem('hkc_token')
    localStorage.removeItem('hkc_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, googleLogin, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
