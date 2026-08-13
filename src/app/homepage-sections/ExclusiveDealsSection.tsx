import Image from "next/image";
import Link from "next/link";
import React from "react";

const deals = [
  {
    brand: "Louis Vuitton",
    collection: "Classics Collection",
    tag: "HAUTE PARFUMERIE",
    discount: 30,
    img: "/homepage_images/deals/LV.webp",
  },
  {
    brand: "Hugo Boss",
    collection: "Frontliners Edition",
    tag: "SIGNATURE HOUSE",
    discount: 15,
    img: "/homepage_images/deals/boss.webp",
  },
  {
    brand: "Lattafa",
    collection: "Year-Combo Selection",
    tag: "OUD & AMBER",
    discount: 25,
    img: "/homepage_images/deals/lattaffa.webp",
  },
  {
    brand: "Nishane",
    collection: "Summer Picks Extrait",
    tag: "EXTRAIT DE PARFUM",
    discount: 20,
    img: "/homepage_images/deals/nishane.webp",
  },
];

export default function ExclusiveDealsSection() {
  return (
    <section className="sale-section">
      <div className="sale-header">
        <div className="section-tag-row">Limited Time Offer</div>
        <h2 className="section-h2">exclusive deals</h2>
      </div>
      <div className="sale-track-wrapper">
        <div className="sale-track">
          {deals.map((deal) => (
            <div key={deal.brand} className="sale-card will-change-transform">
              <div className="sale-card-shimmer"></div>

              <div className="sale-card-img">
                <Image
                  src={deal.img}
                  alt={`${deal.brand} - ${deal.collection}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={95}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="sale-card-content">
                <div className="sale-card-header-row">
                  <span className="sale-brand-tag">
                    <span className="sale-brand-tag-dot"></span>
                    {deal.tag}
                  </span>
                </div>

                <div className="sale-card-brand-block">
                  <h3 className="sale-card-title sale-card-brand-name">{deal.brand}</h3>
                  <p className="sale-card-collection">{deal.collection}</p>
                </div>

                <div className="sale-discount-badge">
                  <span className="sale-discount-num">{deal.discount}</span>
                  <span className="sale-discount-pct">%</span>
                  <span className="sale-discount-off">off</span>
                </div>
                <br />
                <Link href="/shop" className="sale-card-cta">
                  <span>Shop Now</span>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

