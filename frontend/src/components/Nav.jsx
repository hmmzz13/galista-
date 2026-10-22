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
      <g transform="rotate(24 32 32)">
        <ellipse cx="32" cy="32" rx="15" ry="21" fill="#4B3026" />
        <path
          d="M32 12 C 26.5 20, 37.5 25, 32 32 C 26.5 39, 37.5 44, 32 52"
          stroke="#B78352"
          strokeWidth="3.4"
          fill="none"
          strokeLinecap="round"
        />
      </g>
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
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 md:px-12 h-16 md:h-[72px]">
          <a
            href="#accueil"
            onClick={goTop}
            className="flex items-center gap-2.5 select-none"
            data-testid="nav-logo"
            aria-label="Galista Café — accueil"
          >
            <BeanMark className="h-7 w-7" />
            <span className="font-serif text-xl md:text-2xl tracking-[0.16em]">
              GALISTA <span className={scrolled ? "text-caramel-fonce" : "text-caramel"}>CAFÉ</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-7" aria-label="Navigation principale">
            {LINKS.map((l) => (
              <a
                key={l.hash}
                href={l.hash}
                onClick={(e) => go(e, l.hash)}
                data-testid={l.testid}
                className="relative text-[0.8rem] font-semibold tracking-wide opacity-80 hover:opacity-100 transition-opacity duration-300 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-caramel after:transition-all after:duration-300 hover:after:w-full"
              >
                {t(l.key)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <div
              className={`hidden sm:flex items-center rounded-full border p-0.5 ${
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
                  className={`px-2.5 py-1 rounded-full text-[0.7rem] font-bold tracking-widest uppercase transition-colors duration-300 ${
                    i18n.language === lng
                      ? "bg-caramel text-blanccasse"
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
              className="lg:hidden p-2 -mr-2"
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
            className="fixed inset-0 z-[60] bg-brunprofond text-creme flex flex-col"
            role="dialog"
            aria-modal="true"
            data-testid="mobile-menu"
          >
            <div className="flex items-center justify-between px-5 h-16">
              <span className="font-serif text-xl tracking-[0.16em]">
                GALISTA <span className="text-caramel">CAFÉ</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                data-testid="nav-close"
                aria-label={t("nav.close_menu")}
                className="p-2 -mr-2"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center gap-2 px-8" aria-label="Menu mobile">
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
                    className="block font-serif text-3xl sm:text-4xl py-2 text-creme hover:text-caramel transition-colors duration-300"
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
              className="px-8 pb-10 flex flex-col gap-5"
            >
              <div className="flex items-center gap-2" role="group" aria-label={t("a11y.lang_switch")}>
                {LANGS.map((lng) => (
                  <button
                    key={lng}
                    onClick={() => switchLang(lng)}
                    data-testid={`mobile-lang-switcher-${lng}`}
                    aria-pressed={i18n.language === lng}
                    className={`px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase border transition-colors duration-300 ${
                      i18n.language === lng
                        ? "bg-caramel border-caramel text-blanccasse"
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
                <Phone className="h-4 w-4 text-caramel" /> {SITE.phoneDisplay}
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
