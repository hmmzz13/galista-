import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const SLICE_COUNT = 20;
const EASE = [0.22, 1, 0.36, 1];

// Écran de chargement : logo officiel + tasse en rotation construite
// uniquement en CSS (perspective + preserve-3d), sans WebGL ni librairie 3D.
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
        src="/logo.png"
        alt="Galista Café"
        initial={{ opacity: 0, scale: 0.88, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="loader-logo"
        data-testid="loader-logo"
      />

      <div className="loader-scene" aria-hidden="true">
        <div className="loader-steam">
          <span />
          <span />
          <span />
        </div>
        <div className="loader-world">
          <span className="loader-bean loader-bean--1" />
          <span className="loader-bean loader-bean--2" />
          <span className="loader-bean loader-bean--3" />
          <div className="loader-cup">
            {Array.from({ length: SLICE_COUNT }).map((_, i) => (
              <span
                key={i}
                className="loader-cup-slice"
                style={{
                  transform: `rotateY(${(360 / SLICE_COUNT) * i}deg) translateZ(28px)`,
                  filter: `brightness(${(0.62 + 0.38 * Math.abs(Math.cos((Math.PI / SLICE_COUNT) * (i + 0.5)))).toFixed(3)})`,
                }}
              />
            ))}
            <span className="loader-coffee" />
            <span className="loader-handle" />
          </div>
          <span className="loader-saucer" />
        </div>
      </div>

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
