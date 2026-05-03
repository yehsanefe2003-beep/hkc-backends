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
        <div className="min-h-screen flex flex-col bg-[#fafafa] text-[#111827] relative overflow-x-hidden selection:bg-primary-500/20">
          {/* Soft Light Background Orbs */}
          <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary-200/40 blur-[120px] pointer-events-none" />
          <div className="fixed bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] rounded-full bg-primary-300/30 blur-[100px] pointer-events-none" />
          
          <ScrollToTop />
          <div className="sticky top-0 z-50 glass border-b border-gray-200">
            <Header />
          </div>
          <main className="flex-1 relative z-10">
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
