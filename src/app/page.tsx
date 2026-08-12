"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./page.css";

import {
  HeroSection,
  MarqueeSection,
  PillarsSection,
  CampaignVideoSection,
  FindYourScentSection,
  ExclusiveDealsSection,
  PerfumeFinderSection,
  AboutSection,
  EditorialQuoteBanner,
} from "./homepage-sections";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Hero Section
      gsap.fromTo(
        ".hero-bg-heading",
        { opacity: 0 },
        { opacity: 1, duration: 1.4, ease: "power2.out" }
      );
      gsap.fromTo(
        ".hero-image-wrap",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
          force3D: true,
          delay: 0.15,
        }
      );

      // Campaign Video Section
      gsap.fromTo(
        ".cv-video-frame",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: ".campaign-video-section",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Find Your Scent Section
      gsap.fromTo(
        ".fys-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: ".fys-grid",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.fromTo(
        ".sale-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: ".sale-section",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const saleTrack = containerRef.current?.querySelector(
        ".sale-track"
      ) as HTMLElement;
      if (saleTrack) {
        const getStartX = () => {
          const firstCard = saleTrack.querySelector(
            ".sale-card"
          ) as HTMLElement;
          if (!firstCard) return 0;
          const firstCardCenter =
            firstCard.offsetLeft + firstCard.offsetWidth / 2;
          return window.innerWidth * 0.75 - firstCardCenter;
        };

        const getEndX = () => {
          const cards = saleTrack.querySelectorAll(".sale-card");
          const lastCard = cards[cards.length - 1] as HTMLElement;
          if (!lastCard) return -saleTrack.scrollWidth;
          const lastCardCenter = lastCard.offsetLeft + lastCard.offsetWidth / 2;
          return window.innerWidth * 0.25 - lastCardCenter;
        };

        gsap.fromTo(
          ".sale-track",
          { x: getStartX },
          {
            x: getEndX,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: ".sale-section",
              pin: true,
              scrub: 1,
              start: "top top",
              end: () =>
                "+=" + Math.max(800, Math.abs(getStartX() - getEndX())),
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // Find Your Perfume / Perfume Grid Section
      gsap.fromTo(
        ".perfume-finder-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: ".perfume-finder-section",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.fromTo(
        ".perfume-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: ".perfume-grid",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Our Story / About Section
      gsap.fromTo(
        ".about-header",
        { opacity: 0, y: 35, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: ".about-section",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const storyCards = gsap.utils.toArray<HTMLElement>(".about-value-card");
      if (storyCards.length === 3) {
        // Left card sweeps in from left angle
        gsap.fromTo(
          storyCards[0],
          { opacity: 0, x: -130, y: 55, rotationZ: -9, scale: 0.86 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotationZ: 0,
            scale: 1,
            duration: 1.35,
            ease: "power4.out",
            force3D: true,
            clearProps: "transform",
            scrollTrigger: {
              trigger: ".about-values-grid",
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
        // Center card descends from elevated gallery spotlight
        gsap.fromTo(
          storyCards[1],
          { opacity: 0, y: -80, scale: 1.15 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.35,
            delay: 0.1,
            ease: "power4.out",
            force3D: true,
            clearProps: "transform",
            scrollTrigger: {
              trigger: ".about-values-grid",
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
        // Right card sweeps in from right angle
        gsap.fromTo(
          storyCards[2],
          { opacity: 0, x: 130, y: 55, rotationZ: 9, scale: 0.86 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotationZ: 0,
            scale: 1,
            duration: 1.35,
            delay: 0.05,
            ease: "power4.out",
            force3D: true,
            clearProps: "transform",
            scrollTrigger: {
              trigger: ".about-values-grid",
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      } else {
        // Fallback if card count changes in future
        gsap.fromTo(
          ".about-value-card",
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "power4.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: ".about-values-grid",
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Continuous Scrubbed Horizon Parallax on inner wrappers
      const storyInners = gsap.utils.toArray<HTMLElement>(
        ".about-value-inner"
      );
      storyInners.forEach((inner, i) => {
        const yFloat = i === 1 ? 30 : -30;
        gsap.fromTo(
          inner,
          { y: -yFloat * 0.6 },
          {
            y: yFloat,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: ".about-section",
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      });

      // 7. Editorial Banner
      gsap.fromTo(
        ".editorial-content",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: ".editorial-banner",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="font-space-grotesk">
      <HeroSection />
      <MarqueeSection />
      <PillarsSection />
      <CampaignVideoSection />
      <FindYourScentSection />
      <ExclusiveDealsSection />
      <PerfumeFinderSection />
      <AboutSection />
      <EditorialQuoteBanner />
    </div>
  );
}