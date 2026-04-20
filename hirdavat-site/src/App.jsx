import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { CartProvider } from './contexts/CartContext.jsx'
import Home from './pages/Home.jsx'
import Makineler from './pages/Makineler.jsx'
import ElAletleri from './pages/ElAletleri.jsx'
import Hirdavat from './pages/Hirdavat.jsx'
import Bataryalar from './pages/Bataryalar.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Orders from './pages/Orders.jsx'
import Admin from './pages/Admin.jsx'
import Profile from './pages/Profile.jsx'
import Legal from './pages/Legal.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

function ScrollToTop() {
  const location = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])
  return null
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 to-white">
          <ScrollToTop />
          <div className="sticky top-0 z-30 bg-white">
            <Header />
          </div>
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/makineler" element={<Makineler />} />
              <Route path="/el-aletleri" element={<ElAletleri />} />
              <Route path="/hirdavat" element={<Hirdavat />} />
              <Route path="/bataryalar" element={<Bataryalar />} />
              <Route path="/urun/:id" element={<ProductDetail />} />
              <Route path="/giris" element={<Login />} />
              <Route path="/kayit" element={<Register />} />
              <Route path="/sifremi-unuttum" element={<ForgotPassword />} />
              <Route path="/sepet" element={<Cart />} />
              <Route path="/odeme" element={<Checkout />} />
              <Route path="/siparislerim" element={<Orders />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/profil" element={<Profile />} />
              <Route path="/bilgi/:pageId" element={<Legal />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
