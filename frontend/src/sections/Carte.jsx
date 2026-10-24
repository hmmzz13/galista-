import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { CATEGORIES } from "@/data/menu";
import { formatPrice } from "@/i18n";
import SectionHeading, { Reveal } from "@/components/SectionHeading";

// Photo d'un produit : d'abord /photos/<id>.jpg (photos officielles de
// l'établissement), puis l'illustration du produit, puis celle de la catégorie.
function ProductImage({ id, itemPhoto, catPhoto, alt }) {
  const [src, setSrc] = useState(`/photos/${id}.jpg`);
  const [level, setLevel] = useState(0);

  const onError = () => {
    if (level === 0) {
      setLevel(1);
      if (itemPhoto) setSrc(itemPhoto);
      else if (catPhoto) setSrc(catPhoto);
    } else if (level === 1 && !itemPhoto) {
      setLevel(2);
      setSrc(catPhoto);
    }
  };

  return <img src={src} onError={onError} alt={alt} loading="lazy" className="h-full w-full object-cover" />;
}

function MenuRow({ item, cat, t, i18n }) {
  const meta = t(`items.${item.id}`, { returnObjects: true }) || {};
  const priceStr = Array.isArray(item.price)
    ? item.price.map((p) => formatPrice(i18n.language, p)).join(" / ")
    : formatPrice(i18n.language, item.price);

  return (
    <article className="flex gap-4" data-testid={`menu-item-${item.id}`}>
      <div className="relative h-[76px] w-[76px] shrink-0 overflow-hidden rounded-2xl bg-beige sm:h-24 sm:w-24">
        <ProductImage id={item.id} itemPhoto={item.photo} catPhoto={cat.photo} alt={meta.name || item.id} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline">
          <h3 className="font-serif text-lg text-brun sm:text-xl">{meta.name}</h3>
          <span className="leader" aria-hidden="true" />
          <span className="whitespace-nowrap font-price text-[0.9rem] text-terracotta-fonce" data-testid={`menu-price-${item.id}`}>
            {priceStr}
          </span>
        </div>

        {meta.desc && <p className="mt-2 text-sm leading-relaxed text-cafemuted">{meta.desc}</p>}

        {item.variants && (
          <ul className="mt-2 space-y-1">
            {item.variants.map((v) => (
              <li key={v.key} className="flex items-baseline text-sm">
                <span className="text-brun/85">{t(`carte.glaces.${v.key}`)}</span>
                <span className="leader" aria-hidden="true" />
                <span className="whitespace-nowrap font-price text-sm text-terracotta-fonce">
                  {formatPrice(i18n.language, v.price)}
                </span>
              </li>
            ))}
          </ul>
        )}

        {meta.ing && <p className="mt-2 text-sm leading-relaxed text-brun/85">{meta.ing}</p>}

        {item.confirm && (
          <span className="mt-2 inline-block rounded-full border border-terracotta/50 px-3 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-terracotta-fonce">
            {t("carte.confirm_badge")}
          </span>
        )}
      </div>
    </article>
  );
}

export default function Carte({ lenisRef }) {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState(CATEGORIES[0].id);
  const tabRefs = useRef({});

  useEffect(() => {
    const onCat = (e) => setActive(e.detail);
    window.addEventListener("galista:category", onCat);
    return () => window.removeEventListener("galista:category", onCat);
  }, []);

  // Garde l'onglet actif visible dans la barre défilante (mobile).
  useEffect(() => {
    const el = tabRefs.current[active];
    if (el && window.matchMedia("(max-width: 1023px)").matches) {
      el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [active]);

  const cat = CATEGORIES.find((c) => c.id === active) || CATEGORIES[0];

  return (
    <section id="carte" className="scroll-mt-16 bg-blanccasse py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <SectionHeading kicker={t("carte.kicker")} title={t("carte.title")} intro={t("carte.subtitle")} />
          <Reveal delay={0.2} className="md:max-w-xs md:shrink-0">
            <div className="space-y-2 md:text-right">
              <p className="text-xs leading-relaxed text-cafemuted">{t("carte.prices_note")}</p>
            </div>
          </Reveal>
        </div>

        <div className="no-scrollbar sticky top-16 z-30 -mx-6 mt-10 overflow-x-auto border-b border-brun/10 bg-blanccasse px-6 py-4 md:mx-0 md:px-0">
          <div className="flex flex-nowrap gap-2 lg:flex-wrap lg:justify-center" role="tablist" aria-label={t("carte.kicker")}>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                ref={(el) => {
                  tabRefs.current[c.id] = el;
                }}
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
            className="mt-10 grid items-start gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14"
            data-testid="menu-category-panel"
          >
            <div className="lg:sticky lg:top-40">
              <motion.div
                key={`${active}-photo`}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="img-soft relative aspect-[4/3] w-full lg:aspect-[4/5]"
              >
                <img
                  src={cat.photo}
                  alt={t(`carte.categories.${cat.id}`)}
                  className="h-full w-full object-cover"
                  data-testid="menu-category-photo"
                  loading="lazy"
                />
              </motion.div>
              <p className="mt-4 font-serif text-2xl italic text-brun">{t(`carte.categories.${cat.id}`)}</p>
            </div>

            <div className="grid gap-x-10 gap-y-10 xl:gap-x-14">
              {cat.items.map((item) => (
                <MenuRow key={item.id} item={item} cat={cat} t={t} i18n={i18n} />
              ))}

              {cat.flavorsNote && (
                <div className="self-start rounded-2xl border border-iznik/25 bg-creme p-6">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--iznik-fonce)" }}>
                    {t("carte.flavors_label")}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-cafemuted">{t("carte.flavors")}</p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-16 border-t border-brun/10 pt-10">
          <Reveal>
            <h3 className="font-serif text-2xl text-brun sm:text-3xl">{t("carte.glossary_title")}</h3>
          </Reveal>
          <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {["simit", "acma", "borek", "menemen", "sucuk", "kavurma", "pogaca"].map((k, i) => (
              <Reveal key={k} delay={i * 0.05}>
                <div className="border-l-2 border-iznik/40 pl-4">
                  <p className="font-serif text-lg italic text-brun">
                    {k === "acma" ? "Açma" : k === "borek" ? "Börek" : k === "pogaca" ? "Poğaça" : k.charAt(0).toUpperCase() + k.slice(1)}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-cafemuted">{t(`carte.glossary.${k}`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-14 text-center">
          <Reveal>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-cafemuted" data-testid="allergens-note">
              {t("carte.allergens_note")}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
