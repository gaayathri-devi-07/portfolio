"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface RevealTextProps {
  children: ReactNode;
  as?: "p" | "span" | "div";
  className?: string;
}

export default function RevealText({ children, as: Tag = "p", className = "" }: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-revealed");
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal-text-block ${className}`}>
      {children}
    </Tag>
  );
}
