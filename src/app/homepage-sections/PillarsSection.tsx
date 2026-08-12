import React from "react";

type Pillar = {
  num: string;
  label: string;
  desc: string;
};

const pillars: Pillar[] = [
  {
    num: "01",
    label: "Hand-Sourced Ingredients",
    desc: "Rare botanicals harvested with peak potency.",
  },
  {
    num: "02",
    label: "Master Perfumers",
    desc: "Crafted by artisans with decades of olfactory heritage.",
  },
  {
    num: "03",
    label: "Up to 3 Years",
    desc: "The meticulous blending behind each signature scent.",
  },
  {
    num: "04",
    label: "Certified Luxury",
    desc: "Every bottle inspected before it leaves our atelier.",
  },
];

export default function PillarsSection() {
  return (
    <section className="pillars-section">
      <div className="pillars-header">
        <div className="section-tag-row">The Alora Promise</div>
        <h2 className="section-h2">crafted without compromise</h2>
      </div>
      <div className="pillars-grid">
        {pillars.map((p) => (
          <div key={p.num} className="pillar-card">
            <div
              className="pillar-card-inner"
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h3 className="pillar-label">{p.label}</h3>
              <p className="pillar-desc">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
