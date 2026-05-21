import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

// Simulated user storage (replace with real API later)
const MOCK_USERS_KEY = 'rr_users'
const SESSION_KEY = 'rr_session'

function loadUsers() {
  try { return JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || '[]') } catch { return [] }
}
function saveUsers(users) {
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users))
}
function loadSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null') } catch { return null }
}
function saveSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user))
}
function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadSession())
  const [authModal, setAuthModal] = useState(false)       // open/close
  const [authTab, setAuthTab] = useState('login')         // 'login' | 'register'
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('rr_favorites') || '[]') } catch { return [] }
  })

  // ── Auth actions ──────────────────────────────────────────────

  const register = useCallback(({ name, email, password }) => {
    const users = loadUsers()
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: 'An account with this email already exists.' }
    }
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // NOTE: never store plain passwords in production — use hashed API
      createdAt: new Date().toISOString(),
      orders: [],
      address: { line1: '', city: '', postcode: '', country: '' },
    }
    saveUsers([...users, newUser])
    const session = { id: newUser.id, name: newUser.name, email: newUser.email }
    saveSession(session)
    setUser(session)
    setAuthModal(false)
    return { ok: true }
  }, [])

  const login = useCallback(({ email, password }) => {
    const users = loadUsers()
    const found = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (!found) return { ok: false, error: 'Incorrect email or password.' }
    const session = { id: found.id, name: found.name, email: found.email }
    saveSession(session)
    setUser(session)
    setAuthModal(false)
    return { ok: true }
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setUser(null)
  }, [])

  const updateProfile = useCallback(({ name, email, address }) => {
    if (!user) return { ok: false, error: 'Not logged in.' }
    const users = loadUsers()
    const idx = users.findIndex(u => u.id === user.id)
    if (idx === -1) return { ok: false, error: 'User not found.' }
    users[idx] = { ...users[idx], name: name ?? users[idx].name, email: email ?? users[idx].email, address: address ?? users[idx].address }
    saveUsers(users)
    const session = { id: users[idx].id, name: users[idx].name, email: users[idx].email }
    saveSession(session)
    setUser(session)
    return { ok: true }
  }, [user])

  const getFullProfile = useCallback(() => {
    if (!user) return null
    return loadUsers().find(u => u.id === user.id) ?? null
  }, [user])

  // ── Favorites ─────────────────────────────────────────────────

  const toggleFavorite = useCallback((slug) => {
    setFavorites(prev => {
      const next = prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
      localStorage.setItem('rr_favorites', JSON.stringify(next))
      return next
    })
  }, [])

  const isFavorite = useCallback((slug) => favorites.includes(slug), [favorites])

  // ── Modal helpers ─────────────────────────────────────────────

  const openLogin = () => { setAuthTab('login'); setAuthModal(true) }
  const openRegister = () => { setAuthTab('register'); setAuthModal(true) }

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      register,
      login,
      logout,
      updateProfile,
      getFullProfile,
      favorites,
      toggleFavorite,
      isFavorite,
      authModal,
      authTab,
      setAuthTab,
      openLogin,
      openRegister,
      closeAuthModal: () => setAuthModal(false),
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
