/**
 * Module-level cache: uygulama yaşam döngüsü boyunca catalog ürünlerini saklar.
 * Böylece sayfa değişimlerinde yeniden fetch yapılmaz.
 */
const cache = {
  all: null,         // tüm ürünler
  byCategory: {},    // kategori bazlı liste
  promise: null,     // devam eden fetch
  ts: 0,            // son güncelleme timestamp
}

const TTL = 60_000
const BASE = import.meta.env.VITE_API_URL || ''  // '' = relative path, Vite proxy'den geçer

async function fetchAll() {
  if (cache.promise) return cache.promise
  cache.promise = fetch(`${BASE}/api/products/storefront`)
    .then(r => r.json())
    .then(data => {
      const arr = Array.isArray(data) ? data : []
      cache.all = arr
      cache.byCategory = {}
      arr.forEach(p => {
        if (!cache.byCategory[p.category]) cache.byCategory[p.category] = []
        cache.byCategory[p.category].push(p)
      })
      cache.ts = Date.now()
      return arr
    })
    .finally(() => { cache.promise = null })
  return cache.promise
}

/** Cache'i geçersiz kıl (admin ürün ekleme/silme sonrası çağrılır) */
export function invalidateCatalogCache() {
  cache.all = null
  cache.byCategory = {}
  cache.ts = 0
}

import { useState, useEffect } from 'react'

/**
 * Belirtilen kategori için catalog ürünlerini döner.
 * İlk yüklemede fetch, sonrasında cache'den anında gelir.
 */
export function useCatalogProducts(category) {
  const isFresh = cache.all !== null && Date.now() - cache.ts < TTL

  // Eğer cache varsa anında ver, yoksa boş başlat
  const [catalogItems, setCatalogItems] = useState(
    isFresh ? (cache.byCategory[category] || []) : []
  )
  const [loading, setLoading] = useState(!isFresh)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isFresh) {
      setCatalogItems(cache.byCategory[category] || [])
      setLoading(false)
      return
    }
    let cancelled = false
    setLoading(true)
    fetchAll()
      .then(() => {
        if (!cancelled) {
          setCatalogItems(cache.byCategory[category] || [])
        }
      })
      .catch(e => { if (!cancelled) setError(e.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [category])

  return { catalogItems, loading, error }
}
