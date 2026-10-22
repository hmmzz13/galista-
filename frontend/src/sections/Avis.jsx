import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SITE } from "@/data/site";
import { formatDate } from "@/i18n";
import SectionHeading, { Reveal } from "@/components/SectionHeading";

export default function Avis() {
  const { t, i18n } = useTranslation();
  const pct = (SITE.reviews.rating / 5) * 100;
  const quotes = SITE.reviews.quotes || [];

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

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quotes.map((q, i) => (
            <Reveal key={i} delay={Math.min(i * 0.05, 0.4)}>
              <figure
                className="flex h-full flex-col rounded-3xl border border-brun/10 bg-blanccasse p-7 shadow-[0_18px_40px_-28px_rgba(75,48,38,0.4)]"
                data-testid={`review-quote-${i}`}
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
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-brun/85">{q.text}</blockquote>
                <figcaption className="mt-5 flex items-center justify-between border-t border-brun/10 pt-4">
                  <span className="text-sm font-bold text-brun">{q.anonymous ? t("practical.anonymous") : q.name}</span>
                  {q.rating && <span className="font-price text-xs text-cafemuted">{q.rating}/5</span>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

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
