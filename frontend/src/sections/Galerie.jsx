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
                  <svg viewBox="0 0 64 64" className="h-12 w-12 opacity-80" aria-hidden="true">
                    <g fill="none" stroke="#2F8B89" strokeWidth="2.6" strokeLinecap="round">
                      <path d="M27 7 c-2.5 3.5 2.5 5.5 0 9" />
                      <path d="M35 7 c-2.5 3.5 2.5 5.5 0 9" />
                    </g>
                    <path d="M13 27 h36 v6 a13 13 0 0 1 -13 13 h-10 a13 13 0 0 1 -13 -13 z" fill="#2F8B89" />
                    <path d="M49 29 h3.5 a6 6 0 0 1 0 12 h-5" fill="none" stroke="#2F8B89" strokeWidth="2.6" />
                    <path d="M19 31 h24" stroke="#E8D8B8" strokeWidth="2" opacity="0.85" />
                    <ellipse cx="31" cy="53" rx="19" ry="3.4" fill="#2F8B89" opacity="0.75" />
                  </svg>
                  <p className="font-serif text-2xl text-brun">{frames[open]}</p>
                  <p className="text-[0.7rem] uppercase tracking-[0.22em]" style={{ color: "var(--iznik-fonce)" }}>
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
