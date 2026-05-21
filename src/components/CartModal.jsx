import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartModal() {
  const { items, itemCount, subtotal, isOpen, closeCart, removeItem, setQty } = useCart()

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeCart() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeCart])

  const FREE_SHIPPING_THRESHOLD = 60
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        style={{
          position: 'fixed', inset: 0, zIndex: 1100,
          background: 'rgba(44,26,14,.45)',
          backdropFilter: 'blur(3px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'all' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label="Shopping cart"
        style={{
          position: 'fixed',
          top: 0, right: 0, bottom: 0,
          zIndex: 1101,
          width: 'min(420px, 100vw)',
          background: 'var(--cream)',
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(.4,0,.2,1)',
          boxShadow: '-12px 0 48px rgba(44,26,14,.18)',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px',
          borderBottom: '1px solid rgba(44,26,14,.1)',
          background: 'var(--ivory)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', fontWeight: 400, color: 'var(--brown)' }}>
              Your Bag
            </h2>
            {itemCount > 0 && (
              <span style={{
                background: 'var(--gold)', color: 'white',
                borderRadius: '20px', fontSize: '0.7rem', fontWeight: 500,
                padding: '2px 8px', lineHeight: 1.5,
              }}>
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            style={{ padding: '6px', color: 'var(--muted)', fontSize: '1.4rem', lineHeight: 1 }}
          >
            ✕
          </button>
        </div>

        {/* Free shipping bar */}
        {subtotal < FREE_SHIPPING_THRESHOLD && items.length > 0 && (
          <div style={{ padding: '12px 24px', background: 'rgba(201,148,58,.08)', borderBottom: '1px solid rgba(201,148,58,.15)' }}>
            <p style={{ fontSize: '0.78rem', color: 'var(--brown)', marginBottom: '8px' }}>
              Add <strong>${remaining.toFixed(2)}</strong> more for free shipping
            </p>
            <div style={{ height: '3px', background: 'rgba(201,148,58,.2)', borderRadius: '2px' }}>
              <div style={{ height: '100%', width: `${shippingProgress}%`, background: 'var(--gold)', borderRadius: '2px', transition: 'width 0.4s ease' }} />
            </div>
          </div>
        )}
        {subtotal >= FREE_SHIPPING_THRESHOLD && items.length > 0 && (
          <div style={{ padding: '10px 24px', background: 'rgba(201,148,58,.1)', borderBottom: '1px solid rgba(201,148,58,.15)', fontSize: '0.78rem', color: 'var(--gold)', fontWeight: 500, textAlign: 'center' }}>
            ✓ You qualify for free shipping!
          </div>
        )}

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {items.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '16px', padding: '40px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', opacity: 0.2 }}>◎</div>
              <p style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', color: 'var(--brown)' }}>Your bag is empty</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Add something nourishing.</p>
              <button onClick={closeCart} className="btn btn-primary" style={{ marginTop: '8px' }}>
                Browse Products
              </button>
            </div>
          ) : (
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {items.map(item => (
                <li key={item.slug} style={{
                  display: 'grid',
                  gridTemplateColumns: '72px 1fr',
                  gap: '14px',
                  padding: '16px 24px',
                  borderBottom: '1px solid rgba(44,26,14,.06)',
                }}>
                  {/* Image */}
                  <Link to={`/product/${item.slug}`} onClick={closeCart}
                    style={{ borderRadius: 'var(--radius-sm)', overflow: 'hidden', aspectRatio: '1/1', display: 'block' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Link>

                  {/* Info */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                      <Link to={`/product/${item.slug}`} onClick={closeCart}
                        style={{ fontSize: '0.9rem', fontWeight: 400, color: 'var(--brown)', lineHeight: 1.3 }}>
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.slug)}
                        aria-label={`Remove ${item.name}`}
                        style={{ color: 'var(--muted)', fontSize: '0.85rem', flexShrink: 0, padding: '2px' }}
                      >✕</button>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{item.categoryLabel}</p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                      {/* Qty */}
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(44,26,14,.15)', borderRadius: 'var(--radius-sm)' }}>
                        <button
                          onClick={() => setQty(item.slug, item.qty - 1)}
                          style={{ padding: '4px 10px', fontSize: '1rem', color: 'var(--brown)' }}
                        >−</button>
                        <span style={{ padding: '4px 6px', fontSize: '0.85rem', minWidth: '24px', textAlign: 'center' }}>{item.qty}</span>
                        <button
                          onClick={() => setQty(item.slug, item.qty + 1)}
                          style={{ padding: '4px 10px', fontSize: '1rem', color: 'var(--brown)' }}
                        >+</button>
                      </div>
                      <span style={{ fontFamily: 'var(--serif)', fontSize: '1.05rem', color: 'var(--brown)', fontWeight: 400 }}>
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{
            padding: '20px 24px 28px',
            borderTop: '1px solid rgba(44,26,14,.1)',
            background: 'var(--ivory)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)' }}>Subtotal</span>
              <span style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', color: 'var(--brown)' }}>
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '16px', textAlign: 'center' }}>
              Taxes and shipping calculated at checkout
            </p>
            <button
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '15px', fontSize: '0.82rem', marginBottom: '10px' }}
            >
              Proceed to Checkout
            </button>
            <button
              onClick={closeCart}
              className="btn btn-outline"
              style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.78rem' }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
