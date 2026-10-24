import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";

// Bannière pleine largeur avec la photographie officielle du café (parallaxe douce).
export default function Banner() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.02, 1.07, 1.02]);

  return (
    <section
      ref={ref}
      className="relative h-[52vh] overflow-hidden md:h-[62vh]"
      data-testid="photo-banner"
      aria-label={t("practical.banner_label")}
    >
      {reduced ? (
        <img
          src="/photos/cafe-interior.jpg"
          alt="L'intérieur du café Galista à Strasbourg : arches turquoise, néon Galista et vitrine à pâtisseries"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <motion.img
          src="/photos/cafe-interior.jpg"
          alt="L'intérieur du café Galista à Strasbourg : arches turquoise, néon Galista et vitrine à pâtisseries"
          style={{ y, scale }}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-creme/30 via-transparent to-creme/40" aria-hidden="true" />
      <p
        className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-blanccasse/95 px-5 py-2 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-brun shadow-[0_10px_24px_rgba(75,48,38,0.25)] md:left-8 md:translate-x-0"
        data-testid="banner-label"
      >
        {t("practical.banner_label")}
      </p>
    </section>
  );
}
