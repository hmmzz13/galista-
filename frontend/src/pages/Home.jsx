import { useEffect, useRef } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Lenis from "lenis";
import { LANG_STORAGE_KEY, isValidLang } from "@/i18n";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Univers from "@/sections/Univers";
import Carte from "@/sections/Carte";
import Specialites from "@/sections/Specialites";
import Galerie from "@/sections/Galerie";
import Avis from "@/sections/Avis";
import Infos from "@/sections/Infos";
import Footer from "@/sections/Footer";

export default function Home() {
  const { lang } = useParams();
  const { i18n, t } = useTranslation();
  const lenisRef = useRef(null);

  const langValid = isValidLang(lang);

  useEffect(() => {
    if (!langValid) return;
    if (i18n.language !== lang) i18n.changeLanguage(lang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (e) {
      /* storage unavailable */
    }
    document.documentElement.lang = lang;
    document.title = t("meta.title");
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("meta.description"));
  }, [lang, langValid, i18n, t]);

  useEffect(() => {
    if (!langValid) return undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenisRef.current = lenis;
    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [langValid]);

  if (!langValid) return <Navigate to="/fr" replace />;

  return (
    <div className="App relative bg-creme text-brunprofond">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:top-3 focus:left-3 focus:px-4 focus:py-2 focus:bg-brun focus:text-creme focus:rounded-full focus:text-sm"
        data-testid="skip-to-content"
      >
        {t("a11y.skip")}
      </a>
      <Nav lenisRef={lenisRef} />
      <main id="main">
        <Hero lenisRef={lenisRef} />
        <Univers />
        <Marquee />
        <Carte lenisRef={lenisRef} />
        <Specialites lenisRef={lenisRef} />
        <Galerie />
        <Avis />
        <Infos />
      </main>
      <Footer lenisRef={lenisRef} />
      <div className="grain" aria-hidden="true" />
    </div>
  );
}
