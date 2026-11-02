"use client";

import { useEffect, useRef, type RefObject } from "react";

const stages = [
  {
    step: "01",
    title: "Registration",
    sub: "Unstop & IndieConnect",
    asset: "/landing-pages/timeline/stages/stage-registration.svg",
    side: "left",
    details: ["Platforms: Unstop & IndieConnect", "Opening date: To be announced", "Closing date: To be announced"],
  },
  {
    step: "02",
    title: "Round 1 — Online",
    sub: "Online Tournament",
    asset: "/landing-pages/timeline/stages/stage-round1.svg",
    side: "right",
    details: ["Format: Online", "Start date: To be announced", "End date: To be announced"],
  },
  {
    step: "03",
    title: "Round 2 — Offline",
    sub: "Offline Showdown",
    asset: "/landing-pages/timeline/stages/stage-round2.svg",
    side: "left",
    details: ["Format: Offline", "Dates: To be announced", "Venue: To be announced"],
  },
  {
    step: "04",
    title: "Results",
    sub: "Grand Champions",
    asset: "/landing-pages/timeline/stages/stage-result.svg",
    side: "right",
    details: ["Announcement date: To be announced", "Additional details: To be announced"],
  },
] as const;

type TimelineSectionProps = {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

class TimelineParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  decay: number;
  color: string;
  glow: string;
  isStar: boolean;
  rotation: number;
  rotationSpeed: number;

  constructor(x: number, y: number, isBurst = false, isShimmer = false) {
    this.x = x;
    this.y = y;

    if (isBurst) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2.8 + 0.9;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.size = Math.random() * 3.2 + 1.8;
      this.maxLife = Math.random() * 34 + 26;
      this.isStar = true;
    } else if (isShimmer) {
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = -(Math.random() * 0.8 + 0.2);
      this.size = Math.random() * 1.8 + 0.8;
      this.maxLife = Math.random() * 24 + 16;
      this.isStar = Math.random() > 0.55;
    } else {
      this.vx = (Math.random() - 0.5) * 2.4;
      this.vy = (Math.random() - 0.5) * 1.8 - 0.35;
      this.size = Math.random() * 2.6 + 1.2;
      this.maxLife = Math.random() * 28 + 18;
      this.isStar = Math.random() > 0.45;
    }

    this.life = this.maxLife;
    this.decay = 1;
    this.rotation = Math.random() * Math.PI;
    this.rotationSpeed = (Math.random() - 0.5) * 0.16;

    const palette = [
      { color: "#ffffff", glow: "#ffd700" },
      { color: "#fff7ba", glow: "#f59e0b" },
      { color: "#ffd700", glow: "#d97706" },
      { color: "#facc15", glow: "#b45309" },
      { color: "#67e8f9", glow: "#0891b2" },
    ];
    const item = palette[Math.floor(Math.random() * palette.length)];
    this.color = item.color;
    this.glow = item.glow;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.95;
    this.vy *= 0.95;
    this.rotation += this.rotationSpeed;
    this.life -= this.decay;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const alpha = Math.max(0, this.life / this.maxLife);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.shadowBlur = this.size * 2.8;
    ctx.shadowColor = this.glow;

    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    if (this.isStar) {
      const r = this.size * 1.5;
      ctx.beginPath();
      ctx.moveTo(0, -r);
      ctx.quadraticCurveTo(0, 0, r, 0);
      ctx.quadraticCurveTo(0, 0, 0, r);
      ctx.quadraticCurveTo(0, 0, -r, 0);
      ctx.quadraticCurveTo(0, 0, 0, -r);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

export default function TimelineSection({ scrollContainerRef }: TimelineSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const journey = journeyRef.current;
    const track = trackRef.current;
    const canvas = canvasRef.current;
    const scroller = scrollContainerRef.current;

    if (!section || !journey || !track || !scroller) return;

    const markers = Array.from(
      journey.querySelectorAll<HTMLElement>(".genesis-timeline-marker"),
    );
    const stageElements = Array.from(
      journey.querySelectorAll<HTMLElement>(".genesis-timeline-stage"),
    );

    if (markers.length !== stages.length || stageElements.length !== stages.length) return;

    track.dataset.runtime = "golden-journey-v1";

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const ctx = canvas?.getContext("2d") ?? null;
    const particles: TimelineParticle[] = [];
    let lastProgress = 0;
    let animFrame = 0;
    const reachedStages = new Set<number>();
    let canvasW = 0;
    let canvasH = 0;
    let trackH = 0;
    const offsetY = 36; // matches canvas top: -36px padding

    let markerCenters: number[] = [];
    let firstMarkerY = 0;
    let lastMarkerY = 0;
    let frame = 0;

    const renderParticles = () => {
      animFrame = 0;
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvasW, canvasH);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }

      if (particles.length > 0) {
        animFrame = window.requestAnimationFrame(renderParticles);
      }
    };

    const startParticleLoop = () => {
      if (!animFrame && particles.length > 0 && !reducedMotion.matches) {
        animFrame = window.requestAnimationFrame(renderParticles);
      }
    };

    const updateProgress = () => {
      if (markerCenters.length !== markers.length || lastMarkerY <= firstMarkerY) return;

      const activationY = scroller.scrollTop + scroller.clientHeight * 0.58;
      const progress = clamp(
        (activationY - firstMarkerY) / (lastMarkerY - firstMarkerY),
        0,
        1,
      );
      const percent = `${(progress * 100).toFixed(3)}%`;

      track.style.setProperty("--timeline-progress", percent);
      track.style.setProperty("--timeline-light-opacity", "1");
      track.dataset.progress = progress.toFixed(4);

      const thresholds = markerCenters.map((center) =>
        clamp((center - firstMarkerY) / (lastMarkerY - firstMarkerY), 0, 1),
      );
      const currentStage = thresholds.reduce(
        (current, threshold, index) => (progress >= threshold ? index : current),
        0,
      );

      markers.forEach((marker, index) => {
        const reached = progress >= thresholds[index] - 0.002;
        const opened = progress >= thresholds[index] + 0.002;

        marker.classList.toggle("is-reached", reached);
        marker.classList.toggle("is-current", index === currentStage);
        stageElements[index].classList.toggle("is-flipped", opened);
      });

      // Spawn subtle particles during scroll progress
      if (!reducedMotion.matches && canvasW > 0 && trackH > 0) {
        const delta = progress - lastProgress;
        const tipX = canvasW / 2;
        const tipY = offsetY + trackH * progress;

        if (delta > 0.0005) {
          const count = Math.min(6, Math.max(1, Math.floor(delta * 220)));
          for (let i = 0; i < count; i++) {
            particles.push(
              new TimelineParticle(
                tipX + (Math.random() - 0.5) * 14,
                tipY + (Math.random() - 0.5) * 10,
              ),
            );
          }

          // Ambient stardust shimmer along the filled track
          if (progress > 0.08 && Math.random() < 0.4) {
            const shimmerY = offsetY + Math.random() * (trackH * progress);
            particles.push(
              new TimelineParticle(
                tipX + (Math.random() - 0.5) * 8,
                shimmerY,
                false,
                true,
              ),
            );
          }
        }

        // Milestone celebration bursts
        thresholds.forEach((threshold, index) => {
          if (progress >= threshold && !reachedStages.has(index)) {
            reachedStages.add(index);
            const burstY = offsetY + trackH * threshold;
            for (let i = 0; i < 20; i++) {
              particles.push(new TimelineParticle(tipX, burstY, true));
            }
          }
        });

        // Timeline completion celebration burst
        if (progress >= 0.99 && !reachedStages.has(999)) {
          reachedStages.add(999);
          for (let i = 0; i < 28; i++) {
            particles.push(new TimelineParticle(tipX, offsetY + trackH, true));
          }
        }

        lastProgress = progress;
        startParticleLoop();
      }
    };

    const measureGeometry = () => {
      const journeyRect = journey.getBoundingClientRect();
      const scrollerRect = scroller.getBoundingClientRect();
      markerCenters = markers.map((marker) => {
        const rect = marker.getBoundingClientRect();
        return scroller.scrollTop + rect.top + rect.height / 2 - scrollerRect.top;
      });
      firstMarkerY = markerCenters[0];
      lastMarkerY = markerCenters[markerCenters.length - 1];

      const firstRect = markers[0].getBoundingClientRect();
      const trackTop = firstRect.top + firstRect.height / 2 - journeyRect.top;
      trackH = Math.max(1, lastMarkerY - firstMarkerY);

      track.style.top = `${trackTop}px`;
      track.style.bottom = "auto";
      track.style.height = `${trackH}px`;

      // Sizing canvas to track
      if (canvas && ctx) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvasW = canvas.clientWidth;
        canvasH = canvas.clientHeight;
        if (canvasW && canvasH) {
          canvas.width = Math.round(canvasW * dpr);
          canvas.height = Math.round(canvasH * dpr);
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
      }

      updateProgress();
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateProgress();
      });
    };

    const handleResize = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        measureGeometry();
      });
    };

    scroller.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(journey);

    measureGeometry();

    return () => {
      scroller.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      if (animFrame) window.cancelAnimationFrame(animFrame);
    };
  }, [scrollContainerRef]);

  return (
    <section ref={sectionRef} id="timeline" className="genesis-timeline relative w-full overflow-hidden bg-[#030015] text-white" aria-label="Genesis Event Timeline Roadmap">
      <div className="absolute inset-0 pointer-events-none">
        <img loading="lazy" decoding="async" src="/landing-pages/shared/backgrounds/cosmic-background.webp" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-75" />
        <div className="absolute inset-0 bg-[#030015]/35" />
      </div>

      <header className="relative z-10 flex justify-center px-4 pt-20 sm:pt-24">
        <div className="relative flex items-center justify-center">
          <img loading="lazy" decoding="async" src="/landing-pages/timeline/backgrounds/heading-banner.svg" alt="Tournament Timeline" className="h-12 w-auto sm:h-14 md:h-16" />
          <img loading="lazy" decoding="async" src="/landing-pages/timeline/ui/heading-text.svg" alt="TIMELINE" className="absolute h-6 w-auto sm:h-7 md:h-8" />
        </div>
      </header>

      <div ref={journeyRef} className="genesis-timeline-journey relative z-10 mx-auto mt-8 w-full max-w-6xl px-4 pb-20 sm:px-8 sm:pb-28">
        <div ref={trackRef} className="genesis-timeline-track" data-runtime="golden-journey-v1" aria-hidden="true">
          <div className="genesis-timeline-progress-fill" />
          <div className="genesis-timeline-traveling-light" />
          <canvas ref={canvasRef} className="genesis-timeline-particles-canvas" />
        </div>
        <div className="genesis-timeline-stages">
          {stages.map((stage) => (
            <article key={stage.step} className={`genesis-timeline-stage genesis-timeline-stage-${stage.side}`}>
              <div className="genesis-timeline-card">
                <div className="genesis-timeline-card-inner">
                <div className="genesis-timeline-card-back">
                  <span className="genesis-timeline-card-step">STAGE {stage.step}</span>
                  <h3>{stage.title}</h3>
                  <p className="genesis-timeline-card-subtitle">{stage.sub}</p>
                  <div className="genesis-timeline-card-details">
                    {stage.details.map((detail) => <p key={detail}>{detail}</p>)}
                  </div>
                </div>
                <div className="genesis-timeline-card-front">
                <img loading="lazy" decoding="async" src={stage.asset} alt={`${stage.title} — ${stage.sub}`} draggable={false} />
                </div>
              </div>
              </div>
              <div className="genesis-timeline-marker">
                <img loading="lazy" decoding="async"
                  className="genesis-timeline-marker-art"
                  src={`/landing-pages/timeline/markers/genesis-milestone-${stage.step}.svg`}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
