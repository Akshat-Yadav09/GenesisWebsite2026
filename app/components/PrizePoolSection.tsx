"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { sounds } from "./sound";

export default function PrizePoolSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const lastSoundRef = useRef<number>(0);
  const [scale, setScale] = useState<number>(1);

  // Play hover sound with safety cooldown and hover media-query guard
  const handleItemHover = useCallback(() => {
    if (typeof window === "undefined") return;
    // Don't play hover sound on touch devices
    if (!window.matchMedia("(hover: hover)").matches) return;

    const now = Date.now();
    if (now - lastSoundRef.current > 130) {
      lastSoundRef.current = now;
      sounds.playHover();
    }
  }, []);

  // Responsive dynamic scaling for desktop/laptop canvas (1440 x 1024 base)
  useEffect(() => {
    const updateScaling = () => {
      if (typeof window === "undefined") return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      if (vw < 768) return;

      // Fit both arenas completely on one page (100vh) without vertical overflow
      const scaleW = (vw * 0.95) / 1440;
      const scaleH = (vh * 0.94) / 1024;
      const newScale = Math.min(scaleW, scaleH);
      setScale(Number(newScale.toFixed(4)));
    };

    updateScaling();
    window.addEventListener("resize", updateScaling, { passive: true });
    return () => window.removeEventListener("resize", updateScaling);
  }, []);

  return (
    <section
      id="prizepool"
      ref={sectionRef}
      className="relative w-full min-h-screen h-auto md:h-screen flex flex-col items-center justify-center overflow-visible md:overflow-hidden select-none bg-[#030015] shrink-0 text-white"
    >
      {/* ── 1. COSMIC BRAWL STARS BACKGROUND LAYERS ──────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <img loading="lazy" decoding="async"
          src="/landing-pages/shared/backgrounds/cosmic-background.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <img loading="lazy" decoding="async"
          src="/landing-pages/prize-pool/backgrounds/bg-blue-icons.svg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-85 mix-blend-screen"
        />
        {/* Subtle Halftone Vignette Shading */}
        <div
          className="absolute inset-0 bg-radial-[circle_at_center,transparent_45%,rgba(3,0,21,0.7)_100%] pointer-events-none"
          aria-hidden="true"
        />
        {/* Subtle Edge Transitions: Visual continuity between Timeline above and Sponsors below */}
        <div className="absolute top-0 inset-x-0 h-24 sm:h-32 bg-gradient-to-b from-[#030015] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-24 sm:h-32 bg-gradient-to-t from-[#030015] to-transparent pointer-events-none" />
      </div>

      {/* ── 2. DESKTOP / LAPTOP / TABLET STAGE (md: >= 768px) ──────── */}
      <div className="hidden md:flex relative z-10 w-full h-full items-center justify-center">
        <div
          style={{
            width: `${Math.round(1440 * scale)}px`,
            height: `${Math.round(1024 * scale)}px`,
            position: "relative",
          }}
        >
          <div
            ref={canvasRef}
            className="relative w-[1440px] h-[1024px] flex-shrink-0"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
          {/* Main Arcade Heading: PRIZE POOL */}
          <div className="absolute top-[28px] left-1/2 -translate-x-1/2 w-[527px] h-[116px] z-30 pointer-events-none drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)]">
            <img loading="lazy" decoding="async"
              src="/landing-pages/prize-pool/ui/title-prizepool.svg"
              alt="PRIZE POOL"
              className="w-full h-full object-contain"
            />
          </div>

          {/* ── UPPER ARENA: MAIN TOURNAMENT (PRIZES) ──────── */}
          <div className="absolute left-[67px] top-[187px] w-[1315px] h-[361px] z-20">
            {/* Clean Blue Arena Frame (No red X, no duplicate baked-in badges) */}
            <img loading="lazy" decoding="async"
              src="/landing-pages/prize-pool/ui/arena-upper-frame.svg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full pointer-events-none z-1"
            />

            {/* Arena Title: PRIZES */}
            <div className="absolute -top-[30px] left-1/2 -translate-x-1/2 w-[274px] h-[73px] z-15 pointer-events-none drop-shadow-[0_6px_14px_rgba(0,0,0,0.8)]">
              <img loading="lazy" decoding="async"
                src="/landing-pages/prize-pool/ui/title-prizes.svg"
                alt="PRIZES"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Woody Character (Left side, unclipped silhouette, playful hover wobble) */}
            <div
              onPointerEnter={handleItemHover}
              className="woody-hover absolute left-[15px] -top-[107px] w-[487px] h-[436px] z-12 drop-shadow-[0_10px_24px_rgba(0,0,0,0.85)]"
              title="Woody Colt"
            >
              <img loading="lazy" decoding="async"
                src="/landing-pages/prize-pool/characters/woody.svg"
                alt="Woody"
                className="w-full h-full object-contain pointer-events-none"
              />
            </div>

            {/* 3 Main Tournament Badges (Independent Hover Pop-Out & Wobble) */}
            {/* 1st Prize: ₹17,500 */}
            <div
              onPointerEnter={handleItemHover}
              className="prize-badge-hover absolute left-[540px] top-[36px] w-[246px] h-[316px] z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
              title="1st Place — ₹17,500"
            >
              <img loading="lazy" decoding="async"
                src="/landing-pages/prize-pool/badges/badge-main-1st.svg"
                alt="1st Place ₹17,500"
                className="w-full h-full object-contain pointer-events-none"
              />
            </div>

            {/* 2nd Prize: ₹15,000 */}
            <div
              onPointerEnter={handleItemHover}
              className="prize-badge-hover absolute left-[782px] top-[45px] w-[246px] h-[304px] z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
              title="2nd Place — ₹15,000"
            >
              <img loading="lazy" decoding="async"
                src="/landing-pages/prize-pool/badges/badge-main-2nd.svg"
                alt="2nd Place ₹15,000"
                className="w-full h-full object-contain pointer-events-none"
              />
            </div>

            {/* 3rd Prize: ₹12,500 */}
            <div
              onPointerEnter={handleItemHover}
              className="prize-badge-hover absolute left-[1023px] top-[40px] w-[247px] h-[306px] z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
              title="3rd Place — ₹12,500"
            >
              <img loading="lazy" decoding="async"
                src="/landing-pages/prize-pool/badges/badge-main-3rd.svg"
                alt="3rd Place ₹12,500"
                className="w-full h-full object-contain pointer-events-none"
              />
            </div>
          </div>

          {/* ── DECORATIVE PURPLE GEM ──────── */}
          <div className="absolute left-[55px] top-[530px] w-[145px] h-[155px] z-25 pointer-events-none drop-shadow-[0_6px_16px_rgba(154,69,255,0.7)]">
            <img loading="lazy" decoding="async"
              src="/landing-pages/prize-pool/ui/gem-purple.svg"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-contain"
            />
          </div>

          {/* ── LOWER ARENA: VR TRACK ──────── */}
          <div className="absolute left-[95px] top-[598px] w-[1251px] h-[397px] z-20">
            {/* Clean Blue Arena Frame (No red X, no duplicate baked-in badges) */}
            <img loading="lazy" decoding="async"
              src="/landing-pages/prize-pool/ui/arena-lower-frame.svg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full pointer-events-none z-1"
            />

            {/* Arena Title: VR TRACK */}
            <div className="absolute -top-[30px] left-1/2 -translate-x-1/2 w-[363px] h-[70px] z-15 pointer-events-none drop-shadow-[0_6px_14px_rgba(0,0,0,0.8)]">
              <img loading="lazy" decoding="async"
                src="/landing-pages/prize-pool/ui/title-vr-track.svg"
                alt="VR TRACK"
                className="w-full h-full object-contain"
              />
            </div>

            {/* 2 VR Track Badges (Independent Hover Pop-Out & Wobble) */}
            {/* 1st Prize VR: ₹10,000 */}
            <div
              onPointerEnter={handleItemHover}
              className="prize-badge-hover absolute left-[95px] top-[34px] w-[276px] h-[352px] z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
              title="VR 1st Place — ₹10,000"
            >
              <img loading="lazy" decoding="async"
                src="/landing-pages/prize-pool/badges/badge-vr-1st.svg"
                alt="VR 1st Place ₹10,000"
                className="w-full h-full object-contain pointer-events-none"
              />
            </div>

            {/* 2nd Prize VR: ₹5,000 */}
            <div
              onPointerEnter={handleItemHover}
              className="prize-badge-hover absolute left-[417px] top-[38px] w-[276px] h-[340px] z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
              title="VR 2nd Place — ₹5,000"
            >
              <img loading="lazy" decoding="async"
                src="/landing-pages/prize-pool/badges/badge-vr-2nd.svg"
                alt="VR 2nd Place ₹5,000"
                className="w-full h-full object-contain pointer-events-none"
              />
            </div>

            {/* Buzz Lightyear Character (Right side, unclipped silhouette, subtle hover wobble) */}
            <div
              onPointerEnter={handleItemHover}
              className="buzz-hover absolute right-[15px] -top-[115px] w-[624px] h-[535px] z-12 drop-shadow-[0_10px_24px_rgba(0,0,0,0.85)]"
              title="Buzz Lightyear"
            >
              <img loading="lazy" decoding="async"
                src="/landing-pages/prize-pool/characters/buzzlight.svg"
                alt="Buzz Lightyear"
                className="w-full h-full object-contain pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* ── 3. MOBILE STACK (< 768px): 2 STACKED ARENAS WITH HORIZONTAL SWIPEABLE GALLERIES ──────── */}
      <div className="prize-mobile-centered prize-mobile-section flex md:hidden relative z-10 flex-col w-full items-center">
        {/* Mobile Main Arcade Title */}
        <div className="w-[88%] max-w-[340px] drop-shadow-[0_6px_14px_rgba(0,0,0,0.85)]">
          <img loading="lazy" decoding="async"
            src="/landing-pages/prize-pool/ui/title-prizepool.svg"
            alt="PRIZE POOL"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Mobile Arena 1: Main Tournament (PRIZES) */}
        <section className="prize-mobile-arena prize-mobile-main-arena relative w-full max-w-[480px] bg-gradient-to-b from-[#0E58F6]/95 to-[#092C82]/98 rounded-2xl border-[3px] border-[#20CEFF] shadow-[0_8px_24px_rgba(0,0,0,0.75)] overflow-hidden pt-3 pb-4" aria-labelledby="mobile-prizes-heading">
          {/* Header Bar */}
          <div className="flex items-center justify-center px-4 pt-6 pb-3 border-b-2 border-[#20CEFF]/30">
            <img loading="lazy" decoding="async"
              src="/landing-pages/prize-pool/ui/title-prizes.svg"
              alt="PRIZES"
              id="mobile-prizes-heading"
              className="relative top-4 h-9 sm:h-11 w-auto object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
            />
          </div>

          <div className="prize-mobile-rewards">
            <article className="prize-mobile-reward-card">
              <img loading="lazy" decoding="async"
                src="/landing-pages/prize-pool/badges/badge-main-1st.svg"
                alt="1st Place ₹17,500"
                className="prize-mobile-reward-art"
              />
            </article>
            <article className="prize-mobile-reward-card">
              <img loading="lazy" decoding="async"
                src="/landing-pages/prize-pool/badges/badge-main-2nd.svg"
                alt="2nd Place ₹15,000"
                className="prize-mobile-reward-art"
              />
            </article>
            <article className="prize-mobile-reward-card">
              <img loading="lazy" decoding="async"
                src="/landing-pages/prize-pool/badges/badge-main-3rd.svg"
                alt="3rd Place ₹12,500"
                className="prize-mobile-reward-art"
              />
            </article>
          </div>
          <div className="prize-mobile-character prize-mobile-character-woody" aria-hidden="true">
            <img loading="lazy" decoding="async" src="/landing-pages/prize-pool/characters/woody.svg" alt="" className="w-full h-full object-contain object-bottom" />
          </div>
        </section>

        {/* Decorative Purple Gem between arenas */}
        <div className="w-14 h-14 -my-2 drop-shadow-[0_4px_12px_rgba(154,69,255,0.8)] pointer-events-none">
          <img loading="lazy" decoding="async"
            src="/landing-pages/prize-pool/ui/gem-purple.svg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Mobile Arena 2: VR Track */}
        <section className="prize-mobile-arena prize-mobile-vr-arena relative w-full max-w-[480px] bg-gradient-to-b from-[#0E58F6]/95 to-[#092C82]/98 rounded-2xl border-[3px] border-[#20CEFF] shadow-[0_8px_24px_rgba(0,0,0,0.75)] overflow-hidden pt-3 pb-4" aria-labelledby="mobile-vr-heading">
          {/* Header Bar */}
          <div className="flex items-center justify-center px-4 pt-6 pb-3 border-b-2 border-[#20CEFF]/30">
            <img loading="lazy" decoding="async"
              src="/landing-pages/prize-pool/ui/title-vr-track.svg"
              alt="VR TRACK"
              id="mobile-vr-heading"
              className="relative top-4 h-9 sm:h-11 w-auto object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
            />
          </div>

          <div className="prize-mobile-rewards">
            <article className="prize-mobile-reward-card">
              <img loading="lazy" decoding="async"
                src="/landing-pages/prize-pool/badges/badge-vr-1st.svg"
                alt="VR 1st Place ₹10,000"
                className="prize-mobile-reward-art"
              />
            </article>
            <article className="prize-mobile-reward-card">
              <img loading="lazy" decoding="async"
                src="/landing-pages/prize-pool/badges/badge-vr-2nd.svg"
                alt="VR 2nd Place ₹5,000"
                className="prize-mobile-reward-art"
              />
            </article>
          </div>
          <div className="prize-mobile-character prize-mobile-character-buzz" aria-hidden="true">
            <img loading="lazy" decoding="async" src="/landing-pages/prize-pool/characters/buzzlight.svg" alt="" className="w-full h-full object-contain object-bottom" />
          </div>
        </section>
      </div>
    </section>
  );
}
