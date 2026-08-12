import Image from "next/image";
import React from "react";

export default function EditorialQuoteBanner() {
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
          style={{ objectFit: "fill", pointerEvents: "none" }}
        />
      </div>
      <div className="editorial-content">
        <p className="editorial-quote">
          &ldquo;Fragrance, an invisible part of your personality that says the
          most about who you are.&rdquo;
        </p>
      </div>
    </div>
  );
}
