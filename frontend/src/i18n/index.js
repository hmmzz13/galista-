import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fr from "./fr.json";
import de from "./de.json";
import en from "./en.json";

export const LANGS = ["fr", "de", "en"];
export const DEFAULT_LANG = "fr";
export const LANG_STORAGE_KEY = "galista-lang";

export function isValidLang(lng) {
  return LANGS.includes(lng);
}

const localeMap = { fr: "fr-FR", de: "de-DE", en: "en-IE" };

export function localeOf(lng) {
  return localeMap[lng] || "fr-FR";
}

export function formatPrice(lng, value) {
  return new Intl.NumberFormat(localeOf(lng), {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(value);
}

export function formatDate(lng, iso) {
  const d = new Date(iso + "T12:00:00");
  if (lng === "de") return d.toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });
  if (lng === "en") return d.toLocaleDateString("en-IE", { day: "numeric", month: "long", year: "numeric" });
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
}

i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr },
    de: { translation: de },
    en: { translation: en },
  },
  lng: DEFAULT_LANG,
  fallbackLng: "fr",
  interpolation: { escapeValue: false },
});

export default i18n;
