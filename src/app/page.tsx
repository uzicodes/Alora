import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-content">
          {/* Left: Text */}
          <div className="hero-text">
            <span className="hero-tag animate-fade-in-up">Luxury Fragrances</span>
            <h1 className="hero-title animate-fade-in-up delay-100">
              Discover Your <em>Signature</em> Scent
            </h1>
            <p className="hero-description animate-fade-in-up delay-200">
              Crafted from the world&apos;s finest ingredients, each Alora fragrance
              tells a story of elegance, passion, and timeless sophistication.
            </p>
            <div className="hero-cta animate-fade-in-up delay-300">
              <Link href="/shop" className="btn-primary" id="hero-shop-btn">
                Shop Now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link href="/collections" className="btn-secondary" id="hero-collections-btn">
                Collections
              </Link>
            </div>
          </div>

          {/* Right: Image */}
          <div className="hero-image-wrapper animate-fade-in-up delay-200">
            <div className="hero-image-bg"></div>
            <Image
              src="/hero_perfume.png"
              alt="Alora luxury perfume bottle"
              width={480}
              height={600}
              priority
              style={{ position: "relative", zIndex: 1 }}
            />
          </div>
        </div>
      </section>

      {/* Marquee Banner */}
      <div className="marquee-banner" id="marquee-banner">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="marquee-item">
              <span>Free Shipping Over $150</span>
              <span className="marquee-dot"></span>
              <span>Complimentary Gift Wrapping</span>
              <span className="marquee-dot"></span>
              <span>Exclusive Members Rewards</span>
              <span className="marquee-dot"></span>
              <span>Authenticity Guaranteed</span>
              <span className="marquee-dot"></span>
              <span>Luxury Packaging</span>
              <span className="marquee-dot"></span>
              <span>Free Shipping Over $150</span>
              <span className="marquee-dot"></span>
              <span>Complimentary Gift Wrapping</span>
              <span className="marquee-dot"></span>
              <span>Exclusive Members Rewards</span>
              <span className="marquee-dot"></span>
              <span>Authenticity Guaranteed</span>
              <span className="marquee-dot"></span>
              <span>Luxury Packaging</span>
              <span className="marquee-dot"></span>
            </span>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <section className="section" id="featured-products">
        <div className="section-header">
          <p className="section-tag">Curated For You</p>
          <h2 className="section-title">Bestselling Fragrances</h2>
          <div className="section-divider"></div>
        </div>

        <div className="product-grid">
          {/* Product Card 1 */}
          <Link href="/shop/midnight-oud" className="product-card" id="product-card-1">
            <div className="product-card-image">
              <Image
                src="/alora_BG2.png"
                alt="Midnight Oud"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
              <span className="product-card-badge">Bestseller</span>
              <div className="product-card-quick">Quick View</div>
            </div>
            <div className="product-card-info">
              <h3 className="product-card-name">Midnight Oud</h3>
              <p className="product-card-category">Eau de Parfum</p>
              <p className="product-card-price">$185.00</p>
            </div>
          </Link>

          {/* Product Card 2 */}
          <Link href="/shop/velvet-rose" className="product-card" id="product-card-2">
            <div className="product-card-image">
              <Image
                src="/alora_BG2.png"
                alt="Velvet Rose"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
              <span className="product-card-badge">New</span>
              <div className="product-card-quick">Quick View</div>
            </div>
            <div className="product-card-info">
              <h3 className="product-card-name">Velvet Rose</h3>
              <p className="product-card-category">Extrait de Parfum</p>
              <p className="product-card-price">$220.00</p>
            </div>
          </Link>

          {/* Product Card 3 */}
          <Link href="/shop/golden-amber" className="product-card" id="product-card-3">
            <div className="product-card-image">
              <Image
                src="/alora_BG2.png"
                alt="Golden Amber"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
              <div className="product-card-quick">Quick View</div>
            </div>
            <div className="product-card-info">
              <h3 className="product-card-name">Golden Amber</h3>
              <p className="product-card-category">Eau de Parfum</p>
              <p className="product-card-price">$165.00</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section" id="about-story">
        <div className="story-image">
          <Image
            src="/alora_BG.png"
            alt="The Alora story"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="story-content">
          <p className="section-tag">Our Story</p>
          <h2 className="section-title">The Art of Perfumery, Reimagined</h2>
          <p className="story-text">
            Founded on the belief that fragrance is an extension of identity,
            Alora combines centuries-old artisanal techniques with contemporary design.
            Every bottle is a masterpiece — from the hand-selected raw materials sourced
            across five continents, to the meticulous blending process that can take
            up to three years to perfect.
          </p>
          <p className="story-text">
            We believe luxury should be felt, not just seen. That&apos;s why each Alora
            scent is designed to evolve with you throughout the day, revealing new layers
            and leaving an unforgettable impression.
          </p>
          <Link href="/about" className="btn-secondary" id="story-learn-more" style={{ alignSelf: "flex-start", marginTop: "8px" }}>
            Learn More
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>A L O R A</h3>
            <p>
              Luxury fragrances crafted for those who refuse to blend in.
              Every scent tells a story.
            </p>
          </div>

          <div className="footer-column">
            <h4>Shop</h4>
            <ul>
              <li><Link href="/shop">All Fragrances</Link></li>
              <li><Link href="/collections">Collections</Link></li>
              <li><Link href="/shop?category=new">New Arrivals</Link></li>
              <li><Link href="/shop?category=bestsellers">Bestsellers</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/press">Press</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Help</h4>
            <ul>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/shipping">Shipping</Link></li>
              <li><Link href="/returns">Returns</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Alora. All rights reserved.</p>
          <div className="footer-social">
            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            {/* Twitter / X */}
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            {/* Pinterest */}
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.25 2.67 7.87 6.42 9.29-.09-.78-.17-1.98.04-2.83.19-.77 1.2-5.08 1.2-5.08s-.31-.61-.31-1.52c0-1.42.82-2.49 1.85-2.49.87 0 1.29.66 1.29 1.44 0 .88-.56 2.19-.85 3.41-.24 1.02.51 1.85 1.52 1.85 1.82 0 3.22-1.92 3.22-4.69 0-2.45-1.76-4.17-4.28-4.17-2.91 0-4.62 2.19-4.62 4.44 0 .88.34 1.82.76 2.34.08.1.09.19.07.29-.08.32-.25 1.02-.28 1.16-.04.19-.15.23-.35.14-1.31-.61-2.13-2.52-2.13-4.06 0-3.31 2.41-6.35 6.94-6.35 3.64 0 6.47 2.6 6.47 6.07 0 3.62-2.28 6.53-5.45 6.53-1.06 0-2.07-.55-2.41-1.21l-.66 2.5c-.24.91-.88 2.05-1.31 2.75A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
