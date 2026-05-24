"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";



type Pillar = {
  num: string;
  label: string;
  desc: string;
};



const pillars: Pillar[] = [
  { num: "01", label: "Hand-Sourced Ingredients", desc: "Rare botanicals harvested across five continents at peak potency." },
  { num: "02", label: "Master Perfumers", desc: "Crafted by artisans with decades of olfactory heritage." },
  { num: "03", label: "Up to 3 Years", desc: "The meticulous blending process behind each signature scent." },
  { num: "04", label: "Certified Luxury", desc: "Every bottle inspected and authenticated before it leaves our atelier." },
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@200;300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Jost', sans-serif;
          background: #C2B280;
          color: #1a1410;
          overflow-x: hidden;
        }

        /* ==================== HERO SECTION ==================== */
        .alora-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #C2B280;
          padding: 0px 40px 160px;
        }

        /* Ambient glow behind bottle */
        .hero-glow {
          position: absolute;
          top: 42%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.06) 40%, transparent 70%);
          pointer-events: none;
          z-index: 0;
          animation: glowPulse 6s ease-in-out infinite;
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.08); }
        }

        /* Subtle grid/noise overlay */
        .hero-noise {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0);
          background-size: 40px 40px;
          pointer-events: none;
          z-index: 0;
        }

        /* Decorative corner accents */
        .hero-corner {
          position: absolute;
          width: 60px;
          height: 60px;
          border-color: rgba(26,20,16,0.15);
          border-style: solid;
          z-index: 1;
          transition: border-color 0.6s;
        }
        .hero-corner:hover { border-color: rgba(26,20,16,0.35); }
        .hc-tl { top: 30px; left: 30px; border-width: 1px 0 0 1px; }
        .hc-tr { top: 30px; right: 30px; border-width: 1px 1px 0 0; }
        .hc-bl { bottom: 30px; left: 30px; border-width: 0 0 1px 1px; }
        .hc-br { bottom: 30px; right: 30px; border-width: 0 1px 1px 0; }

        /* Top eyebrow */
        .hero-eyebrow {
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: #6b5a3e;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          z-index: 2;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .hero-eyebrow.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .hero-eyebrow::before,
        .hero-eyebrow::after {
          content: '';
          display: block;
          width: 40px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #6b5a3e);
        }
        .hero-eyebrow::after {
          background: linear-gradient(90deg, #6b5a3e, transparent);
        }

        /* Main headline */
        .hero-headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(42px, 5.5vw, 80px);
          font-weight: 300;
          line-height: 1.05;
          color: #1a1410;
          text-align: center;
          margin-bottom: 16px;
          z-index: 2;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s;
        }
        .hero-headline.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .hero-headline em {
          font-style: italic;
          color: #6b5a3e;
        }

        /* Subheadline text */
        .hero-sub {
          font-size: 13px;
          font-weight: 300;
          line-height: 1.9;
          color: rgba(26,20,16,0.5);
          max-width: 460px;
          text-align: center;
          margin-bottom: 40px;
          letter-spacing: 0.04em;
          z-index: 2;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s;
        }
        .hero-sub.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Hero image wrapper */
        .hero-image-wrap {
          position: relative;
          z-index: 2;
          margin-bottom: 50px;
          opacity: 0;
          transform: translateY(40px) scale(0.95);
          transition: all 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s;
        }
        .hero-image-wrap.visible {
          opacity: 1;
          transform: translateY(-20px) scale(1);
        }

        /* Hero butterfly images */
        .hero-butterfly {
          position: absolute;
          z-index: 3;
          pointer-events: none;
          user-select: none;
        }
        .hero-butterfly img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          mix-blend-mode: multiply;
        }
        .hero-butterfly-orange2 {
          left: 8%;
          bottom: 25%;
          width: clamp(100px, 16vw, 215px);
          height: auto;
          transform: rotate(-10deg);
          animation: butterflyFloat 6s ease-in-out infinite;
        }
        .hero-butterfly-orange {
          right: 1%;
          top: 4%;
          width: clamp(180px, 20vw, 280px);
          height: auto;
          transform: rotate(5deg);
          animation: butterflyFloat 7s ease-in-out infinite 1s;
        }
        @keyframes butterflyFloat {
          0%, 100% { transform: translateY(0) rotate(-10deg); }
          50% { transform: translateY(-12px) rotate(-6deg); }
        }
        .hero-butterfly-orange {
          animation-name: butterflyFloatOrange;
        }
        @keyframes butterflyFloatOrange {
          0%, 100% { transform: translateY(0) rotate(5deg); }
          50% { transform: translateY(-14px) rotate(10deg); }
        }

        /* Large background heading behind bottle */
        .hero-bg-heading {
          position: absolute;
          top: 42%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          width: 100%;
          max-width: 1300px;
          padding: 0 30px;
          pointer-events: none;
          user-select: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }
        .hero-bg-heading .bg-line {
          display: flex;
          justify-content: space-between;
          width: 100%;
          font-family: var(--font-black-kastile), sans-serif;
          font-size: clamp(55px, 9.5vw, 150px);
          font-weight: 400;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          line-height: 1.05;
          letter-spacing: 0.02em;
        }
        .hero-bg-heading .bg-line.center-text {
          justify-content: center;
        }
        .hero-bg-heading .bg-word {
          flex-shrink: 0;
        }
        .hero-image-inner {
          position: relative;
          width: clamp(320px, 38vw, 520px);
          height: clamp(380px, 45vw, 620px);
          filter: drop-shadow(0 20px 60px rgba(0,0,0,0.15)) drop-shadow(0 8px 20px rgba(0,0,0,0.2));
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.6s;
        }
        .hero-image-inner:hover {
          transform: translateY(-8px) rotate(1deg);
          filter: drop-shadow(0 30px 80px rgba(0,0,0,0.2)) drop-shadow(0 12px 30px rgba(0,0,0,0.3));
        }

        /* Floating ring around image */
        .hero-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 110%;
          height: 110%;
          border: 1px solid rgba(184,149,106,0.1);
          border-radius: 50%;
          animation: ringRotate 20s linear infinite;
          pointer-events: none;
        }
        .hero-ring::after {
          content: '';
          position: absolute;
          top: -3px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          background: #b8956a;
          border-radius: 50%;
        }
        @keyframes ringRotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* CTA row */
        .hero-cta-row {
          display: flex;
          align-items: center;
          gap: 36px;
          z-index: 2;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.55s;
        }
        .hero-cta-row.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .btn-hero-primary {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 18px 48px;
          background: linear-gradient(135deg, #1a1410, #2e2820);
          color: #f0ece6;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          text-decoration: none;
          border: none;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .btn-hero-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #2e2820, #1a1410);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .btn-hero-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(26,20,16,0.3);
        }
        .btn-hero-primary:hover::before { opacity: 1; }
        .btn-hero-primary span,
        .btn-hero-primary svg { position: relative; z-index: 1; }

        .btn-hero-ghost {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(26,20,16,0.5);
          text-decoration: none;
          border-bottom: 1px solid rgba(26,20,16,0.25);
          padding-bottom: 4px;
          transition: color 0.3s, border-color 0.3s;
        }
        .btn-hero-ghost:hover { color: #1a1410; border-color: #1a1410; }

        /* Scroll indicator */
        .hero-scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          z-index: 2;
        }
        .scroll-text {
          font-size: 8px;
          font-weight: 300;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(26,20,16,0.3);
        }
        .scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, rgba(26,20,16,0.4), transparent);
          animation: scrollAnim 2s ease-in-out infinite;
        }
        @keyframes scrollAnim {
          0%, 100% { opacity: 0.3; transform: scaleY(0.6); }
          50% { opacity: 1; transform: scaleY(1); }
        }

        /* Side stats */
        .hero-side-stats {
          position: absolute;
          right: 50px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 32px;
          z-index: 2;
        }
        .side-stat {
          text-align: right;
          opacity: 0;
          transform: translateX(20px);
          transition: all 0.6s ease;
        }
        .side-stat.visible {
          opacity: 1;
          transform: translateX(0);
        }
        .side-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          font-weight: 300;
          color: #6b5a3e;
          line-height: 1;
        }
        .side-stat-label {
          font-size: 8px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(26,20,16,0.35);
          margin-top: 4px;
        }
        .side-stat-line {
          width: 24px;
          height: 1px;
          background: rgba(26,20,16,0.15);
          margin-left: auto;
          margin-top: 8px;
        }

        /* Large BG text */
        .hero-bg-text {
          position: absolute;
          bottom: 10%;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(120px, 18vw, 280px);
          font-weight: 300;
          color: rgba(26,20,16,0.04);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          z-index: 0;
          white-space: nowrap;
        }

        /* ==================== MARQUEE ==================== */
        .alora-marquee {
          border-top: 1px solid rgba(26,20,16,0.1);
          border-bottom: 1px solid rgba(26,20,16,0.1);
          background: rgba(26,20,16,0.04);
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
          color: rgba(26,20,16,0.4);
          padding: 0 40px;
        }
        .marquee-diamond {
          color: #6b5a3e;
          font-size: 6px;
        }
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ==================== FEATURED PRODUCTS ==================== */
        .section-products {
          padding: 120px 60px;
          background: #C2B280;
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
          color: #6b5a3e;
          margin-bottom: 20px;
        }
        .section-tag-row::after {
          content: '';
          display: block;
          width: 48px;
          height: 1px;
          background: #6b5a3e;
        }
        .section-h2 {
          font-family: var(--font-lumien), 'Cormorant Garamond', serif;
          font-size: clamp(36px, 4vw, 60px);
          font-weight: 300;
          color: #1a1410;
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
          color: rgba(26,20,16,0.45);
          text-decoration: none;
          border-bottom: 1px solid rgba(26,20,16,0.2);
          padding-bottom: 4px;
          transition: color 0.3s;
          white-space: nowrap;
          margin-bottom: 6px;
        }
        .view-all-link:hover { color: #1a1410; }

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
          background: #b5a778;
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
          background: linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.2) 50%, transparent 100%);
          transition: opacity 0.4s;
        }
        .product-cell:hover .product-overlay {
          background: linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 60%, rgba(10,10,10,0.05) 100%);
        }
        .product-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          font-size: 7px;
          font-weight: 400;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #f0ece6;
          background: #1a1410;
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
          color: #faf8f5;
          line-height: 1.1;
          margin-bottom: 4px;
        }
        .product-category {
          font-size: 8px;
          font-weight: 300;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(250,248,245,0.6);
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
          color: #faf8f5;
        }
        .product-add-btn {
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.3s 0.05s, transform 0.3s;
          font-size: 7px;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #f0ece6;
          background: #1a1410;
          border: none;
          padding: 6px 12px;
          cursor: pointer;
        }
        .product-cell:hover .product-add-btn {
          opacity: 1;
          transform: translateY(0);
        }

        /* ==================== STORY SECTION ==================== */
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
          background: #b8a870;
          position: relative;
        }
        .story-text-side::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 1px;
          height: 100%;
          background: linear-gradient(to bottom, transparent, rgba(26,20,16,0.1), transparent);
        }
        .story-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 120px;
          font-weight: 300;
          color: rgba(26,20,16,0.06);
          line-height: 1;
          position: absolute;
          top: 40px;
          right: 40px;
        }
        .story-body {
          font-size: 14px;
          font-weight: 300;
          line-height: 2;
          color: rgba(26,20,16,0.55);
          max-width: 440px;
          margin-bottom: 20px;
          letter-spacing: 0.02em;
        }
        .story-body + .story-body { margin-top: 0; }

        /* ==================== PILLARS ==================== */
        .pillars-section {
          padding: 100px 60px;
          border-top: 1px solid rgba(26,20,16,0.1);
          background: #C2B280;
        }
        .pillars-header {
          text-align: center;
          margin-bottom: 64px;
          position: relative;
          z-index: 2;
        }
        .pillars-header .section-tag-row {
          justify-content: center;
        }
        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          margin-top: 72px;
          background: rgba(26,20,16,0.08);
        }
        .pillar-card {
          background: #c8be8e;
          padding: 48px 36px;
          transition: background 0.3s;
        }
        .pillar-card:hover { background: #d0c89c; }
        .pillar-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          font-weight: 300;
          color: #6b5a3e;
          letter-spacing: 0.1em;
          margin-bottom: 28px;
        }
        .pillar-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 300;
          color: #1a1410;
          line-height: 1.2;
          margin-bottom: 20px;
        }
        .pillar-desc {
          font-size: 12px;
          font-weight: 300;
          line-height: 1.8;
          color: rgba(26,20,16,0.45);
          letter-spacing: 0.02em;
        }
        .pillar-line {
          width: 32px;
          height: 1px;
          background: rgba(26,20,16,0.15);
          margin: 24px 0 0;
        }

        /* ==================== SALE SECTION ==================== */
        .sale-section {
          padding: 100px 60px;
          background: #C2B280;
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(26,20,16,0.1);
        }
        .sale-bg-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(100px, 14vw, 220px);
          font-weight: 300;
          color: rgba(26,20,16,0.04);
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
        }
        .sale-header {
          text-align: center;
          margin-bottom: 60px;
          position: relative;
          z-index: 2;
        }
        .sale-header .section-tag-row {
          justify-content: center;
        }
        .sale-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .sale-card {
          position: relative;
          border-radius: 4px;
          overflow: hidden;
          display: flex;
          align-items: center;
          background: #b5a778;
          border: 1px solid rgba(26,20,16,0.08);
          padding: 32px;
          min-height: 240px;
          transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), border-color 0.4s, box-shadow 0.4s;
          cursor: pointer;
        }
        .sale-card:hover {
          transform: translateY(-6px);
          border-color: rgba(26,20,16,0.15);
          box-shadow: 0 20px 60px rgba(26,20,16,0.15);
        }
        .sale-card-shimmer {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
          transition: left 0.6s;
          pointer-events: none;
        }
        .sale-card:hover .sale-card-shimmer {
          left: 100%;
        }
        .sale-card-img {
          position: relative;
          width: 180px;
          height: 180px;
          flex-shrink: 0;
          margin-right: 28px;
        }
        .sale-card-content {
          flex: 1;
        }
        .sale-card-label {
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(26,20,16,0.4);
          margin-bottom: 8px;
        }
        .sale-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          font-weight: 300;
          color: #1a1410;
          margin-bottom: 12px;
          line-height: 1.2;
        }
        .sale-discount-badge {
          display: inline-flex;
          align-items: baseline;
          gap: 4px;
          margin-bottom: 12px;
        }
        .sale-discount-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 48px;
          font-weight: 300;
          color: #6b5a3e;
          line-height: 1;
        }
        .sale-discount-pct {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 300;
          color: #6b5a3e;
        }
        .sale-discount-off {
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(26,20,16,0.4);
          margin-left: 8px;
        }
        .sale-card-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 9px;
          font-weight: 400;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #1a1410;
          text-decoration: none;
          border-bottom: 1px solid rgba(26,20,16,0.25);
          padding-bottom: 4px;
          transition: color 0.3s, border-color 0.3s;
        }
        .sale-card-cta:hover {
          color: #6b5a3e;
          border-color: #6b5a3e;
        }
        .sale-card-cta svg {
          transition: transform 0.3s;
        }
        .sale-card-cta:hover svg {
          transform: translateX(4px);
        }

        /* ==================== FIND YOUR PERFUME ==================== */
        .perfume-finder-section {
          padding: 100px 60px;
          background: #C2B280;
          position: relative;
          overflow: hidden;
        }
        .perfume-finder-bg-text {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(60px, 10vw, 140px);
          font-weight: 300;
          font-style: italic;
          color: rgba(26,20,16,0.04);
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
        }
        .perfume-finder-header {
          text-align: center;
          margin-bottom: 64px;
          position: relative;
          z-index: 2;
        }
        .perfume-finder-header .section-tag-row {
          justify-content: center;
        }
        .perfume-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .perfume-card {
          background: #b5a778;
          border-radius: 4px;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s;
          cursor: pointer;
          text-decoration: none;
          display: block;
        }
        .perfume-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(26,20,16,0.2);
        }
        .perfume-card-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          overflow: hidden;
          background: linear-gradient(135deg, #a89968, #c0b580);
        }
        .perfume-card-img-wrap img {
          transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .perfume-card:hover .perfume-card-img-wrap img {
          transform: scale(1.08);
        }
        .perfume-card-body {
          padding: 16px 16px;
        }
        .perfume-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 400;
          color: #1a1410;
          margin-bottom: 6px;
          line-height: 1.2;
        }
        .perfume-card-desc {
          font-size: 10px;
          font-weight: 300;
          line-height: 1.6;
          color: rgba(26,20,16,0.5);
          margin-bottom: 12px;
          letter-spacing: 0.02em;
        }
        .perfume-card-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          background: #1a1410;
          color: #f0ece6;
          font-size: 7px;
          font-weight: 400;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: background 0.3s, transform 0.3s;
        }
        .perfume-card-btn:hover {
          background: #2e2820;
          transform: translateY(-2px);
        }

        /* ==================== TESTIMONIALS ==================== */
        .testimonials-section {
          padding: 100px 60px;
          background: #C2B280;
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(26,20,16,0.1);
        }
        .testimonials-bg-text {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(60px, 10vw, 140px);
          font-weight: 300;
          font-style: italic;
          color: rgba(26,20,16,0.04);
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
        }
        .testimonials-header {
          text-align: center;
          margin-bottom: 64px;
          position: relative;
          z-index: 2;
        }
        .testimonials-header .section-tag-row {
          justify-content: center;
        }
        .testimonial-card {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 60px;
          position: relative;
          z-index: 2;
        }
        .testimonial-img-col {
          flex-shrink: 0;
          position: relative;
        }
        .testimonial-img-wrap {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid rgba(26,20,16,0.12);
          position: relative;
        }
        .testimonial-content-col {
          flex: 1;
          position: relative;
        }
        .testimonial-quote-mark {
          position: absolute;
          top: -30px;
          right: 0;
          font-family: 'Cormorant Garamond', serif;
          font-size: 140px;
          font-weight: 300;
          color: rgba(26,20,16,0.08);
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }
        .testimonial-stars {
          display: flex;
          gap: 4px;
          margin-bottom: 20px;
        }
        .testimonial-star {
          color: #6b5a3e;
          font-size: 14px;
        }
        .testimonial-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(18px, 2.2vw, 24px);
          font-weight: 300;
          font-style: italic;
          color: rgba(26,20,16,0.65);
          line-height: 1.7;
          margin-bottom: 32px;
          letter-spacing: 0.02em;
        }
        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .testimonial-author-line {
          width: 32px;
          height: 1px;
          background: rgba(26,20,16,0.2);
        }
        .testimonial-author-name {
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #1a1410;
        }
        .testimonial-author-title {
          font-size: 10px;
          font-weight: 300;
          color: rgba(26,20,16,0.4);
          letter-spacing: 0.1em;
          margin-top: 4px;
        }
        .testimonial-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 48px;
          position: relative;
          z-index: 2;
        }
        .testimonial-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(26,20,16,0.12);
          border: none;
          cursor: pointer;
          transition: background 0.3s, transform 0.3s;
          padding: 0;
        }
        .testimonial-dot.active {
          background: #6b5a3e;
          transform: scale(1.3);
        }
        .testimonial-dot:hover {
          background: rgba(26,20,16,0.3);
        }

        /* ==================== EDITORIAL BANNER ==================== */
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
          background: #b8a870;
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
          color: #1a1410;
          line-height: 1.3;
          margin-bottom: 40px;
        }
        .editorial-attr {
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: rgba(26,20,16,0.35);
        }
        .editorial-border {
          position: absolute;
          inset: 40px;
          border: 1px solid rgba(26,20,16,0.1);
          pointer-events: none;
        }
        .editorial-corner {
          position: absolute;
          width: 20px;
          height: 20px;
          border-color: rgba(26,20,16,0.25);
          border-style: solid;
          opacity: 0.5;
        }
        .ec-tl { top: 40px; left: 40px; border-width: 1px 0 0 1px; }
        .ec-tr { top: 40px; right: 40px; border-width: 1px 1px 0 0; }
        .ec-bl { bottom: 40px; left: 40px; border-width: 0 0 1px 1px; }
        .ec-br { bottom: 40px; right: 40px; border-width: 0 1px 1px 0; }

        /* ==================== ANIMATIONS ==================== */
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

        /* ==================== RESPONSIVE ==================== */
        @media (max-width: 1024px) {
          .alora-hero { padding: 40px 24px 60px; min-height: auto; }
          .hero-side-stats { display: none; }
          .hero-corner { display: none; }
          .hero-butterfly { display: none; }
          .hero-image-inner {
            width: clamp(260px, 60vw, 400px) !important;
            height: clamp(320px, 72vw, 480px) !important;
          }
          .section-products { padding: 80px 32px; }
          .products-grid { grid-template-columns: repeat(3, 1fr); gap: 8px; }
          .story-section { grid-template-columns: 1fr; }
          .story-visual { min-height: 400px; }
          .story-text-side { padding: 60px 32px; }
          .pillars-section { padding: 60px 32px; }
          .pillars-grid { grid-template-columns: repeat(2, 1fr); }
          .section-heading-block { flex-direction: column; align-items: flex-start; gap: 20px; }
          .sale-section { padding: 60px 32px; }
          .sale-grid { grid-template-columns: 1fr; }
          .sale-card { padding: 24px; min-height: 180px; }
          .sale-card-img { width: 120px; height: 120px; margin-right: 20px; }
          .sale-discount-num { font-size: 36px; }
          .perfume-finder-section { padding: 60px 32px; }
          .perfume-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
          .testimonials-section { padding: 60px 32px; }
          .testimonial-card { flex-direction: column; text-align: center; gap: 32px; }
          .testimonial-author { justify-content: center; }
          .testimonial-quote-mark { right: 50%; transform: translateX(50%); }
        }
        @media (max-width: 640px) {
          .hero-headline { font-size: clamp(32px, 10vw, 48px); }
          .hero-image-inner {
            width: clamp(220px, 70vw, 320px) !important;
            height: clamp(270px, 85vw, 400px) !important;
          }
          .products-grid { grid-template-columns: repeat(2, 1fr); }
          .pillars-grid { grid-template-columns: 1fr; }
          .sale-card { flex-direction: column; text-align: center; padding: 24px 16px; }
          .sale-card-img { margin-right: 0; margin-bottom: 16px; width: 140px; height: 140px; }
          .perfume-grid { grid-template-columns: 1fr; }
          .testimonial-img-wrap { width: 140px; height: 140px; }
        }
      `}</style>

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
              <div className="pillar-line"></div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== SALE SECTION ==================== */}
      <section className="sale-section">
        <div className="sale-bg-text">SALE</div>
        <div className="sale-header">
          <div className="section-tag-row">Limited Time Offer</div>
          <h2 className="section-h2">exclusive deals</h2>
        </div>
        <div className="sale-grid">
          {[
            { name: "Midnight Essence", discount: 30, img: "/perfume_sale_1.png" },
            { name: "Velvet Bloom", discount: 15, img: "/perfume_sale_2.png" },
            { name: "Golden Dusk", discount: 25, img: "/perfume_morning_scent.png" },
            { name: "Citrus Noir", discount: 20, img: "/perfume_orange_delight.png" },
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

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="testimonials-section">

        <div className="testimonials-header">
          <div className="section-tag-row">What Our Clients Say</div>
          <h2 className="section-h2">our testimonials</h2>
        </div>
        <div className="testimonial-card">
          <div className="testimonial-img-col">
            <div className="testimonial-img-wrap">
              <Image
                src="/testimonial_avatar.png"
                alt="Customer testimonial"
                fill
                unoptimized
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="testimonial-content-col">
            <span className="testimonial-quote-mark">&rdquo;</span>
            <div className="testimonial-stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="testimonial-star">★</span>
              ))}
            </div>
            <p className="testimonial-text">
              &ldquo;Alora has completely transformed my fragrance journey. The quality is unmatched — every bottle feels like a work of art.
              The scent lasts all day and I constantly receive compliments. Truly a luxury experience from start to finish.&rdquo;
            </p>
            <div className="testimonial-author">
              <div className="testimonial-author-line"></div>
              <div>
                <p className="testimonial-author-name">Sophia Laurent</p>
                <p className="testimonial-author-title">Verified Buyer</p>
              </div>
            </div>
          </div>
        </div>
        <div className="testimonial-dots">
          <button className="testimonial-dot active" aria-label="Testimonial 1"></button>
          <button className="testimonial-dot" aria-label="Testimonial 2"></button>
          <button className="testimonial-dot" aria-label="Testimonial 3"></button>
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