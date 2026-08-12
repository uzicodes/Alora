import Image from "next/image";
import Link from "next/link";
import React from "react";

const cards = [
  {
    title: "FOR HIM",
    desc: "Confident. Bold. Unforgettable.",
    cta: "SHOP HIM",
    href: "/men",
    img: "/male.jpg",
  },
  {
    title: "FOR HER",
    desc: "Elegant. Feminine. Irresistible.",
    cta: "SHOP HER",
    href: "/woman",
    img: "/female.jpg",
  },
  {
    title: "FOR ALL",
    desc: "Made for everyone.",
    cta: "SHOP ALL",
    href: "/unisex",
    img: "/unisex.jpg",
  },
];

export default function FindYourScentSection() {
  return (
    <section className="find-your-scent-section">
      <div className="fys-grid">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="fys-card will-change-transform"
          >
            <div className="fys-card-img-wrap">
              <Image
                src={card.img}
                alt={card.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                quality={90}
                style={{ objectFit: "cover" }}
              />
              <div className="fys-card-overlay" />
            </div>
            <div className="fys-card-content">
              <h3 className="fys-card-title">{card.title}</h3>
              <p className="fys-card-desc">{card.desc}</p>
              <span className="fys-card-cta">{card.cta} →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
