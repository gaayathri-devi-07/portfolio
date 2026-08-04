"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoaderPage({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#000000] px-4"
          >
            <div className="flex flex-col items-center gap-8">
              <span className="text-xs sm:text-sm font-mono text-[#FFB6C1] tracking-[0.3em] uppercase">
                SYNCING NEURAL ENGINE
              </span>
              <div className="w-48 sm:w-64 h-px bg-[#FFB6C1]/10 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-[#FFB6C1]"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </>
  );
}
