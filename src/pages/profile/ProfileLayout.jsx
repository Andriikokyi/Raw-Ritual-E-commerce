import { NavLink, Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function IconOrders() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg>
}
function IconHeart() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
}
function IconSettings() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
}

const NAV_ITEMS = [
  { to: '/profile/orders',    label: 'My Orders',   Icon: IconOrders },
  { to: '/profile/favorites', label: 'Saved Items',  Icon: IconHeart },
  { to: '/profile/settings',  label: 'Settings',    Icon: IconSettings },
]

export default function ProfileLayout() {
  const { user, isLoggedIn, openLogin } = useAuth()

  if (!isLoggedIn) {
    // Prompt to log in instead of hard redirect
    return (
      <main style={{ paddingTop: 'var(--nav-h)', minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="section-label" style={{ marginBottom: '16px' }}>Account</p>
          <h2 style={{ color: 'var(--brown)', marginBottom: '16px' }}>Sign in to view your profile</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>
            Access your orders, saved items, and account settings.
          </p>
          <button onClick={openLogin} className="btn btn-primary">Sign In</button>
        </div>
      </main>
    )
  }

  return (
    <main style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: 'var(--ivory)' }}>
      {/* Profile header */}
      <div style={{ background: 'var(--brown)', padding: '48px 0 40px' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Avatar */}
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: 'var(--gold)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.2rem', fontWeight: 700, color: 'white', letterSpacing: 0,
              flexShrink: 0,
            }}>
              {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', fontWeight: 300, color: 'var(--cream)', marginBottom: '2px' }}>
                {user.name}
              </p>
              <p style={{ fontSize: '0.82rem', color: 'rgba(238,224,200,.6)' }}>{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '40px', alignItems: 'start' }}>

          {/* Sidebar */}
          <nav style={{ background: 'var(--cream)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
            {NAV_ITEMS.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 20px',
                  fontSize: '0.88rem',
                  fontWeight: 400,
                  color: isActive ? 'var(--brown)' : 'var(--muted)',
                  background: isActive ? 'rgba(201,148,58,.08)' : 'transparent',
                  borderLeft: isActive ? '3px solid var(--gold)' : '3px solid transparent',
                  transition: 'all 0.2s ease',
                })}
              >
                <Icon />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Page content */}
          <div>
            <Outlet />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 220px 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  )
}
