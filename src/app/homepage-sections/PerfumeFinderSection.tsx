import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";

const PerfumeCardImage = dynamic(
  () => import("../components/PerfumeCardImage")
);

const perfumes = [
  {
    name: "CITRUS BLASTS",
    tag: "FRESH",
    desc: "Explosive burst of fresh, zesty energy that awakens the senses and keeps you feeling vibrant all day.",
    imgs: [
      "/homepage_images/picks/1/ck.png",
      "/homepage_images/picks/1/valentino.png",
      "/homepage_images/picks/1/versace.png",
      "/homepage_images/picks/1/tomford.png",
    ],
  },
  {
    name: "LATE NIGHTS",
    tag: "NIGHT",
    desc: "Dark, seductive aura designed to turn heads and linger beautifully on the skin until the early morning.",
    imgs: [
      "/homepage_images/picks/2/1.png",
      "/homepage_images/picks/2/2.png",
      "/homepage_images/picks/2/3.png",
      "/homepage_images/picks/2/4.png",
    ],
  },
  {
    name: "VANILLA MUSK",
    tag: "SWEET",
    desc: "Deeply comforting and sensual blend that wraps you in a warm, irresistible sweetness that lasts for hours.",
    imgs: [
      "/homepage_images/picks/3/1.png",
      "/homepage_images/picks/3/2.png",
      "/homepage_images/picks/3/3.png",
      "/homepage_images/picks/3/4.png",
    ],
  },
  {
    name: "WINTER WARMTH",
    tag: "COZY",
    desc: "Rich, cozy embrace that cuts right through the bitter chill, keeping you feeling snug and confident.",
    imgs: [
      "/homepage_images/picks/4/1.png",
      "/homepage_images/picks/4/2.png",
      "/homepage_images/picks/4/3.png",
      "/homepage_images/picks/4/4.png",
    ],
  },
  {
    name: "ALL YEAR LONG",
    tag: "VERSATILE",
    desc: "Perfectly balanced signature scent, designed to adapt seamlessly to any season, setting, or occasion you throw at it.",
    imgs: [
      "/homepage_images/picks/5/1.png",
      "/homepage_images/picks/5/2.png",
      "/homepage_images/picks/5/3.png",
      "/homepage_images/picks/5/4.png",
    ],
  },
  {
    name: "BEAT THE SUMMER",
    tag: "COOL",
    desc: "Icy blast of long-lasting freshness that instantly cools you down and cuts through the heavy summer heat.",
    imgs: [
      "/homepage_images/picks/6/1.png",
      "/homepage_images/picks/6/2.png",
      "/homepage_images/picks/6/3.png",
      "/homepage_images/picks/6/4.png",
    ],
  },
  {
    name: "CASUAL 24/7",
    tag: "DAILY",
    desc: "Clean, effortless everyday fragrance that sits perfectly in the background, making sure you always smell approachable.",
    imgs: [
      "/homepage_images/picks/7/1.png",
      "/homepage_images/picks/7/2.png",
      "/homepage_images/picks/7/3.png",
      "/homepage_images/picks/7/4.png",
    ],
  },
  {
    name: "TROPICAL BLISS",
    tag: "EXOTIC",
    desc: "Vibrant, sun-soaked getaway in a bottle that instantly transports your senses straight to a relaxing island vacation.",
    imgs: [
      "/homepage_images/picks/8/1.png",
      "/homepage_images/picks/8/2.png",
      "/homepage_images/picks/8/3.png",
      "/homepage_images/picks/8/4.png",
    ],
  },
  {
    name: "FEELS A MILLIONAIR",
    tag: "LUXURY",
    desc: "Ultra-luxurious, bold statement fragrance that exudes pure wealth, power, and undeniable success everywhere you walk.",
    imgs: [
      "/homepage_images/picks/9/1.png",
      "/homepage_images/picks/9/2.png",
      "/homepage_images/picks/9/3.png",
      "/homepage_images/picks/9/4.png",
    ],
  },
];

export default function PerfumeFinderSection() {
  return (
    <section className="perfume-finder-section">
      <div className="perfume-finder-header">
        <div className="section-tag-row">Collections</div>
        <h2 className="section-h2">find your perfume</h2>
      </div>
      <div className="perfume-grid">
        {perfumes.map((perfume) => (
          <Link
            href="/shop"
            key={perfume.name}
            className="perfume-card will-change-transform"
          >
            <PerfumeCardImage imgs={perfume.imgs} alt={perfume.name} />
            <div className="perfume-card-body">
              <h3 className="perfume-card-name">{perfume.name}</h3>
              <p className="perfume-card-desc">{perfume.desc}</p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <span className="perfume-card-btn">
                  Discover More
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
