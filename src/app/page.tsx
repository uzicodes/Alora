"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import dynamic from "next/dynamic";
import "./page.css";



type Pillar = {
  num: string;
  label: string;
  desc: string;
};



const pillars: Pillar[] = [
  { num: "01", label: "Hand-Sourced Ingredients", desc: "Rare botanicals harvested across continents at peak potency." },
  { num: "02", label: "Master Perfumers", desc: "Crafted by artisans with decades of olfactory heritage." },
  { num: "03", label: "Up to 3 Years", desc: "The meticulous blending behind each signature scent." },
  { num: "04", label: "Certified Luxury", desc: "Every bottle inspected before it leaves our atelier." },
];

const PerfumeCardImage = dynamic(() => import("./components/PerfumeCardImage"));

export default function Home() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `body { background: #C2B280 !important; }` }} />
      {/* ==================== HERO ==================== */}
      <section className="alora-hero">
        {/* Background elements */}
        <div className="hero-noise"></div>


        {/* Corner decorations */}
        <div className="hero-corner hc-tl"></div>
        <div className="hero-corner hc-tr"></div>
        <div className="hero-corner hc-bl"></div>
        <div className="hero-corner hc-br"></div>


        {/* Butterfly decorations */}
        <div className="hero-butterfly hero-butterfly-orange2">
          <Image src="/orange2.png" alt="" width={225} height={225} quality={95} style={{ background: 'transparent', width: 'auto', height: 'auto' }} />
        </div>
        <div className="hero-butterfly hero-butterfly-orange">
          <Image src="/orange.png" alt="" width={280} height={280} quality={95} style={{ background: 'transparent', width: 'auto', height: 'auto' }} />
        </div>

        {/* Large background heading - behind bottle */}
        <div className="hero-bg-heading">
          <div className="bg-line" style={{ justifyContent: 'space-between' }}>
            <span className="bg-word">SENSES</span>
            <span className="bg-word" style={{ marginRight: '7vw' }}>MEET</span>
          </div>
          <div className="bg-line" style={{ paddingLeft: 'clamp(80px, 10vw, 160px)', paddingRight: '0' }}>
            <span className="bg-word">RAW</span>
            <span className="bg-word" style={{ marginRight: 'clamp(-80px, -6vw, -20px)' }}>RADIANT</span>
          </div>
          <div className="bg-line center-text">
            <span className="bg-word">PERFUMES</span>
          </div>
        </div>

        {/* Hero Image - Center */}
        <div className="hero-image-wrap fade-in-css">
          <div className="hero-image-inner">
            <Image
              src="/hero_image.webp"
              alt="Alora luxury perfume bottle"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "contain" }}
            />

          </div>
        </div>
      </section>

      {/* ==================== MARQUEE ==================== */}
      <div className="alora-marquee">
        <div className="marquee-track" ref={marqueeRef}>
          {[...Array(2)].map((_, gi) => (
            <span key={gi} className="marquee-item">
              {["Free Shipping Over $150", "Complimentary Gift Wrapping", "Exclusive Members Rewards", "Authenticity Guaranteed", "Luxury Packaging", "Artisan Crafted"].map((t, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
                  <span className="marquee-text">{t}</span>
                  <span className="marquee-diamond">◆</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>



      {/* ==================== PILLARS ==================== */}
      <section className="pillars-section">
        <div className="pillars-header">
          <div className="section-tag-row">The Alora Promise</div>
          <h2 className="section-h2" style={{ whiteSpace: "nowrap" }}>crafted without compromise</h2>
        </div>
        <div className="pillars-grid">
          {pillars.map((p) => (
            <div key={p.num} className="pillar-card">
              <h3 className="pillar-label">{p.label}</h3>
              <p className="pillar-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== SALE SECTION ==================== */}
      <section className="sale-section">
        <div className="sale-header">
          <div className="section-tag-row">Limited Time Offer</div>
          <h2 className="section-h2">exclusive deals</h2>
        </div>
        <div className="sale-grid">
          {[
            { name: "Luis Viutton Classics", discount: 30, img: "/homepage_images/deals/LV.webp" },
            { name: "Hugo Boss Frontliners", discount: 15, img: "/homepage_images/deals/boss.webp" },
            { name: "Lattaffa Year-Combo", discount: 25, img: "/homepage_images/deals/lattaffa.webp" },
            { name: "Nishane Summer Picks", discount: 20, img: "/homepage_images/deals/nishane.webp" },
          ].map((deal) => (
            <div key={deal.name} className="sale-card">
              <div className="sale-card-shimmer"></div>
              <div className="sale-card-img">
                <Image
                  src={deal.img}
                  alt={deal.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={95}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="sale-card-content">
                <p className="sale-card-label">Perfume</p>
                <h3 className="sale-card-title">{deal.name}</h3>
                <div className="sale-discount-badge">
                  <span className="sale-discount-num">{deal.discount}</span>
                  <span className="sale-discount-pct">%</span>
                  <span className="sale-discount-off">off</span>
                </div>
                <br />
                <Link href="/shop" className="sale-card-cta">
                  <span>Shop Now</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== FIND YOUR PERFUME ==================== */}
      <section className="perfume-finder-section">
        <div className="perfume-finder-header">
          <div className="section-tag-row">Collection</div>
          <h2 className="section-h2" style={{ whiteSpace: "nowrap" }}>find your perfume</h2>
        </div>
        <div className="perfume-grid">
          {[
            { name: "CITRUS BLASTS", desc: "Explosive burst of fresh, zesty energy that awakens the senses and keeps you feeling vibrant all day.", imgs: ["/homepage_images/picks/1/ck.png", "/homepage_images/picks/1/valentino.png", "/homepage_images/picks/1/versace.png", "/homepage_images/picks/1/tomford.png"] },
            { name: "LATE NIGHTS", desc: "Dark, seductive aura designed to turn heads and linger beautifully on the skin until the early morning.", imgs: ["/homepage_images/picks/2/1.png", "/homepage_images/picks/2/2.png", "/homepage_images/picks/2/3.png", "/homepage_images/picks/2/4.png"] },
            { name: "VANILLA MUSK", desc: "Deeply comforting and sensual blend that wraps you in a warm, irresistible sweetness that lasts for hours.", imgs: ["/homepage_images/picks/3/1.png", "/homepage_images/picks/3/2.png", "/homepage_images/picks/3/3.png", "/homepage_images/picks/3/4.png"] },
            { name: "WINTER WARMTH", desc: "Rich, cozy embrace that cuts right through the bitter chill, keeping you feeling snug and confident.", imgs: ["/homepage_images/picks/4/1.png", "/homepage_images/picks/4/2.png", "/homepage_images/picks/4/3.png", "/homepage_images/picks/4/4.png"] },
            { name: "ALL YEAR LONG", desc: "Perfectly balanced signature scent, designed to adapt seamlessly to any season, setting, or occasion you throw at it.", imgs: ["/homepage_images/picks/5/1.png", "/homepage_images/picks/5/2.png", "/homepage_images/picks/5/3.png", "/homepage_images/picks/5/4.png"] },
            { name: "BEAT THE SUMMER", desc: "Icy blast of long-lasting freshness that instantly cools you down and cuts through the heavy summer heat.", imgs: ["/homepage_images/picks/6/1.png", "/homepage_images/picks/6/2.png", "/homepage_images/picks/6/3.png", "/homepage_images/picks/6/4.png"] },
            { name: "CASUAL 24/7", desc: "Clean, effortless everyday fragrance that sits perfectly in the background, making sure you always smell approachable.", imgs: ["/homepage_images/picks/7/1.png", "/homepage_images/picks/7/2.png", "/homepage_images/picks/7/3.png", "/homepage_images/picks/7/4.png"] },
            { name: "TROPICAL BLISS", desc: "Vibrant, sun-soaked getaway in a bottle that instantly transports your senses straight to a relaxing island vacation.", imgs: ["/homepage_images/picks/8/1.png", "/homepage_images/picks/8/2.png", "/homepage_images/picks/8/3.png", "/homepage_images/picks/8/4.png"] },
            { name: "FEELS A MILLIONAIR", desc: "Ultra-luxurious, bold statement fragrance that exudes pure wealth, power, and undeniable success everywhere you walk.", imgs: ["/homepage_images/picks/9/1.png", "/homepage_images/picks/9/2.png", "/homepage_images/picks/9/3.png", "/homepage_images/picks/9/4.png"] },
          ].map((perfume) => (
            <Link href="/shop" key={perfume.name} className="perfume-card">
              <PerfumeCardImage imgs={perfume.imgs} alt={perfume.name} />
              <div className="perfume-card-body">
                <h3 className="perfume-card-name">{perfume.name}</h3>
                <p className="perfume-card-desc">{perfume.desc}</p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <span className="perfume-card-btn">
                    Discover More
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ==================== ABOUT ==================== */}
      <section className="about-section">
        <div className="about-header">
          <div className="section-tag-row">Who We Are</div>
          <h2 className="section-h2">our story</h2>
        </div>
        <div className="about-values-grid">
          <div className="about-value-card">
            <span className="about-value-icon">✦</span>
            <h3 className="about-value-title">Authenticity</h3>
            <p className="about-value-desc">
              Every fragrance we offer is 100% authentic, sourced directly from the world&apos;s most prestigious perfume houses.
            </p>
          </div>
          <div className="about-value-card">
            <span className="about-value-icon">◆</span>
            <h3 className="about-value-title">Craftsmanship</h3>
            <p className="about-value-desc">
              We celebrate the art of perfumery — from rare ingredients harvested at peak potency to master blenders who perfect each composition.
            </p>
          </div>
          <div className="about-value-card">
            <span className="about-value-icon">★</span>
            <h3 className="about-value-title">Experience</h3>
            <p className="about-value-desc">
              Each Alora scent is designed to evolve with you, revealing new layers and leaving an unforgettable impression.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== EDITORIAL QUOTE ==================== */}
      <div className="editorial-banner">
        <div className="editorial-banner-bg"></div>
        <div className="editorial-frame">
          <Image
            src="/homepage_images/quote.png"
            alt="Quote Frame"
            fill
            sizes="100vw"
            quality={95}
            style={{ objectFit: 'fill', pointerEvents: 'none' }}
          />
        </div>
        <div className="editorial-content">
          <p className="editorial-quote">
            &ldquo;Fragrance, an invisible part of your personality that says the most about who you are.&rdquo;
          </p>
        </div>
      </div>
    </>
  );
}