import { useState } from 'react'

const FAQS = [
  { q: 'What makes Raw Ritual different from other wellness bars?', a: 'Every ingredient is single-origin and cold-processed. We don\'t use protein isolates, artificial sweeteners, or flavourings. If you can\'t picture the ingredient in nature, it\'s not in our products.' },
  { q: 'Are your products suitable for vegans?', a: 'Most products are vegan — our protein bars, activated nuts, and candles. Our honey range is obviously not vegan, but we never use gelatin, dairy, or eggs in anything.' },
  { q: 'How should I store my products?', a: 'Protein bars and activated nuts store well at room temperature for up to 3 months. Raw honey should be kept in a cool, dark cupboard — never refrigerated. Candles should be stored away from direct sunlight.' },
  { q: 'Do you offer subscriptions?', a: 'Yes — through our Subscribe & Save programme you get 10% off every order, free delivery, and flexible scheduling. You can pause, skip, or cancel at any time with no fees.' },
  { q: 'What is your shipping policy?', a: 'We ship Monday to Friday, with same-day dispatch on orders placed before 12pm (GMT). Standard delivery is 2–3 working days. Free delivery on orders over £60 / $60.' },
  { q: 'Where do your ingredients come from?', a: 'Every ingredient has a named origin. Our cacao is from Ecuador, honey from Oregon, almonds from California, cashews from Vietnam, vanilla from Madagascar. Visit our Story page for full sourcing details.' },
  { q: 'Can I return a product?', a: 'If you\'re not satisfied, contact us within 14 days of receiving your order. We offer a full refund or replacement — no questions asked. We want you to love what you receive.' },
  { q: 'Are you stocked in any physical stores?', a: 'We have a growing network of independent health food stores and wellness cafés. Email us with your location and we\'ll check whether we have a stockist near you.' },
]

export default function Contact() {
  const [openFaq, setOpenFaq] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleFormChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      {/* Header */}
      <section style={{ background: 'var(--brown)', padding: '80px 0 64px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="section-label" style={{ color: 'var(--gold-light)', marginBottom: '16px' }}>We're here</p>
          <h1 style={{ color: 'var(--cream)', fontWeight: 300, marginBottom: '16px' }}>
            Get in touch
          </h1>
          <p style={{ color: 'rgba(238,224,200,.65)', maxWidth: '400px', margin: '0 auto', fontSize: '1rem' }}>
            A real person reads every message. We aim to reply within one business day.
          </p>
        </div>
      </section>

      {/* Contact section */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '80px', alignItems: 'start' }}>

            {/* Left: details */}
            <div>
              <p className="section-label" style={{ marginBottom: '24px' }}>Contact Details</p>

              {[
                { label: 'Email', value: 'hello@rawritual.com', href: 'mailto:hello@rawritual.com' },
                { label: 'Phone', value: '+44 20 7946 0958', href: 'tel:+442079460958' },
                { label: 'Address', value: '12 Artisan Quarter, Bermondsey, London SE1 3AG', href: null },
                { label: 'Hours', value: 'Mon–Fri, 9am–5pm GMT', href: null },
              ].map(({ label, value, href }) => (
                <div key={label} style={{ marginBottom: '28px' }}>
                  <p style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '6px' }}>{label}</p>
                  {href ? (
                    <a href={href} style={{ fontSize: '1rem', color: 'var(--brown)', fontWeight: 400 }}>{value}</a>
                  ) : (
                    <p style={{ fontSize: '1rem', color: 'var(--brown)', fontWeight: 400 }}>{value}</p>
                  )}
                </div>
              ))}

              <hr className="divider" style={{ margin: '32px 0' }} />

              <p className="section-label" style={{ marginBottom: '16px' }}>Follow Us</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {['Instagram', 'TikTok', 'Pinterest'].map(platform => (
                  <a
                    key={platform}
                    href="#"
                    style={{
                      padding: '8px 16px',
                      border: '1px solid rgba(44,26,14,.2)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--brown)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => { e.target.style.background = 'var(--brown)'; e.target.style.color = 'var(--cream)' }}
                    onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--brown)' }}
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div>
              <p className="section-label" style={{ marginBottom: '24px' }}>Send a Message</p>
              {submitted ? (
                <div style={{
                  padding: '48px 40px',
                  background: 'var(--beige)',
                  borderRadius: 'var(--radius-lg)',
                  textAlign: 'center',
                }}>
                  <p style={{ fontFamily: 'var(--serif)', fontSize: '2rem', color: 'var(--brown)', marginBottom: '12px' }}>
                    Thank you, {formData.name.split(' ')[0]}.
                  </p>
                  <p style={{ color: 'var(--muted)' }}>
                    We've received your message and will reply to <strong>{formData.email}</strong> within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="name">Full Name</label>
                      <input id="name" name="name" type="text" className="form-input" placeholder="Anna Smith" value={formData.name} onChange={handleFormChange} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">Email</label>
                      <input id="email" name="email" type="email" className="form-input" placeholder="anna@example.com" value={formData.email} onChange={handleFormChange} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="subject">Subject</label>
                    <select id="subject" name="subject" className="form-select" value={formData.subject} onChange={handleFormChange} required>
                      <option value="" disabled>Select a topic…</option>
                      <option value="order">Order enquiry</option>
                      <option value="product">Product question</option>
                      <option value="subscription">Subscription</option>
                      <option value="wholesale">Wholesale / Stockists</option>
                      <option value="press">Press & Partnerships</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="message">Message</label>
                    <textarea id="message" name="message" className="form-textarea" placeholder="How can we help?" value={formData.message} onChange={handleFormChange} required rows={5} />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '14px 36px' }}>
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section" style={{ background: 'var(--beige)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p className="section-label" style={{ marginBottom: '12px' }}>FAQ</p>
            <h2 style={{ color: 'var(--brown)' }}>Questions &amp; answers</h2>
          </div>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0' }}>
            {FAQS.map(({ q, a }, i) => (
              <div
                key={i}
                style={{ borderBottom: '1px solid rgba(44,26,14,.12)' }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '22px 0',
                    textAlign: 'left',
                    fontFamily: 'var(--sans)',
                    fontSize: '0.95rem',
                    fontWeight: 400,
                    color: 'var(--brown)',
                    gap: '16px',
                  }}
                >
                  <span>{q}</span>
                  <span style={{
                    flexShrink: 0,
                    width: '24px', height: '24px',
                    borderRadius: '50%',
                    border: '1px solid rgba(44,26,14,.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1rem', color: 'var(--gold)',
                    transform: openFaq === i ? 'rotate(45deg)' : 'none',
                    transition: 'transform 0.25s ease',
                  }}>+</span>
                </button>
                <div style={{
                  maxHeight: openFaq === i ? '300px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.35s ease',
                }}>
                  <p style={{ paddingBottom: '22px', color: 'var(--muted)', lineHeight: 1.8, fontSize: '0.9rem' }}>{a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Account section */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p className="section-label" style={{ marginBottom: '12px' }}>Your Account</p>
            <h2 style={{ color: 'var(--brown)' }}>Sign in or create an account</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', maxWidth: '760px', margin: '0 auto' }}>
            {/* Sign in */}
            <div style={{ padding: '40px', background: 'var(--ivory)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(44,26,14,.08)' }}>
              <h3 style={{ color: 'var(--brown)', marginBottom: '24px', fontSize: '1.3rem' }}>Sign In</h3>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="signin-email">Email</label>
                  <input id="signin-email" type="email" className="form-input" placeholder="your@email.com" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="signin-password">Password</label>
                  <input id="signin-password" type="password" className="form-input" placeholder="••••••••" />
                </div>
                <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>Sign In</button>
                <a href="#" style={{ fontSize: '0.8rem', color: 'var(--muted)', textAlign: 'center' }}>Forgot password?</a>
              </form>
            </div>

            {/* Create account */}
            <div style={{
              padding: '40px',
              background: 'var(--brown)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              textAlign: 'center',
            }}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', color: 'var(--cream)', marginBottom: '12px' }}>
                New here?
              </p>
              <p style={{ color: 'rgba(238,224,200,.65)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '28px' }}>
                Create an account to track orders, manage your subscription, and access member-only discounts.
              </p>
              <button className="btn btn-ghost" style={{ justifyContent: 'center' }}>Create Account</button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: '1fr 1.6fr'"],
          div[style*="gridTemplateColumns: '1fr 1fr'"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  )
}
