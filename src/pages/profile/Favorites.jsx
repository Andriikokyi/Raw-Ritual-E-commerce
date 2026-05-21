import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { products } from '../../data/products'

function IconHeart({ filled }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  )
}

export default function Favorites() {
  const { favorites, toggleFavorite } = useAuth()
  const { addItem } = useCart()

  const savedProducts = products.filter(p => favorites.includes(p.slug))

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.8rem', fontWeight: 400, color: 'var(--brown)', marginBottom: '4px' }}>
          Saved Items
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>
          {savedProducts.length} {savedProducts.length === 1 ? 'item' : 'items'} saved
        </p>
      </div>

      {savedProducts.length === 0 ? (
        <div style={{ padding: '60px 40px', textAlign: 'center', background: 'var(--cream)', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '16px', opacity: 0.2 }}>♡</div>
          <p style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', color: 'var(--brown)', marginBottom: '12px' }}>
            Nothing saved yet
          </p>
          <p style={{ color: 'var(--muted)', marginBottom: '24px', fontSize: '0.9rem' }}>
            Tap the heart icon on any product to save it here.
          </p>
          <Link to="/shop" className="btn btn-primary">Browse Products</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
          {savedProducts.map(product => (
            <div key={product.id} style={{
              background: 'var(--cream)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid rgba(44,26,14,.06)',
              display: 'flex', flexDirection: 'column',
            }}>
              {/* Image */}
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                <Link to={`/product/${product.slug}`}>
                  <img src={product.images[0]} alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                  />
                </Link>
                {/* Remove from favorites */}
                <button
                  onClick={() => toggleFavorite(product.slug)}
                  aria-label="Remove from favorites"
                  style={{
                    position: 'absolute', top: '10px', right: '10px',
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: 'rgba(253,249,243,.9)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#e05a5a',
                    boxShadow: '0 2px 6px rgba(0,0,0,.1)',
                    transition: 'transform 0.2s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <IconHeart filled />
                </button>
              </div>

              {/* Body */}
              <div style={{ padding: '14px 16px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <p style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                  {product.categoryLabel}
                </p>
                <Link to={`/product/${product.slug}`}
                  style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', color: 'var(--brown)', fontWeight: 400, lineHeight: 1.3, marginBottom: '4px' }}>
                  {product.name}
                </Link>
                <p style={{ fontFamily: 'var(--serif)', fontSize: '1.15rem', color: 'var(--brown)', marginBottom: '12px' }}>
                  {product.priceDisplay}
                </p>
                <button
                  onClick={() => addItem(product)}
                  className="btn btn-primary"
                  style={{ justifyContent: 'center', padding: '10px', fontSize: '0.72rem', marginTop: 'auto' }}
                >
                  Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
