"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const PerfumeCardImage = ({ imgs, alt }: { imgs: string[]; alt: string }) => {
  const [state, setState] = useState({ currentIdx: 0, isTransitioning: true });
  const { currentIdx, isTransitioning } = state;

  useEffect(() => {
    if (!imgs || imgs.length <= 1) return;
    const interval = setInterval(() => {
      if (document.hidden) return;

      setState((prev) => {
        if (prev.currentIdx >= imgs.length) {
          return { currentIdx: 0, isTransitioning: false };
        }
        return { currentIdx: prev.currentIdx + 1, isTransitioning: true };
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [imgs]);

  if (!imgs || imgs.length === 0) return null;

  const displayImgs = imgs.length > 1 ? [...imgs, imgs[0]] : imgs;

  return (
    <div className="perfume-card-img-wrap" style={{ overflow: "hidden", position: "relative" }}>
      <div
        onTransitionEnd={() => {
          if (currentIdx === imgs.length) {
            setState({ currentIdx: 0, isTransitioning: false });
          }
        }}
        style={{
          display: "flex",
          width: `${displayImgs.length * 100}%`,
          height: "100%",
          transform: `translateX(-${(currentIdx * 100) / displayImgs.length}%)`,
          transition: isTransitioning ? "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none",
        }}
      >
        {displayImgs.map((img, idx) => (
          <div key={`${img}-${idx}`} style={{ width: `${100 / displayImgs.length}%`, height: "100%", position: "relative" }}>
            <Image
              src={img}
              alt={`${alt}-${idx}`}
              fill
              priority={idx === 0}
              quality={95}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "contain" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerfumeCardImage;
