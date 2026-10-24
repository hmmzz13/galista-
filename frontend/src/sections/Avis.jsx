import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SITE } from "@/data/site";
import { formatDate } from "@/i18n";
import SectionHeading, { Reveal } from "@/components/SectionHeading";

const EASE = [0.22, 1, 0.36, 1];

export default function Avis() {
  const { t, i18n } = useTranslation();
  const pct = (SITE.reviews.rating / 5) * 100;
  const quotes = SITE.reviews.quotes || [];
  const total = quotes.length;

  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(0);

  const go = (d) => {
    setDir(d);
    setIndex((i) => (i + d + total) % total);
  };
  const jump = (i) => {
    if (i === index) return;
    setDir(i > index ? 1 : -1);
    setIndex(i);
  };

  const starRow = (filled, size = "h-5 w-5") => (
    <div className="flex gap-1" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={size}
          strokeWidth={filled ? 0 : 1.5}
          fill={filled ? "#C26A3D" : "none"}
          color={filled ? "#C26A3D" : "rgba(75,48,38,0.3)"}
        />
      ))}
    </div>
  );

  const q = quotes[index];

  return (
    <section id="avis" className="scroll-mt-16 bg-beige py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <SectionHeading kicker={t("avis.kicker")} title={t("avis.title")} align="center" />

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col items-center gap-3" data-testid="reviews-rating">
            <div className="flex items-end gap-3">
              <span className="font-serif text-6xl leading-none text-brun sm:text-7xl" data-testid="reviews-rating-value">
                {SITE.reviews.rating.toLocaleString(i18n.language, { minimumFractionDigits: 1 })}
              </span>
              <span className="mb-1.5 text-lg text-cafemuted">/ 5</span>
            </div>
            <div className="relative inline-block" role="img" aria-label={t("avis.stars_alt")}>
              {starRow(false)}
              <div className="absolute inset-0 overflow-hidden whitespace-nowrap" style={{ width: `${pct}%` }}>
                {starRow(true)}
              </div>
            </div>
            <p className="text-brun/80">
              <span className="font-price text-lg text-terracotta-fonce">{SITE.reviews.countLabel}</span> {t("avis.reviews_label")}
            </p>
          </div>
        </Reveal>

        {/* Carrousel d'avis : une carte à la fois, flèches + balayage tactile */}
        <Reveal delay={0.2}>
          <div
            className="mx-auto mt-10 flex max-w-3xl items-stretch gap-3 md:gap-6"
            data-testid="review-carousel"
          >
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={t("avis.prev")}
              className="carousel-arrow"
              data-testid="review-prev"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="relative min-w-0 flex-1">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.figure
                  key={index}
                  initial={{ opacity: 0, x: dir >= 0 ? 56 : -56 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir >= 0 ? -56 : 56 }}
                  transition={{ duration: 0.32, ease: EASE }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.55}
                  onDragEnd={(e, info) => {
                    if (info.offset.x < -60) go(1);
                    else if (info.offset.x > 60) go(-1);
                  }}
                  className="flex min-h-[300px] cursor-grab flex-col rounded-3xl border border-brun/10 bg-blanccasse p-7 shadow-[0_18px_40px_-28px_rgba(75,48,38,0.4)] active:cursor-grabbing md:min-h-[260px] md:p-9"
                  data-testid={`review-quote-${index}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-5xl leading-none text-terracotta" aria-hidden="true">
                      “
                    </span>
                    {q.rating && (
                      <div className="flex gap-0.5">{[0, 1, 2, 3, 4].map((s) => (
                        <Star key={s} className="h-3.5 w-3.5" strokeWidth={0} fill="#C26A3D" />
                      ))}</div>
                    )}
                  </div>
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-brun/85 md:text-base">
                    {q.text}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center justify-between border-t border-brun/10 pt-4">
                    <span className="text-sm font-bold text-brun">{q.anonymous ? t("practical.anonymous") : q.name}</span>
                    {q.rating && <span className="font-price text-xs text-cafemuted">{q.rating}/5</span>}
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label={t("avis.next")}
              className="carousel-arrow"
              data-testid="review-next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </Reveal>

        <div className="mt-6 flex items-center justify-center gap-2" data-testid="review-dots">
          {quotes.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => jump(i)}
              aria-label={t("avis.go", { n: i + 1 })}
              className={`carousel-dot ${i === index ? "carousel-dot--active" : ""}`}
              data-testid={`review-dot-${i}`}
            />
          ))}
        </div>
        <p className="mt-3 text-center font-price text-xs text-cafemuted" data-testid="review-counter">
          {t("avis.counter", { current: index + 1, total })}
        </p>

        <Reveal delay={0.25}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-cafemuted">
            {t("avis.verified", { date: formatDate(i18n.language, SITE.reviews.verifiedOnISO) })}{" "}
            {t("practical.quotes_note")}{" "}
            <a
              href={SITE.reviewsSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-iznik-fonce"
              data-testid="reviews-source-link"
            >
              strasbourg.food
            </a>{" "}
            ·{" "}
            <a
              href={SITE.reviewsSourceUrl2}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-iznik-fonce"
              data-testid="reviews-source-link-2"
            >
              exa.ai
            </a>
            . {t("practical.quotes_lang_note")}
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-8 text-center">
            <a
              href={SITE.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              data-testid="reviews-google-btn"
            >
              <span>{t("avis.cta")}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
