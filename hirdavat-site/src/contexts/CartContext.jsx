import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { api } from '../lib/api.js'

const PricesContext = createContext({})
const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hkc_cart') || '[]') } catch { return [] }
  })
  const [prices, setPrices] = useState({})

  const refreshPrices = useCallback(() => {
    api.getPrices().then(setPrices).catch(() => {})
  }, [])

  useEffect(() => {
    refreshPrices()
  }, [])

  useEffect(() => {
    localStorage.setItem('hkc_cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = useCallback((product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i)
      }
      const meta = prices[product.id]
      const finalPrice = (product.price > 0) ? product.price : (meta?.price || 0)
      return [...prev, { id: product.id, name: product.name, image: product.image, price: finalPrice, quantity }]
    })
  }, [prices])

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }, [])

  const updateQuantity = useCallback((id, quantity) => {
    if (quantity <= 0) { removeFromCart(id); return }
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity } : i))
  }, [removeFromCart])

  const clearCart = useCallback(() => setCart([]), [])

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const itemCount = cart.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <PricesContext.Provider value={prices}>
      <CartContext.Provider value={{ cart, prices, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount, refreshPrices }}>
        {children}
      </CartContext.Provider>
    </PricesContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}

export function usePrices() {
  return useContext(PricesContext)
}
