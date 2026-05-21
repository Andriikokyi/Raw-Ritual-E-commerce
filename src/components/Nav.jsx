import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { products, categories } from '../data/products'

// ── Icons ─────────────────────────────────────────────────────────────────────

function IconBag({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  )
}

function IconUser({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )
}

function IconArrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  )
}

// ── Mega Menu ─────────────────────────────────────────────────────────────────

const CATEGORY_ICONS = {
  all:     '✦',
  bars:    '⬡',
  honey:   '◈',
  nuts:    '◉',
  candles: '◎',
}

function MegaMenu({ visible, onClose }) {
  const [activeCategory, setActiveCategory] = useState('all')

  const menuCategories = [
    { id: 'all', label: 'Shop All', sub: 'Explore everything' },
    ...categories
      .filter(c => c.id !== 'all')
      .map(c => ({
        id: c.id,
        label: c.label,
        sub: `${products.filter(p => p.category === c.id).length} products`,
      })),
  ]

  const featured = activeCategory === 'all'
    ? products.slice(0, 4)
    : products.filter(p => p.category === activeCategory).slice(0, 4)

  return (
    <div
      onMouseLeave={onClose}
      style={{
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(860px, 96vw)',
        background: 'var(--ivory)',
        borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
        boxShadow: '0 24px 64px rgba(44,26,14,.18)',
        border: '1px solid rgba(44,26,14,.08)',
        borderTop: 'none',
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible
          ? 'translateX(-50%) translateY(0)'
          : 'translateX(-50%) translateY(-8px)',
        pointerEvents: visible ? 'all' : 'none',
        transition: 'opacity 0.22s ease, transform 0.22s ease',
        zIndex: 100,
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr' }}>

        {/* Left — category list */}
        <div style={{ background: 'var(--cream)', padding: '24px 0', borderRight: '1px solid rgba(44,26,14,.07)' }}>
          <p style={{
            padding: '0 20px 12px',
            fontSize: '0.6rem',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
          }}>
            Categories
          </p>
          {menuCategories.map(cat => {
            const isActive = activeCategory === cat.id
            return (
              <Link
                key={cat.id}
                to={cat.id === 'all' ? '/shop' : `/shop?cat=${cat.id}`}
                onClick={onClose}
                onMouseEnter={() => setActiveCategory(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 20px',
                  background: isActive ? 'rgba(201,148,58,.08)' : 'transparent',
                  borderLeft: isActive ? '2px solid var(--gold)' : '2px solid transparent',
                  transition: 'background 0.15s ease, border-color 0.15s ease',
                  textDecoration: 'none',
                }}
              >
                <span style={{ fontSize: '0.85rem', color: isActive ? 'var(--gold)' : 'var(--muted)', transition: 'color 0.15s ease', lineHeight: 1 }}>
                  {CATEGORY_ICONS[cat.id] || '◆'}
                </span>
                <div>
                  <p style={{
                    fontSize: '0.82rem',
                    fontWeight: isActive ? 500 : 400,
                    color: isActive ? 'var(--brown)' : 'var(--charcoal)',
                    transition: 'color 0.15s ease',
                    marginBottom: '2px',
                  }}>
                    {cat.label}
                  </p>
                  <p style={{ fontSize: '0.68rem', color: 'var(--muted)' }}>{cat.sub}</p>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Right — product thumbnails */}
        <div style={{ padding: '24px 24px 28px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '16px',
          }}>
            <p style={{
              fontSize: '0.6rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}>
              {activeCategory === 'all' ? 'Featured' : menuCategories.find(c => c.id === activeCategory)?.label}
            </p>
            <Link
              to={activeCategory === 'all' ? '/shop' : `/shop?category=${activeCategory}`}
              onClick={onClose}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.08em',
                color: 'var(--gold)', textTransform: 'uppercase',
              }}
            >
              View All <IconArrow />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {featured.map(product => (
              <Link
                key={product.id}
                to={`/product/${product.slug}`}
                onClick={onClose}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  borderRadius: 'var(--radius)',
                  overflow: 'hidden',
                  aspectRatio: '3/4',
                  marginBottom: '8px',
                  background: 'var(--beige)',
                  position: 'relative',
                }}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
                <p style={{
                  fontSize: '0.72rem',
                  fontWeight: 500,
                  color: 'var(--brown)',
                  marginBottom: '2px',
                  lineHeight: 1.3,
                }}>
                  {product.shortName || product.name}
                </p>
                <p style={{ fontSize: '0.7rem', color: 'var(--gold)', fontFamily: 'var(--serif)' }}>
                  {product.priceDisplay}
                </p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

// ── User Dropdown ─────────────────────────────────────────────────────────────

function UserDropdown({ onClose }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    onClose()
    navigate('/')
  }

  return (
    <div style={{
      position: 'absolute', top: 'calc(100% + 12px)', right: 0,
      width: '200px',
      background: 'var(--ivory)',
      borderRadius: 'var(--radius)',
      boxShadow: 'var(--shadow-lg)',
      border: '1px solid rgba(44,26,14,.1)',
      overflow: 'hidden',
      zIndex: 200,
    }}>
      <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(44,26,14,.08)', background: 'var(--cream)' }}>
        <p style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--brown)' }}>{user.name}</p>
        <p style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '2px' }}>{user.email}</p>
      </div>
      {[
        { to: '/profile/orders',    label: 'My Orders' },
        { to: '/profile/favorites', label: 'Saved Items' },
        { to: '/profile/settings',  label: 'Settings' },
      ].map(({ to, label }) => (
        <Link
          key={to} to={to} onClick={onClose}
          style={{ display: 'block', padding: '11px 16px', fontSize: '0.85rem', color: 'var(--charcoal)', transition: 'background 0.15s ease' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(44,26,14,.04)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          {label}
        </Link>
      ))}
      <div style={{ borderTop: '1px solid rgba(44,26,14,.08)' }}>
        <button
          onClick={handleLogout}
          style={{ width: '100%', textAlign: 'left', padding: '11px 16px', fontSize: '0.85rem', color: '#b43232', transition: 'background 0.15s ease' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(180,50,50,.04)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}

// ── Main Nav ──────────────────────────────────────────────────────────────────

export default function Nav() {
  const [scrolled, setScrolled]         = useState(false)
  const [menuOpen, setMenuOpen]         = useState(false)
  const [userDropdown, setUserDropdown] = useState(false)
  const [megaVisible, setMegaVisible]   = useState(false)

  const userRef  = useRef(null)
  const shopRef  = useRef(null)
  const hideTimer = useRef(null)

  const { itemCount, openCart } = useCart()
  const { user, openLogin }     = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onClick = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) setUserDropdown(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  // Close mega menu when scrolling
  useEffect(() => {
    const onScroll = () => setMegaVisible(false)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const showMega = useCallback(() => {
    clearTimeout(hideTimer.current)
    setMegaVisible(true)
  }, [])

  const hideMega = useCallback(() => {
    hideTimer.current = setTimeout(() => setMegaVisible(false), 120)
  }, [])

  const iconColor = scrolled || megaVisible ? 'var(--brown)' : 'var(--cream)'

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        height: 'var(--nav-h)',
        display: 'flex',
        alignItems: 'center',
        background: scrolled || megaVisible ? 'rgba(253,249,243,0.97)' : 'transparent',
        backdropFilter: scrolled || megaVisible ? 'blur(12px)' : 'none',
        borderBottom: scrolled || megaVisible ? '1px solid rgba(44,26,14,.08)' : '1px solid transparent',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: '100%', maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 24px',
          position: 'relative',
        }}>

          {/* Logo */}
          <Link to="/" style={{
            fontFamily: 'var(--serif)',
            fontSize: '1.5rem',
            fontWeight: 300,
            letterSpacing: '0.1em',
            color: iconColor,
            textTransform: 'uppercase',
            transition: 'color 0.3s ease',
          }}>
            Raw Ritual
          </Link>

          {/* Desktop nav links */}
          <ul style={{ display: 'flex', gap: '36px', alignItems: 'center' }} className="nav-desktop">

            {/* Shop — with mega menu trigger */}
            <li ref={shopRef} style={{ position: 'relative' }}
                onMouseEnter={showMega}
                onMouseLeave={hideMega}>
              <NavLink
                to="/shop"
                style={({ isActive }) => ({
                  fontFamily: 'var(--sans)',
                  fontSize: '0.78rem',
                  fontWeight: 400,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: isActive || megaVisible ? 'var(--gold)' : iconColor,
                  transition: 'color 0.2s ease',
                  borderBottom: isActive || megaVisible ? '1px solid var(--gold)' : '1px solid transparent',
                  paddingBottom: '2px',
                  display: 'flex', alignItems: 'center', gap: '5px',
                })}
              >
                Shop
                <svg
                  width="10" height="10" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transition: 'transform 0.2s ease', transform: megaVisible ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </NavLink>

              {/* Mega menu — positioned relative to nav container, not this li */}
              <div
                onMouseEnter={showMega}
                onMouseLeave={hideMega}
                style={{
                  position: 'fixed',
                  top: 'var(--nav-h)',
                  left: 0, right: 0,
                  zIndex: 999,
                  pointerEvents: megaVisible ? 'all' : 'none',
                }}
              >
                <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 24px' }}>
                  <MegaMenu visible={megaVisible} onClose={() => setMegaVisible(false)} />
                </div>
              </div>
            </li>

            {[
              { to: '/story',   label: 'Our Story' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} style={({ isActive }) => ({
                  fontFamily: 'var(--sans)',
                  fontSize: '0.78rem',
                  fontWeight: 400,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--gold)' : iconColor,
                  transition: 'color 0.2s ease',
                  borderBottom: isActive ? '1px solid var(--gold)' : '1px solid transparent',
                  paddingBottom: '2px',
                })}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="nav-desktop">

            {/* Cart */}
            <button
              onClick={openCart}
              aria-label={`Open cart (${itemCount} items)`}
              style={{ position: 'relative', padding: '8px', color: iconColor, transition: 'color 0.3s ease' }}
            >
              <IconBag />
              {itemCount > 0 && (
                <span style={{
                  position: 'absolute', top: '2px', right: '2px',
                  minWidth: '16px', height: '16px',
                  background: 'var(--gold)', color: 'white',
                  borderRadius: '10px', fontSize: '0.6rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '0 4px',
                  border: scrolled ? '1.5px solid var(--ivory)' : '1.5px solid transparent',
                  lineHeight: 1,
                }}>
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>

            {/* User */}
            <div ref={userRef} style={{ position: 'relative' }}>
              {user ? (
                <button
                  onClick={() => setUserDropdown(v => !v)}
                  aria-label="Account menu"
                  style={{ padding: '6px 10px', display: 'flex', alignItems: 'center', gap: '6px', color: iconColor, transition: 'color 0.3s ease' }}
                >
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: 'var(--gold)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', fontWeight: 700, color: 'white',
                  }}>
                    {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                </button>
              ) : (
                <button
                  onClick={openLogin}
                  aria-label="Sign in"
                  style={{ padding: '8px', color: iconColor, transition: 'color 0.3s ease' }}
                >
                  <IconUser />
                </button>
              )}
              {userDropdown && <UserDropdown onClose={() => setUserDropdown(false)} />}
            </div>
          </div>

          {/* Mobile: cart + hamburger */}
          <div style={{ display: 'none', alignItems: 'center', gap: '4px' }} className="nav-mobile">
            <button onClick={openCart} aria-label="Open cart"
              style={{ position: 'relative', padding: '8px', color: iconColor }}>
              <IconBag size={22} />
              {itemCount > 0 && (
                <span style={{
                  position: 'absolute', top: '2px', right: '2px',
                  minWidth: '15px', height: '15px',
                  background: 'var(--gold)', color: 'white',
                  borderRadius: '10px', fontSize: '0.55rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3px',
                }}>{itemCount}</span>
              )}
            </button>
            <button
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(v => !v)}
              style={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '8px', color: iconColor }}
            >
              {[0,1,2].map(i => (
                <span key={i} style={{
                  display: 'block', width: '22px', height: '1.5px',
                  background: 'currentColor', transition: 'transform 0.25s ease, opacity 0.25s ease',
                  transform: menuOpen
                    ? i === 0 ? 'rotate(45deg) translate(5px,5px)'
                    : i === 2 ? 'rotate(-45deg) translate(5px,-5px)' : 'scaleX(0)'
                    : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile drawer */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: 'var(--brown)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '28px',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s ease',
      }}>
        {[
          { to: '/',        label: 'Home' },
          { to: '/shop',    label: 'Shop' },
          { to: '/story',   label: 'Our Story' },
          { to: '/contact', label: 'Contact' },
        ].map(({ to, label }) => (
          <Link key={to} to={to} onClick={() => setMenuOpen(false)}
            style={{ fontFamily: 'var(--serif)', fontSize: '2.5rem', fontWeight: 300, color: 'var(--cream)', letterSpacing: '0.06em' }}>
            {label}
          </Link>
        ))}
        <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
          {user ? (
            <Link to="/profile/orders" onClick={() => setMenuOpen(false)}
              className="btn btn-ghost" style={{ fontSize: '0.8rem' }}>
              My Profile
            </Link>
          ) : (
            <button onClick={() => { setMenuOpen(false); openLogin() }}
              className="btn btn-ghost" style={{ fontSize: '0.8rem' }}>
              Sign In
            </button>
          )}
        </div>
      </div>

      <style>{`
        @media (min-width: 769px) { .nav-mobile { display: none !important; } }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile  { display: flex !important; }
        }
      `}</style>
    </>
  )
}
