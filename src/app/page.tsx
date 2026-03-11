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


    </>
  );
}
