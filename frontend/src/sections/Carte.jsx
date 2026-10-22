import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { CATEGORIES } from "@/data/menu";
import { formatPrice } from "@/i18n";
import SectionHeading, { Reveal } from "@/components/SectionHeading";

function MenuRow({ item, t, i18n }) {
  const meta = t(`items.${item.id}`, { returnObjects: true }) || {};
  const priceStr = Array.isArray(item.price)
    ? item.price.map((p) => formatPrice(i18n.language, p)).join(" / ")
    : formatPrice(i18n.language, item.price);

  return (
    <article data-testid={`menu-item-${item.id}`} className="group">
      <div className="flex items-baseline">
        <h3 className="font-serif text-xl sm:text-2xl text-brun leading-snug">{meta.name}</h3>
        <span className="leader" aria-hidden="true" />
        <span className="font-price text-[0.95rem] text-caramel-fonce whitespace-nowrap" data-testid={`menu-price-${item.id}`}>
          {priceStr}
        </span>
      </div>

      {meta.desc && <p className="mt-2 text-sm text-cafemuted leading-relaxed">{meta.desc}</p>}

      {item.variants && (
        <ul className="mt-3 space-y-1.5">
          {item.variants.map((v) => (
            <li key={v.key} className="flex items-baseline text-sm">
              <span className="text-brun/80">{t(`carte.glaces.${v.key}`)}</span>
              <span className="leader" aria-hidden="true" />
              <span className="font-price text-sm text-caramel-fonce whitespace-nowrap">
                {formatPrice(i18n.language, v.price)}
              </span>
            </li>
          ))}
        </ul>
      )}

      {meta.ing && (
        <p className="mt-2.5 text-xs leading-relaxed text-brun/70">
          <span className="mr-2 text-[0.62rem] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--iznik-fonce)" }}>
            {t("carte.ingredients_label")}
          </span>
          {meta.ing}
        </p>
      )}

      {item.confirm && (
        <span
          className="inline-block rounded-full border border-iznik/50 px-3 py-1 mt-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em]"
          style={{ color: "var(--iznik-fonce)" }}
        >
          {t("carte.confirm_badge")}
        </span>
      )}
    </article>
  );
}

export default function Carte({ lenisRef }) {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState(CATEGORIES[0].id);

  useEffect(() => {
    const onCat = (e) => setActive(e.detail);
    window.addEventListener("galista:category", onCat);
    return () => window.removeEventListener("galista:category", onCat);
  }, []);

  const cat = CATEGORIES.find((c) => c.id === active) || CATEGORIES[0];

  return (
    <section id="carte" className="bg-blanccasse py-24 md:py-32 scroll-mt-16">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <SectionHeading kicker={t("carte.kicker")} title={t("carte.title")} intro={t("carte.subtitle")} />
          <Reveal delay={0.2} className="md:max-w-xs md:shrink-0">
            <div className="space-y-2 md:text-right">
              <p className="text-xs text-cafemuted leading-relaxed">{t("carte.prices_note")}</p>
              <p className="text-xs text-cafemuted leading-relaxed">{t("carte.allergens_note")}</p>
            </div>
          </Reveal>
        </div>

        <div className="sticky top-16 z-30 -mx-6 px-6 md:mx-0 md:px-0 py-4 mt-12 bg-blanccasse/95 backdrop-blur-sm">
          <div className="flex lg:flex-wrap justify-start lg:justify-center gap-2 overflow-x-auto no-scrollbar" role="tablist" aria-label={t("carte.kicker")}>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={active === c.id}
                onClick={() => setActive(c.id)}
                data-testid={`category-filter-${c.id}`}
                className={`pill ${active === c.id ? "pill--active" : ""}`}
              >
                {t(`carte.categories.${c.id}`)}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
            data-testid="menu-category-panel"
          >
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
              {cat.items.map((item) => (
                <MenuRow key={item.id} item={item} t={t} i18n={i18n} />
              ))}
            </div>

            {cat.flavorsNote && (
              <div className="mt-12 rounded-2xl border border-brun/10 bg-creme p-6 md:p-8">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--caramel-fonce)" }}>
                  {t("carte.flavors_label")}
                </p>
                <p className="mt-3 text-sm text-cafemuted leading-relaxed">{t("carte.flavors")}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-20 border-t border-brun/10 pt-12">
          <Reveal>
            <h3 className="font-serif text-2xl sm:text-3xl text-brun">{t("carte.glossary_title")}</h3>
          </Reveal>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {["simit", "acma", "borek", "menemen", "sucuk", "kavurma", "pogaca"].map((k, i) => (
              <Reveal key={k} delay={i * 0.05}>
                <div className="border-l-2 border-caramel/50 pl-4">
                  <p className="font-serif italic text-lg text-brun">
                    {k === "acma" ? "Açma" : k === "borek" ? "Börek" : k === "pogaca" ? "Poğaça" : k.charAt(0).toUpperCase() + k.slice(1)}
                  </p>
                  <p className="mt-1 text-sm text-cafemuted leading-relaxed">{t(`carte.glossary.${k}`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
