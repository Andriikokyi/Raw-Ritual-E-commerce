import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export default function AuthModal() {
  const { authModal, authTab, setAuthTab, closeAuthModal, login, register } = useAuth()

  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [regForm, setRegForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Reset errors on tab change
  useEffect(() => { setError('') }, [authTab])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = authModal ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [authModal])

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeAuthModal() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeAuthModal])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 300)) // slight delay for realism
    const res = login(loginForm)
    setLoading(false)
    if (!res.ok) setError(res.error)
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    if (regForm.password !== regForm.confirm) {
      setError('Passwords do not match.')
      return
    }
    if (regForm.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 300))
    const res = register({ name: regForm.name, email: regForm.email, password: regForm.password })
    setLoading(false)
    if (!res.ok) setError(res.error)
  }

  if (!authModal) return null

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeAuthModal}
        style={{
          position: 'fixed', inset: 0, zIndex: 1200,
          background: 'rgba(44,26,14,.6)',
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Sign in or create account"
        style={{
          position: 'fixed',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1201,
          width: 'min(460px, calc(100vw - 32px))',
          background: 'var(--cream)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
        }}
      >
        {/* Close */}
        <button
          onClick={closeAuthModal}
          aria-label="Close"
          style={{
            position: 'absolute', top: '16px', right: '16px',
            color: 'var(--muted)', fontSize: '1.2rem', zIndex: 1, padding: '4px 8px',
          }}
        >✕</button>

        {/* Brand mark */}
        <div style={{ background: 'var(--brown)', padding: '28px 32px 20px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', fontWeight: 300, letterSpacing: '0.1em', color: 'var(--cream)' }}>
            Raw Ritual
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(44,26,14,.1)' }}>
          {[['login', 'Sign In'], ['register', 'Create Account']].map(([tab, label]) => (
            <button
              key={tab}
              onClick={() => setAuthTab(tab)}
              style={{
                flex: 1, padding: '14px',
                fontFamily: 'var(--sans)', fontSize: '0.78rem', fontWeight: 500,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: authTab === tab ? 'var(--brown)' : 'var(--muted)',
                borderBottom: authTab === tab ? '2px solid var(--gold)' : '2px solid transparent',
                background: 'var(--ivory)',
                transition: 'color 0.2s, border-color 0.2s',
              }}
            >{label}</button>
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: '28px 32px 32px' }}>

          {/* Error */}
          {error && (
            <div style={{
              padding: '10px 14px', marginBottom: '16px',
              background: 'rgba(180,50,50,.08)', border: '1px solid rgba(180,50,50,.2)',
              borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', color: '#b43232',
            }}>
              {error}
            </div>
          )}

          {authTab === 'login' ? (
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="auth-email">Email</label>
                <input
                  id="auth-email" type="email" className="form-input"
                  placeholder="your@email.com" required
                  value={loginForm.email}
                  onChange={e => setLoginForm(p => ({ ...p, email: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="auth-password">Password</label>
                <input
                  id="auth-password" type="password" className="form-input"
                  placeholder="••••••••" required
                  value={loginForm.password}
                  onChange={e => setLoginForm(p => ({ ...p, password: e.target.value }))}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ justifyContent: 'center', padding: '14px', marginTop: '4px' }}
              >
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
              <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--muted)' }}>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthTab('register')}
                  style={{ color: 'var(--gold)', fontWeight: 500, textDecoration: 'underline' }}
                >
                  Create one
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="reg-name">Full Name</label>
                <input
                  id="reg-name" type="text" className="form-input"
                  placeholder="Anna Smith" required
                  value={regForm.name}
                  onChange={e => setRegForm(p => ({ ...p, name: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="reg-email">Email</label>
                <input
                  id="reg-email" type="email" className="form-input"
                  placeholder="your@email.com" required
                  value={regForm.email}
                  onChange={e => setRegForm(p => ({ ...p, email: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="reg-pw">Password</label>
                <input
                  id="reg-pw" type="password" className="form-input"
                  placeholder="Min. 6 characters" required minLength={6}
                  value={regForm.password}
                  onChange={e => setRegForm(p => ({ ...p, password: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="reg-confirm">Confirm Password</label>
                <input
                  id="reg-confirm" type="password" className="form-input"
                  placeholder="Repeat password" required
                  value={regForm.confirm}
                  onChange={e => setRegForm(p => ({ ...p, confirm: e.target.value }))}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ justifyContent: 'center', padding: '14px', marginTop: '4px' }}
              >
                {loading ? 'Creating account…' : 'Create Account'}
              </button>
              <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--muted)' }}>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthTab('login')}
                  style={{ color: 'var(--gold)', fontWeight: 500, textDecoration: 'underline' }}
                >
                  Sign in
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
