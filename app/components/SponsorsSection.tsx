"use client";

import React from "react";
import Image from "next/image";
import { sounds } from "./sound";

interface SponsorCardData {
  id: string;
  name: string;
  svgPath: string;
  tier: string;
}

const SPONSOR_CARDS: SponsorCardData[] = [
  {
    id: "title-sponsor",
    name: "Title Sponsor",
    svgPath: "/landing-pages/sponsors/cards/card-title-sponsor.svg",
    tier: "TITLE SPONSOR",
  },
  {
    id: "event-partner",
    name: "Event Partner",
    svgPath: "/landing-pages/sponsors/cards/card-event-partner.svg",
    tier: "EVENT PARTNER",
  },
  {
    id: "platform-sponsor",
    name: "Platform Sponsor",
    svgPath: "/landing-pages/sponsors/cards/card-platform-sponsor.svg",
    tier: "PLATFORM SPONSOR",
  },
  {
    id: "sponsor-tier-04",
    name: "Tier 4 Sponsor",
    svgPath: "/landing-pages/sponsors/cards/card-brawl-ball.svg",
    tier: "???????",
  },
  {
    id: "sponsor-tier-05",
    name: "Tier 5 Sponsor",
    svgPath: "/landing-pages/sponsors/cards/card-5v5.svg",
    tier: "?????",
  },
  {
    id: "sponsor-tier-06",
    name: "Tier 6 Sponsor",
    svgPath: "/landing-pages/sponsors/cards/card-target.svg",
    tier: "????",
  },
];

export default function SponsorsSection() {
  const handleCardHover = () => {
    sounds.playHover();
  };

  return (
    <section
      id="sponsors"
      className="genesis-sponsors relative w-screen min-h-screen flex flex-col items-center justify-between overflow-x-hidden overflow-y-visible select-none bg-[#030015] py-4 sm:py-6 md:py-8 px-3 sm:px-6 lg:px-8"
      style={{
        background: "radial-gradient(ellipse at 50% 30%, #150a3c 0%, #0c0424 45%, #030014 100%)",
      }}
    >
      {/* ── Background Cosmic Texture ─────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <Image
          src="/landing-pages/sponsors/backgrounds/cosmic-brawl-stars-pattern-hd.webp"
          alt="Cosmic Brawl Stars Pattern"
          fill
          sizes="100vw"
          className="object-cover opacity-85 mix-blend-screen select-none pointer-events-none"
          loading="lazy"
          decoding="async"
        />
        {/* Soft vignette overlay */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#030015]/30 to-[#030015]/80 pointer-events-none" />
        {/* Subtle Edge Transitions: Visual continuity between Prize Pool above and FAQs below */}
        <div className="absolute top-0 inset-x-0 h-24 sm:h-32 bg-gradient-to-b from-[#030015] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-24 sm:h-32 bg-gradient-to-t from-[#030015] to-transparent pointer-events-none" />
      </div>

      {/* ── Content Centering Container ───────────────────── */}
      <div className="relative z-10 w-full max-w-[1440px] flex flex-col items-center flex-grow justify-between">
        
        {/* ── 1. Top SPONSORS Header ──────────────────────── */}
        <header className="relative w-full flex items-center justify-center gap-2 sm:gap-4 md:gap-5 pt-1 pb-3 sm:pb-5 md:pb-6">
          {/* Crown Left with Pop-out Animation */}
          <div className="relative w-[44px] h-[56px] sm:w-[56px] sm:h-[72px] md:w-[68px] md:h-[86px] flex-shrink-0 animate-icon-pop-crown transition-transform duration-200 hover:scale-110 active:scale-95 cursor-default">
            <Image
              src="/landing-pages/sponsors/ui/header-crown.svg"
              alt="Genesis Crown"
              fill
              className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] drop-shadow-[0_0_12px_rgba(234,179,8,0.4)]"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* SPONSORS Title Center (Steady, No Text Jitter) */}
          <div className="relative w-[210px] sm:w-[270px] md:w-[327px] aspect-[327/68] flex-shrink-0">
            <Image
              src="/landing-pages/sponsors/ui/header-sponsors-title.svg"
              alt="SPONSORS"
              fill
              className="object-contain drop-shadow-[0_6px_16px_rgba(0,0,0,0.8)]"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Gems Box Right with Pop-out Animation */}
          <div className="relative w-[75px] h-[60px] sm:w-[98px] sm:h-[78px] md:w-[124px] md:h-[100px] flex-shrink-0 animate-icon-pop-gems transition-transform duration-200 hover:scale-110 active:scale-95 cursor-default">
            <Image
              src="/landing-pages/sponsors/ui/header-gems.svg"
              alt="Gems and Credits Box"
              fill
              className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] drop-shadow-[0_0_14px_rgba(6,182,212,0.45)]"
              loading="lazy"
              decoding="async"
            />
          </div>
        </header>

        {/* ── 2. Main Sponsors Stage (Desktop Side-by-Side / Mobile Stack) ── */}
        <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 xl:gap-10 pb-6 sm:pb-8 flex-grow">
          
          {/* ── Left Column: PAST SPONSORS Panel ─────────── */}
          <div className="relative w-full max-w-[310px] sm:max-w-[340px] md:max-w-[360px] lg:max-w-[380px] xl:max-w-[430px] aspect-[454/682] flex-shrink-0 flex items-center justify-center">
            {/* Outer Blue Arcade Cabinet Frame */}
            <div className="absolute inset-0 pointer-events-none z-1">
              <Image
                src="/landing-pages/sponsors/ui/past-sponsors-outer-frame.svg"
                alt="Past Sponsors Cabinet Frame"
                fill
                className="object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Inner Border & (i) Info Badge */}
            <div className="absolute inset-[3.5%] pointer-events-none z-2">
              <Image
                src="/landing-pages/sponsors/ui/past-sponsors-inner-border.svg"
                alt="Past Sponsors Border"
                fill
                className="object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Logos: GameCloud & GameDoora with Natural Border Glow */}
            <div className="relative z-3 w-[82%] flex flex-col items-center gap-5 sm:gap-7 md:gap-8 pt-[24%]">
              {/* GameCloud: Enhanced Cool Cyan Permanent Glow + Restrained Hover */}
              <div className="relative w-full max-w-[330px] aspect-[370/167] sponsor-glow-gamecloud">
                <Image
                  src="/landing-pages/sponsors/logos/sponsor-logo-gamecloud.svg"
                  alt="GameCloud Technologies Private Limited"
                  fill
                  className="object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* GameDoora: Enhanced Warm Amber Permanent Glow + Restrained Hover */}
              <div className="relative w-full max-w-[320px] aspect-[355/154] sponsor-glow-gamedoora">
                <Image
                  src="/landing-pages/sponsors/logos/sponsor-logo-gamedoora.svg"
                  alt="GameDoora"
                  fill
                  className="object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          {/* ── Right Column: CURRENT SPONSOR CARDS ──────── */}
          {/* DESKTOP & TABLET: Console Frame with 3-col × 2-row Grid */}
          <div className="hidden lg:flex relative w-full max-w-[760px] xl:max-w-[890px] aspect-[947/404] flex-shrink-0 flex-col items-center justify-center self-center lg:mt-16 xl:mt-24">
            {/* Console Frame with "SPONSORS" subheader tab */}
            <div className="absolute inset-0 pointer-events-none z-1">
              <Image
                src="/landing-pages/sponsors/ui/console-frame-empty.svg"
                alt="Sponsors Console Frame"
                fill
                className="object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.7)]"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* 6 Cards Grid inside Console Frame */}
            <div className="relative z-3 w-[95%] h-[80%] mt-[5%] grid grid-cols-3 grid-rows-2 gap-x-3 gap-y-3 px-3">
              {SPONSOR_CARDS.map((card) => (
                <div
                  key={card.id}
                  onMouseEnter={handleCardHover}
                  className="genesis-sponsor-flip-card relative w-full h-full flex items-center justify-center cursor-pointer group"
                >
                  <div className="genesis-sponsor-flip-inner">
                    {/* SponsorHoverWrapper: Moves upward 5px & scales 1.04 independently */}
                    <div className="relative w-full h-full transition-transform duration-[240ms] ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.04] group-hover:z-20">
                      <Image
                        src={card.svgPath}
                        alt={card.name}
                        fill
                        className="object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] group-hover:drop-shadow-[0_10px_20px_rgba(0,0,0,0.85)]"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TABLET / MID-WIDTH (md to lg): Clean 3-col or 2-col Grid */}
          <div className="hidden md:flex lg:hidden w-full max-w-[680px] flex-col items-center">
            <div className="bg-blue-950/80 border border-blue-500/40 rounded-full px-5 py-1 text-xs font-bold text-cyan-300 uppercase tracking-widest mb-4 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
              Current Sponsors
            </div>
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-4">
              {SPONSOR_CARDS.map((card) => (
                <div
                  key={card.id}
                  onMouseEnter={handleCardHover}
                  className="genesis-sponsor-flip-card relative w-full aspect-[320/180] flex items-center justify-center cursor-pointer group"
                >
                  <div className="genesis-sponsor-flip-inner">
                    <div className="relative w-full h-full transition-transform duration-[240ms] ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.04] group-hover:z-20">
                      <Image
                        src={card.svgPath}
                        alt={card.name}
                        fill
                        className="object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] group-hover:drop-shadow-[0_10px_20px_rgba(0,0,0,0.85)]"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MOBILE (< 768px): Centered Vertical Sponsor Showcase */}
          <div className="md:hidden w-full flex flex-col items-center mt-3">
            <div className="bg-blue-950/80 border border-blue-500/40 rounded-full px-4 py-1 text-xs font-bold text-cyan-300 uppercase tracking-widest mb-3 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
              Current Sponsors
            </div>

            <div className="w-full flex flex-col items-center gap-4 sm:gap-5 px-2 py-3">
              {SPONSOR_CARDS.map((card) => (
                <div
                  key={card.id}
                  className="genesis-sponsor-flip-card relative w-[90%] max-w-[340px] aspect-[320/180]"
                >
                  <div className="genesis-sponsor-flip-inner">
                    <div className="relative w-full h-full transition-transform duration-200 active:scale-[0.98]">
                      <Image
                        src={card.svgPath}
                        alt={card.name}
                        fill
                        sizes="(max-width: 377px) 90vw, 340px"
                        className="object-contain drop-shadow-[0_6px_14px_rgba(0,0,0,0.7)]"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative w-full max-w-[480px] flex justify-end px-4 sm:px-6 pt-1 pb-2 pointer-events-none">
              <div
                className="relative w-[clamp(110px,32vw,155px)] aspect-[245/300] animate-spike-pop select-none"
                style={{
                  filter: "drop-shadow(0 0 22px rgba(34, 211, 238, 0.55)) drop-shadow(0 14px 28px rgba(0, 0, 0, 0.9))",
                }}
                aria-hidden="true"
              >
                <Image
                  src="/landing-pages/sponsors/ui/shadow-spike.svg"
                  alt=""
                  fill
                  sizes="(max-width: 767px) 32vw, 155px"
                  className="object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ── 3. Bottom-Right Character Decoration: Shadow Spike (Popping Out, Non-Clickable) ──────── */}
      <div 
        className="hidden md:block absolute bottom-3 sm:bottom-5 md:bottom-7 lg:bottom-9 right-2 sm:right-4 md:right-8 lg:right-10 w-[155px] h-[190px] sm:w-[185px] sm:h-[227px] md:w-[215px] md:h-[264px] lg:w-[245px] lg:h-[300px] pointer-events-none z-30 animate-spike-pop select-none"
        style={{
          filter: "drop-shadow(0 0 22px rgba(34, 211, 238, 0.55)) drop-shadow(0 14px 28px rgba(0, 0, 0, 0.9))",
        }}
        aria-hidden="true"
      >
        <Image
          src="/landing-pages/sponsors/ui/shadow-spike.svg"
          alt="Shadow Spike"
          fill
          className="object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
}
