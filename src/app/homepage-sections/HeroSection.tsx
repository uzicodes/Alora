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
        <div className="bg-line line-1">
          <span className="bg-word">SENSES</span>
          <span className="bg-word word-meet">MEET</span>
        </div>
        <div className="bg-line line-2">
          <span className="bg-word word-raw">RAW</span>
          <span className="bg-word word-radiant">RADIANT</span>
        </div>
        <div className="bg-line center-text line-3">
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
