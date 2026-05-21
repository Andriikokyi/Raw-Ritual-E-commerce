import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function IconHeart({ filled }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  )
}

export default function ProductCard({ product }) {
  const { slug, name, categoryLabel, priceDisplay, tagline, images } = product
  const { addItem } = useCart()
  const { isFavorite, toggleFavorite } = useAuth()
  const fav = isFavorite(slug)

  return (
    <article className="product-card" style={{ position: 'relative' }}>
      {/* Favorite button */}
      <button
        onClick={(e) => { e.preventDefault(); toggleFavorite(slug) }}
        aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
        style={{
          position: 'absolute', top: '10px', right: '10px', zIndex: 2,
          width: '32px', height: '32px', borderRadius: '50%',
          background: 'rgba(253,249,243,.9)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: fav ? '#e05a5a' : 'var(--muted)',
          boxShadow: '0 2px 6px rgba(0,0,0,.1)',
          transition: 'transform 0.2s ease, color 0.2s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.12)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <IconHeart filled={fav} />
      </button>

      <Link to={`/product/${slug}`} style={{ textDecoration: 'none', display: 'block' }}>
        <div className="product-card__img">
          <img src={images[0]} alt={name} loading="lazy" />
        </div>
      </Link>

      <div className="product-card__body">
        <p className="product-card__tag">{categoryLabel}</p>
        <Link to={`/product/${slug}`} style={{ textDecoration: 'none' }}>
          <h3 className="product-card__name">{name}</h3>
        </Link>
        <p className="product-card__desc">{tagline}</p>
        <div className="product-card__footer">
          <span className="product-card__price">{priceDisplay}</span>
          <button
            onClick={() => addItem(product)}
            className="btn btn-outline"
            style={{ padding: '8px 18px', fontSize: '0.7rem' }}
          >
            Add to Bag
          </button>
        </div>
      </div>
    </article>
  )
}
