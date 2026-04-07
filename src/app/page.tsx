"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  badge: string | null;
  img: string;
};

type Pillar = {
  num: string;
  label: string;
  desc: string;
};

const products: Product[] = [
  { id: "midnight-oud", name: "Midnight Oud", category: "Eau de Parfum", price: "$185", badge: "Bestseller", img: "/alora_BG2.png" },
  { id: "velvet-rose", name: "Velvet Rose", category: "Extrait de Parfum", price: "$220", badge: "New", img: "/alora_BG2.png" },
  { id: "golden-amber", name: "Golden Amber", category: "Eau de Parfum", price: "$165", badge: null, img: "/alora_BG2.png" },
  { id: "silver-mist", name: "Silver Mist", category: "Eau de Cologne", price: "$145", badge: null, img: "/alora_BG2.png" },
  { id: "rose-quartz", name: "Rose Quartz", category: "Eau de Parfum", price: "$210", badge: "Limited", img: "/alora_BG2.png" },
  { id: "mystic-sandalwood", name: "Mystic Sandalwood", category: "Extrait de Parfum", price: "$195", badge: null, img: "/alora_BG2.png" },
  { id: "azure-bloom", name: "Azure Bloom", category: "Eau de Parfum", price: "$175", badge: null, img: "/alora_BG2.png" },
  { id: "nocturnal-jasmine", name: "Nocturnal Jasmine", category: "Eau de Parfum", price: "$190", badge: "Bestseller", img: "/alora_BG2.png" },
];

const pillars: Pillar[] = [
  { num: "01", label: "Hand-Sourced Ingredients", desc: "Rare botanicals harvested across five continents at peak potency." },
  { num: "02", label: "Master Perfumers", desc: "Crafted by artisans with decades of olfactory heritage." },
  { num: "03", label: "Up to 3 Years", desc: "The meticulous blending process behind each signature scent." },
  { num: "04", label: "Certified Luxury", desc: "Every bottle inspected and authenticated before it leaves our atelier." },
];

export default function Home() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@200;300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Jost', sans-serif;
          background: #0a0805;
          color: #e8ddd0;
          overflow-x: hidden;
        }

        /* HERO */
        .alora-hero {
          position: relative;
          min-height: calc(100vh - 80px); 
          display: grid;
          grid-template-columns: 1fr 1fr;
          overflow: hidden;
        }
        .hero-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px 60px 80px; 
          position: relative;
          z-index: 2;
        }
        .hero-eyebrow {
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: #d4b896;
          margin-bottom: 32px;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .hero-eyebrow::before {
          content: '';
          display: block;
          width: 40px;
          height: 1px;
          background: #d4b896;
        }
        .hero-headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(54px, 6vw, 88px);
          font-weight: 300;
          line-height: 1.0;
          color: #f0e6d8;
          margin-bottom: 36px;
        }
        .hero-headline em {
          font-style: italic;
          color: #d4b896;
        }
        .hero-body {
          font-size: 14px;
          font-weight: 300;
          line-height: 1.9;
          color: #a89880;
          max-width: 380px;
          margin-bottom: 56px;
          letter-spacing: 0.03em;
        }
        .hero-cta-row {
          display: flex;
          align-items: center;
          gap: 36px;
        }
        .btn-hero-primary {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 40px;
          background: #d4b896;
          color: #0a0805;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          text-decoration: none;
          transition: background 0.3s, transform 0.2s;
        }
        .btn-hero-primary:hover {
          background: #c4a886;
          transform: translateY(-1px);
        }
        .btn-hero-ghost {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #c8bbab;
          text-decoration: none;
          border-bottom: 1px solid rgba(200,187,171,0.4);
          padding-bottom: 4px;
          transition: color 0.3s, border-color 0.3s;
        }
        .btn-hero-ghost:hover { color: #d4b896; border-color: #d4b896; }

        .hero-right {
          position: relative;
          overflow: hidden;
        }
        .hero-right-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 60% 50%, #1a1208 0%, #0a0805 70%);
        }
        .hero-image-container {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(10,8,5,0.6) 0%, transparent 60%);
        }
        .hero-scroll-hint {
          position: absolute;
          bottom: 48px;
          left: 60px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #5a5040;
          z-index: 2;
        }
        .scroll-line {
          width: 1px;
          height: 48px;
          background: linear-gradient(to bottom, transparent, #5a5040);
          animation: scrollAnim 2s ease-in-out infinite;
        }
        @keyframes scrollAnim {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .hero-stat-badge {
          position: absolute;
          top: 50%;
          right: 60px;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          z-index: 3;
        }
        .stat-circle {
          width: 100px;
          height: 100px;
          border: 1px solid rgba(212,184,150,0.3);
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(4px);
          background: rgba(10,8,5,0.4);
        }
        .stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 300;
          color: #d4b896;
          line-height: 1;
        }
        .stat-label {
          font-size: 8px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #7a6d5e;
          margin-top: 2px;
        }
        .hero-bg-text {
          position: absolute;
          bottom: -40px;
          right: -20px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 200px;
          font-weight: 300;
          color: rgba(212,184,150,0.04);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }

        /* MARQUEE */
        .alora-marquee {
          border-top: 1px solid rgba(212,184,150,0.15);
          border-bottom: 1px solid rgba(212,184,150,0.15);
          background: rgba(212,184,150,0.04);
          overflow: hidden;
          padding: 18px 0;
        }
        .marquee-track {
          display: flex;
          white-space: nowrap;
          animation: marqueeScroll 30s linear infinite;
        }
        .marquee-item {
          display: flex;
          align-items: center;
          gap: 0;
          flex-shrink: 0;
        }
        .marquee-text {
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #a89880;
          padding: 0 40px;
        }
        .marquee-diamond {
          color: #d4b896;
          font-size: 6px;
        }
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* FEATURED PRODUCTS */
        .section-products {
          padding: 120px 60px;
        }
        .section-heading-block {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 72px;
        }
        .section-tag-row {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: #d4b896;
          margin-bottom: 20px;
        }
        .section-tag-row::after {
          content: '';
          display: block;
          width: 48px;
          height: 1px;
          background: #d4b896;
        }
        .section-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 4vw, 60px);
          font-weight: 300;
          color: #f0e6d8;
          letter-spacing: 0.05em;
          line-height: 1.0;
        }
        .view-all-link {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #7a6d5e;
          text-decoration: none;
          border-bottom: 1px solid rgba(122,109,94,0.4);
          padding-bottom: 4px;
          transition: color 0.3s;
          white-space: nowrap;
          margin-bottom: 6px;
        }
        .view-all-link:hover { color: #d4b896; }

        /* product grid */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
        }
        .product-cell {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          background: #0f0c08;
          aspect-ratio: 3/4;
          text-decoration: none;
          display: block;
        }
        .product-cell-img {
          position: absolute;
          inset: 0;
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .product-cell:hover .product-cell-img {
          transform: scale(1.06);
        }
        .product-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,8,5,0.9) 0%, rgba(10,8,5,0.2) 50%, transparent 100%);
          transition: opacity 0.4s;
        }
        .product-cell:hover .product-overlay {
          background: linear-gradient(to top, rgba(10,8,5,0.95) 0%, rgba(10,8,5,0.4) 60%, rgba(10,8,5,0.1) 100%);
        }
        .product-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          font-size: 7px;
          font-weight: 400;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #0a0805;
          background: #d4b896;
          padding: 4px 10px;
          z-index: 2;
        }
        .product-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 24px 20px;
          z-index: 2;
          transform: translateY(6px);
          transition: transform 0.4s;
        }
        .product-cell:hover .product-info { transform: translateY(0); }
        .product-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 300;
          color: #f0e6d8;
          line-height: 1.1;
          margin-bottom: 4px;
        }
        .product-category {
          font-size: 8px;
          font-weight: 300;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #7a6d5e;
          margin-bottom: 12px;
        }
        .product-price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .product-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          font-weight: 400;
          color: #d4b896;
        }
        .product-add-btn {
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.3s 0.05s, transform 0.3s;
          font-size: 7px;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #0a0805;
          background: #d4b896;
          border: none;
          padding: 6px 12px;
          cursor: pointer;
        }
        .product-cell:hover .product-add-btn {
          opacity: 1;
          transform: translateY(0);
        }

        /* STORY SECTION */
        .story-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 80vh;
        }
        .story-visual {
          position: relative;
          overflow: hidden;
          min-height: 600px;
        }
        .story-text-side {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 100px 80px 100px 80px;
          background: #0d0a07;
          position: relative;
        }
        .story-text-side::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 1px;
          height: 100%;
          background: linear-gradient(to bottom, transparent, rgba(212,184,150,0.2), transparent);
        }
        .story-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 120px;
          font-weight: 300;
          color: rgba(212,184,150,0.06);
          line-height: 1;
          position: absolute;
          top: 40px;
          right: 40px;
        }
        .story-body {
          font-size: 14px;
          font-weight: 300;
          line-height: 2;
          color: #8a7d6e;
          max-width: 440px;
          margin-bottom: 20px;
          letter-spacing: 0.02em;
        }
        .story-body + .story-body { margin-top: 0; }

        /* PILLARS */
        .pillars-section {
          padding: 100px 60px;
          border-top: 1px solid rgba(212,184,150,0.1);
        }
        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          margin-top: 72px;
          background: rgba(212,184,150,0.08);
        }
        .pillar-card {
          background: #0a0805;
          padding: 48px 36px;
          transition: background 0.3s;
        }
        .pillar-card:hover { background: #0f0c08; }
        .pillar-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          font-weight: 300;
          color: #d4b896;
          letter-spacing: 0.1em;
          margin-bottom: 28px;
        }
        .pillar-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 300;
          color: #f0e6d8;
          line-height: 1.2;
          margin-bottom: 20px;
        }
        .pillar-desc {
          font-size: 12px;
          font-weight: 300;
          line-height: 1.8;
          color: #5a5040;
          letter-spacing: 0.02em;
        }
        .pillar-line {
          width: 32px;
          height: 1px;
          background: rgba(212,184,150,0.4);
          margin: 24px 0 0;
        }

        /* EDITORIAL BANNER */
        .editorial-banner {
          position: relative;
          height: 500px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .editorial-banner-bg {
          position: absolute;
          inset: 0;
          background: #0d0a07;
        }
        .editorial-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 700px;
          padding: 0 40px;
        }
        .editorial-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 4vw, 54px);
          font-weight: 300;
          font-style: italic;
          color: #f0e6d8;
          line-height: 1.3;
          margin-bottom: 40px;
        }
        .editorial-attr {
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: #5a5040;
        }
        .editorial-border {
          position: absolute;
          inset: 40px;
          border: 1px solid rgba(212,184,150,0.12);
          pointer-events: none;
        }
        .editorial-corner {
          position: absolute;
          width: 20px;
          height: 20px;
          border-color: #d4b896;
          border-style: solid;
          opacity: 0.4;
        }
        .ec-tl { top: 40px; left: 40px; border-width: 1px 0 0 1px; }
        .ec-tr { top: 40px; right: 40px; border-width: 1px 1px 0 0; }
        .ec-bl { bottom: 40px; left: 40px; border-width: 0 0 1px 1px; }
        .ec-br { bottom: 40px; right: 40px; border-width: 0 1px 1px 0; }

        /* ANIMATIONS */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up {
          animation: fadeInUp 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.25s; }
        .delay-3 { animation-delay: 0.45s; }
        .delay-4 { animation-delay: 0.65s; }

        @media (max-width: 1024px) {
          .alora-hero { grid-template-columns: 1fr; }
          .hero-left { padding: 40px 32px 80px; }
          .hero-right { display: none; }
          .section-products { padding: 80px 32px; }
          .products-grid { grid-template-columns: repeat(3, 1fr); gap: 8px; }
          .story-section { grid-template-columns: 1fr; }
          .story-visual { min-height: 400px; }
          .story-text-side { padding: 60px 32px; }
          .pillars-section { padding: 60px 32px; }
          .pillars-grid { grid-template-columns: repeat(2, 1fr); }
          .section-heading-block { flex-direction: column; align-items: flex-start; gap: 20px; }
        }
      `}</style>

      {/* HERO */}
      <section className="alora-hero">
        <div className="hero-left">
          <p className="hero-eyebrow fade-in-up">Luxury Fragrance Maison</p>
          <h1 className="hero-headline fade-in-up delay-1">
            Find Your<br />
            <em>Signature</em><br />
            Scent
          </h1>
          <p className="hero-body fade-in-up delay-2">
            Crafted from the world's rarest ingredients, each Alora fragrance is a meditation on elegance — a story worn on skin.
          </p>
          <div className="hero-cta-row fade-in-up delay-3">
            <Link href="/shop" className="btn-hero-primary">
              Explore Collection
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </Link>
            <Link href="/about" className="btn-hero-ghost">Our Maison</Link>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-right-bg"></div>
          <div className="hero-image-container">
            <Image
              src="/hero_perfume.png"
              alt="Alora luxury perfume"
              width={440}
              height={580}
              priority
              style={{ position: "relative", zIndex: 1, objectFit: "contain" }}
            />
          </div>
          <div className="hero-image-overlay"></div>
          <div className="hero-bg-text">A</div>
        </div>
      </section>

      {/* MARQUEE */}
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

      {/* FEATURED PRODUCTS */}
      <section className="section-products">
        <div className="section-heading-block">
          <div>
            <div className="section-tag-row">Curated Selection</div>
            <h2 className="section-h2">Our Bestsellers</h2>
          </div>
          <Link href="/shop" className="view-all-link">
            View All
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </Link>
        </div>
        <div className="products-grid">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/shop/${p.id}`}
              className="product-cell"
              onMouseEnter={() => setHoveredProduct(p.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="product-cell-img">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  sizes="25vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="product-overlay"></div>
              {p.badge && <span className="product-badge">{p.badge}</span>}
              <div className="product-info">
                <p className="product-category">{p.category}</p>
                <h3 className="product-name">{p.name}</h3>
                <div className="product-price-row">
                  <span className="product-price">{p.price}</span>
                  <button className="product-add-btn" onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}>Add to Bag</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className="story-section" id="about-story">
        <div className="story-visual">
          <Image
            src="/alora_BG2.png"
            alt="The Alora atelier"
            fill
            sizes="50vw"
            style={{ objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent, rgba(13,10,7,0.3))" }}></div>
        </div>
        <div className="story-text-side">
          <span className="story-number">II</span>
          <div className="section-tag-row" style={{ marginBottom: "24px" }}>Our Story</div>
          <h2 className="section-h2" style={{ marginBottom: "36px" }}>The Art of<br /><em style={{ fontStyle: "italic", color: "#d4b896" }}>Perfumery</em></h2>
          <p className="story-body">
            Founded on the belief that fragrance is an extension of identity, Alora combines centuries-old artisanal techniques with contemporary design. Every bottle is a masterpiece — from hand-selected raw materials sourced across five continents, to the meticulous blending process that can take up to three years to perfect.
          </p>
          <p className="story-body" style={{ marginTop: "20px", marginBottom: "48px" }}>
            We believe luxury should be felt, not just seen. Each Alora scent is designed to evolve throughout the day, revealing new layers and leaving an unforgettable impression.
          </p>
          <Link href="/about" className="btn-hero-ghost" style={{ alignSelf: "flex-start" }}>
            Discover Our Maison
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </Link>
        </div>
      </section>

      {/* PILLARS */}
      <section className="pillars-section">
        <div style={{ maxWidth: "600px" }}>
          <div className="section-tag-row">The Alora Promise</div>
          <h2 className="section-h2">Crafted Without<br />Compromise</h2>
        </div>
        <div className="pillars-grid">
          {pillars.map((p) => (
            <div key={p.num} className="pillar-card">
              <p className="pillar-num">{p.num}</p>
              <h3 className="pillar-label">{p.label}</h3>
              <p className="pillar-desc">{p.desc}</p>
              <div className="pillar-line"></div>
            </div>
          ))}
        </div>
      </section>

      {/* EDITORIAL QUOTE */}
      <div className="editorial-banner">
        <div className="editorial-banner-bg"></div>
        <div className="ec-tl editorial-corner"></div>
        <div className="ec-tr editorial-corner"></div>
        <div className="ec-bl editorial-corner"></div>
        <div className="ec-br editorial-corner"></div>
        <div className="editorial-border"></div>
        <div className="editorial-content">
          <p className="editorial-quote">
            "A fragrance is the invisible part of your personality that says the most about who you are."
          </p>
          <p className="editorial-attr">— The Alora Philosophy</p>
        </div>
      </div>
    </>
  );
}