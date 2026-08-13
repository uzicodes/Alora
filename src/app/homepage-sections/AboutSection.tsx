import Link from "next/link";
import React from "react";

export default function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-header">
        <div className="section-tag-row">Who We Are</div>
        <h2 className="section-h2">our story</h2>
      </div>

      <div className="about-values-grid">
        {/* Card 1: Authenticity */}
        <div className="about-value-card">
          <div className="about-value-inner">
            <div className="about-value-icon-box">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>

            <h3 className="about-value-title">Authenticity</h3>
            <p className="about-value-desc">
              Every fragrance we offer is sourced directly from the world&apos;s
              most prestigious perfume houses with 100% verified authenticity.
            </p>
          </div>
        </div>

        {/* Card 2: Craftsmanship */}
        <div className="about-value-card">
          <div className="about-value-inner">
            <div className="about-value-icon-box">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
            </div>

            <h3 className="about-value-title">Craftsmanship</h3>
            <p className="about-value-desc">
              Celebrating the art of master perfumery using rare botanicals and
              precious oils harvested at peak natural potency.
            </p>
          </div>
        </div>

        {/* Card 3: Experience */}
        <div className="about-value-card">
          <div className="about-value-inner">
            <div className="about-value-icon-box">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>

            <h3 className="about-value-title">Experience</h3>
            <p className="about-value-desc">
              Each scent is formulated to evolve uniquely with your skin chemistry,
              leaving an unforgettable impression wherever you go.
            </p>
          </div>
        </div>
      </div>

      <div className="about-cta-wrap">
        <Link href="/shop" className="about-cta-link">
          <span>Explore Our Collection</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
