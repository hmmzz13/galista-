import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Instagram, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SITE, scrollToHash } from "@/data/site";

const LINKS = [
  { hash: "#accueil", key: "nav.home", testid: "footer-link-home" },
  { hash: "#carte", key: "nav.carte", testid: "footer-link-carte" },
  { hash: "#galerie", key: "nav.galerie", testid: "footer-link-galerie" },
  { hash: "#avis", key: "nav.avis", testid: "footer-link-avis" },
  { hash: "#infos", key: "nav.contact", testid: "footer-link-contact" },
];

function LegalModal({ title, body, onClose, testid }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-brunprofond/70 p-5 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl border border-brun/10 bg-blanccasse p-8 text-brunprofond md:p-10"
        data-testid={testid}
      >
        <button
          onClick={onClose}
          aria-label="Fermer"
          data-testid={`${testid}-close`}
          className="absolute right-4 top-4 rounded-full p-2 transition-colors hover:bg-beige"
        >
          <X className="h-5 w-5" />
        </button>
        <h3 className="font-serif text-3xl text-brun">{title}</h3>
        {String(body)
          .split("\n\n")
          .map((para, i) => (
            <p key={i} className="mt-4 whitespace-pre-line text-sm leading-relaxed text-cafemuted">
              {para}
            </p>
          ))}
      </motion.div>
    </motion.div>
  );
}

export default function Footer({ lenisRef }) {
  const { t } = useTranslation();
  const [modal, setModal] = useState(null);
  const days = t("infos.days", { returnObjects: true }) || [];

  const go = (e, hash) => {
    e.preventDefault();
    scrollToHash(hash, lenisRef?.current);
  };

  return (
    <footer className="border-t border-brun/10 bg-beige pb-24 text-brun md:pb-0">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-14 md:grid-cols-2 md:px-12 md:py-16 lg:grid-cols-4">
        <div className="lg:col-span-2 max-w-sm">
          <img src="/logo.png" alt="Galista Café" className="h-14 w-auto" data-testid="footer-logo" />
          <p className="mt-5 text-sm leading-relaxed text-cafemuted">{t("footer.tagline")}</p>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="footer-instagram-link"
            className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-brun/15 bg-blanccasse px-4 py-2 text-sm font-semibold text-brun transition-all duration-300 hover:-translate-y-0.5 hover:border-iznik hover:text-iznik-fonce"
          >
            <Instagram className="h-4 w-4" />
            {t("practical.instagram")}
          </a>
        </div>

        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.25em] text-iznik-fonce">{t("footer.nav_title")}</p>
          <ul className="mt-5 space-y-2.5">
            {LINKS.map((l) => (
              <li key={l.hash}>
                <a
                  href={l.hash}
                  onClick={(e) => go(e, l.hash)}
                  data-testid={l.testid}
                  className="text-sm text-cafemuted transition-colors duration-300 hover:text-iznik-fonce"
                >
                  {t(l.key)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.25em] text-iznik-fonce">{t("footer.infos_title")}</p>
          <div className="mt-5 space-y-2.5 text-sm text-cafemuted">
            <p>
              {SITE.address.street}
              <br />
              {SITE.address.zip} {SITE.address.city}
            </p>
            <a href={SITE.phoneHref} data-testid="footer-phone-link" className="block transition-colors duration-300 hover:text-iznik-fonce">
              {SITE.phoneDisplay}
            </a>
            <p>
              {days[0]} – {days[3]} · 07:00 – 17:00
              <br />
              {days[4]} – {days[6]} · 07:00 – 16:00
            </p>
          </div>
          <div className="mt-6 flex flex-col items-start gap-2">
            <button
              onClick={() => setModal("legal")}
              data-testid="footer-legal-btn"
              className="text-xs uppercase tracking-[0.14em] text-cafemuted underline decoration-brun/30 underline-offset-4 transition-colors duration-300 hover:text-iznik-fonce"
            >
              {t("footer.legal")}
            </button>
            <button
              onClick={() => setModal("privacy")}
              data-testid="footer-privacy-btn"
              className="text-xs uppercase tracking-[0.14em] text-cafemuted underline decoration-brun/30 underline-offset-4 transition-colors duration-300 hover:text-iznik-fonce"
            >
              {t("footer.privacy")}
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-brun/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-cafemuted md:flex-row md:px-12">
          <p>© {new Date().getFullYear()} Galista Café — {t("footer.rights")}</p>
          <p>{t("carte.prices_note")}</p>
        </div>
      </div>

      <AnimatePresence>
        {modal === "legal" && (
          <LegalModal
            title={t("footer.legal_title")}
            body={t("footer.legal_body")}
            onClose={() => setModal(null)}
            testid="legal-modal"
          />
        )}
        {modal === "privacy" && (
          <LegalModal
            title={t("footer.privacy_title")}
            body={t("footer.privacy_body")}
            onClose={() => setModal(null)}
            testid="privacy-modal"
          />
        )}
      </AnimatePresence>
    </footer>
  );
}
