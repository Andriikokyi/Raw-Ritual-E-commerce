import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

// ── Icon components ───────────────────────────────────────────────────────────

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

function IconClose({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}

// ── User dropdown ─────────────────────────────────────────────────────────────

function UserDropdown({ scrolled, onClose }) {
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
      zIndex: 10,
    }}>
      {/* User info */}
      <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(44,26,14,.08)', background: 'var(--cream)' }}>
        <p style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--brown)' }}>{user.name}</p>
        <p style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '2px' }}>{user.email}</p>
      </div>

      {/* Links */}
      {[
        { to: '/profile/orders',    label: 'My Orders' },
        { to: '/profile/favorites', label: 'Saved Items' },
        { to: '/profile/settings',  label: 'Settings' },
      ].map(({ to, label }) => (
        <Link
          key={to} to={to} onClick={onClose}
          style={{ display: 'block', padding: '11px 16px', fontSize: '0.85rem', color: 'var(--charcoal)', transition: 'background 0.15s ease' }}
          onMouseEnter={e => e.target.style.background = 'rgba(44,26,14,.04)'}
          onMouseLeave={e => e.target.style.background = 'transparent'}
        >
          {label}
        </Link>
      ))}

      <div style={{ borderTop: '1px solid rgba(44,26,14,.08)' }}>
        <button
          onClick={handleLogout}
          style={{ width: '100%', textAlign: 'left', padding: '11px 16px', fontSize: '0.85rem', color: '#b43232', transition: 'background 0.15s ease' }}
          onMouseEnter={e => e.target.style.background = 'rgba(180,50,50,.04)'}
          onMouseLeave={e => e.target.style.background = 'transparent'}
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}

// ── Main Nav ──────────────────────────────────────────────────────────────────

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [userDropdown, setUserDropdown] = useState(false)
  const userRef = useRef(null)

  const { itemCount, openCart } = useCart()
  const { user, openLogin } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const onClick = (e) => { if (userRef.current && !userRef.current.contains(e.target)) setUserDropdown(false) }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const iconColor = scrolled ? 'var(--brown)' : 'var(--cream)'

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        height: 'var(--nav-h)',
        display: 'flex',
        alignItems: 'center',
        background: scrolled ? 'rgba(253,249,243,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(44,26,14,.08)' : '1px solid transparent',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 24px' }}>

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
            {[
              { to: '/shop',    label: 'Shop' },
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
                  style={{
                    padding: '6px 10px',
                    display: 'flex', alignItems: 'center', gap: '6px',
                    color: iconColor,
                    transition: 'color 0.3s ease',
                  }}
                >
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: 'var(--gold)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', fontWeight: 700, color: 'white', letterSpacing: '0',
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
              {userDropdown && (
                <UserDropdown scrolled={scrolled} onClose={() => setUserDropdown(false)} />
              )}
            </div>
          </div>

          {/* Mobile: cart + hamburger */}
          <div style={{ display: 'none', alignItems: 'center', gap: '4px' }} className="nav-mobile">
            <button
              onClick={openCart}
              aria-label="Open cart"
              style={{ position: 'relative', padding: '8px', color: iconColor }}
            >
              <IconBag size={22} />
              {itemCount > 0 && (
                <span style={{
                  position: 'absolute', top: '2px', right: '2px',
                  minWidth: '15px', height: '15px',
                  background: 'var(--gold)', color: 'white',
                  borderRadius: '10px', fontSize: '0.55rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '0 3px',
                }}>
                  {itemCount}
                </span>
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
        @media (min-width: 769px) {
          .nav-mobile { display: none !important; }
        }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile  { display: flex !important; }
        }
      `}</style>
    </>
  )
}
