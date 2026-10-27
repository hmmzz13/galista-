import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionHeading, { Reveal } from "@/components/SectionHeading";
import InstagramFeed from "@/components/InstagramFeed";

const SPANS = [
  "col-span-2 row-span-2",
  "col-span-2",
  "col-span-1",
  "col-span-1",
  "col-span-2",
  "col-span-2",
];

// Photographies officielles de l'établissement.
const PHOTOS = [
  { src: "/photos/galerie-cookies.jpg", key: 0 },
  { src: "/photos/galerie-ambiance.jpg", key: 1 },
  { src: "/photos/galerie-boissons.jpg", key: 2 },
  { src: "/photos/galerie-patisseries.jpg", key: 3 },
  { src: "/photos/galerie-petits-dejeuners.jpg", key: 4 },
  { src: "/photos/galerie-specialites.jpg", key: 5 },
];

export default function Galerie() {
  const { t } = useTranslation();
  const frames = t("galerie.frames", { returnObjects: true }) || [];
  const [open, setOpen] = useState(null);

  const altFor = (p) => frames[p.key];

  useEffect(() => {
    if (open === null) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? null : (o + 1) % PHOTOS.length));
      if (e.key === "ArrowLeft") setOpen((o) => (o === null ? null : (o - 1 + PHOTOS.length) % PHOTOS.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section id="galerie" className="scroll-mt-16 bg-creme py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <SectionHeading kicker={t("galerie.kicker")} title={t("galerie.title")} />

        <div className="mt-12 grid auto-rows-[150px] grid-cols-2 gap-4 sm:auto-rows-[180px] md:auto-rows-[210px] md:grid-cols-4">
          {PHOTOS.map((p, i) => (
            <Reveal key={p.key} delay={i * 0.04} className={SPANS[i % SPANS.length]}>
              <button
                onClick={() => setOpen(i)}
                data-testid={`gallery-frame-${i}`}
                aria-label={`${frames[p.key]} — ${t("galerie.open")}`}
                className="img-soft group relative block h-full w-full text-left"
              >
                <img
                  src={p.src}
                  alt={altFor(p)}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span className="absolute inset-x-0 bottom-0 rounded-b-[22px] bg-gradient-to-t from-brun/70 to-transparent p-3 pt-8 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-creme opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {frames[p.key]}
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12">
            <InstagramFeed />
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-brunprofond/95 p-5 md:p-10"
            onClick={() => setOpen(null)}
            data-testid="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={frames[PHOTOS[open].key]}
          >
            <button
              onClick={() => setOpen(null)}
              data-testid="lightbox-close"
              aria-label={t("galerie.close")}
              className="absolute right-5 top-5 rounded-full border border-creme/30 p-2.5 text-creme transition-colors hover:border-iznik hover:bg-iznik"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen((o) => (o - 1 + PHOTOS.length) % PHOTOS.length);
              }}
              aria-label={t("galerie.prev")}
              data-testid="lightbox-prev"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-creme/30 p-2.5 text-creme transition-colors hover:border-iznik hover:bg-iznik md:left-8"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen((o) => (o + 1) % PHOTOS.length);
              }}
              aria-label={t("galerie.next")}
              data-testid="lightbox-next"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-creme/30 p-2.5 text-creme transition-colors hover:border-iznik hover:bg-iznik md:right-8"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <motion.figure
              key={open}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl"
            >
              <img
                src={PHOTOS[open].src}
                alt={altFor(PHOTOS[open])}
                className="img-soft max-h-[76vh] w-full object-contain"
                data-testid="lightbox-image"
              />
              <figcaption className="mt-4 text-center text-sm text-creme/80">
                {open + 1} / {PHOTOS.length} — {frames[PHOTOS[open].key]}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
