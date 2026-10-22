import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionHeading, { Reveal } from "@/components/SectionHeading";
import PlaceholderFrame from "@/components/PlaceholderFrame";

const SPANS = [
  "col-span-2 row-span-2",
  "col-span-2",
  "col-span-1",
  "col-span-1",
  "col-span-2",
  "col-span-1",
  "col-span-1",
  "col-span-2",
];

export default function Galerie() {
  const { t } = useTranslation();
  const frames = t("galerie.frames", { returnObjects: true }) || [];
  const [open, setOpen] = useState(null);

  useEffect(() => {
    if (open === null) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? null : (o + 1) % frames.length));
      if (e.key === "ArrowLeft") setOpen((o) => (o === null ? null : (o - 1 + frames.length) % frames.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, frames.length]);

  return (
    <section id="galerie" className="bg-creme py-24 md:py-32 scroll-mt-16">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <SectionHeading kicker={t("galerie.kicker")} title={t("galerie.title")} intro={t("galerie.intro")} />

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] sm:auto-rows-[180px] md:auto-rows-[210px] gap-4">
          {frames.map((label, i) => (
            <Reveal key={i} delay={i * 0.05} className={SPANS[i % SPANS.length]}>
              <PlaceholderFrame
                label={label}
                caption={t("galerie.pending")}
                ratio="h-full"
                testid={`gallery-frame-${i}`}
                onClick={() => setOpen(i)}
              />
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] bg-noir/95 flex items-center justify-center p-5 md:p-10"
            onClick={() => setOpen(null)}
            data-testid="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={frames[open]}
          >
            <button
              onClick={() => setOpen(null)}
              data-testid="lightbox-close"
              aria-label={t("galerie.close")}
              className="absolute top-5 right-5 p-2.5 rounded-full border border-creme/30 text-creme hover:bg-caramel hover:border-caramel transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen((o) => (o - 1 + frames.length) % frames.length);
              }}
              aria-label={t("galerie.prev")}
              data-testid="lightbox-prev"
              className="absolute left-3 md:left-8 p-2.5 rounded-full border border-creme/30 text-creme hover:bg-caramel hover:border-caramel transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen((o) => (o + 1) % frames.length);
              }}
              aria-label={t("galerie.next")}
              data-testid="lightbox-next"
              className="absolute right-3 md:right-8 p-2.5 rounded-full border border-creme/30 text-creme hover:bg-caramel hover:border-caramel transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <motion.div
              key={open}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl"
            >
              <div className="photo-frame aspect-[16/10] w-full" style={{ border: "none" }}>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center">
                  <svg viewBox="0 0 64 64" className="h-12 w-12 opacity-70" aria-hidden="true">
                    <g transform="rotate(24 32 32)">
                      <ellipse cx="32" cy="32" rx="15" ry="21" fill="#4B3026" opacity="0.85" />
                      <path
                        d="M32 12 C 26.5 20, 37.5 25, 32 32 C 26.5 39, 37.5 44, 32 52"
                        stroke="#B78352"
                        strokeWidth="3.4"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </g>
                  </svg>
                  <p className="font-serif text-2xl text-brun">{frames[open]}</p>
                  <p className="text-[0.7rem] uppercase tracking-[0.22em]" style={{ color: "var(--caramel-fonce)" }}>
                    {t("galerie.pending")}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-center text-sm text-creme/70">
                {open + 1} / {frames.length} — {frames[open]}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
