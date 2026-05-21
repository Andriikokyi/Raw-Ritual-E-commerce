import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'

import Nav from './components/Nav'
import Footer from './components/Footer'
import CartModal from './components/CartModal'
import AuthModal from './components/AuthModal'

import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Story from './pages/Story'
import Contact from './pages/Contact'

import ProfileLayout from './pages/profile/ProfileLayout'
import Orders from './pages/profile/Orders'
import Favorites from './pages/profile/Favorites'
import Settings from './pages/profile/Settings'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AppShell() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <CartModal />
      <AuthModal />

      <Routes>
        <Route path="/"              element={<Home />} />
        <Route path="/shop"          element={<Shop />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/story"         element={<Story />} />
        <Route path="/contact"       element={<Contact />} />

        {/* Profile — nested routes */}
        <Route path="/profile" element={<ProfileLayout />}>
          <Route index element={<Navigate to="/profile/orders" replace />} />
          <Route path="orders"    element={<Orders />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="settings"  element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppShell />
      </CartProvider>
    </AuthProvider>
  )
}

function NotFound() {
  return (
    <main style={{ paddingTop: 'var(--nav-h)', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <p className="section-label" style={{ marginBottom: '16px' }}>404</p>
        <h1 style={{ color: 'var(--brown)', marginBottom: '16px' }}>Page not found</h1>
        <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>The page you're looking for doesn't exist.</p>
        <a href="/" className="btn btn-primary">Back to Home</a>
      </div>
    </main>
  )
}
