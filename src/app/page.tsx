"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
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

export default function Home() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `body { background: #C2B280 !important; }` }} />
      {/* ==================== HERO ==================== */}
      <section className="alora-hero">
        {/* Background elements */}
        <div className="hero-glow"></div>
        <div className="hero-noise"></div>


        {/* Corner decorations */}
        <div className="hero-corner hc-tl"></div>
        <div className="hero-corner hc-tr"></div>
        <div className="hero-corner hc-bl"></div>
        <div className="hero-corner hc-br"></div>


        {/* Butterfly decorations */}
        <div className="hero-butterfly hero-butterfly-orange2">
          <Image src="/orange2.png" alt="" width={225} height={225} unoptimized style={{ background: 'transparent' }} />
        </div>
        <div className="hero-butterfly hero-butterfly-orange">
          <Image src="/orange.png" alt="" width={280} height={280} unoptimized style={{ background: 'transparent' }} />
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
        <div className={`hero-image-wrap ${heroVisible ? 'visible' : ''}`}>
          <div className="hero-image-inner">
            <Image
              src="/hero_image.png"
              alt="Alora luxury perfume bottle"
              fill
              priority
              unoptimized
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
            { name: "Luis Viutton Classics", discount: 30, img: "/homepage_images/deals/LV.png" },
            { name: "Hugo Boss Frontliners", discount: 15, img: "/homepage_images/deals/boss.png" },
            { name: "Lattaffa Year-Combo", discount: 25, img: "/homepage_images/deals/lattaffa.png" },
            { name: "Nishane Summer Picks", discount: 20, img: "/homepage_images/deals/nishane.png" },
          ].map((deal, idx) => (
            <div key={idx} className="sale-card">
              <div className="sale-card-shimmer"></div>
              <div className="sale-card-img">
                <Image
                  src={deal.img}
                  alt={deal.name}
                  fill
                  unoptimized
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
            { name: "Cool Winters", desc: "A crisp blend of frosted mint, white cedar and cool alpine air for the bold spirit.", img: "/perfume_cool_winters.png" },
            { name: "Ex De Rose", desc: "Romantic Damascus rose petals layered with velvety musk and a hint of saffron warmth.", img: "/perfume_ex_de_rose.png" },
            { name: "Warm Sakura", desc: "Delicate cherry blossom infused with soft sandalwood and a whisper of Japanese incense.", img: "/perfume_warm_sakura.png" },
            { name: "Sweet Lavender", desc: "French lavender fields captured in a bottle with honey undertones and powdery violet.", img: "/perfume_sweet_lavender.png" },
            { name: "Orange Delight", desc: "Sun-kissed Sicilian orange zest blended with neroli, warm amber and cedarwood.", img: "/perfume_orange_delight.png" },
            { name: "Morning Scent", desc: "Fresh dewdrop florals meet golden sunlight with notes of bergamot and white tea.", img: "/perfume_morning_scent.png" },
            { name: "Amber Oud", desc: "Rich Middle Eastern oud blended with warm amber, smoky incense and a touch of rose.", img: "/perfume_sale_1.png" },
            { name: "Velvet Night", desc: "Dark plum and black currant wrapped in velvety musk with hints of vanilla bourbon.", img: "/perfume_sale_2.png" },
            { name: "Mystic Breeze", desc: "Light oceanic notes meet white florals with a dry woody finish of driftwood and moss.", img: "/perfume_cool_winters.png" },
          ].map((perfume, idx) => (
            <Link href="/shop" key={idx} className="perfume-card">
              <div className="perfume-card-img-wrap">
                <Image
                  src={perfume.img}
                  alt={perfume.name}
                  fill
                  unoptimized
                  style={{ objectFit: "cover" }}
                />
              </div>
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
        <div className="ec-tl editorial-corner"></div>
        <div className="ec-tr editorial-corner"></div>
        <div className="ec-bl editorial-corner"></div>
        <div className="ec-br editorial-corner"></div>
        <div className="editorial-border"></div>
        <div className="editorial-content">
          <p className="editorial-quote">
            &ldquo;A fragrance is the invisible part of your personality that says the most about who you are.&rdquo;
          </p>
        </div>
      </div>
    </>
  );
}