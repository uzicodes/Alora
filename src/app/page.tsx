"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./page.css";

gsap.registerPlugin(ScrollTrigger);



type Pillar = {
  num: string;
  label: string;
  desc: string;
};



const pillars: Pillar[] = [
  { num: "01", label: "Hand-Sourced Ingredients", desc: "Rare botanicals harvested with peak potency." },
  { num: "02", label: "Master Perfumers", desc: "Crafted by artisans with decades of olfactory heritage." },
  { num: "03", label: "Up to 3 Years", desc: "The meticulous blending behind each signature scent." },
  { num: "04", label: "Certified Luxury", desc: "Every bottle inspected before it leaves our atelier." },
];

const PerfumeCardImage = dynamic(() => import("./components/PerfumeCardImage"));

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero Section 
    gsap.fromTo(
      ".hero-bg-heading",
      { opacity: 0 },
      { opacity: 1, duration: 1.4, ease: "power2.out" }
    );
    gsap.fromTo(
      ".hero-image-wrap",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.4, ease: "power3.out", force3D: true, delay: 0.15 }
    );

    // Campaign Video Section
    gsap.fromTo(
      ".cv-video-frame",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: ".campaign-video-section",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Exclusive Deals / Sale Section - Horizontal Pinned Scroll
    gsap.fromTo(
      ".sale-header",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: ".sale-section",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    const saleTrack = containerRef.current?.querySelector(".sale-track") as HTMLElement;
    if (saleTrack) {
      const getStartX = () => {
        const firstCard = saleTrack.querySelector(".sale-card") as HTMLElement;
        if (!firstCard) return 0;
        const firstCardCenter = firstCard.offsetLeft + firstCard.offsetWidth / 2;
        return window.innerWidth * 0.75 - firstCardCenter;
      };

      const getEndX = () => {
        const cards = saleTrack.querySelectorAll(".sale-card");
        const lastCard = cards[cards.length - 1] as HTMLElement;
        if (!lastCard) return -saleTrack.scrollWidth;
        const lastCardCenter = lastCard.offsetLeft + lastCard.offsetWidth / 2;
        return window.innerWidth * 0.25 - lastCardCenter;
      };

      gsap.fromTo(
        ".sale-track",
        { x: getStartX },
        {
          x: getEndX,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: ".sale-section",
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => "+=" + Math.max(800, Math.abs(getStartX() - getEndX())),
            invalidateOnRefresh: true,
          },
        }
      );
    }

    // Find Your Perfume / Perfume Grid Section
    gsap.fromTo(
      ".perfume-finder-header",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: ".perfume-finder-section",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
    gsap.fromTo(
      ".perfume-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: ".perfume-grid",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Our Story / About Section 
    gsap.fromTo(
      ".about-header",
      { opacity: 0, y: 35, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    const storyCards = gsap.utils.toArray<HTMLElement>(".about-value-card");
    if (storyCards.length === 3) {
      // Left card sweeps in from left angle
      gsap.fromTo(storyCards[0],
        { opacity: 0, x: -130, y: 55, rotationZ: -9, scale: 0.86 },
        {
          opacity: 1, x: 0, y: 0, rotationZ: 0, scale: 1,
          duration: 1.35, ease: "power4.out", force3D: true, clearProps: "transform",
          scrollTrigger: { trigger: ".about-values-grid", start: "top 82%", toggleActions: "play none none reverse" }
        }
      );
      // Center card descends from elevated gallery spotlight
      gsap.fromTo(storyCards[1],
        { opacity: 0, y: -80, scale: 1.15 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 1.35, delay: 0.1, ease: "power4.out", force3D: true, clearProps: "transform",
          scrollTrigger: { trigger: ".about-values-grid", start: "top 82%", toggleActions: "play none none reverse" }
        }
      );
      // Right card sweeps in from right angle
      gsap.fromTo(storyCards[2],
        { opacity: 0, x: 130, y: 55, rotationZ: 9, scale: 0.86 },
        {
          opacity: 1, x: 0, y: 0, rotationZ: 0, scale: 1,
          duration: 1.35, delay: 0.05, ease: "power4.out", force3D: true, clearProps: "transform",
          scrollTrigger: { trigger: ".about-values-grid", start: "top 82%", toggleActions: "play none none reverse" }
        }
      );
    } else {
      // Fallback if card count changes in future
      gsap.fromTo(".about-value-card",
        { opacity: 0, y: 60, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, stagger: 0.15, ease: "power4.out", clearProps: "transform", scrollTrigger: { trigger: ".about-values-grid", start: "top 82%", toggleActions: "play none none reverse" } }
      );
    }

    // Continuous Scrubbed Horizon Parallax on inner wrappers
    const storyInners = gsap.utils.toArray<HTMLElement>(".about-value-inner");
    storyInners.forEach((inner, i) => {
      const yFloat = i === 1 ? 30 : -30;
      gsap.fromTo(inner,
        { y: -yFloat * 0.6 },
        {
          y: yFloat,
          ease: "none",
          force3D: true,
          scrollTrigger: { trigger: ".about-section", start: "top bottom", end: "bottom top", scrub: 1.2 }
        }
      );
    });

    // 7. Editorial Banner
    gsap.fromTo(
      ".editorial-content",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: ".editorial-banner",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="font-space-grotesk">
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
          <div className="bg-line" style={{ paddingLeft: 'clamp(80px, 10vw, 160px)', paddingRight: '0', transform: 'translateY(clamp(20px, 3vw, 45px))' }}>
            <span className="bg-word">RAW</span>
            <span className="bg-word" style={{ marginRight: 'clamp(-80px, -6vw, -20px)' }}>RADIANT</span>
          </div>
          <div className="bg-line center-text" style={{ transform: 'translateY(clamp(40px, 6vw, 90px))' }}>
            <span className="bg-word bg-word-perfumes">PERFUMES</span>
          </div>
        </div>

        {/* Hero Image - Center */}
        <div className="hero-image-wrap">
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
          <h2 className="section-h2">crafted without compromise</h2>
        </div>
        <div className="pillars-grid">
          {pillars.map((p) => (
            <div key={p.num} className="pillar-card">
              <div className="pillar-card-inner" style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h3 className="pillar-label">{p.label}</h3>
                <p className="pillar-desc">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== CAMPAIGN VIDEO ==================== */}
      <section className="campaign-video-section">
        <div className="cv-video-frame">
          {/* Decorative corner accents */}
          <div className="cv-corner cv-corner-tl"></div>
          <div className="cv-corner cv-corner-tr"></div>
          <div className="cv-corner cv-corner-bl"></div>
          <div className="cv-corner cv-corner-br"></div>

          {/* Top & bottom vignette overlays */}
          <div className="cv-vignette cv-vignette-top"></div>
          <div className="cv-vignette cv-vignette-bottom"></div>

          {/* Video element */}
          <video
            className="cv-video"
            aria-label="Promotional campaign background video"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/video-poster.webp"
          >
            <source
              src="https://res.cloudinary.com/dihvgsjh5/video/upload/v1782658374/video1_mrmp7s.webm"
              type="video/webm"
            />
            <source
              src="https://res.cloudinary.com/dihvgsjh5/video/upload/v1782658374/video1_mrmp7s.mp4"
              type="video/mp4"
            />
            <track
              kind="captions"
              src="/captions.vtt"
              srcLang="en"
              label="English captions"
              default
            />
          </video>
        </div>
      </section>

      {/* ==================== SALE SECTION ==================== */}
      <section className="sale-section">
        <div className="sale-header">
          <div className="section-tag-row">Limited Time Offer</div>
          <h2 className="section-h2">exclusive deals</h2>
        </div>
        <div className="sale-track-wrapper">
          <div className="sale-track">
            {[
              { name: "Luis Viutton Classics", discount: 30, img: "/homepage_images/deals/LV.webp" },
              { name: "Hugo Boss Frontliners", discount: 15, img: "/homepage_images/deals/boss.webp" },
              { name: "Lattaffa Year-Combo", discount: 25, img: "/homepage_images/deals/lattaffa.webp" },
              { name: "Nishane Summer Picks", discount: 20, img: "/homepage_images/deals/nishane.webp" },
            ].map((deal) => (
              <div key={deal.name} className="sale-card will-change-transform">
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
        </div>
      </section>

      {/* ==================== FIND YOUR PERFUME ==================== */}
      <PerfumeFinderSection />

      {/* ==================== ABOUT ==================== */}
      <AboutSection />

      {/* ==================== EDITORIAL QUOTE ==================== */}
      <EditorialQuoteBanner />
    </div>
  );
}

function PerfumeFinderSection() {
  return (
    <section className="perfume-finder-section">
      <div className="perfume-finder-header">
        <div className="section-tag-row">Collections</div>
        <h2 className="section-h2">find your perfume</h2>
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
          <Link href="/shop" key={perfume.name} className="perfume-card will-change-transform">
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
  );
}

function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-header">
        <div className="section-tag-row">Who We Are</div>
        <h2 className="section-h2">our story</h2>
      </div>
      <div className="about-values-grid">
        <div className="about-value-card will-change-transform">
          <div className="about-value-inner" style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span className="about-value-icon">✦</span>
            <h3 className="about-value-title">Authenticity</h3>
            <p className="about-value-desc">
              Every fragrance we offer is sourced directly from the world&apos;s most prestigious perfume houses.
            </p>
          </div>
        </div>
        <div className="about-value-card will-change-transform">
          <div className="about-value-inner" style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span className="about-value-icon">◆</span>
            <h3 className="about-value-title">Craftsmanship</h3>
            <p className="about-value-desc">
              Celebrating the art of perfumery from rare ingredients harvested at peak potency.
            </p>
          </div>
        </div>
        <div className="about-value-card will-change-transform">
          <div className="about-value-inner" style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span className="about-value-icon">★</span>
            <h3 className="about-value-title">Experience</h3>
            <p className="about-value-desc">
              Each bottle is designed to evolve with you leaving an unforgettable impression.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function EditorialQuoteBanner() {
  return (
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
  );
}