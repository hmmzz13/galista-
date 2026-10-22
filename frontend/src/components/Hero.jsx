import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SITE, scrollToHash } from "@/data/site";
import OpenBadge from "@/components/OpenBadge";

const EASE = [0.22, 1, 0.36, 1];
const HERO_PHOTO =
  "https://images.pexels.com/photos/9491135/pexels-photo-9491135.jpeg?auto=compress&cs=tinysrgb&w=1600";

export default function Hero({ lenisRef }) {
  const { t } = useTranslation();

  const goTo = (e, hash) => {
    e.preventDefault();
    scrollToHash(hash, lenisRef?.current);
  };

  return (
    <section id="accueil" className="relative bg-creme" data-testid="hero-static">
      <div className="mx-auto grid max-w-[1500px] items-stretch lg:min-h-[92vh] lg:grid-cols-[1fr_1.1fr]">
        {/* Contenu */}
        <div className="relative flex flex-col justify-center px-6 pb-14 pt-24 md:px-14 lg:pt-16">
          <div className="tile-pattern pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" />
          <div className="relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="ornament"
              aria-hidden="true"
            />
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              src="/logo.png"
              alt="Galista Café"
              className="mt-7 h-28 w-auto drop-shadow-[0_12px_24px_rgba(75,48,38,0.18)] md:h-32"
              data-testid="hero-logo"
            />
            <h1
              className="mt-7 font-serif text-4xl leading-[1.06] sm:text-5xl lg:text-6xl"
              data-testid="hero-title"
            >
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: 0.38, ease: EASE }}
                  className="block"
                >
                  {t("hero.title_line1")}
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: 0.5, ease: EASE }}
                  className="block italic text-iznik"
                >
                  {t("hero.title_line2")}
                </motion.span>
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.64, ease: EASE }}
              className="mt-5 max-w-lg text-base leading-relaxed text-cafemuted sm:text-lg"
            >
              {t("hero.subtitle")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.74, ease: EASE }}
              className="mt-5"
            >
              <OpenBadge />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.84, ease: EASE }}
              className="mt-7 flex flex-wrap gap-4"
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

        {/* Grande photo */}
        <div className="relative min-h-[58vh] lg:min-h-full">
          <motion.img
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
            src={HERO_PHOTO}
            alt="Petit déjeuner turc — image d'illustration"
            className="absolute inset-0 h-full w-full object-cover"
            data-testid="hero-photo"
            loading="eager"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-creme to-transparent"
            aria-hidden="true"
          />
          <span className="img-tag">{t("practical.photo_note")}</span>
        </div>
      </div>
    </section>
  );
}
