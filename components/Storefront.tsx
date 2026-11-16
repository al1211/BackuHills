'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  Menu,
  Minus,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Truck,
  X,
} from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '@/data/content';

type CartItem = {
  productId: string;
  quantity: number;
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);

export default function Storefront() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notice, setNotice] = useState('');
  const [email, setEmail] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  const visibleProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return PRODUCTS;
    return PRODUCTS.filter((product) =>
      `${product.name} ${product.category} ${product.description}`
        .toLowerCase()
        .includes(query),
    );
  }, [searchQuery]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => {
    const product = PRODUCTS.find((entry) => entry.id === item.productId);
    return total + (product?.price ?? 0) * item.quantity;
  }, 0);

  const addToCart = (productId: string) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.productId === productId);
      if (existingItem) {
        return currentCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...currentCart, { productId, quantity: 1 }];
    });
    setNotice('Added to your bag');
    window.setTimeout(() => setNotice(''), 2200);
  };

  const updateQuantity = (productId: string, adjustment: number) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + adjustment }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setNewsletterMessage('Thanks for your interest. Newsletter signup is coming soon.');
    setEmail('');
  };

  return (
    <main id="home" className="storefront min-h-screen">
      <div className="announcement-bar">
        <Truck aria-hidden="true" size={14} />
        <span>Complimentary shipping on orders above ₹550</span>
        <a href="#bestsellers">Shop the collection <ArrowRight size={13} /></a>
      </div>

      <header className="site-header">
        <button
          className="icon-button mobile-menu-toggle"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <a className="brand-lockup" href="#home" aria-label="Backum Hills home">
          <span className="brand-mark" aria-hidden="true">
            BH
          </span>
          <span>
            <strong>BACKUM HILLS</strong>
            <small>LEATHER GOODS · EST. 2014</small>
          </span>
        </a>
        <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          <a href="#collections" onClick={() => setMenuOpen(false)}>Collections</a>
          <a href="#bestsellers" onClick={() => setMenuOpen(false)}>Best sellers</a>
          <a href="#craft" onClick={() => setMenuOpen(false)}>Our craft</a>
          <a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>
        </nav>
        <div className="header-actions">
          <button
            className="icon-button search-toggle"
            aria-label={searchOpen ? 'Close search' : 'Search products'}
            onClick={() => {
              setSearchOpen((open) => !open);
              setSearchQuery('');
            }}
          >
            {searchOpen ? <X size={19} /> : <Search size={19} />}
          </button>
          <button
            className="bag-button"
            aria-label={`Open shopping bag, ${cartCount} items`}
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag size={18} strokeWidth={1.6} />
            <span>Bag</span>
            <span className="bag-count">{cartCount}</span>
          </button>
        </div>
      </header>

      {searchOpen && (
        <div className="search-panel">
          <Search size={18} aria-hidden="true" />
          <label className="sr-only" htmlFor="product-search">Search products</label>
          <input
            id="product-search"
            autoFocus
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              document.getElementById('bestsellers')?.scrollIntoView({ behavior: 'smooth' });
            }}
            placeholder="Search belts, bags and more"
          />
          <button className="text-button" onClick={() => setSearchOpen(false)}>Close</button>
        </div>
      )}

      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Made to be carried forward</p>
          <h1 id="hero-title">A little more<br />character, every day.</h1>
          <p className="hero-description">
            Thoughtfully made leather essentials. The kind that get better with every mile, meeting and memory.
          </p>
          <div className="hero-actions">
            <a className="button button-light" href="#bestsellers">
              Explore the collection <ArrowRight size={16} />
            </a>
            <span className="hero-note">Crafted for the long run</span>
          </div>
          <div className="hero-proof">
            <span><Check size={14} /> Genuine leather</span>
            <span><Check size={14} /> Made for everyday</span>
          </div>
        </div>
        <div className="hero-image-wrap">
          <Image
            src="/WhatsApp_Image_2026-06-20_at_11.46.18.jpg"
            alt="Hand-finished Backum Hills leather belt in rich brown"
            fill
            priority
            sizes="(max-width: 800px) 100vw, 52vw"
            className="hero-image"
          />
          <div className="hero-image-shade" />
          <div className="hero-image-caption">
            <span>THE EVERYDAY EDIT</span>
            <strong>Good leather. Better with time.</strong>
          </div>
          <a className="hero-image-link" href="#bestsellers" aria-label="Shop leather essentials">
            <ArrowDown size={18} />
          </a>
        </div>
        <div className="hero-index" aria-hidden="true">01 / 03</div>
      </section>

      <div className="promise-strip" aria-label="Shopping benefits">
        <span>Genuine leather, always</span>
        <i aria-hidden="true" />
        <span>Made for everyday use</span>
        <i aria-hidden="true" />
        <span>Free shipping over ₹550</span>
        <i aria-hidden="true" />
        <span>Thoughtful details, lasting design</span>
      </div>

      <section id="collections" className="section-shell collection-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Find your everyday essential</p>
            <h2>Made for the way<br className="desktop-break" /> you move.</h2>
          </div>
          <p className="section-intro">Quietly confident pieces, built around real life and made to stay with you.</p>
        </div>
        <div className="collection-grid">
          {CATEGORIES.map((category, index) => (
            <a
              className={`collection-card collection-card-${index + 1}`}
              key={category.name}
              href="#bestsellers"
            >
              <span className="collection-number">0{index + 1}</span>
              <span className="collection-card-bottom">
                <span>
                  <strong>{category.name}</strong>
                  <small>{category.description}</small>
                </span>
                <span className="circle-arrow" aria-hidden="true"><ArrowRight size={17} /></span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section id="bestsellers" className="section-shell product-section">
        <div className="section-heading product-heading">
          <div>
            <p className="eyebrow">The pieces you come back to</p>
            <h2>{searchQuery ? 'Search results' : 'Good things, well made.'}</h2>
          </div>
          <a className="underlined-link" href="#collections">View all collections <ArrowRight size={15} /></a>
        </div>
        {visibleProducts.length > 0 ? (
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className={`product-image-frame ${product.imagePosition ?? ''}`}>
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    sizes="(max-width: 650px) 50vw, (max-width: 1000px) 33vw, 25vw"
                    className="product-image"
                  />
                  {product.badge && <span className="product-badge">{product.badge}</span>}
                  <button
                    className="quick-add"
                    aria-label={`Add ${product.name} to bag`}
                    onClick={() => addToCart(product.id)}
                  >
                    <Plus size={17} />
                  </button>
                </div>
                <div className="product-details">
                  <div className="product-meta"><span>{product.category}</span><span>★★★★★</span></div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-buy-row">
                    <span className="product-price">{formatPrice(product.price)}</span>
                    {product.compareAt && <del>{formatPrice(product.compareAt)}</del>}
                    <button className="add-text-button" onClick={() => addToCart(product.id)}>
                      Add to bag <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-search">
            <p>No products match “{searchQuery}”.</p>
            <button className="underlined-link" onClick={() => setSearchQuery('')}>Clear search</button>
          </div>
        )}
      </section>

      <section id="craft" className="craft-section">
        <div className="craft-image">
          <Image
            src="/WhatsApp_Image_2026-06-20_at_11.46.51.jpg"
            alt="Backum Hills leather crossbody bag, finished by hand"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
            className="craft-photo"
          />
        </div>
        <div className="craft-copy">
          <p className="eyebrow">The Backum Hills way</p>
          <h2>Not made for a season.<br />Made for your story.</h2>
          <p>
            We believe the best things are the ones you reach for without thinking. So we focus on honest materials, considered details and timeless shapes that feel right, day after day.
          </p>
          <a className="button button-outline" href="#collections">
            Discover our approach <ArrowRight size={16} />
          </a>
          <div className="craft-signoff">Built with intention. Carried with meaning.</div>
        </div>
      </section>

      <section className="service-row section-shell" aria-label="Our promises">
        <div className="service-item">
          <span className="service-icon"><ShieldCheck size={20} /></span>
          <div><strong>Considered materials</strong><span>Genuine leather, chosen with care.</span></div>
        </div>
        <div className="service-item">
          <span className="service-icon"><Truck size={20} /></span>
          <div><strong>Complimentary shipping</strong><span>On orders above ₹550.</span></div>
        </div>
        <div className="service-item">
          <span className="service-icon"><ShoppingBag size={20} /></span>
          <div><strong>Easy to gift</strong><span>Everyday essentials, made to last.</span></div>
        </div>
      </section>

      <section id="reviews" className="reviews-section">
        <p className="eyebrow">Good company, good leather</p>
        <div className="review-stars" aria-label="5 out of 5 stars">★★★★★</div>
        <blockquote>“The kind of quality you notice every time you pick it up. Simple, beautiful, and made to last.”</blockquote>
        <p className="review-credit">A note from the Backum Hills community</p>
      </section>

      <section className="newsletter-section section-shell">
        <div>
          <p className="eyebrow">A note from us, now and then</p>
          <h2>Good things worth opening.</h2>
          <p>New arrivals, stories from the workshop, and a little inspiration for the everyday.</p>
        </div>
        <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
          <label className="sr-only" htmlFor="newsletter-email">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Your email address"
            required
          />
          <button aria-label="Submit email address" type="submit"><ArrowRight size={18} /></button>
          {newsletterMessage && <p className="newsletter-feedback" role="status">{newsletterMessage}</p>}
        </form>
      </section>

      <footer id="contact" className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="brand-lockup" href="#home">
              <span className="brand-mark" aria-hidden="true">BH</span>
              <span><strong>BACKUM HILLS</strong><small>LEATHER GOODS · EST. 2014</small></span>
            </a>
            <p>Leather essentials for the roads you take and the stories you make.</p>
          </div>
          <div className="footer-links">
            <strong>Explore</strong>
            <a href="#collections">Collections</a>
            <a href="#bestsellers">Best sellers</a>
            <a href="#craft">Our craft</a>
          </div>
          <div className="footer-links">
            <strong>Here to help</strong>
            <a href="mailto:hello@backumhills.com">Contact us</a>
            <a href="#contact">Shipping information</a>
            <a href="#contact">Returns &amp; exchanges</a>
          </div>
          <div className="footer-signoff">
            <span>Made with care.</span>
            <span>Carried everywhere.</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Backum Hills. All rights reserved.</span>
          <span>Designed for the everyday.</span>
        </div>
      </footer>

      {notice && <div className="toast-notice" role="status"><Check size={16} /> {notice}</div>}

      {cartOpen && (
        <div className="drawer-backdrop" onClick={() => setCartOpen(false)}>
          <aside
            className="cart-drawer"
            aria-label="Shopping bag"
            aria-modal="true"
            role="dialog"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="drawer-heading">
              <div><p className="eyebrow">The good stuff</p><h2>Your bag <span>({cartCount})</span></h2></div>
              <button className="icon-button" aria-label="Close shopping bag" onClick={() => setCartOpen(false)}><X size={20} /></button>
            </div>
            {cart.length === 0 ? (
              <div className="cart-empty">
                <ShoppingBag size={30} strokeWidth={1.4} />
                <h3>Your bag is taking a little break.</h3>
                <p>Find something you'll love carrying every day.</p>
                <button className="button button-light" onClick={() => setCartOpen(false)}>Explore best sellers <ArrowRight size={15} /></button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => {
                    const product = PRODUCTS.find((entry) => entry.id === item.productId);
                    if (!product) return null;
                    return (
                      <div className="cart-item" key={product.id}>
                        <div className="cart-item-image">
                          <Image src={product.image} alt={product.imageAlt} fill sizes="80px" />
                        </div>
                        <div className="cart-item-info">
                          <strong>{product.name}</strong>
                          <span>{formatPrice(product.price)}</span>
                          <div className="quantity-control">
                            <button aria-label={`Remove one ${product.name}`} onClick={() => updateQuantity(product.id, -1)}><Minus size={12} /></button>
                            <span>{item.quantity}</span>
                            <button aria-label={`Add one ${product.name}`} onClick={() => updateQuantity(product.id, 1)}><Plus size={12} /></button>
                          </div>
                        </div>
                        <span className="cart-item-total">{formatPrice(product.price * item.quantity)}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="cart-summary">
                  <p><span>Subtotal</span><strong>{formatPrice(cartTotal)}</strong></p>
                  <p className="shipping-note">{cartTotal >= 550 ? 'Complimentary shipping unlocked.' : `Add ${formatPrice(550 - cartTotal)} for complimentary shipping.`}</p>
                  <button className="button button-light checkout-button" onClick={() => setNotice('Checkout is not connected yet.')}>
                    Checkout <ArrowRight size={15} />
                  </button>
                  <button className="continue-shopping" onClick={() => setCartOpen(false)}>Continue shopping <ChevronDown size={14} /></button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}
