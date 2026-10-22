import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SITE } from "@/data/site";
import { formatDate } from "@/i18n";
import SectionHeading, { Reveal } from "@/components/SectionHeading";

export default function Avis() {
  const { t, i18n } = useTranslation();
  const pct = (SITE.reviews.rating / 5) * 100;

  const starRow = (filled) => (
    <div className="flex gap-1.5" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className="h-6 w-6"
          strokeWidth={filled ? 0 : 1.5}
          fill={filled ? "#B78352" : "none"}
          color={filled ? "#B78352" : "rgba(247,242,233,0.35)"}
        />
      ))}
    </div>
  );

  return (
    <section id="avis" className="bg-brunprofond py-24 md:py-32 text-creme scroll-mt-16">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 text-center">
        <SectionHeading kicker={t("avis.kicker")} title={t("avis.title")} align="center" dark />

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col items-center gap-4" data-testid="reviews-rating">
            <div className="flex items-end gap-3">
              <span className="font-serif text-7xl sm:text-8xl leading-none text-creme" data-testid="reviews-rating-value">
                {SITE.reviews.rating.toLocaleString(i18n.language, { minimumFractionDigits: 1 })}
              </span>
              <span className="text-xl text-creme/60 mb-2">/ 5</span>
            </div>
            <div className="relative inline-block" role="img" aria-label={t("avis.stars_alt")}>
              {starRow(false)}
              <div className="absolute inset-0 overflow-hidden whitespace-nowrap" style={{ width: `${pct}%` }}>
                {starRow(true)}
              </div>
            </div>
            <p className="text-creme/80">
              <span className="font-price text-lg text-caramel">{SITE.reviews.countLabel}</span> {t("avis.reviews_label")}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-8 mx-auto max-w-xl text-xs leading-relaxed text-creme/50">
            {t("avis.verified", { date: formatDate(i18n.language, SITE.reviews.verifiedOnISO) })}
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-10">
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

        <Reveal delay={0.4}>
          <p className="mt-8 mx-auto max-w-md text-sm text-creme/45 leading-relaxed">{t("avis.transparency")}</p>
        </Reveal>
      </div>
    </section>
  );
}
