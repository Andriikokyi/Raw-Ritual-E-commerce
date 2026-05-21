import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products, categories, getProductsByCategory } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCat = searchParams.get('cat') || 'all'
  const [activeCategory, setActiveCategory] = useState(initialCat)

  useEffect(() => {
    const cat = searchParams.get('cat') || 'all'
    setActiveCategory(cat)
  }, [searchParams])

  const filtered = getProductsByCategory(activeCategory)

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId)
    if (catId === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ cat: catId })
    }
  }

  return (
    <main>
      {/* Header */}
      <section style={{
        background: 'var(--brown)',
        padding: 'calc(var(--nav-h) + 64px) 0 64px',
        textAlign: 'center',
      }}>
        <div className="container">
          <p className="section-label" style={{ color: 'var(--gold-light)', marginBottom: '16px' }}>
            The Complete Range
          </p>
          <h1 style={{ color: 'var(--cream)', fontWeight: 300, marginBottom: '16px' }}>
            Every product, a ritual
          </h1>
          <p style={{ color: 'rgba(238,224,200,.65)', maxWidth: '480px', margin: '0 auto', fontSize: '1rem' }}>
            {products.length} products made from the finest single-origin ingredients.
            Nothing synthetic. Nothing superfluous.
          </p>
        </div>
      </section>

      {/* Category tabs */}
      <div style={{
        position: 'sticky',
        top: 'var(--nav-h)',
        zIndex: 100,
        background: 'var(--ivory)',
        borderBottom: '1px solid rgba(44,26,14,.1)',
        padding: '0',
      }}>
        <div className="container">
          <ul style={{
            display: 'flex',
            gap: '0',
            overflowX: 'auto',
            scrollbarWidth: 'none',
          }}>
            {categories.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => handleCategoryChange(id)}
                  style={{
                    padding: '18px 24px',
                    fontFamily: 'var(--sans)',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: activeCategory === id ? 'var(--brown)' : 'var(--muted)',
                    borderBottom: activeCategory === id ? '2px solid var(--gold)' : '2px solid transparent',
                    background: 'none',
                    transition: 'color 0.2s ease, border-color 0.2s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {label}
                  <span style={{
                    marginLeft: '6px',
                    fontSize: '0.65rem',
                    opacity: 0.6,
                  }}>
                    ({getProductsByCategory(id).length})
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Product grid */}
      <section className="section">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '28px',
          }}>
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
              <p style={{ fontSize: '1.5rem', fontFamily: 'var(--serif)', marginBottom: '12px' }}>
                Nothing here yet
              </p>
              <p style={{ fontSize: '0.9rem' }}>Check back soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Starter Kit bundle */}
      <section style={{ background: 'var(--beige)', padding: '80px 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'center',
          }}>
            <div>
              <p className="section-label" style={{ marginBottom: '16px' }}>Bundle & Save</p>
              <h2 style={{ color: 'var(--brown)', marginBottom: '20px' }}>
                The Raw Ritual Starter Kit
              </h2>
              <p style={{ color: 'var(--muted)', marginBottom: '16px', lineHeight: 1.7 }}>
                Not sure where to begin? The Starter Kit includes our three most popular products
                at a 15% discount — curated to give you the full Raw Ritual experience.
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
                {[
                  '3× Dark Honey Protein Bars',
                  '1× Raw Wildflower Honey (340g)',
                  '1× Activated Cashews (200g)',
                ].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--charcoal)' }}>
                    <span style={{ color: 'var(--gold)', fontSize: '0.7rem' }}>✦</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted)', textDecoration: 'line-through' }}>$47.50</span>
                  <p style={{ fontFamily: 'var(--serif)', fontSize: '2rem', color: 'var(--brown)' }}>$40.50</p>
                </div>
                <button className="btn btn-primary">Add Starter Kit to Bag</button>
              </div>
            </div>
            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              aspectRatio: '4/3',
              boxShadow: 'var(--shadow-lg)',
            }}>
              <img
                src="https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80"
                alt="Raw Ritual Starter Kit"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: '1fr 1fr'"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  )
}
