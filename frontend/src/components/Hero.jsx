import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import OpenBadge from "@/components/OpenBadge";

const EASE = [0.22, 1, 0.36, 1];

export default function Hero() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section
      id="accueil"
      ref={ref}
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-brunprofond md:min-h-[94vh]"
      data-testid="hero-static"
    >
      {/* Photographie de la salle du café, plein écran */}
      {reduced ? (
        <img
          src="/photos/cafe-interior.jpg"
          alt="La salle du café Galista à Strasbourg : arches turquoise, néon Galista et comptoir à pâtisseries"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <motion.img
          src="/photos/cafe-interior.jpg"
          alt="La salle du café Galista à Strasbourg : arches turquoise, néon Galista et comptoir à pâtisseries"
          style={{ y, scale }}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
      )}
      {/* Voile léger pour garder le texte lisible sans masquer la photo */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-brunprofond/55 via-brunprofond/35 to-brunprofond/15"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-brunprofond/50 via-transparent to-brunprofond/20"
        aria-hidden="true"
      />

      {/* Contenu */}
      <div className="relative z-[5] mx-auto w-full max-w-[1500px] px-6 py-24 [text-shadow:0_2px_18px_rgba(36,26,22,0.55)] md:px-14">
        <div className="max-w-xl text-center md:text-left">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="ornament md:mr-auto"
          />
          <h1
            className="mt-6 font-serif text-4xl leading-[1.06] sm:text-5xl lg:text-6xl"
            data-testid="hero-title"
          >
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.3, ease: EASE }}
                className="block text-creme"
              >
                {t("hero.title_line1")}
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.42, ease: EASE }}
                className="block italic text-[#7EC8C6]"
              >
                {t("hero.title_line2")}
              </motion.span>
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.56, ease: EASE }}
            className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-creme/90 sm:text-lg md:mx-0"
          >
            {t("hero.subtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.68, ease: EASE }}
            className="mt-6 flex justify-center md:justify-start"
          >
            <OpenBadge />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
