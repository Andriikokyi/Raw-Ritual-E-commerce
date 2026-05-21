import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { getProductBySlug, products } from '../data/products'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import ProductCard from '../components/ProductCard'

function IconHeart({ filled }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  )
}

const STARS = (rating) => {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5 ? 1 : 0
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - half)
}

export default function Product() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)

  const [activeImage, setActiveImage] = useState(0)
  const [qty, setQty] = useState(1)
  const [subscribe, setSubscribe] = useState(false)
  const [activeTab, setActiveTab] = useState('description')

  const { addItem } = useCart()
  const { isFavorite, toggleFavorite } = useAuth()

  if (!product) return <Navigate to="/shop" replace />

  const {
    name, categoryLabel, priceDisplay, price, rating, reviewCount,
    tagline, longDescription, images, ingredients, nutrition, inStock,
  } = product

  const fav = isFavorite(slug)
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3)

  const handleAddToBag = () => {
    addItem(product, qty)
  }

  const displayPrice = subscribe
    ? `$${(price * 0.9).toFixed(2)} / delivery`
    : priceDisplay

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--ivory)', borderBottom: '1px solid rgba(44,26,14,.06)' }}>
        <div className="container" style={{ padding: '14px 24px' }}>
          <nav style={{ fontSize: '0.78rem', color: 'var(--muted)', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Link to="/" style={{ color: 'var(--muted)' }}>Home</Link>
            <span>/</span>
            <Link to="/shop" style={{ color: 'var(--muted)' }}>Shop</Link>
            <span>/</span>
            <span style={{ color: 'var(--brown)' }}>{name}</span>
          </nav>
        </div>
      </div>

      {/* Main */}
      <section className="section--sm">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>

            {/* Gallery */}
            <div>
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', aspectRatio: '1/1', marginBottom: '16px', boxShadow: 'var(--shadow)' }}>
                <img src={images[activeImage]} alt={name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s ease' }} />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {images.map((src, i) => (
                  <button key={i} onClick={() => setActiveImage(i)}
                    style={{ flex: 1, aspectRatio: '1/1', borderRadius: 'var(--radius-sm)', overflow: 'hidden',
                      border: i === activeImage ? '2px solid var(--gold)' : '2px solid transparent', padding: 0, transition: 'border-color 0.2s ease' }}>
                    <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div style={{ paddingTop: '8px' }}>
              <p className="section-label" style={{ marginBottom: '8px' }}>{categoryLabel}</p>
              <h1 style={{ color: 'var(--brown)', marginBottom: '8px', fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}>{name}</h1>
              <p style={{ color: 'var(--muted)', marginBottom: '16px', fontSize: '0.9rem' }}>{tagline}</p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <span style={{ color: 'var(--gold)', fontSize: '1.1rem', letterSpacing: '-1px' }}>{STARS(rating)}</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>{rating} ({reviewCount} reviews)</span>
              </div>

              <hr className="divider" style={{ marginBottom: '24px' }} />

              {/* Price */}
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontFamily: 'var(--serif)', fontSize: '2rem', color: 'var(--brown)', marginBottom: '12px' }}>
                  {displayPrice}
                </p>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}>
                  <div onClick={() => setSubscribe(v => !v)}
                    style={{ width: '40px', height: '22px', borderRadius: '11px',
                      background: subscribe ? 'var(--gold)' : 'rgba(44,26,14,.2)', position: 'relative', transition: 'background 0.2s ease' }}>
                    <div style={{ position: 'absolute', top: '3px', left: subscribe ? '21px' : '3px', width: '16px', height: '16px',
                      borderRadius: '50%', background: 'white', transition: 'left 0.2s ease', boxShadow: '0 1px 3px rgba(0,0,0,.2)' }} />
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--charcoal)' }}>
                    Subscribe &amp; Save 10% — delivered every 4 weeks
                  </span>
                </label>
              </div>

              {/* Quantity */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>Qty</span>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(44,26,14,.2)', borderRadius: 'var(--radius-sm)' }}>
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ padding: '10px 16px', fontSize: '1.1rem', color: 'var(--brown)' }}>−</button>
                  <span style={{ padding: '10px 8px', minWidth: '32px', textAlign: 'center', fontSize: '0.9rem' }}>{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} style={{ padding: '10px 16px', fontSize: '1.1rem', color: 'var(--brown)' }}>+</button>
                </div>
              </div>

              {/* CTA buttons */}
              <button
                className="btn btn-primary"
                onClick={handleAddToBag}
                disabled={!inStock}
                style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem', padding: '16px', marginBottom: '12px' }}
              >
                {inStock ? 'Add to Bag' : 'Out of Stock'}
              </button>
              <button
                onClick={() => toggleFavorite(slug)}
                className="btn btn-outline"
                style={{ width: '100%', justifyContent: 'center', padding: '14px', gap: '8px',
                  color: fav ? '#e05a5a' : 'var(--brown)',
                  borderColor: fav ? '#e05a5a' : 'var(--brown)',
                }}
              >
                <IconHeart filled={fav} />
                {fav ? 'Saved to Favorites' : 'Save to Favorites'}
              </button>

              {/* Trust badges */}
              <div style={{ display: 'flex', gap: '16px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(44,26,14,.08)', flexWrap: 'wrap' }}>
                {['Free shipping over $60', 'Certified organic', 'Satisfaction guaranteed'].map(badge => (
                  <span key={badge} className="badge badge-brown" style={{ fontSize: '0.65rem' }}>{badge}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section style={{ background: 'var(--ivory)', borderTop: '1px solid rgba(44,26,14,.06)' }}>
        <div className="container">
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(44,26,14,.1)', marginBottom: '40px' }}>
            {[
              { id: 'description', label: 'Description' },
              { id: 'ingredients', label: 'Ingredients' },
              { id: 'nutrition', label: 'Nutrition' },
              { id: 'reviews', label: `Reviews (${reviewCount})` },
            ].map(({ id, label }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                style={{ padding: '20px 28px', fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: activeTab === id ? 'var(--brown)' : 'var(--muted)',
                  borderBottom: activeTab === id ? '2px solid var(--gold)' : '2px solid transparent',
                  transition: 'color 0.2s, border-color 0.2s' }}>
                {label}
              </button>
            ))}
          </div>

          <div style={{ maxWidth: '760px', paddingBottom: '64px' }}>
            {activeTab === 'description' && (
              <div>
                {longDescription.split('\n\n').map((para, i) => (
                  <p key={i} style={{ marginBottom: '20px', color: 'var(--charcoal)', lineHeight: 1.8 }}>{para}</p>
                ))}
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div>
                {ingredients.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {ingredients.map(({ name: ingName, origin, note }) => (
                      <div key={ingName} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px',
                        padding: '20px', background: 'var(--cream)', borderRadius: 'var(--radius)', borderLeft: '3px solid var(--gold)' }}>
                        <div>
                          <p style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '4px' }}>Ingredient</p>
                          <p style={{ fontWeight: 500, color: 'var(--brown)', fontSize: '0.95rem' }}>{ingName}</p>
                        </div>
                        <div>
                          <p style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '4px' }}>Origin</p>
                          <p style={{ fontSize: '0.9rem' }}>{origin}</p>
                        </div>
                        <div>
                          <p style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '4px' }}>Note</p>
                          <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>{note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: 'var(--muted)' }}>Ingredient details coming soon.</p>
                )}
              </div>
            )}

            {activeTab === 'nutrition' && nutrition && (
              <div>
                <p style={{ marginBottom: '16px', fontSize: '0.85rem', color: 'var(--muted)' }}>Per serving: {nutrition.servingSize}</p>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {[['Calories', nutrition.calories],['Protein', nutrition.protein],['Carbohydrates', nutrition.carbs],
                      ['of which Sugars', nutrition.sugar],['Fat', nutrition.fat],['Fibre', nutrition.fiber],['Sodium', nutrition.sodium]].map(([label, val]) => (
                      <tr key={label} style={{ borderBottom: '1px solid rgba(44,26,14,.08)' }}>
                        <td style={{ padding: '14px 0', color: 'var(--charcoal)' }}>{label}</td>
                        <td style={{ padding: '14px 0', textAlign: 'right', fontFamily: 'var(--serif)', fontSize: '1.05rem', color: 'var(--brown)' }}>{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                {[
                  { author: 'Sophie T.', rating: 5, date: 'March 2025', body: 'These are genuinely the best protein bars I have ever had. The dark chocolate flavour is rich and satisfying without being sweet. I\'ve tried maybe 20 brands over the years and nothing comes close.' },
                  { author: 'James W.', rating: 5, date: 'February 2025', body: 'I was sceptical but a friend sent me a sample. Now I order a box every month. The quality of the ingredients is obvious the moment you taste it.' },
                  { author: 'Clara M.', rating: 4, date: 'January 2025', body: 'Fantastic product. The only reason I\'m not giving 5 stars is that I wish they came in a larger size option. Otherwise perfect.' },
                ].map(({ author, rating: r, date, body }) => (
                  <div key={author} style={{ padding: '24px', background: 'var(--cream)', borderRadius: 'var(--radius)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div>
                        <p style={{ fontWeight: 500, color: 'var(--brown)', marginBottom: '4px' }}>{author}</p>
                        <span style={{ color: 'var(--gold)', fontSize: '0.9rem' }}>{'★'.repeat(r)}{'☆'.repeat(5-r)}</span>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{date}</span>
                    </div>
                    <p style={{ color: 'var(--charcoal)', lineHeight: 1.7, fontSize: '0.9rem' }}>{body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <p className="section-label" style={{ marginBottom: '8px' }}>You may also like</p>
              <h2 style={{ color: 'var(--brown)' }}>More from the range</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '28px' }}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      <style>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: '1fr 1fr'"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
