import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

// Mock orders for demo purposes
const MOCK_ORDERS = [
  {
    id: 'RR-2025-0042',
    date: 'May 12, 2025',
    status: 'Delivered',
    total: 31.00,
    items: [
      { name: 'Dark Honey Protein Bar', qty: 4, price: 4.50, slug: 'dark-honey-protein-bar', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=200&q=80' },
      { name: 'Raw Wildflower Honey', qty: 1, price: 18.00, slug: 'raw-wildflower-honey', image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=200&q=80' },
    ],
  },
  {
    id: 'RR-2025-0031',
    date: 'April 28, 2025',
    status: 'Delivered',
    total: 55.50,
    items: [
      { name: 'Vanilla Almond Bar', qty: 6, price: 4.50, slug: 'vanilla-almond-bar', image: 'https://images.unsplash.com/photo-1571748982800-fa51082c2224?auto=format&fit=crop&w=200&q=80' },
      { name: 'Ritual Amber Candle', qty: 1, price: 38.00, slug: 'ritual-amber-candle', image: 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?auto=format&fit=crop&w=200&q=80' },
    ],
  },
  {
    id: 'RR-2025-0019',
    date: 'March 5, 2025',
    status: 'Delivered',
    total: 40.50,
    items: [
      { name: 'Starter Kit', qty: 1, price: 40.50, slug: null, image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=200&q=80' },
    ],
  },
]

const STATUS_COLORS = {
  'Delivered':   { bg: 'rgba(50,150,80,.1)',  color: '#1a7a40' },
  'Processing':  { bg: 'rgba(201,148,58,.12)', color: '#8a6020' },
  'Shipped':     { bg: 'rgba(50,100,200,.1)',  color: '#2a60c0' },
  'Cancelled':   { bg: 'rgba(180,50,50,.1)',   color: '#b43232' },
}

export default function Orders() {
  const { user } = useAuth()

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.8rem', fontWeight: 400, color: 'var(--brown)', marginBottom: '4px' }}>
          My Orders
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>
          {MOCK_ORDERS.length} orders in your history
        </p>
      </div>

      {MOCK_ORDERS.length === 0 ? (
        <div style={{ padding: '60px 40px', textAlign: 'center', background: 'var(--cream)', borderRadius: 'var(--radius-lg)' }}>
          <p style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', color: 'var(--brown)', marginBottom: '12px' }}>No orders yet</p>
          <p style={{ color: 'var(--muted)', marginBottom: '24px', fontSize: '0.9rem' }}>Start your Raw Ritual today.</p>
          <Link to="/shop" className="btn btn-primary">Browse Products</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {MOCK_ORDERS.map(order => {
            const statusStyle = STATUS_COLORS[order.status] ?? {}
            return (
              <div key={order.id} style={{
                background: 'var(--cream)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-sm)',
                overflow: 'hidden',
                border: '1px solid rgba(44,26,14,.06)',
              }}>
                {/* Order header */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  flexWrap: 'wrap', gap: '8px',
                  padding: '16px 24px',
                  borderBottom: '1px solid rgba(44,26,14,.08)',
                  background: 'var(--ivory)',
                }}>
                  <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div>
                      <p style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '2px' }}>Order</p>
                      <p style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--brown)' }}>{order.id}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '2px' }}>Date</p>
                      <p style={{ fontSize: '0.88rem', color: 'var(--charcoal)' }}>{order.date}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '2px' }}>Total</p>
                      <p style={{ fontSize: '0.88rem', fontFamily: 'var(--serif)', color: 'var(--brown)' }}>${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                  <span style={{
                    padding: '4px 12px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 500,
                    background: statusStyle.bg, color: statusStyle.color,
                  }}>
                    {order.status}
                  </span>
                </div>

                {/* Items */}
                <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {order.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ width: '52px', height: '52px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', flexShrink: 0 }}>
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        {item.slug ? (
                          <Link to={`/product/${item.slug}`} style={{ fontSize: '0.9rem', color: 'var(--brown)', fontWeight: 400 }}>
                            {item.name}
                          </Link>
                        ) : (
                          <p style={{ fontSize: '0.9rem', color: 'var(--brown)' }}>{item.name}</p>
                        )}
                        <p style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Qty: {item.qty}</p>
                      </div>
                      <p style={{ fontSize: '0.9rem', fontFamily: 'var(--serif)', color: 'var(--brown)' }}>
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div style={{ padding: '12px 24px', borderTop: '1px solid rgba(44,26,14,.06)', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button className="btn btn-outline" style={{ padding: '8px 18px', fontSize: '0.72rem' }}>
                    Track Order
                  </button>
                  <button className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.72rem' }}>
                    Reorder
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
