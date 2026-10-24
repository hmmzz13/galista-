import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SITE, scrollToHash } from "@/data/site";
import OpenBadge from "@/components/OpenBadge";

const EASE = [0.22, 1, 0.36, 1];

export default function Hero({ lenisRef }) {
  const { t } = useTranslation();
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);

  const goTo = (e, hash) => {
    e.preventDefault();
    scrollToHash(hash, lenisRef?.current);
  };

  return (
    <section
      id="accueil"
      ref={ref}
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-creme md:min-h-[94vh]"
      data-testid="hero-static"
    >
      {/* Illustration du café en bannière de fond */}
      {reduced ? (
        <img
          src="/photos/hero-illustration.jpg"
          alt="Illustration de l'intérieur chaleureux du Galista Café : machine à espresso, comptoir à pâtisseries et clients"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <motion.img
          src="/photos/hero-illustration.jpg"
          alt="Illustration de l'intérieur chaleureux du Galista Café : machine à espresso, comptoir à pâtisseries et clients"
          style={{ y, scale }}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
      )}
      <div
        className="absolute inset-0 bg-gradient-to-r from-creme via-creme/85 to-creme/25"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-creme via-transparent to-creme/50" aria-hidden="true" />

      <span className="img-tag absolute bottom-4 right-4 z-10">{t("practical.photo_note")}</span>

      {/* Contenu */}
      <div className="relative z-[5] mx-auto w-full max-w-[1500px] px-6 py-24 md:px-14">
        <div className="max-w-xl text-center md:text-left">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="ornament md:mr-auto"
          />
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            src="/logo.png"
            alt="Galista Café"
            className="mx-auto mt-6 h-20 w-auto drop-shadow-[0_10px_20px_rgba(75,48,38,0.2)] md:mx-0 md:h-24"
            data-testid="hero-logo"
          />
          <h1
            className="mt-6 font-serif text-4xl leading-[1.06] sm:text-5xl lg:text-6xl"
            data-testid="hero-title"
          >
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.36, ease: EASE }}
                className="block"
              >
                {t("hero.title_line1")}
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.48, ease: EASE }}
                className="block italic text-iznik"
              >
                {t("hero.title_line2")}
              </motion.span>
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62, ease: EASE }}
            className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-cafemuted sm:text-lg md:mx-0"
          >
            {t("hero.subtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.72, ease: EASE }}
            className="mt-5 flex justify-center md:justify-start"
          >
            <OpenBadge />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.82, ease: EASE }}
            className="mt-7 flex flex-wrap justify-center gap-4 md:justify-start"
          >
            <a
              href="#carte"
              onClick={(e) => goTo(e, "#carte")}
              className="btn btn-primary"
              data-testid="cta-discover-menu"
            >
              <span>{t("hero.cta_menu")}</span>
            </a>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              data-testid="cta-find-us"
            >
              <MapPin className="h-4 w-4" />
              <span>{t("hero.cta_find")}</span>
            </a>
            <a href={SITE.phoneHref} className="btn btn-outline md:hidden" data-testid="cta-call-hero">
              <Phone className="h-4 w-4" />
              <span>{t("contact.call_cta")}</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
