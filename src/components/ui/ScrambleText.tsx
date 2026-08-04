"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

// ─── Phase 1 Glyph Pool ────────────────────────────────────────────────────────
// Strictly legitimate Japanese kana (Hiragana + Katakana + common Kanji).
// Zero Latin letters, zero digits, zero special symbols, zero punctuation,
// zero math tokens, zero binary artifacts, zero whitespace padding.
const JAPANESE_GLYPH_POOL =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン" +
  "ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ" +
  "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん" +
  "私はガヤトリデヴィですハローワールド";

interface ScrambleTextProps {
  fromText: string;
  toText: string;
  trigger?: boolean;
  delay?: number;
  cyclesPerChar?: number;
  className?: string;
  onComplete?: () => void;
}

/**
 * 3-Phase Text Transition
 *
 * Phase 1 (Primary Mount):
 *   Renders `fromText` immediately in authentic Japanese characters.
 *   No English visible, no placeholder corruption.
 *
 * Phase 2 (The Transition):
 *   On trigger, each character slot cycles rapidly through the
 *   `JAPANESE_GLYPH_POOL` — exactly one slot at a time, left to right.
 *
 * Phase 3 (The Resolution):
 *   When a slot finishes its cycle it snaps to its final `toText` letter.
 *   Character N fully freezes before Character N+1 begins its cycle.
 */
export default function ScrambleText({
  fromText,
  toText,
  trigger = false,
  delay = 0,
  cyclesPerChar = 5,
  className = "",
  onComplete,
}: ScrambleTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const hasAnimated = useRef(false);

  const maxLen = Math.max(fromText.length, toText.length);

  useEffect(() => {
    if (!trigger || hasAnimated.current) return;
    hasAnimated.current = true;

    const CHAR_MS = Math.max(20, cyclesPerChar * 10);

    // ─── Stage 1: Brief Japanese Hold ────────────────────────────────────────────
    // The text stays frozen in `fromText` (pure Japanese) for a
    // brief moment before scrambling begins.
    const MIN_HOLD_MS = 100;
    const EFFECTIVE_DELAY = Math.max(MIN_HOLD_MS / 1000, delay);

    const randomGlyph = () =>
      JAPANESE_GLYPH_POOL[Math.floor(Math.random() * JAPANESE_GLYPH_POOL.length)];

    const tl = gsap.timeline({
      delay: EFFECTIVE_DELAY,
      onComplete,
      smoothChildTiming: true,
    });
    tlRef.current = tl;

    for (let i = 0; i < maxLen; i++) {
      const el = charRefs.current[i];
      if (!el) continue;

      const finalChar = toText[i] ?? "";
      const proxy = { p: 0 };

      // Sequential tween: N cycles → freezes → N+1 starts
      tl.to(proxy, {
        p: 1,
        duration: CHAR_MS / 1000,
        ease: "none",
        onUpdate() {
          el.textContent = randomGlyph();
        },
        onComplete() {
          el.textContent = finalChar;
        },
      });
    }

    return () => {
      tlRef.current?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return (
    <span
      ref={containerRef}
      className={className}
      aria-label={toText}
      style={{
        display: "inline-block",
        whiteSpace: "pre",
      }}
    >
      {Array.from({ length: maxLen }, (_, i) => (
        <span
          key={i}
          ref={(el) => { charRefs.current[i] = el; }}
        >
          {fromText[i] ?? "\u00A0"}
        </span>
      ))}
    </span>
  );
}
