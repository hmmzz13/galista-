import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Menu, Phone, X } from "lucide-react";
import { SITE, scrollToHash } from "@/data/site";
import { LANGS } from "@/i18n";

const LINKS = [
  { hash: "#univers", key: "nav.univers", testid: "nav-link-univers" },
  { hash: "#carte", key: "nav.carte", testid: "nav-link-carte" },
  { hash: "#specialites", key: "nav.specialites", testid: "nav-link-specialites" },
  { hash: "#galerie", key: "nav.galerie", testid: "nav-link-galerie" },
  { hash: "#avis", key: "nav.avis", testid: "nav-link-avis" },
  { hash: "#contact", key: "nav.contact", testid: "nav-link-contact" },
];

export function BeanMark({ className = "" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <g fill="none" stroke="#2F8B89" strokeWidth="2.6" strokeLinecap="round">
        <path d="M27 7 c-2.5 3.5 2.5 5.5 0 9" />
        <path d="M35 7 c-2.5 3.5 2.5 5.5 0 9" />
      </g>
      <path d="M13 27 h36 v6 a13 13 0 0 1 -13 13 h-10 a13 13 0 0 1 -13 -13 z" fill="#2F8B89" />
      <path d="M49 29 h3.5 a6 6 0 0 1 0 12 h-5" fill="none" stroke="#2F8B89" strokeWidth="2.6" />
      <path d="M19 31 h24" stroke="#E8D8B8" strokeWidth="2" opacity="0.85" />
      <ellipse cx="31" cy="53" rx="19" ry="3.4" fill="#2F8B89" opacity="0.75" />
    </svg>
  );
}

export default function Nav({ lenisRef }) {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e, hash) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => scrollToHash(hash, lenisRef?.current), open ? 250 : 0);
  };

  const goTop = (e) => {
    e.preventDefault();
    setOpen(false);
    if (lenisRef?.current) lenisRef.current.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const switchLang = (lng) => {
    if (lng !== i18n.language) navigate(`/${lng}`);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled
            ? "bg-creme/90 backdrop-blur-md text-brun shadow-[0_1px_0_rgba(75,48,38,0.1)]"
            : "bg-transparent text-creme"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-[72px] md:px-12">
          <a
            href="#accueil"
            onClick={goTop}
            className="flex select-none items-center gap-2.5"
            data-testid="nav-logo"
            aria-label="Galista Café — accueil"
          >
            <img src="/favicon.png" alt="" className="h-9 w-9" />
            <span className="font-serif text-xl tracking-[0.16em] md:text-2xl">
              GALISTA <span className="text-iznik">CAFÉ</span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
            {LINKS.map((l) => (
              <a
                key={l.hash}
                href={l.hash}
                onClick={(e) => go(e, l.hash)}
                data-testid={l.testid}
                className="relative text-[0.8rem] font-semibold tracking-wide opacity-80 transition-opacity duration-300 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-iznik after:transition-all after:duration-300 hover:opacity-100 hover:after:w-full"
              >
                {t(l.key)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <div
              className={`hidden items-center rounded-full border p-0.5 sm:flex ${
                scrolled ? "border-brun/20" : "border-creme/25"
              }`}
              role="group"
              aria-label={t("a11y.lang_switch")}
            >
              {LANGS.map((lng) => (
                <button
                  key={lng}
                  onClick={() => switchLang(lng)}
                  data-testid={`lang-switcher-${lng}`}
                  aria-pressed={i18n.language === lng}
                  className={`rounded-full px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-widest transition-colors duration-300 ${
                    i18n.language === lng
                      ? "bg-iznik text-blanccasse"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  {lng}
                </button>
              ))}
            </div>

            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="nav-find-btn"
              className={`hidden md:inline-flex btn !py-2.5 !px-5 !text-[0.8rem] ${
                scrolled ? "btn-dark" : "btn-ghost"
              }`}
            >
              <MapPin className="h-4 w-4" />
              <span>{t("nav.find_us")}</span>
            </a>

            <button
              onClick={() => setOpen(true)}
              data-testid="nav-burger"
              aria-label={t("nav.open_menu")}
              aria-expanded={open}
              className="p-2 -mr-2 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[60] flex flex-col bg-brunprofond text-creme"
            role="dialog"
            aria-modal="true"
            data-testid="mobile-menu"
          >
            <div className="flex items-center justify-between px-5 h-16">
              <img src="/logo.png" alt="Galista Café" className="h-10 w-auto" />
              <button
                onClick={() => setOpen(false)}
                data-testid="nav-close"
                aria-label={t("nav.close_menu")}
                className="p-2 -mr-2"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-2 px-8" aria-label="Menu mobile">
              {[{ hash: "#accueil", key: "nav.home", testid: "nav-link-home" }, ...LINKS].map((l, i) => (
                <motion.div
                  key={l.hash}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <a
                    href={l.hash}
                    onClick={(e) => go(e, l.hash)}
                    data-testid={l.testid}
                    className="block py-2 font-serif text-3xl text-creme transition-colors duration-300 hover:text-iznik sm:text-4xl"
                  >
                    {t(l.key)}
                  </a>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col gap-5 px-8 pb-10"
            >
              <div className="flex items-center gap-2" role="group" aria-label={t("a11y.lang_switch")}>
                {LANGS.map((lng) => (
                  <button
                    key={lng}
                    onClick={() => switchLang(lng)}
                    data-testid={`mobile-lang-switcher-${lng}`}
                    aria-pressed={i18n.language === lng}
                    className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                      i18n.language === lng
                        ? "border-iznik bg-iznik text-blanccasse"
                        : "border-creme/30 text-creme/80"
                    }`}
                  >
                    {lng}
                  </button>
                ))}
              </div>
              <a
                href={SITE.phoneHref}
                data-testid="mobile-phone-link"
                className="inline-flex items-center gap-3 text-creme/80"
              >
                <Phone className="h-4 w-4 text-iznik" /> {SITE.phoneDisplay}
              </a>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="mobile-maps-btn"
                className="btn btn-primary justify-center"
              >
                <MapPin className="h-4 w-4" />
                <span>{t("nav.find_us")}</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
