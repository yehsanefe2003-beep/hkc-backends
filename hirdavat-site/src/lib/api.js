const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

function getToken() {
  return localStorage.getItem('hkc_token')
}

async function req(path, options = {}) {
  const token = getToken()
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${BASE}${path}`, { ...options, headers })
  const text = await res.text()
  let data
  try {
    data = JSON.parse(text)
  } catch (err) {
    throw new Error(res.ok ? 'Sunucudan geçersiz yanıt alındı.' : `Sunucu hatası (${res.status}): Sistem henüz güncellenmemiş olabilir. Lütfen 1-2 dakika bekleyip tekrar deneyin.`)
  }
  if (!res.ok) throw new Error(data.error || 'Bir hata oluştu.')
  return data
}

export const api = {
  // Auth
  register: (body) => req('/api/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => req('/api/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  googleAuth: (credential) => req('/api/auth/google', { method: 'POST', body: JSON.stringify({ credential }) }),
  changePassword: (body) => req('/api/auth/change-password', { method: 'PUT', body: JSON.stringify(body) }),
  updateProfile: (body) => req('/api/auth/update-profile', { method: 'PUT', body: JSON.stringify(body) }),
  forgotPassword: (email) => req('/api/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) }),
  verifyResetCode: (email, code) => req('/api/auth/verify-reset-code', { method: 'POST', body: JSON.stringify({ email, code }) }),
  resetPassword: (email, code, new_password) => req('/api/auth/reset-password', { method: 'POST', body: JSON.stringify({ email, code, new_password }) }),

  // Products (static meta)
  getPrices: () => req('/api/products/prices'),
  updateProduct: (id, body) => req(`/api/products/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  bulkUpdateProducts: (products) => req('/api/products/bulk', { method: 'POST', body: JSON.stringify({ products }) }),

  // Catalog (admin managed products)
  getCatalog: () => req('/api/products/catalog'),
  createCatalogProduct: (body) => req('/api/products/catalog', { method: 'POST', body: JSON.stringify(body) }),
  updateCatalogProduct: (id, body) => req(`/api/products/catalog/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteCatalogProduct: (id) => req(`/api/products/catalog/${id}`, { method: 'DELETE' }),

  // Orders
  createOrder: (body) => req('/api/orders', { method: 'POST', body: JSON.stringify(body) }),
  getMyOrders: () => req('/api/orders/my'),
  getAllOrders: () => req('/api/orders'),
  updateOrderStatus: (id, status) => req(`/api/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  deleteOrder: (id) => req(`/api/orders/${id}`, { method: 'DELETE' }),
  createPttBarcode: (id, warehouse_id) => req(`/api/orders/${id}/ptt-barcode`, { method: 'POST', body: JSON.stringify({ warehouse_id }) }),
  getStats: () => req('/api/orders/admin/stats'),

  // Addresses
  getAddresses: () => req('/api/addresses'),
  createAddress: (body) => req('/api/addresses', { method: 'POST', body: JSON.stringify(body) }),
  updateAddress: (id, body) => req(`/api/addresses/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteAddress: (id) => req(`/api/addresses/${id}`, { method: 'DELETE' }),

  // Upload
  uploadImages: async (files) => {
    const token = localStorage.getItem('hkc_token')
    const formData = new FormData()
    Array.from(files).forEach(f => formData.append('images', f))
    const res = await fetch(`${BASE}/api/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Yükleme başarısız.')
    return data.urls
  },
}
