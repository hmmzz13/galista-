import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionHeading, { Reveal } from "@/components/SectionHeading";

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

// Photo 0 : photographie officielle de l'établissement (pas d'illustration).
const PHOTOS = [
  { src: "/photos/cafe-interior.jpg", key: 0, official: true },
  { src: "https://images.unsplash.com/photo-1511081692775-05d0f180a065?auto=format&fit=crop&w=1200&q=80", key: 1 },
  { src: "https://images.unsplash.com/photo-1583577612013-4fecf7bf8f13?auto=format&fit=crop&w=1200&q=80", key: 2 },
  { src: "https://images.unsplash.com/photo-1766852566302-b54c388a2bb9?auto=format&fit=crop&w=1200&q=80", key: 3 },
  { src: "https://images.unsplash.com/photo-1768319920501-2d124ccfd8dc?auto=format&fit=crop&w=1200&q=80", key: 4 },
  { src: "https://images.unsplash.com/photo-1506778020041-0ea35027d019?auto=format&fit=crop&w=1200&q=80", key: 5 },
  { src: "https://images.unsplash.com/photo-1593443320739-77f74939d0da?auto=format&fit=crop&w=1200&q=80", key: 6 },
  { src: "https://images.pexels.com/photos/6747870/pexels-photo-6747870.jpeg?auto=compress&cs=tinysrgb&w=1200", key: 7 },
];

export default function Galerie() {
  const { t } = useTranslation();
  const frames = t("galerie.frames", { returnObjects: true }) || [];
  const [open, setOpen] = useState(null);

  const altFor = (p) =>
    p.official
      ? `L'intérieur du café Galista à Strasbourg — ${frames[p.key]}`
      : `${frames[p.key]} — ${t("practical.photo_note")}`;

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
        <SectionHeading
          kicker={t("galerie.kicker")}
          title={t("galerie.title")}
          intro={t("practical.gallery_intro")}
        />

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
                {p.official && (
                  <span className="absolute left-3 top-3 z-10 rounded-full bg-[#3E9B63] px-3 py-1 text-[0.58rem] font-bold uppercase tracking-[0.14em] text-blanccasse">
                    {t("practical.official_badge")}
                  </span>
                )}
                <span className="absolute inset-x-0 bottom-0 rounded-b-[22px] bg-gradient-to-t from-brun/70 to-transparent p-3 pt-8 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-creme opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {frames[p.key]}
                </span>
              </button>
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
                src={PHOTOS[open].official ? PHOTOS[open].src : PHOTOS[open].src.replace("w=1200", "w=1600")}
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
