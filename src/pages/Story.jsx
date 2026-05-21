import { Link } from 'react-router-dom'

const HERO = 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=1800&q=80'
const ORIGIN_IMG = 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=900&q=80'
const SOURCING_IMG = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80'

export default function Story() {
  return (
    <main>
      {/* Hero */}
      <section style={{
        position: 'relative',
        height: '85vh',
        minHeight: '560px',
        display: 'flex',
        alignItems: 'flex-end',
        paddingBottom: '80px',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: `url(${HERO}) center/cover no-repeat` }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(44,26,14,.9) 0%, rgba(44,26,14,.3) 60%, transparent 100%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p className="section-label" style={{ color: 'var(--gold-light)', marginBottom: '16px' }}>Founded 2019</p>
          <blockquote style={{
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
            fontWeight: 300,
            color: 'var(--cream)',
            maxWidth: '680px',
            lineHeight: 1.3,
          }}>
            "We started Raw Ritual because we were tired of reading labels we needed a degree to understand."
          </blockquote>
          <p style={{ color: 'rgba(238,224,200,.6)', marginTop: '16px', fontSize: '0.9rem' }}>
            — Anna & Tobias, Co-founders
          </p>
        </div>
      </section>

      {/* Origin story */}
      <section className="section">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
          }}>
            <div>
              <p className="section-label" style={{ marginBottom: '16px' }}>The Beginning</p>
              <h2 style={{ color: 'var(--brown)', marginBottom: '28px' }}>
                Born from a kitchen, not a boardroom
              </h2>
              <p style={{ color: 'var(--muted)', marginBottom: '20px', lineHeight: 1.8 }}>
                In 2019, Anna — a nutritional therapist — and Tobias — a former pastry chef —
                started making protein bars in their London kitchen after Anna's clients repeatedly
                told her they couldn't find a bar that didn't compromise on ingredients.
              </p>
              <p style={{ color: 'var(--muted)', marginBottom: '20px', lineHeight: 1.8 }}>
                Every mainstream option was packed with soy protein isolate, artificial sweeteners,
                or stabilisers that undermined the very reason someone was reaching for a "health" bar
                in the first place. So they made their own.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
                The first Dark Honey Bar took six months and 47 iterations to perfect. They sold the
                first batch at a local farmers' market in October 2019. They sold out in four hours.
              </p>
            </div>
            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              aspectRatio: '3/4',
              boxShadow: 'var(--shadow-lg)',
            }}>
              <img src={ORIGIN_IMG} alt="Raw honey sourcing" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section style={{ background: 'var(--brown)', padding: '96px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="section-label" style={{ color: 'var(--gold-light)', marginBottom: '20px' }}>Our Conviction</p>
          <blockquote style={{
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
            fontWeight: 300,
            color: 'var(--cream)',
            maxWidth: '760px',
            margin: '0 auto',
            lineHeight: 1.5,
          }}>
            "Every ingredient has a provenance. Every choice in production is a value judgement.
             We want ours to be obvious."
          </blockquote>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p className="section-label" style={{ marginBottom: '12px' }}>What We Stand For</p>
            <h2 style={{ color: 'var(--brown)' }}>Three principles, no exceptions</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {[
              {
                num: '01',
                title: 'Radical Transparency',
                body: 'Every ingredient is listed. Every supplier is named. Every batch is traceable. We publish our full ingredient sourcing on request. There\'s nothing we want to hide.',
              },
              {
                num: '02',
                title: 'Minimum Processing',
                body: 'We cold-press. We dehydrate. We infuse. We never heat above 42°C, never use solvents, never isolate a protein from its natural context. Food should still taste like food.',
              },
              {
                num: '03',
                title: 'Long-Term Relationships',
                body: 'We pay above Fairtrade prices and have worked with the same honey supplier since our first year. Good ingredients require good partnerships, and we\'re in this for decades.',
              },
            ].map(({ num, title, body }) => (
              <div
                key={num}
                style={{
                  padding: '40px 36px',
                  background: 'var(--brown)',
                  borderRadius: 'var(--radius-lg)',
                  color: 'var(--beige)',
                }}
              >
                <p style={{ fontFamily: 'var(--serif)', fontSize: '3rem', fontWeight: 300, color: 'var(--gold)', opacity: 0.6, marginBottom: '16px' }}>
                  {num}
                </p>
                <h3 style={{ color: 'var(--cream)', marginBottom: '16px', fontSize: '1.3rem' }}>{title}</h3>
                <p style={{ color: 'rgba(238,224,200,.7)', lineHeight: 1.8, fontSize: '0.9rem' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sourcing */}
      <section id="sourcing" className="section" style={{ background: 'var(--beige)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
          }}>
            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              aspectRatio: '4/3',
              boxShadow: 'var(--shadow-lg)',
            }}>
              <img src={SOURCING_IMG} alt="Activated nuts sourcing" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <p className="section-label" style={{ marginBottom: '16px' }}>Sourcing</p>
              <h2 style={{ color: 'var(--brown)', marginBottom: '24px' }}>
                Where every ingredient comes from
              </h2>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '36px' }}>
                {[
                  { item: 'Cacao', detail: 'Single-origin, Ecuador — certified organic cooperative' },
                  { item: 'Honey', detail: 'Willamette Valley, Oregon — family apiary, cold-extracted' },
                  { item: 'Almonds', detail: 'Central Valley, California — certified organic' },
                  { item: 'Cashews', detail: 'Binh Phuoc Province, Vietnam — Rainforest Alliance certified' },
                  { item: 'Vanilla', detail: 'Sava Region, Madagascar — whole bean, ethically sourced' },
                  { item: 'Coconut Oil', detail: 'Kurunegala, Sri Lanka — cold-pressed, virgin, certified organic' },
                ].map(({ item, detail }) => (
                  <li key={item} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--gold)', marginTop: '3px', flexShrink: 0 }}>✦</span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--charcoal)' }}>
                      <strong style={{ color: 'var(--brown)', fontWeight: 500 }}>{item}</strong>{' — '}
                      {detail}
                    </span>
                  </li>
                ))}
              </ul>
              <Link to="/shop" className="btn btn-primary">Shop the Range</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section--sm" style={{ textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '560px' }}>
          <p className="section-label" style={{ marginBottom: '16px' }}>Ready?</p>
          <h2 style={{ color: 'var(--brown)', marginBottom: '20px' }}>Start your ritual today</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>
            Every product is made weekly in our London facility. We ship Monday to Friday,
            with same-day dispatch on orders placed before 12pm.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/shop" className="btn btn-primary">Browse All Products</Link>
            <Link to="/contact" className="btn btn-outline">Get in Touch</Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: '1fr 1fr'"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="gridTemplateColumns: 'repeat(3, 1fr)'"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  )
}
