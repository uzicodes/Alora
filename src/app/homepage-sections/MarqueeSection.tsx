import React from "react";

export default function MarqueeSection() {
  return (
    <div className="alora-marquee">
      <div className="marquee-track">
        {[...Array(2)].map((_, gi) => (
          <span key={gi} className="marquee-item">
            {[
              "Free Shipping Over $150",
              "Complimentary Gift Wrapping",
              "Exclusive Members Rewards",
              "Authenticity Guaranteed",
              "Luxury Packaging",
              "Artisan Crafted",
            ].map((t, i) => (
              <span
                key={i}
                style={{ display: "inline-flex", alignItems: "center" }}
              >
                <span className="marquee-text">{t}</span>
                <span className="marquee-diamond">◆</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
