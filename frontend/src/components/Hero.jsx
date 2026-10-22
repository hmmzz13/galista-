import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SITE, scrollToHash } from "@/data/site";

const EASE = [0.22, 1, 0.36, 1];

export default function Hero({ lenisRef }) {
  const { t } = useTranslation();

  const quick = [
    { cat: "petits_dejeuners", label: t("carte.categories.petits_dejeuners") },
    { cat: "cafes", label: t("items.cafe_turc.name") },
    { cat: "boreks", label: t("carte.categories.boreks") },
    { cat: "patisseries", label: t("carte.categories.patisseries") },
    { cat: "glaces", label: t("carte.categories.glaces") },
  ];

  const goTo = (e, hash) => {
    e.preventDefault();
    scrollToHash(hash, lenisRef?.current);
  };

  const quickGo = (cat) => {
    window.dispatchEvent(new CustomEvent("galista:category", { detail: cat }));
    scrollToHash("#carte", lenisRef?.current);
  };

  return (
    <section id="accueil" className="relative overflow-hidden bg-brunprofond" data-testid="hero-static">
      <div className="tile-pattern absolute inset-0 opacity-[0.07]" aria-hidden="true" />
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-iznik/15 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-caramel/15 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-screen max-w-[1400px] flex-col items-center justify-center px-6 pb-14 pt-28 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="ornament"
          aria-hidden="true"
        />

        <motion.img
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          src="/logo.png"
          alt="Galista Café"
          className="mt-8 h-36 w-auto drop-shadow-[0_18px_30px_rgba(0,0,0,0.35)] md:h-44"
          data-testid="hero-logo"
        />

        <h1
          className="mt-9 font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.05] text-creme"
          data-testid="hero-title"
        >
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
              className="block"
            >
              {t("hero.title_line1")}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.52, ease: EASE }}
              className="block italic text-iznik"
            >
              {t("hero.title_line2")}
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.68, ease: EASE }}
          className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-creme/70"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
          className="mt-9 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#carte"
            onClick={(e) => goTo(e, "#carte")}
            className="btn btn-primary"
            data-testid="cta-discover-menu"
          >
            <span>{t("hero.cta_menu")}</span>
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={SITE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
            data-testid="cta-find-us"
          >
            <MapPin className="h-4 w-4" />
            <span>{t("hero.cta_find")}</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.92, ease: EASE }}
          className="mt-12 w-full max-w-2xl"
        >
          <p className="text-[0.62rem] uppercase tracking-[0.35em] text-creme/40">{t("hero.quick")}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2.5">
            {quick.map((q) => (
              <button
                key={q.cat}
                onClick={() => quickGo(q.cat)}
                data-testid={`hero-quick-${q.cat}`}
                className="rounded-full border border-creme/25 px-4 py-2 text-xs font-semibold tracking-wide text-creme/85 transition-colors duration-300 hover:border-iznik hover:bg-iznik/15 hover:text-creme"
              >
                {q.label}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          href="#univers"
          onClick={(e) => goTo(e, "#univers")}
          className="mt-14 flex flex-col items-center gap-2 text-creme/50 transition-colors hover:text-caramel"
          data-testid="hero-scroll-cue"
        >
          <span className="text-[0.62rem] uppercase tracking-[0.3em]">{t("hero.scroll_cue")}</span>
          <div className="h-10 w-px bg-gradient-to-b from-iznik to-transparent" />
        </motion.a>
      </div>
    </section>
  );
}
