import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const EASE = [0.22, 1, 0.36, 1];

// Écran de chargement : logo officiel turquoise + tagline + barre de
// progression — pur CSS, sans WebGL ni librairie 3D.
export default function Loader() {
  const { t } = useTranslation();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      className="loader-overlay tile-pattern"
      data-testid="loader"
      role="status"
      aria-label={t("loader.aria")}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeOut" } }}
    >
      <motion.img
        src="/photos/logo-teal.jpg"
        alt="Galista Café"
        initial={{ opacity: 0, scale: 0.85, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="loader-logo"
        data-testid="loader-logo"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="loader-tagline"
      >
        {t("loader.tagline")}
      </motion.p>
      <div className="loader-bar" aria-hidden="true">
        <span />
      </div>
    </motion.div>
  );
}
