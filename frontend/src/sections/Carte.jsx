import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { CATEGORIES } from "@/data/menu";
import { formatPrice } from "@/i18n";
import SectionHeading, { Reveal } from "@/components/SectionHeading";

// Ligne de menu compacte : nom + pointillés + prix, description et
// ingrédients détaillés en dessous (photos ajoutées plus tard par l'établissement).
function MenuRow({ item, t, i18n }) {
  const meta = t(`items.${item.id}`, { returnObjects: true }) || {};
  const priceStr = Array.isArray(item.price)
    ? item.price.map((p) => formatPrice(i18n.language, p)).join(" / ")
    : formatPrice(i18n.language, item.price);

  return (
    <article data-testid={`menu-item-${item.id}`}>
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
    </article>
  );
}

// Toutes les catégories sont affichées l'une sous l'autre : plus besoin de
// changer d'onglet. La barre collante sert de navigation instantanée et
// surligne automatiquement la catégorie en cours de lecture.
export default function Carte({ lenisRef }) {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState(CATEGORIES[0].id);
  const tabRefs = useRef({});

  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerWidth < 1024 ? 170 : 210;
      let current = CATEGORIES[0].id;
      for (const c of CATEGORIES) {
        const el = document.getElementById(`menu-${c.id}`);
        if (el && el.getBoundingClientRect().top <= threshold) current = c.id;
      }
      const doc = document.documentElement;
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 60) {
        current = CATEGORIES[CATEGORIES.length - 1].id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Garde l'onglet actif visible dans la barre défilante (mobile).
  useEffect(() => {
    const el = tabRefs.current[active];
    if (el && window.matchMedia("(max-width: 1023px)").matches) {
      el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [active]);

  const goToCat = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(`menu-${id}`);
    if (!el) return;
    const offset = window.innerWidth < 1024 ? -155 : -180;
    const target = el.getBoundingClientRect().top + (window.scrollY || window.pageYOffset) + offset;
    if (lenisRef?.current) lenisRef.current.scrollTo(target, { duration: 1.2 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section id="carte" className="scroll-mt-16 bg-blanccasse py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <SectionHeading kicker={t("carte.kicker")} title={t("carte.title")} intro={t("carte.subtitle")} />
          <Reveal delay={0.2} className="md:max-w-xs md:shrink-0">
            <p className="text-xs leading-relaxed text-cafemuted md:text-right">{t("carte.prices_note")}</p>
          </Reveal>
        </div>

        <div className="no-scrollbar sticky top-16 z-30 -mx-6 mt-10 overflow-x-auto border-b border-brun/10 bg-blanccasse px-6 py-4 md:mx-0 md:px-0">
          <div className="flex flex-nowrap gap-2 lg:flex-wrap lg:justify-center" role="tablist" aria-label={t("carte.kicker")}>
            {CATEGORIES.map((c) => (
              <a
                key={c.id}
                href={`#menu-${c.id}`}
                onClick={(e) => goToCat(e, c.id)}
                ref={(el) => {
                  tabRefs.current[c.id] = el;
                }}
                role="tab"
                aria-selected={active === c.id}
                data-testid={`category-filter-${c.id}`}
                className={`pill ${active === c.id ? "pill--active" : ""}`}
              >
                {t(`carte.categories.${c.id}`)}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-14 space-y-16 md:space-y-20">
          {CATEGORIES.map((c) => (
            <Reveal key={c.id}>
              <section id={`menu-${c.id}`} className="scroll-mt-36 md:scroll-mt-44" data-testid={`menu-category-${c.id}`}>
                <div className="flex items-baseline gap-4">
                  <h3 className="font-serif text-2xl italic text-brun sm:text-3xl">{t(`carte.categories.${c.id}`)}</h3>
                  <span className="hidden h-px flex-1 bg-brun/10 sm:block" aria-hidden="true" />
                </div>
                <div className="mt-7 grid gap-x-14 gap-y-9 lg:grid-cols-2">
                  {c.items.map((item) => (
                    <MenuRow key={item.id} item={item} t={t} i18n={i18n} />
                  ))}
                  {c.flavorsNote && (
                    <div className="self-start rounded-2xl border border-iznik/25 bg-creme p-6">
                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--iznik-fonce)" }}>
                        {t("carte.flavors_label")}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-cafemuted">{t("carte.flavors")}</p>
                    </div>
                  )}
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 border-t border-brun/10 pt-8 text-center">
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-cafemuted" data-testid="allergens-note">
            {t("carte.allergens_note")}
          </p>
        </div>
      </div>
    </section>
  );
}
