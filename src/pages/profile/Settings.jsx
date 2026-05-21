import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function Settings() {
  const { user, getFullProfile, updateProfile, logout } = useAuth()

  const [profileForm, setProfileForm] = useState({ name: '', email: '' })
  const [addressForm, setAddressForm] = useState({ line1: '', city: '', postcode: '', country: '' })
  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' })
  const [profileMsg, setProfileMsg] = useState(null)
  const [addressMsg, setAddressMsg] = useState(null)
  const [pwMsg, setPwMsg] = useState(null)
  const [loading, setLoading] = useState('')

  useEffect(() => {
    const profile = getFullProfile()
    if (profile) {
      setProfileForm({ name: profile.name, email: profile.email })
      setAddressForm({ line1: profile.address?.line1 ?? '', city: profile.address?.city ?? '', postcode: profile.address?.postcode ?? '', country: profile.address?.country ?? '' })
    }
  }, [user])

  const showMsg = (setter, msg, isError = false) => {
    setter({ text: msg, error: isError })
    setTimeout(() => setter(null), 3500)
  }

  const handleProfile = async (e) => {
    e.preventDefault()
    setLoading('profile')
    await new Promise(r => setTimeout(r, 300))
    const res = updateProfile({ name: profileForm.name, email: profileForm.email })
    setLoading('')
    showMsg(setProfileMsg, res.ok ? 'Profile updated.' : res.error, !res.ok)
  }

  const handleAddress = async (e) => {
    e.preventDefault()
    setLoading('address')
    await new Promise(r => setTimeout(r, 300))
    const res = updateProfile({ address: addressForm })
    setLoading('')
    showMsg(setAddressMsg, res.ok ? 'Address saved.' : res.error, !res.ok)
  }

  const handlePassword = async (e) => {
    e.preventDefault()
    if (pwForm.next !== pwForm.confirm) {
      showMsg(setPwMsg, 'New passwords do not match.', true)
      return
    }
    if (pwForm.next.length < 6) {
      showMsg(setPwMsg, 'Password must be at least 6 characters.', true)
      return
    }
    setLoading('pw')
    await new Promise(r => setTimeout(r, 300))
    // In a real app verify current password via API
    showMsg(setPwMsg, 'Password updated.')
    setPwForm({ current: '', next: '', confirm: '' })
    setLoading('')
  }

  const MsgBanner = ({ msg }) => msg ? (
    <div style={{
      padding: '10px 14px', marginBottom: '12px', borderRadius: 'var(--radius-sm)',
      background: msg.error ? 'rgba(180,50,50,.08)' : 'rgba(50,150,80,.08)',
      border: `1px solid ${msg.error ? 'rgba(180,50,50,.2)' : 'rgba(50,150,80,.2)'}`,
      fontSize: '0.82rem',
      color: msg.error ? '#b43232' : '#1a7a40',
    }}>{msg.text}</div>
  ) : null

  const Section = ({ title, children }) => (
    <div style={{
      background: 'var(--cream)', borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)', padding: '28px 32px',
      border: '1px solid rgba(44,26,14,.06)', marginBottom: '20px',
    }}>
      <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem', fontWeight: 400, color: 'var(--brown)', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid rgba(44,26,14,.08)' }}>
        {title}
      </h3>
      {children}
    </div>
  )

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.8rem', fontWeight: 400, color: 'var(--brown)', marginBottom: '4px' }}>
          Settings
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>Manage your profile, address, and security</p>
      </div>

      {/* Profile */}
      <Section title="Profile Information">
        <MsgBanner msg={profileMsg} />
        <form onSubmit={handleProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="s-name">Full Name</label>
              <input id="s-name" type="text" className="form-input" required
                value={profileForm.name}
                onChange={e => setProfileForm(p => ({ ...p, name: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="s-email">Email</label>
              <input id="s-email" type="email" className="form-input" required
                value={profileForm.email}
                onChange={e => setProfileForm(p => ({ ...p, email: e.target.value }))} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary" disabled={loading === 'profile'}
              style={{ padding: '10px 28px', fontSize: '0.78rem' }}>
              {loading === 'profile' ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </Section>

      {/* Address */}
      <Section title="Default Delivery Address">
        <MsgBanner msg={addressMsg} />
        <form onSubmit={handleAddress} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="s-line1">Address Line</label>
            <input id="s-line1" type="text" className="form-input" placeholder="12 High Street, Flat 3"
              value={addressForm.line1}
              onChange={e => setAddressForm(p => ({ ...p, line1: e.target.value }))} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="s-city">City</label>
              <input id="s-city" type="text" className="form-input" placeholder="London"
                value={addressForm.city}
                onChange={e => setAddressForm(p => ({ ...p, city: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="s-postcode">Postcode / ZIP</label>
              <input id="s-postcode" type="text" className="form-input" placeholder="SE1 3AG"
                value={addressForm.postcode}
                onChange={e => setAddressForm(p => ({ ...p, postcode: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="s-country">Country</label>
              <select id="s-country" className="form-select"
                value={addressForm.country}
                onChange={e => setAddressForm(p => ({ ...p, country: e.target.value }))}>
                <option value="">Select…</option>
                {['United Kingdom','United States','Canada','Australia','Germany','France','Netherlands','Ukraine','Other'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary" disabled={loading === 'address'}
              style={{ padding: '10px 28px', fontSize: '0.78rem' }}>
              {loading === 'address' ? 'Saving…' : 'Save Address'}
            </button>
          </div>
        </form>
      </Section>

      {/* Password */}
      <Section title="Change Password">
        <MsgBanner msg={pwMsg} />
        <form onSubmit={handlePassword} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="s-pw-cur">Current Password</label>
            <input id="s-pw-cur" type="password" className="form-input" placeholder="••••••••" required
              value={pwForm.current}
              onChange={e => setPwForm(p => ({ ...p, current: e.target.value }))} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="s-pw-new">New Password</label>
              <input id="s-pw-new" type="password" className="form-input" placeholder="Min. 6 characters" required minLength={6}
                value={pwForm.next}
                onChange={e => setPwForm(p => ({ ...p, next: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="s-pw-confirm">Confirm New</label>
              <input id="s-pw-confirm" type="password" className="form-input" placeholder="Repeat password" required
                value={pwForm.confirm}
                onChange={e => setPwForm(p => ({ ...p, confirm: e.target.value }))} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary" disabled={loading === 'pw'}
              style={{ padding: '10px 28px', fontSize: '0.78rem' }}>
              {loading === 'pw' ? 'Updating…' : 'Update Password'}
            </button>
          </div>
        </form>
      </Section>

      {/* Danger zone */}
      <div style={{
        background: 'rgba(180,50,50,.04)', borderRadius: 'var(--radius-lg)',
        border: '1px solid rgba(180,50,50,.12)', padding: '24px 32px',
      }}>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', color: '#b43232', marginBottom: '8px' }}>Sign Out</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '16px' }}>
          You'll need to sign back in to access your account.
        </p>
        <button onClick={logout} className="btn" style={{
          padding: '10px 24px', fontSize: '0.78rem', fontWeight: 500,
          background: 'transparent', border: '1.5px solid rgba(180,50,50,.4)', color: '#b43232',
          borderRadius: '2px', letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>
          Sign Out
        </button>
      </div>

      <style>{`
        @media (max-width: 600px) {
          div[style*="grid-template-columns: 1fr 1fr"],
          div[style*="grid-template-columns: 1fr 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
