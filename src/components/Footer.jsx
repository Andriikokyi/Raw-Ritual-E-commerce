import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div>
            <p className="footer__brand-name">Raw Ritual</p>
            <p className="footer__tagline">
              Pure ingredients. Honest nourishment. Every product made with intention,
              sourced with integrity, and crafted to honour the ritual of caring for yourself.
            </p>
          </div>

          {/* Shop */}
          <div>
            <p className="footer__heading">Shop</p>
            <ul className="footer__links">
              <li><Link to="/shop">All Products</Link></li>
              <li><Link to="/shop?cat=bars">Protein Bars</Link></li>
              <li><Link to="/shop?cat=honey">Raw Honey</Link></li>
              <li><Link to="/shop?cat=nuts">Activated Nuts</Link></li>
              <li><Link to="/shop?cat=candles">Candles</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="footer__heading">Company</p>
            <ul className="footer__links">
              <li><Link to="/story">Our Story</Link></li>
              <li><Link to="/story#sourcing">Sourcing</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="#">Stockists</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <p className="footer__heading">Help</p>
            <ul className="footer__links">
              <li><Link to="/contact#faq">FAQ</Link></li>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Subscribe &amp; Save</a></li>
              <li><a href="#">Track Order</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {year} Raw Ritual. All rights reserved.</p>
          <p>Made with intention. Certified organic where possible.</p>
          <ul style={{ display: 'flex', gap: '20px' }}>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Cookies</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
