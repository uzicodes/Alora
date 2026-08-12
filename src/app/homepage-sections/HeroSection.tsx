import Image from "next/image";
import React from "react";

export default function HeroSection() {
  return (
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
        <Image
          src="/orange2.png"
          alt=""
          width={225}
          height={225}
          quality={95}
          style={{ background: "transparent", width: "auto", height: "auto" }}
        />
      </div>
      <div className="hero-butterfly hero-butterfly-orange">
        <Image
          src="/orange.png"
          alt=""
          width={280}
          height={280}
          quality={95}
          style={{ background: "transparent", width: "auto", height: "auto" }}
        />
      </div>

      {/* Large background heading - behind bottle */}
      <div className="hero-bg-heading">
        <div className="bg-line" style={{ justifyContent: "space-between" }}>
          <span className="bg-word">SENSES</span>
          <span className="bg-word" style={{ marginRight: "7vw" }}>
            MEET
          </span>
        </div>
        <div
          className="bg-line"
          style={{
            paddingLeft: "clamp(80px, 10vw, 160px)",
            paddingRight: "0",
            transform: "translateY(clamp(20px, 3vw, 45px))",
          }}
        >
          <span className="bg-word">RAW</span>
          <span
            className="bg-word"
            style={{ marginRight: "clamp(-80px, -6vw, -20px)" }}
          >
            RADIANT
          </span>
        </div>
        <div
          className="bg-line center-text"
          style={{ transform: "translateY(clamp(40px, 6vw, 90px))" }}
        >
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
  );
}
