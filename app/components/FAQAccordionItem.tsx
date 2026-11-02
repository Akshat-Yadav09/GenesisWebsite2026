"use client";

import React, { useCallback } from "react";
import { FAQItem } from "../data/faqData";
import { sounds } from "./sound";

interface FAQAccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index?: number;
}

export default function FAQAccordionItem({
  item,
  isOpen,
  onToggle,
}: FAQAccordionItemProps) {
  const handleClick = useCallback(() => {
    sounds.playClick();
    onToggle();
  }, [onToggle]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        sounds.playClick();
        onToggle();
      }
    },
    [onToggle]
  );

  const handleHover = useCallback(() => {
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
      sounds.playHover();
    }
  }, []);

  return (
    <div
      className={`faq-question-card w-full rounded-md transition-all duration-200 overflow-hidden border ${
        isOpen
          ? "border-sky-400/60 shadow-[0_6px_20px_rgba(0,12,40,0.85)] bg-[#00184B]"
          : "border-[#052c77]/80 hover:border-sky-400/40 hover:shadow-[0_4px_16px_rgba(0,10,30,0.6)] bg-[#00184B]/95"
      }`}
    >
      {/* ── QUESTION TRIGGER HEADER (Consistent ~60-68px collapsed height, squarer arcade geometry) ── */}
      <button
        type="button"
        id={`faq-trigger-${item.id}`}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleHover}
        className="faq-question-btn w-full min-h-[50px] sm:min-h-[56px] md:min-h-[62px] lg:min-h-[66px] flex items-center justify-between gap-4 text-left cursor-pointer select-none group transition-colors"
      >
        {/* Left: Question heading */}
        <div className="flex-1 min-w-0 pr-3 flex items-center">
          {/* Accessible screen reader label */}
          <span className="sr-only">{item.question}</span>

          <span className="faq-question-label">
            {item.question}
          </span>
        </div>

        {/* Right: Plus Toggle Icon (17x17 reference geometry, rotates 45° to × when expanded) */}
        <div
          className={`shrink-0 w-[22px] h-[22px] sm:w-[26px] sm:h-[26px] rounded-md flex items-center justify-center transition-all duration-200 ease-out ${
            isOpen
              ? "rotate-45 bg-amber-400/20 text-amber-300 drop-shadow-[0_0_8px_#fbbf24]"
              : "group-hover:scale-110 text-white/90"
          }`}
          aria-hidden="true"
        >
          <img loading="lazy" decoding="async"
            src="/landing-pages/faq/ui/icon-plus.svg"
            alt=""
            className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] md:w-[17px] md:h-[17px] object-contain pointer-events-none"
          />
        </div>
      </button>

      {/* ── EXPANDABLE ANSWER REGION (Smooth CSS Grid Transition, 200-240ms, Unified Silhouette) ── */}
      <div
        id={`faq-answer-${item.id}`}
        role="region"
        aria-labelledby={`faq-trigger-${item.id}`}
        className={`grid transition-[grid-template-rows] duration-220 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="faq-answer-content border-t border-[#052c77]/60 bg-[#00143f]/80">
            <p className="font-sans text-sky-100 text-xs sm:text-sm md:text-[15px] leading-relaxed selection:bg-cyan-500 selection:text-slate-950">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
