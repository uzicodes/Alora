import React from "react";

export default function CampaignVideoSection() {
  return (
    <section className="campaign-video-section">
      <div className="cv-video-frame">
        {/* Decorative corner accents */}
        <div className="cv-corner cv-corner-tl"></div>
        <div className="cv-corner cv-corner-tr"></div>
        <div className="cv-corner cv-corner-bl"></div>
        <div className="cv-corner cv-corner-br"></div>

        {/* Top & bottom vignette overlays */}
        <div className="cv-vignette cv-vignette-top"></div>
        <div className="cv-vignette cv-vignette-bottom"></div>

        {/* Video element */}
        <video
          className="cv-video"
          aria-label="Promotional campaign background video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/video-poster.webp"
        >
          <source
            src="https://res.cloudinary.com/dihvgsjh5/video/upload/v1782658374/video1_mrmp7s.webm"
            type="video/webm"
          />
          <source
            src="https://res.cloudinary.com/dihvgsjh5/video/upload/v1782658374/video1_mrmp7s.mp4"
            type="video/mp4"
          />
          <track
            kind="captions"
            src="/captions.vtt"
            srcLang="en"
            label="English captions"
            default
          />
        </video>
      </div>
    </section>
  );
}
