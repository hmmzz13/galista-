import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SITE, scrollToHash } from "@/data/site";
import { BeanMark } from "@/components/Nav";

const LINKS = [
  { hash: "#accueil", key: "nav.home", testid: "footer-link-home" },
  { hash: "#univers", key: "nav.univers", testid: "footer-link-univers" },
  { hash: "#carte", key: "nav.carte", testid: "footer-link-carte" },
  { hash: "#specialites", key: "nav.specialites", testid: "footer-link-specialites" },
  { hash: "#galerie", key: "nav.galerie", testid: "footer-link-galerie" },
  { hash: "#avis", key: "nav.avis", testid: "footer-link-avis" },
  { hash: "#contact", key: "nav.contact", testid: "footer-link-contact" },
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
      className="fixed inset-0 z-[90] bg-noir/90 flex items-center justify-center p-5"
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
        className="w-full max-w-lg rounded-3xl bg-creme text-brunprofond p-8 md:p-10 relative"
        data-testid={testid}
      >
        <button
          onClick={onClose}
          aria-label="Fermer"
          data-testid={`${testid}-close`}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-beige transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        <h3 className="font-serif text-3xl text-brun">{title}</h3>
        {String(body)
          .split("\n\n")
          .map((para, i) => (
            <p key={i} className="mt-4 text-sm leading-relaxed text-cafemuted whitespace-pre-line">
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
    <footer className="bg-noir text-creme border-t border-caramel/25">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 py-16 md:py-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2 max-w-sm">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Galista Café" className="h-16 w-auto" data-testid="footer-logo" />
          </div>
          <p className="mt-5 text-sm leading-relaxed text-creme/60">{t("footer.tagline")}</p>
        </div>

        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.25em] text-caramel">{t("footer.nav_title")}</p>
          <ul className="mt-5 space-y-2.5">
            {LINKS.map((l) => (
              <li key={l.hash}>
                <a
                  href={l.hash}
                  onClick={(e) => go(e, l.hash)}
                  data-testid={l.testid}
                  className="text-sm text-creme/70 hover:text-caramel transition-colors duration-300"
                >
                  {t(l.key)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.25em] text-caramel">{t("footer.infos_title")}</p>
          <div className="mt-5 space-y-2.5 text-sm text-creme/70">
            <p>
              {SITE.address.street}
              <br />
              {SITE.address.zip} {SITE.address.city}
            </p>
            <a href={SITE.phoneHref} data-testid="footer-phone-link" className="block hover:text-caramel transition-colors duration-300">
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
              className="text-xs uppercase tracking-[0.14em] text-creme/50 hover:text-caramel transition-colors duration-300 underline underline-offset-4 decoration-creme/30"
            >
              {t("footer.legal")}
            </button>
            <button
              onClick={() => setModal("privacy")}
              data-testid="footer-privacy-btn"
              className="text-xs uppercase tracking-[0.14em] text-creme/50 hover:text-caramel transition-colors duration-300 underline underline-offset-4 decoration-creme/30"
            >
              {t("footer.privacy")}
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-creme/10">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-creme/40">
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
