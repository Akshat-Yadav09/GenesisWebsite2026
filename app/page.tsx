"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { sounds } from "./components/sound";
import CountdownSection from "./components/CountdownSection";
import AboutSection from "./components/AboutSection";
import TimelineSection from "./components/TimelineSection";
import PrizePoolSection from "./components/PrizePoolSection";
import MemoriesSection from "./components/MemoriesSection";
import SponsorsSection from "./components/SponsorsSection";
import FAQSection from "./components/FAQSection";
import ContactSection from "./components/ContactSection";

// Deterministic twinkling stars with individual drift offsets
const STARS = Array.from({ length: 90 }, (_, i) => ({
  id: i,
  x: ((i * 7919 + 29) % 10000) / 100,
  y: ((i * 6547 + 53) % 10000) / 100,
  size: (i % 3) === 0 ? 3 : (i % 2) === 0 ? 2 : 1.5,
  opacity: 0.2 + (i % 6) * 0.13,
  animDuration: 2.2 + (i % 5) * 0.8,
  animDelay: (i * 0.25) % 4,
  driftDuration: 8 + (i % 7) * 2,
}));

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Character interactive animation states
  const [coltRecoil, setColtRecoil] = useState(false);
  const [leonActive, setLeonActive] = useState(false);
  const [telescopeGlint, setTelescopeGlint] = useState(false);
  const [telescopeRecoil, setTelescopeRecoil] = useState(false);
  const [telescopeScouting, setTelescopeScouting] = useState(false);
  const [telescopeHovered, setTelescopeHovered] = useState(false);
  const [balloonBounced, setBalloonBounced] = useState(false);

  // 3D Interactive Tilt & Container Refs (Zero React Re-render on Mouse Move!)
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const lastSectionRef = useRef<"hero" | "about" | "timeline" | "prizepool" | "memories" | "sponsors" | "faq" | "contact">("hero");

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const handleMediaChange = () => setIsMobileMenuOpen(false);
    media.addEventListener("change", handleMediaChange);

    return () => media.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    const handleMenuKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };

    const handleOutsidePointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (isMobileMenuOpen && !mobileMenuRef.current?.contains(target)) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleViewportResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };

    window.addEventListener("keydown", handleMenuKeyDown);
    document.addEventListener("pointerdown", handleOutsidePointer);
    window.addEventListener("resize", handleViewportResize, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleMenuKeyDown);
      document.removeEventListener("pointerdown", handleOutsidePointer);
      window.removeEventListener("resize", handleViewportResize);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const normX = ((e.clientX / window.innerWidth) - 0.5) * 2;
        const normY = ((e.clientY / window.innerHeight) - 0.5) * 2;
        // Update CSS variables directly for 60/120fps hardware-composited parallax without React re-renders!
        containerRef.current.style.setProperty("--mx", normX.toFixed(3));
        containerRef.current.style.setProperty("--my", normY.toFixed(3));
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Smooth Scroll & Viewport Tracker
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sectionIds = ["hero", "about", "timeline", "prizepool", "memories", "sponsors", "faq", "contact"] as const;
    const sectionElements = sectionIds.map((id) => document.getElementById(id));
    let sectionOffsets = sectionElements.map((element, index) => element?.offsetTop ?? window.innerHeight * index);
    let frame = 0;

    const measureSectionOffsets = () => {
      sectionOffsets = sectionElements.map((element, index) => element?.offsetTop ?? window.innerHeight * index);
    };

    const updateActiveSection = () => {
      frame = 0;
      const scrollY = container.scrollTop;
      const height = window.innerHeight;

      let current: "hero" | "about" | "timeline" | "prizepool" | "memories" | "sponsors" | "faq" | "contact" = "hero";
      if (scrollY >= sectionOffsets[7] - height * 0.35) {
        current = "contact";
      } else if (scrollY >= sectionOffsets[6] - height * 0.35) {
        current = "faq";
      } else if (scrollY >= sectionOffsets[5] - height * 0.35) {
        current = "sponsors";
      } else if (scrollY >= sectionOffsets[4] - height * 0.35) {
        current = "memories";
      } else if (scrollY >= sectionOffsets[3] - height * 0.35) {
        current = "prizepool";
      } else if (scrollY >= sectionOffsets[2] - height * 0.35) {
        current = "timeline";
      } else if (scrollY >= sectionOffsets[1] - height * 0.35) {
        current = "about";
      }

      if (current !== lastSectionRef.current) {
        lastSectionRef.current = current;
      }
    };

    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };

    const handleResize = () => {
      measureSectionOffsets();
      handleScroll();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        if (lastSectionRef.current === "hero") {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        } else if (lastSectionRef.current === "about") {
          document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" });
        } else if (lastSectionRef.current === "timeline") {
          document.getElementById("prizepool")?.scrollIntoView({ behavior: "smooth" });
        } else if (lastSectionRef.current === "prizepool") {
          document.getElementById("memories")?.scrollIntoView({ behavior: "smooth" });
        } else if (lastSectionRef.current === "memories") {
          document.getElementById("sponsors")?.scrollIntoView({ behavior: "smooth" });
        } else if (lastSectionRef.current === "sponsors") {
          document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
        } else if (lastSectionRef.current === "faq") {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        if (lastSectionRef.current === "contact") {
          document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
        } else if (lastSectionRef.current === "faq") {
          document.getElementById("sponsors")?.scrollIntoView({ behavior: "smooth" });
        } else if (lastSectionRef.current === "sponsors") {
          document.getElementById("memories")?.scrollIntoView({ behavior: "smooth" });
        } else if (lastSectionRef.current === "memories") {
          document.getElementById("prizepool")?.scrollIntoView({ behavior: "smooth" });
        } else if (lastSectionRef.current === "prizepool") {
          document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" });
        } else if (lastSectionRef.current === "timeline") {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        } else if (lastSectionRef.current === "about") {
          document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize, { passive: true });
    measureSectionOffsets();
    updateActiveSection();

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Butter-smooth 3D Logo Tilt via direct DOM style (0 React re-renders!)
  const handleLogoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!logoRef.current) return;
    const rect = logoRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x - rect.width / 2) / (rect.width / 2);
    const normY = (y - rect.height / 2) / (rect.height / 2);

    requestAnimationFrame(() => {
      if (!logoRef.current) return;
      const rotX = -normY * 18;
      const rotY = normX * 18;
      logoRef.current.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.08, 1.08, 1.08)`;
    });
  };

  const handleLogoMouseEnter = () => {
    setIsLogoHovered(true);
    sounds.playHover();
  };

  const handleLogoMouseLeave = () => {
    setIsLogoHovered(false);
    if (logoRef.current) {
      logoRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
  };

  const handleMobileMenuNavigate = (sectionId: "prizepool" | "sponsors") => {
    sounds.playClick();
    setIsMobileMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleRegisterClick = () => {
    sounds.playRegister();
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleColtClick = () => {
    sounds.playLaser();
    setColtRecoil(true);
    setTimeout(() => setColtRecoil(false), 260);
  };

  const handleLeonClick = () => {
    sounds.playShuriken();
    setLeonActive(true);
    setTimeout(() => setLeonActive(false), 380);
  };

  const handleTelescopeClick = () => {
    if (telescopeScouting) return;
    sounds.playTelescopeScout();
    setTelescopeGlint(true);
    setTelescopeRecoil(true);
    setTelescopeScouting(true);

    setTimeout(() => {
      setTelescopeRecoil(false);
    }, 420);

    setTimeout(() => {
      setTelescopeGlint(false);
    }, 550);

    // Smooth pan down to About section after telescope charges/locks coordinates
    setTimeout(() => {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 280);

    // Gracefully fade out the scouting HUD reticle once descending
    setTimeout(() => {
      setTelescopeScouting(false);
    }, 1400);
  };

  const handleBalloonClick = () => {
    sounds.playPop();
    setBalloonBounced(true);
    setTimeout(() => setBalloonBounced(false), 240);
  };

  return (
    <main
      ref={containerRef}
      className="relative w-full h-screen overflow-y-auto overflow-x-hidden select-none bg-[#030015]"
      style={{
        ["--mx" as string]: 0,
        ["--my" as string]: 0,
      }}
    >
      {/* ── SECTION 1: HERO VIEWPORT (FULL SCREEN 100VH) ───── */}
      <section 
        id="hero"
        className="home-section relative w-full h-screen min-h-screen flex items-center justify-center overflow-hidden flex-shrink-0"
      >
        {/* ── Scaled Widescreen Canvas Container ──────────────── */}
        <div 
          className={`relative w-full h-full overflow-hidden transition-transform duration-700 ease-out ${
            telescopeScouting ? "scale-[1.04]" : "scale-100"
          }`}
          style={{
            transformOrigin: "25% 65%",
            background: "radial-gradient(ellipse at 50% 32%, #180946 0%, #0d0426 42%, #030014 100%)",
          }}
        >
        {/* ── Ambient Cosmic Nebula Glow ─────────────────────── */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-45 gpu-accel"
          style={{
            transform: "translate3d(calc(var(--mx) * 12px), calc(var(--my) * 12px), 0)",
            backgroundImage: `
              radial-gradient(circle at 18% 28%, rgba(56, 189, 248, 0.18) 0%, transparent 45%),
              radial-gradient(circle at 82% 20%, rgba(168, 85, 247, 0.22) 0%, transparent 50%),
              radial-gradient(circle at 50% 60%, rgba(59, 130, 246, 0.2) 0%, transparent 55%)
            `,
          }}
        />

        {/* ── Naturally Drifting & Twinkling Stars Layer ─────── */}
        <div 
          className="absolute inset-0 pointer-events-none gpu-accel"
          style={{ transform: "translate3d(calc(var(--mx) * 6px), calc(var(--my) * 6px), 0)" }}
        >
          {STARS.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white gpu-accel"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                animation: `
                  twinkle ${star.animDuration}s ${star.animDelay}s infinite ease-in-out,
                  star-slow-drift ${star.driftDuration}s infinite ease-in-out
                `,
                boxShadow: star.size > 2 ? "0 0 6px 1px rgba(255,255,255,0.85)" : undefined,
              }}
            />
          ))}
        </div>

        {/* ── NATURALLY FALLING METEORS & COMETS (GPU ACCELERATED & IMMEDIATE MOTION) ── */}
        {/* Meteor 1: Hero Large Meteor blazing across upper-left */}
        <div 
          className="absolute pointer-events-none z-10 gpu-accel opacity-0"
          style={{
            top: "6%",
            left: "14%",
            width: "320px",
            height: "160px",
            transform: "translate3d(-260px, -130px, 0)",
            animation: "meteor-fluent-1 2.8s -1.4s infinite linear both",
            willChange: "transform, opacity",
          }}
        >
          <Image
            src="/landing-pages/home/props/neon-comet-shooting-star-1.webp"
            alt="Falling Meteor"
            width={320}
            height={160}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Meteor 2: Upper Mid-Right shooting comet */}
        <div 
          className="absolute pointer-events-none z-10 gpu-accel opacity-0"
          style={{
            top: "8%",
            right: "24%",
            width: "200px",
            height: "100px",
            transform: "translate3d(-220px, -110px, 0)",
            animation: "meteor-fluent-2 3.2s -0.8s infinite linear both",
            willChange: "transform, opacity",
          }}
        >
          <Image
            src="/landing-pages/home/props/neon-comet-shooting-star-3.webp"
            alt="Shooting Star"
            width={200}
            height={100}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Meteor 3: Mid-Left diagonal falling star */}
        <div 
          className="absolute pointer-events-none z-10 gpu-accel opacity-0"
          style={{
            top: "20%",
            left: "22%",
            width: "180px",
            height: "90px",
            transform: "translate3d(-180px, -90px, 0)",
            animation: "meteor-fluent-3 2.9s -2.1s infinite linear both",
            willChange: "transform, opacity",
          }}
        >
          <Image
            src="/landing-pages/home/props/neon-comet-shooting-star-4.webp"
            alt="Shooting Star"
            width={180}
            height={90}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Meteor 4: Deep Right falling comet */}
        <div 
          className="absolute pointer-events-none z-10 gpu-accel opacity-0"
          style={{
            top: "28%",
            right: "10%",
            width: "170px",
            height: "85px",
            transform: "translate3d(-200px, -100px, 0)",
            animation: "meteor-fluent-4 2.6s -1.0s infinite linear both",
            willChange: "transform, opacity",
          }}
        >
          <Image
            src="/landing-pages/home/props/neon-comet-shooting-star-2.webp"
            alt="Shooting Star"
            width={170}
            height={85}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Meteor 5: Center-Right high altitude meteor */}
        <div 
          className="absolute pointer-events-none z-10 gpu-accel opacity-0"
          style={{
            top: "14%",
            left: "48%",
            width: "160px",
            height: "80px",
            transform: "translate3d(-220px, -110px, 0)",
            animation: "meteor-fluent-2 3.4s -2.5s infinite linear both",
            willChange: "transform, opacity",
          }}
        >
          <Image
            src="/landing-pages/home/props/neon-comet-shooting-star-5.webp"
            alt="Shooting Star"
            width={160}
            height={80}
            className="w-full h-full object-contain"
          />
        </div>

        {/* ── Celestial Planets & Asteroids ──────────────────── */}
        {/* Large Blue Cratered Planet (Top Left) */}
        <div 
          className="absolute pointer-events-none z-10 gpu-accel"
          style={{
            top: "25%",
            left: "5%",
            width: "145px",
            height: "140px",
            transform: "translate3d(calc(var(--mx) * -14px), calc(var(--my) * -14px), 0)",
            animation: "planet-float 7s ease-in-out infinite",
          }}
        >
          <div className="w-full h-full gpu-accel" style={{ animation: "planet-spin 28s linear infinite" }}>
            <Image
              src="/landing-pages/home/planets/glossy-blue-planet-icon-1.webp"
              alt="Blue Planet"
              width={145}
              height={140}
              className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(56,189,248,0.35)]"
            />
          </div>
        </div>

        {/* Small Blue Planet (Upper Mid-Left) */}
        <div 
          className="absolute pointer-events-none z-10 gpu-accel"
          style={{
            top: "22%",
            left: "18%",
            width: "42px",
            height: "42px",
            animation: "planet-float 9s 1.5s ease-in-out infinite",
          }}
        >
          <div className="w-full h-full gpu-accel" style={{ animation: "planet-spin 18s linear infinite" }}>
            <Image
              src="/landing-pages/home/planets/glossy-blue-planet-icon-3.webp"
              alt="Small Blue Planet"
              width={42}
              height={42}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Saturn-like Purple Ringed Planet (Top Right) */}
        <div 
          className="absolute pointer-events-none z-10 gpu-accel"
          style={{
            top: "14%",
            right: "4%",
            width: "330px",
            height: "170px",
            transform: "translate3d(calc(var(--mx) * -18px), calc(var(--my) * -18px), 0)",
            animation: "planet-float 8.5s 1s ease-in-out infinite",
          }}
        >
          <div className="w-full h-full gpu-accel" style={{ animation: "planet-ring-natural 9s ease-in-out infinite" }}>
            <Image
              src="/landing-pages/home/planets/neon-purple-ringed-planet-1.webp"
              alt="Purple Ringed Planet"
              width={330}
              height={170}
              loading="eager"
              fetchPriority="high"
              className="w-full h-full object-contain drop-shadow-[0_0_28px_rgba(168,85,247,0.4)]"
            />
          </div>
        </div>

        {/* Medium Blue Planet (Mid Right) */}
        <div 
          className="absolute pointer-events-none z-10 gpu-accel"
          style={{
            top: "45%",
            right: "13%",
            width: "85px",
            height: "82px",
            animation: "planet-float 6.5s 2s ease-in-out infinite",
          }}
        >
          <div className="w-full h-full gpu-accel" style={{ animation: "planet-spin-reverse 24s linear infinite" }}>
            <Image
              src="/landing-pages/home/planets/glossy-blue-planet-icon-2.webp"
              alt="Medium Blue Planet"
              width={85}
              height={82}
              className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]"
            />
          </div>
        </div>

        {/* Floating Violet Asteroid Rocks */}
        <div 
          className="absolute pointer-events-none z-10 gpu-accel"
          style={{
            top: "45%",
            right: "1.5%",
            width: "60px",
            height: "55px",
            animation: "planet-float 10s 3s ease-in-out infinite",
          }}
        >
          <div className="w-full h-full gpu-accel" style={{ animation: "asteroid-tumble 18s linear infinite" }}>
            <Image
              src="/landing-pages/home/props/glossy-violet-asteroid-rock-1-1.webp"
              alt="Asteroid Rock"
              width={60}
              height={55}
              className="w-full h-full object-contain opacity-85"
            />
          </div>
        </div>

        {/* ── TOP NAVIGATION BAR ─────────────────────────────── */}
        <header className="hero-header absolute top-0 left-0 right-0 z-30 flex items-start justify-between px-6 pt-2 pointer-events-none">
          {/* Right-side GDAI Club Banner (External link to IndieConnect in new tab) */}
          <a
            href="https://gdai.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-gdai pointer-events-auto absolute top-0 group transition-transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-black rounded-lg block cursor-pointer"
            style={{
              right: "var(--gdai-right-offset, 20px)",
            }}
            aria-label="Visit IndieConnect (GDAI Club) - Opens in new tab"
          >
            <div className="hero-gdai-sway relative" style={{ animation: "banner-sway 4s ease-in-out infinite" }}>
              <Image
                src="/landing-pages/home/ui/group-1000012449.webp"
                alt="GDAI Club Emblem"
                width={70}
                height={123}
                className="drop-shadow-[0_4px_10px_rgba(220,38,38,0.45)] group-hover:scale-105 transition-transform"
              />
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-black/80 text-[10px] text-amber-300 font-bold opacity-0 group-hover:opacity-100 transition-opacity border border-amber-500/40">
                GDAI CLUB
              </span>
            </div>
          </a>

          {/* Top-Center: Navigation Buttons (BROCHURE — PRIZE — SPONSORS) */}
          <nav className="hero-nav hidden md:flex pointer-events-auto absolute md:left-1/2 md:-translate-x-1/2 top-0 mt-3 items-center justify-center gap-20 sm:gap-30 md:gap-40">
            {/* 1. BROCHURE Button (Opens the Genesis Brochure PDF in a new tab) */}
            <a
              href="/brochure"
              target="_blank"
              rel="noopener noreferrer"
              className="relative transition-all duration-200 hover:scale-108 active:scale-95 group focus:outline-none cursor-pointer block"
              aria-label="Open Genesis Tournament Brochure (PDF) - Opens in new tab"
            >
              <Image
                src="/landing-pages/home/ui/nav-brochure.webp"
                alt="BROCHURE"
                width={195}
                height={42}
                className="h-8 sm:h-9 md:h-11 w-auto object-contain drop-shadow-[0_4px_8px_rgba(6,182,212,0.4)] group-hover:drop-shadow-[0_0_16px_rgba(6,182,212,0.85)]"
              />
            </a>

            {/* 2. PRIZE Button */}
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                document.getElementById("prizepool")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="relative transition-all duration-200 hover:scale-108 active:scale-95 group focus:outline-none cursor-pointer block"
              aria-label="Prize Pool"
            >
              <Image
                src="/landing-pages/home/ui/nav-prize.webp"
                alt="PRIZE"
                width={195}
                height={46}
                className="h-8 sm:h-9 md:h-11 w-auto object-contain drop-shadow-[0_4px_8px_rgba(234,179,8,0.35)] group-hover:drop-shadow-[0_0_16px_rgba(234,179,8,0.85)]"
              />
            </button>

            {/* 3. SPONSORS Button */}
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                document.getElementById("sponsors")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="relative transition-all duration-200 hover:scale-108 active:scale-95 group focus:outline-none cursor-pointer block"
              aria-label="Sponsors"
            >
              <Image
                src="/landing-pages/home/ui/nav-sponsors.webp"
                alt="SPONSORS"
                width={195}
                height={44}
                className="h-8 sm:h-9 md:h-11 w-auto object-contain drop-shadow-[0_4px_8px_rgba(34,197,94,0.35)] group-hover:drop-shadow-[0_0_16px_rgba(34,197,94,0.85)]"
              />
            </button>
          </nav>

          {/* Top-Right: Mobile Menu Button */}
          <div ref={mobileMenuRef} className="hero-controls flex md:hidden pointer-events-auto absolute right-6 top-0 items-center gap-3 mt-3">
            {/* Menu Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="hero-menu-trigger relative transition-all duration-200 hover:scale-108 active:scale-95 group focus:outline-none cursor-pointer"
              aria-label="Navigation Menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="hero-mobile-menu"
            >
              <span className="hero-menu-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>

            {isMobileMenuOpen && (
              <div id="hero-mobile-menu" className="hero-mobile-menu" role="menu" aria-label="Mobile navigation">
                <a
                  href="/brochure"
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Image src="/landing-pages/home/ui/nav-brochure.webp" alt="Brochure" width={195} height={44} />
                </a>
                <button type="button" role="menuitem" onClick={() => handleMobileMenuNavigate("prizepool")}>
                  <Image src="/landing-pages/home/ui/nav-prize.webp" alt="Prize" width={195} height={44} />
                </button>
                <button type="button" role="menuitem" onClick={() => handleMobileMenuNavigate("sponsors")}>
                  <Image src="/landing-pages/home/ui/nav-sponsors.webp" alt="Sponsors" width={195} height={44} />
                </button>
              </div>
            )}
          </div>
        </header>

        {/* ── CENTER HERO: BRAWL STARS / GENESIS LOGO (SMOOTH 3D TILT & GLINT) ── */}
        <div 
          className="hero-logo absolute top-[10%] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none gpu-accel"
          style={{
            animation: !isLogoHovered ? "float-hero 4s ease-in-out infinite" : undefined,
          }}
        >
          <div 
            ref={logoRef}
            onMouseMove={handleLogoMouseMove}
            onMouseEnter={handleLogoMouseEnter}
            onMouseLeave={handleLogoMouseLeave}
            className="relative pointer-events-auto select-none gpu-accel cursor-default"
            style={{
              perspective: "800px",
              transformStyle: "preserve-3d",
              filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.75))",
            }}
            title="Genesis Emblem"
          >
            {/* The Main Genesis Title & Winged Brawl Star Skull Asset */}
            <Image
              src="/landing-pages/home/ui/group-1000012441.webp"
              alt="GENESIS Tournament Brawl Stars Logo"
              width={460}
              height={290}
              className="w-[340px] md:w-[440px] lg:w-[490px] h-auto object-contain"
              preload
            />

            {/* Subtle Center Star Glint */}
            <div 
              className="absolute top-[28%] left-[49%] w-3 h-3 bg-white rounded-full pointer-events-none"
              style={{
                boxShadow: "0 0 8px 3px #fbbf24, 0 0 16px 6px #f59e0b",
                animation: "glint 2.5s infinite ease-in-out",
              }}
            />
          </div>
        </div>

        {/* ── CENTER STAGE: GLOWING MOON DOME ────────────────── */}
        <div 
          className="hero-moon absolute left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none gpu-accel"
          style={{ bottom: "27.5%" }}
        >
          {/* Luminous Atmospheric Halo */}
          <div 
            className="hero-moon-halo absolute rounded-full"
            style={{
              bottom: "10px",
              width: "680px",
              height: "460px",
              background: "radial-gradient(circle at 50% 60%, rgba(56, 189, 248, 0.45) 0%, rgba(14, 165, 233, 0.22) 50%, transparent 75%)",
              filter: "blur(40px)",
            }}
          />

          {/* Spherical Moon Dome Surface with Crater Markings */}
          <div 
            className="hero-moon-dome relative overflow-hidden gpu-accel"
            style={{
              width: "clamp(460px, 48vw, 680px)",
              height: "clamp(230px, 24vw, 340px)",
              borderRadius: "50% 50% 0 0",
              background: `
                radial-gradient(circle at 45% 25%, #dff4fd 0%, #7dd3fc 22%, #0284c7 52%, #034f8a 82%, #021f45 100%)
              `,
              boxShadow: `
                inset -25px 20px 60px rgba(2, 31, 69, 0.8),
                inset 15px -10px 40px rgba(224, 242, 254, 0.6),
                0 0 60px rgba(56, 189, 248, 0.7),
                0 0 120px rgba(14, 165, 233, 0.35)
              `,
              animation: "glow-pulse 4s ease-in-out infinite",
            }}
          >
            {/* Crater 1 */}
            <div 
              className="absolute rounded-full"
              style={{
                top: "34%",
                left: "22%",
                width: "60px",
                height: "55px",
                background: "radial-gradient(circle at 35% 35%, #0274b3 0%, #034f8a 70%, #023864 100%)",
                boxShadow: "inset 2px 3px 6px rgba(0,0,0,0.4), 0 2px 4px rgba(255,255,255,0.2)",
                opacity: 0.85,
              }}
            />
            {/* Crater 2 */}
            <div 
              className="absolute rounded-full"
              style={{
                top: "48%",
                left: "64%",
                width: "90px",
                height: "82px",
                background: "radial-gradient(circle at 35% 35%, #0274b3 0%, #034f8a 70%, #023864 100%)",
                boxShadow: "inset 3px 4px 8px rgba(0,0,0,0.45), 0 2px 4px rgba(255,255,255,0.2)",
                opacity: 0.8,
              }}
            />
            {/* Crater 3 */}
            <div 
              className="absolute rounded-full"
              style={{
                top: "18%",
                left: "58%",
                width: "42px",
                height: "38px",
                background: "radial-gradient(circle at 35% 35%, #0274b3 0%, #034f8a 70%, #023864 100%)",
                boxShadow: "inset 1px 2px 4px rgba(0,0,0,0.4)",
                opacity: 0.75,
              }}
            />
            {/* Moon Top Crescent Highlight */}
            <div 
              className="absolute top-3 left-1/4 right-1/4 h-12 rounded-full"
              style={{
                background: "radial-gradient(ellipse, rgba(255,255,255,0.6) 0%, transparent 80%)",
                filter: "blur(6px)",
              }}
            />
          </div>
        </div>

        {/* ── CENTER: GOLDEN 3D "REGISTER" BUTTON (ON THE MOON) ── */}
        <div 
          className="hero-register absolute left-1/2 -translate-x-1/2 z-28 flex flex-col items-center pointer-events-auto gpu-accel"
          style={{ bottom: "34.5%" }}
        >
          <button
            type="button"
            onClick={handleRegisterClick}
            className="cursor-pointer relative transition-all duration-200 hover:scale-108 active:scale-95 group focus:outline-none"
            aria-label="Register for Genesis Tournament"
          >
            <Image
              src="/landing-pages/home/ui/group-1074.webp"
              alt="REGISTER"
              width={260}
              height={125}
              className="w-[210px] md:w-[250px] lg:w-[275px] h-auto object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)]"
            />
            {/* Particle sparkles on hover */}
            <div className="absolute -inset-3 bg-amber-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </button>
        </div>

        {/* ── CHARACTERS ROW (STANDING BEHIND THE CURVED WALL) ── */}

        {/* 1. Left Character: COLT (Dual Gunslinger - Subtle Idle Float & Blaster Recoil) */}
        <div 
          onClick={handleColtClick}
          className={`hero-colt absolute z-18 transition-transform duration-300 hover:scale-105 group gpu-accel cursor-pointer ${
            coltRecoil ? "-translate-y-2 scale-105" : ""
          }`}
          style={{
            bottom: "31.8%",
            left: "14%",
            width: "clamp(250px, 26vw, 380px)",
            height: "auto",
            animation: !coltRecoil ? "float-gentle 4.5s ease-in-out infinite" : undefined,
          }}
          title="Colt Gunslinger - Click to Fire Blasters!"
        >
          <div className="relative">
            <Image
              src="/landing-pages/home/characters/dual-wielding-neon-gunslinger-1.webp"
              alt="Colt Gunslinger"
              width={370}
              height={290}
              className="w-full h-auto object-contain drop-shadow-[0_10px_22px_rgba(0,0,0,0.75)] filter group-hover:brightness-110 transition-all"
            />
            {coltRecoil && (
              <div 
                className="absolute top-[38%] left-[78%] w-10 h-10 rounded-full bg-cyan-300 blur-sm animate-ping pointer-events-none"
                style={{ boxShadow: "0 0 20px 8px rgba(56, 189, 248, 0.9)" }}
              />
            )}
          </div>
        </div>

        {/* 2. Right Character: LEON (Chameleon Ninja Brawler - Subtle Idle Float & Shuriken Spin) */}
        <div 
          onClick={handleLeonClick}
          className={`hero-leon absolute z-18 transition-transform duration-300 hover:scale-105 group gpu-accel cursor-pointer ${
            leonActive ? "-translate-y-2 scale-105" : ""
          }`}
          style={{
            bottom: "28.5%",
            right: "12%",
            width: "clamp(240px, 24vw, 360px)",
            height: "auto",
            animation: !leonActive ? "float-gentle 4s 1s ease-in-out infinite" : undefined,
          }}
          title="Leon Brawler - Click to Throw Ninja Star!"
        >
          <div className="relative">
            <Image
              src="/landing-pages/home/characters/chameleon-hood-ninja-brawler-1.webp"
              alt="Leon Brawler"
              width={360}
              height={330}
              className="w-full h-auto object-contain drop-shadow-[0_10px_22px_rgba(0,0,0,0.75)] filter group-hover:brightness-110 transition-all"
            />
            {leonActive && (
              <div 
                className="absolute top-[42%] left-[12%] w-8 h-8 rounded-full bg-purple-300 blur-sm animate-spin pointer-events-none"
                style={{ boxShadow: "0 0 16px 6px rgba(168, 85, 247, 0.9)" }}
              />
            )}
          </div>
        </div>

        {/* ── REDESIGNED AUTHENTIC OBSERVATORY BALCONY STAGE & ARENA FLOOR ── */}
        <div 
          className="hero-stage absolute left-0 right-0 bottom-0 z-20 pointer-events-none w-full select-none"
          style={{
            height: "35.1%", // Exactly 359px out of 1024px canvas
            minHeight: "260px",
          }}
        >
          <Image
            src="/landing-pages/home/backgrounds/observatory-stage-floor.webp"
            alt="Genesis Observatory Stage Floor"
            fill
            sizes="100vw"
            className="object-fill object-bottom select-none pointer-events-none"
          />
        </div>

        {/* ── PROPS SITTING FIRMLY ON THE OBSERVATORY STAGE FLOOR ── */}

        {/* 1. Left Telescope Turret (Grounded on the Deck & Console, Exactly as in Figma) */}
        <div 
          onClick={handleTelescopeClick}
          onMouseEnter={() => setTelescopeHovered(true)}
          onMouseLeave={() => setTelescopeHovered(false)}
          className={`hero-telescope absolute z-25 transition-all duration-300 hover:scale-105 group gpu-accel cursor-pointer ${
            telescopeRecoil ? "telescope-firing" : ""
          }`}
          style={{
            bottom: "16.5%",
            left: "0%",
            width: "clamp(220px, 20vw, 300px)",
            height: "auto",
          }}
          title="Genesis Observatory Telescope - Click to Scout Ground Zero!"
          aria-label="Genesis Observatory Telescope - Click to Scout Ground Zero"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleTelescopeClick();
            }
          }}
        >
          {/* Cyber HUD Tooltip Badge */}
          <div
            className={`absolute -top-12 left-1/3 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg bg-black/90 text-cyan-300 font-mono text-[11px] font-bold tracking-wider border border-cyan-400/60 shadow-[0_0_18px_rgba(6,182,212,0.5)] pointer-events-none transition-all duration-200 z-30 ${
              telescopeHovered && !telescopeScouting ? "opacity-100 -translate-y-1 scale-100" : "opacity-0 translate-y-2 scale-95"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
              <span>🔭 SCOUT GALAXY // CLICK TO PEEK</span>
            </div>
            {/* Tooltip caret pointing down to turret */}
            <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-black rotate-45 border-r border-b border-cyan-400/60" />
          </div>

          <div className="relative">
            <Image
              src="/landing-pages/home/props/glossy-blue-star-emblem-cannon-turret-1.webp"
              alt="Observatory Telescope Cannon"
              width={300}
              height={365}
              className="w-full h-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
            />
            {/* Focal lens glint */}
            {telescopeGlint && (
              <div 
                className="absolute top-[32%] left-[58%] w-6 h-6 rounded-full bg-yellow-200 blur-xs animate-ping pointer-events-none"
                style={{ boxShadow: "0 0 16px 6px rgba(251, 191, 36, 0.95)" }}
              />
            )}
          </div>
        </div>

        {/* 2. Right Squeak Balloon Character (Grounded on the Deck, Floating Bobble & Pop Sound) */}
        <div 
          onClick={handleBalloonClick}
          className={`hero-balloon absolute z-25 transition-transform duration-300 hover:scale-105 group gpu-accel cursor-pointer ${
            balloonBounced ? "-translate-y-2 scale-106" : ""
          }`}
          style={{
            bottom: "1.5%",
            right: "1.5%",
            width: "clamp(260px, 25vw, 370px)",
            height: "auto",
            animation: !balloonBounced ? "balloon-bob 4s ease-in-out infinite" : undefined,
          }}
          title="Fine, you have my full attention. - Click to Bounce!"
        >
          <div className="relative">
            <Image
              src="/landing-pages/home/ui/group-1000012450.webp"
              alt="Fine, you have my full attention."
              width={370}
              height={245}
              className="w-full h-auto object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.65)]"
            />
          </div>
        </div>

      </div>
    </section>

    {/* ── LIVE TIMER AT THE HERO / ABOUT BOUNDARY ────────── */}
    <CountdownSection />

    {/* ── SECTION 2: ABOUT GENESIS (STATIC SECTION) ──────── */}
    <AboutSection />

    {/* ── SECTION 3: STATIC TIMELINE FOUNDATION ───────────── */}
    <TimelineSection scrollContainerRef={containerRef} />

    {/* ── SECTION 4: PRIZE POOL (INTERACTIVE SHOWCASE) ───── */}
    <PrizePoolSection />

    {/* ── SECTION 5: MEMORIES (SCROLLAROIDS PHOTO JOURNEY) ─ */}
    <MemoriesSection scrollContainerRef={containerRef} />

    {/* ── SECTION 6: SPONSORS (RESPONSIVE SHOWCASE) ──────── */}
    <SponsorsSection />

    {/* ── SECTION 7: FAQS (INTERACTIVE ACCORDION & CATEGORIES) ─ */}
    <FAQSection />

    {/* ── SECTION 8: CONTACT US ──────────────────────────── */}
    <ContactSection />

      {/* ── FULL-SCREEN VIEWPORT SIDE DOCK INDICATORS (6 SECTIONS) ──────── */}
      {false && <aside aria-label="Page Sections" className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 pointer-events-auto">
        <button
          type="button"
          onClick={() => {
            sounds.playClick();
            document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
          }}
          className={`w-3.5 h-3.5 rounded-full transition-all duration-300 border-2 cursor-pointer ${
            false
              ? "bg-amber-400 border-white scale-125 shadow-[0_0_12px_#fbbf24]"
              : "bg-blue-950/80 border-blue-400/50 hover:bg-blue-700 hover:scale-110"
          }`}
          title="Genesis Main Stage"
          aria-label="Genesis Main Stage"
        />
        <button
          type="button"
          onClick={() => {
            sounds.playClick();
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          }}
          className={`w-3.5 h-3.5 rounded-full transition-all duration-300 border-2 cursor-pointer ${
            false
              ? "bg-red-500 border-white scale-125 shadow-[0_0_12px_#ef4444]"
              : "bg-blue-950/80 border-blue-400/50 hover:bg-blue-700 hover:scale-110"
          }`}
          title="About Genesis"
          aria-label="About Genesis"
        />
        <button
          type="button"
          onClick={() => {
            sounds.playClick();
            document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" });
          }}
          className={`w-3.5 h-3.5 rounded-full transition-all duration-300 border-2 cursor-pointer ${
            false
              ? "bg-cyan-400 border-white scale-125 shadow-[0_0_12px_#22d3ee]"
              : "bg-blue-950/80 border-blue-400/50 hover:bg-blue-700 hover:scale-110"
          }`}
          title="Genesis Event Timeline"
          aria-label="Genesis Event Timeline"
        />
        <button
          type="button"
          onClick={() => {
            sounds.playClick();
            document.getElementById("prizepool")?.scrollIntoView({ behavior: "smooth" });
          }}
          className={`w-3.5 h-3.5 rounded-full transition-all duration-300 border-2 cursor-pointer ${
            false
              ? "bg-yellow-400 border-white scale-125 shadow-[0_0_12px_#facc15]"
              : "bg-blue-950/80 border-blue-400/50 hover:bg-blue-700 hover:scale-110"
          }`}
          title="Genesis Prize Pool"
          aria-label="Genesis Prize Pool"
        />
        <button
          type="button"
          onClick={() => {
            sounds.playClick();
            document.getElementById("sponsors")?.scrollIntoView({ behavior: "smooth" });
          }}
          className={`w-3.5 h-3.5 rounded-full transition-all duration-300 border-2 cursor-pointer ${
            false
              ? "bg-emerald-400 border-white scale-125 shadow-[0_0_12px_#34d399]"
              : "bg-blue-950/80 border-blue-400/50 hover:bg-blue-700 hover:scale-110"
          }`}
          title="Genesis Sponsors"
          aria-label="Genesis Sponsors"
        />
        <button
          type="button"
          onClick={() => {
            sounds.playClick();
            document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
          }}
          className={`w-3.5 h-3.5 rounded-full transition-all duration-300 border-2 cursor-pointer ${
            false
              ? "bg-purple-400 border-white scale-125 shadow-[0_0_12px_#c084fc]"
              : "bg-blue-950/80 border-blue-400/50 hover:bg-blue-700 hover:scale-110"
          }`}
          title="Frequently Asked Questions"
          aria-label="Frequently Asked Questions"
        />
      </aside>}

      {/* ── CINEMATIC OBSERVATORY VIEWPORT HUD OVERLAY ─────── */}
      <div
        className={`fixed inset-0 pointer-events-none z-50 transition-opacity duration-500 flex flex-col items-center justify-between p-6 sm:p-10 select-none ${
          telescopeScouting ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        {/* Optical Aperture Vignette */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, transparent 42%, rgba(3, 0, 21, 0.45) 70%, rgba(3, 0, 21, 0.92) 100%)",
            boxShadow: "inset 0 0 100px rgba(6, 182, 212, 0.25)",
          }}
        />

        {/* Scanline Sweep */}
        <div className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent pointer-events-none animate-hud-scanline" />

        {/* Top HUD Telemetry Banner */}
        <div className="relative z-10 flex flex-col items-center gap-1 px-5 py-2.5 rounded-xl bg-black/85 backdrop-blur-md border border-cyan-400/50 text-cyan-300 font-mono text-xs shadow-[0_0_30px_rgba(6,182,212,0.45)]">
          <div className="flex items-center gap-2 text-cyan-400 font-bold tracking-widest text-[11px] sm:text-[13px]">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping inline-block" />
            🔭 OBSERVATORY OPTICS // TARGET LOCKED
          </div>
          <div className="text-[10px] sm:text-[11px] text-cyan-200/90 tracking-wider uppercase font-semibold">
            Target Sector: About Genesis • Initiating Descent...
          </div>
        </div>

        {/* Center Optical Reticle / Crosshairs */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center pointer-events-none">
          {/* Outer Rotating Compass Ring */}
          <div className="absolute inset-0 animate-reticle-cw">
            <svg viewBox="0 0 200 200" className="w-full h-full text-cyan-400/40">
              <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 8" />
              <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 15" />
            </svg>
          </div>

          {/* Inner Counter-Rotating Ring & Corner Targeting Brackets */}
          <div className="absolute w-44 h-44 sm:w-56 sm:h-56 animate-reticle-ccw">
            <svg viewBox="0 0 200 200" className="w-full h-full text-cyan-300/50">
              <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="20 15 5 15" />
              <path d="M 40 70 L 40 40 L 70 40" fill="none" stroke="currentColor" strokeWidth="3" />
              <path d="M 160 70 L 160 40 L 130 40" fill="none" stroke="currentColor" strokeWidth="3" />
              <path d="M 40 130 L 40 160 L 70 160" fill="none" stroke="currentColor" strokeWidth="3" />
              <path d="M 160 130 L 160 160 L 130 160" fill="none" stroke="currentColor" strokeWidth="3" />
            </svg>
          </div>

          {/* Center Crosshair Dot */}
          <div className="relative flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-cyan-300 animate-pulse shadow-[0_0_12px_rgba(6,182,212,0.9)]" />
            <div className="absolute w-12 h-0.5 bg-cyan-400/60" />
            <div className="absolute w-0.5 h-12 bg-cyan-400/60" />
          </div>
        </div>

        {/* Bottom Coordinates Readout */}
        <div className="relative z-10 flex items-center gap-6 px-4 py-1.5 rounded-lg bg-black/75 backdrop-blur-sm border border-cyan-500/30 text-[10px] font-mono text-cyan-300/80 tracking-widest uppercase">
          <span>RA 05h 35m</span>
          <span className="text-cyan-400">●</span>
          <span>DEC -05° 23&apos;</span>
          <span className="text-cyan-400">●</span>
          <span>MAG 1.25x</span>
        </div>
      </div>
    </main>
  );
}
