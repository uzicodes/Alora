import React from "react";

export default function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-header">
        <div className="section-tag-row">Who We Are</div>
        <h2 className="section-h2">our story</h2>
      </div>
      <div className="about-values-grid">
        <div className="about-value-card will-change-transform">
          <div
            className="about-value-inner"
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span className="about-value-icon">✦</span>
            <h3 className="about-value-title">Authenticity</h3>
            <p className="about-value-desc">
              Every fragrance we offer is sourced directly from the world&apos;s
              most prestigious perfume houses.
            </p>
          </div>
        </div>
        <div className="about-value-card will-change-transform">
          <div
            className="about-value-inner"
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span className="about-value-icon">◆</span>
            <h3 className="about-value-title">Craftsmanship</h3>
            <p className="about-value-desc">
              Celebrating the art of perfumery from rare ingredients harvested
              at peak potency.
            </p>
          </div>
        </div>
        <div className="about-value-card will-change-transform">
          <div
            className="about-value-inner"
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span className="about-value-icon">★</span>
            <h3 className="about-value-title">Experience</h3>
            <p className="about-value-desc">
              Each bottle is designed to evolve with you leaving an
              unforgettable impression.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
