"use client";

import React from "react";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="about-section relative w-full min-h-screen flex flex-col justify-start items-start overflow-visible select-none bg-[#030015] flex-shrink-0"
    >
      {/* ── 1. LAYERED SCENIC BACKGROUND ─────────────────────── */}
      <div className="about-bg-layer absolute inset-0 pointer-events-none overflow-hidden">
        {/* Base Scenic City: Neon Moonlit Mecha City Battle (High-Fidelity 4320x3072 Master Asset) */}
        <picture>
          <source srcSet="/landing-pages/about/backgrounds/background-city-hq.webp" type="image/webp" />
          <img
            src="/landing-pages/about/backgrounds/background-city-hq.webp"
            alt="Neon Moonlit Mecha City Battle"
            loading="lazy"
            decoding="async"
            className="about-bg-image absolute inset-0 w-full h-full object-cover object-center"
          />
        </picture>

        {/* Texture Glow & Energy Beam (Right side on desktop) */}
        {/* <img loading="lazy" decoding="async"
          src="/landing-pages/about/ui/texture-glow.svg"
          alt=""
          aria-hidden="true"
          className="about-texture-glow absolute pointer-events-none hidden md:block"
        /> */}

        {/* Accent Tech Lines (Top-left HUD stripes) */}
        <img loading="lazy" decoding="async"
          src="/landing-pages/about/ui/accent-lines.svg"
          alt=""
          aria-hidden="true"
          className="about-accent-lines absolute top-0 left-0 pointer-events-none opacity-60 hidden sm:block"
        />

        {/* Subtle Edge Transitions: Visual continuity between Hero above and Timeline below */}
        {/* <div
          className="absolute top-0 inset-x-0 h-40 sm:h-56 bg-gradient-to-b from-[#030015] via-[#030015]/80 to-transparent pointer-events-none z-10"
          aria-hidden="true"
        /> */}
      </div>

      {/* ── 2. FOREGROUND CONTENT (HEADING + INFO PANEL) ──────── */}
      <div className="about-content-wrapper relative z-10 w-full h-full flex flex-col justify-start">
        
        {/* ── Coherent Heading Group (Emblem + Yellow ABOUT + White GENESIS) ── */}
        <div className="about-heading-group relative flex-shrink-0">
          {/* Yellow Skull-Star Emblem */}
          <img loading="lazy" decoding="async"
            src="/landing-pages/about/ui/genesis-emblem.svg"
            alt="Genesis Star Emblem"
            className="about-emblem absolute pointer-events-none select-none z-25 drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)]"
          />

          {/* Yellow ABOUT Heading Banner */}
          <img loading="lazy" decoding="async"
            src="/landing-pages/about/ui/heading-about.svg"
            alt="ABOUT"
            className="about-banner absolute pointer-events-none select-none z-21 drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)]"
          />

          {/* White GENESIS Heading (Complete, unclipped title) */}
          <picture>
            <source srcSet="/landing-pages/about/ui/heading-genesis.webp" type="image/webp" />
            <img loading="lazy" decoding="async"
              src="/landing-pages/about/ui/heading-genesis.svg"
              alt="GENESIS"
              className="about-title-genesis absolute pointer-events-none select-none z-22 drop-shadow-[0_10px_22px_rgba(0,0,0,0.9)]"
            />
          </picture>
        </div>

        {/* ── Light-Blue Information Panel (Vector 38 Polygon Shape) ── */}
        <div className="about-info-panel relative flex-shrink-0">
          {/* Pale-Blue SVG Polygon Background Shape */}
          <img loading="lazy" decoding="async"
            src="/landing-pages/about/ui/info-panel.svg"
            alt=""
            aria-hidden="true"
            className="about-panel-bg absolute inset-0 w-full h-full pointer-events-none select-none"
            style={{ objectFit: "fill" }}
          />

          {/* Panel Description Content */}
          <div className="about-panel-content relative z-10">
            <p className="about-description-p">
              Brawlers, gear up! The GDXR Club is dropping into the arena with
              the Sixth Edition of GENESIS 2027 and this time, the battle is
              closer to home than ever!
            </p>
            <p className="about-description-p">
              After the last showdown in 2026, GENESIS is back, bigger and
              bolder. This isn&apos;t just about pixels, code, or pressing buttons
              it&apos;s about unleashing your inner Brawler, teaming up, showing
              off your skills, and turning your passion for gaming into an epic
              real-world showdown. Lock and load, Brawlers. It&apos;s time to make
              history!
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
