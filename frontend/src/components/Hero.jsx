import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SITE, scrollToHash } from "@/data/site";
import Experience from "@/components/three/Experience";
import { BeanMark } from "@/components/Nav";

export default function Hero({ lenisRef }) {
  const { t } = useTranslation();
  const wrapRef = useRef(null);
  const reduced = useReducedMotion();
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2") || c.getContext("webgl");
      setWebgl(!!gl);
    } catch (e) {
      setWebgl(false);
    }
  }, []);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const progressRef = useRef(0);
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      progressRef.current = v;
    });
    return unsub;
  }, [scrollYProgress]);

  const brandOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const brandY = useTransform(scrollYProgress, [0, 0.18], [0, -40]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0.58, 0.7], [0, 1]);
  const l1y = useTransform(scrollYProgress, [0.58, 0.67], ["110%", "0%"]);
  const l2y = useTransform(scrollYProgress, [0.61, 0.7], ["110%", "0%"]);
  const subOpacity = useTransform(scrollYProgress, [0.64, 0.73], [0, 1]);
  const subY = useTransform(scrollYProgress, [0.64, 0.73], [24, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.67, 0.76], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.67, 0.76], [24, 0]);

  const goTo = (e, hash) => {
    e.preventDefault();
    scrollToHash(hash, lenisRef?.current);
  };

  const isStatic = reduced || !webgl;

  if (isStatic) {
    return (
      <section
        id="accueil"
        className="relative min-h-screen flex items-center overflow-hidden bg-brunprofond"
        data-testid="hero-static"
      >
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(120% 90% at 50% 40%, #3A281E 0%, #241A16 55%, #17120F 100%)" }}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30">
          <BeanMark className="h-64 w-64 md:h-96 md:w-96" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 w-full py-28">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="kicker"
          >
            {t("hero.kicker")}
          </motion.p>
          <h1
            className="mt-6 font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.05] text-creme"
            data-testid="hero-title"
          >
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {t("hero.title_line1")}
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.58, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="block italic text-caramel"
              >
                {t("hero.title_line2")}
              </motion.span>
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-6 max-w-xl text-base sm:text-lg text-creme/75 leading-relaxed"
          >
            {t("hero.subtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.8 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <a href="#carte" onClick={(e) => goTo(e, "#carte")} className="btn btn-primary" data-testid="cta-discover-menu">
              <span>{t("hero.cta_menu")}</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" data-testid="cta-find-us">
              <MapPin className="h-4 w-4" />
              <span>{t("hero.cta_find")}</span>
            </a>
          </motion.div>
          <p className="mt-10 text-xs text-creme/40">{t("hero.fallback_note")}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="accueil" ref={wrapRef} className="relative" style={{ height: "520vh" }} data-testid="hero-3d-section">
      <div className="sticky top-0 h-screen overflow-hidden bg-brunprofond">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(120% 90% at 50% 42%, #3A281E 0%, #241A16 55%, #17120F 100%)" }}
        />
        <Experience progressRef={progressRef} />

        {/* Brand reveal on load */}
        <motion.div
          style={{ opacity: brandOpacity, y: brandY }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center px-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.9 }}
              className="kicker kicker--center justify-center"
            >
              {t("hero.kicker")}
            </motion.p>
            <div className="mt-6 overflow-hidden">
              <motion.p
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.55, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-[0.14em] text-creme"
                data-testid="hero-brand"
              >
                GALISTA <span className="text-caramel">CAFÉ</span>
              </motion.p>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.15, duration: 1 }}
              className="mt-5 text-[0.68rem] uppercase tracking-[0.4em] text-creme/55"
            >
              {t("hero.brand_tagline")}
            </motion.p>
          </div>
        </motion.div>

        {/* Title & CTAs revealed by scroll */}
        <div className="absolute inset-0 flex items-center pointer-events-none">
          <div className="mx-auto max-w-[1400px] px-6 md:px-12 w-full">
            <motion.div style={{ opacity: titleOpacity }} className="max-w-2xl">
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.05] text-creme" data-testid="hero-title">
                <span className="block overflow-hidden">
                  <motion.span style={{ y: l1y }} className="block">
                    {t("hero.title_line1")}
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span style={{ y: l2y }} className="block italic text-caramel">
                    {t("hero.title_line2")}
                  </motion.span>
                </span>
              </h1>
              <motion.p
                style={{ opacity: subOpacity, y: subY }}
                className="mt-6 max-w-xl text-base sm:text-lg text-creme/75 leading-relaxed"
              >
                {t("hero.subtitle")}
              </motion.p>
              <motion.div style={{ opacity: ctaOpacity, y: ctaY }} className="mt-9 flex flex-wrap gap-4 pointer-events-auto">
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
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
        >
          <span className="text-[0.62rem] uppercase tracking-[0.35em] text-creme/50">{t("hero.scroll_cue")}</span>
          <div className="h-12 w-px bg-creme/15 overflow-hidden">
            <motion.div
              className="h-4 w-px bg-caramel"
              animate={{ y: [0, 48] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeIn" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
