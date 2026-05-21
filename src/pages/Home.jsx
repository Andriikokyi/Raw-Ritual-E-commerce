import { Link } from 'react-router-dom'
import { getFeaturedProducts } from '../data/products'
import ProductCard from '../components/ProductCard'
import { useEffect, useState } from 'react'

const HERO_IMG = 'https://images.unsplash.com/photo-1490457843367-34b21b6f3f5f?auto=format&fit=crop&w=1800&q=80'
const PHILOSOPHY_IMG_1 = 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80'
const PHILOSOPHY_IMG_2 = 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80'
const RITUAL_IMG = 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?auto=format&fit=crop&w=1600&q=80'

const MARQUEE_ITEMS = [
  'Single-Origin Ingredients',
  'Cold-Pressed & Raw',
  'No Refined Sugar',
  'Certified Organic',
  'Handcrafted in Small Batches',
  'Free From Fillers',
]

export default function Home() {
  const featured = getFeaturedProducts()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <main>
      {/* ── Hero ── */}
      <section style={{
        position: 'relative',
        height: '100vh',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `url(${HERO_IMG}) center/cover no-repeat`,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(44,26,14,.82) 0%, rgba(44,26,14,.45) 60%, rgba(44,26,14,.2) 100%)',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p className="section-label" style={{ color: 'var(--gold-light)', marginBottom: '20px' }}>
            Pure Ingredients · Honest Nourishment
          </p>
          <h1 style={{ color: 'var(--cream)', maxWidth: '680px', marginBottom: '28px', fontWeight: 300 }}>
            Eat well.<br />
            <em>Live with intention.</em>
          </h1>
          <p style={{ color: 'rgba(250,246,238,.75)', fontSize: '1.1rem', maxWidth: '480px', marginBottom: '40px', lineHeight: 1.7 }}>
            Premium wellness foods made from ingredients your body recognises.
            No shortcuts. No compromises.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/shop" className="btn btn-gold">Explore the Range</Link>
            <Link to="/story" className="btn btn-ghost">Our Story</Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{
          position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          color: 'rgba(250,246,238,.5)',
          animation: 'scrollBounce 2s ease-in-out infinite',
        }}>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Scroll</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="7" y="5" width="2" height="5" rx="1" fill="currentColor"/>
          </svg>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="marquee-track">
        <div className="marquee-inner">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      {/* ── Philosophy ── */}
      <section className="section">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
          }}>
            {/* Text */}
            <div>
              <p className="section-label" style={{ marginBottom: '16px' }}>Our Philosophy</p>
              <h2 style={{ color: 'var(--brown)', marginBottom: '24px' }}>
                Nourishment should be simple
              </h2>
              <p style={{ color: 'var(--muted)', marginBottom: '20px', fontSize: '1.05rem' }}>
                We believe food should do one thing: nourish you. Not impress you with a long
                list of functional ingredients you can't pronounce. Not distract you with clever
                packaging that promises everything and delivers nothing.
              </p>
              <p style={{ color: 'var(--muted)', marginBottom: '36px', fontSize: '1.05rem' }}>
                Raw Ritual began in a kitchen in 2019, born from frustration with wellness brands
                that compromise on the very thing that matters — what's actually inside.
              </p>
              <Link to="/story" className="btn btn-outline">Read Our Story</Link>
            </div>

            {/* Images */}
            <div style={{ position: 'relative', height: '460px' }}>
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: '72%', height: '75%',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
              }}>
                <img src={PHILOSOPHY_IMG_1} alt="Raw ingredients" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{
                position: 'absolute', bottom: 0, left: 0,
                width: '55%', height: '55%',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '4px solid var(--cream)',
              }}>
                <img src={PHILOSOPHY_IMG_2} alt="Raw honey" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .philosophy-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── Values strip ── */}
      <section style={{ background: 'var(--beige)', padding: '64px 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '32px',
            textAlign: 'center',
          }}>
            {[
              { icon: '◎', label: 'Single-Origin', desc: 'Every ingredient traced to its source' },
              { icon: '❄', label: 'Cold-Pressed', desc: 'Never heated above 42°C' },
              { icon: '✦', label: 'Small Batch', desc: 'Made weekly, never mass-produced' },
              { icon: '○', label: 'Zero Fillers', desc: 'If you can\'t say it, it\'s not in it' },
            ].map(({ icon, label, desc }) => (
              <div key={label}>
                <div style={{ fontSize: '1.8rem', color: 'var(--gold)', marginBottom: '12px' }}>{icon}</div>
                <h4 style={{ fontFamily: 'var(--serif)', color: 'var(--brown)', marginBottom: '8px' }}>{label}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured products ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p className="section-label" style={{ marginBottom: '12px' }}>The Range</p>
            <h2 style={{ color: 'var(--brown)' }}>Made to be felt</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '28px',
            marginBottom: '48px',
          }}>
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link to="/shop" className="btn btn-primary">View All Products</Link>
          </div>
        </div>
      </section>

      {/* ── Ritual banner ── */}
      <section style={{ position: 'relative', padding: '120px 0', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `url(${RITUAL_IMG}) center/cover no-repeat`,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(44,26,14,.7)',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <p className="section-label" style={{ color: 'var(--gold-light)', marginBottom: '20px' }}>
            Ritual is everything
          </p>
          <h2 style={{ color: 'var(--cream)', maxWidth: '640px', margin: '0 auto 28px', fontWeight: 300 }}>
            The way you nourish yourself is the most honest thing about you
          </h2>
          <Link to="/shop" className="btn btn-ghost">Start Your Ritual</Link>
        </div>
      </section>

      {/* ── Email capture ── */}
      <section className="section--sm" style={{ background: 'var(--brown)' }}>
        <div className="container" style={{ maxWidth: '560px', textAlign: 'center' }}>
          <p className="section-label" style={{ color: 'var(--gold-light)', marginBottom: '16px' }}>Join the Community</p>
          <h3 style={{ color: 'var(--cream)', fontWeight: 300, marginBottom: '12px' }}>
            Rituals, recipes & restocks
          </h3>
          <p style={{ color: 'rgba(238,224,200,.65)', marginBottom: '32px', fontSize: '0.9rem' }}>
            Get 10% off your first order, early access to new products, and occasional letters
            from our founders. No noise. Unsubscribe any time.
          </p>
          {submitted ? (
            <p style={{ color: 'var(--gold-light)', fontFamily: 'var(--serif)', fontSize: '1.2rem', fontStyle: 'italic' }}>
              Thank you — welcome to the ritual.
            </p>
          ) : (
            <form onSubmit={handleEmailSubmit} style={{ display: 'flex', gap: '12px' }}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{
                  flex: 1,
                  padding: '14px 18px',
                  border: '1px solid rgba(238,224,200,.25)',
                  borderRadius: '2px',
                  background: 'rgba(255,255,255,.07)',
                  color: 'var(--cream)',
                  fontFamily: 'var(--sans)',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
              <button type="submit" className="btn btn-gold">Subscribe</button>
            </form>
          )}
        </div>
      </section>

      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(8px); }
        }
        @media (max-width: 768px) {
          .section > .container > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="gridTemplateColumns: 'repeat(4, 1fr)'"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </main>
  )
}
