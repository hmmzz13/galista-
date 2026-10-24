import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { CATEGORIES } from "@/data/menu";
import { formatPrice } from "@/i18n";
import { BeanMark } from "@/components/Nav";
import SectionHeading, { Reveal } from "@/components/SectionHeading";

// Photo d'un plat : d'abord /photos/<id>.jpg (photos officielles de
// l'établissement), puis l'illustration du produit, puis celle de la
// catégorie. Si tout échoue, un marqueur discret.
function ProductImage({ id, itemPhoto, catPhoto, alt }) {
  const sources = [`/photos/${id}.jpg`, itemPhoto, catPhoto].filter(Boolean);
  const [step, setStep] = useState(0);

  if (step >= sources.length) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-beige">
        <BeanMark className="h-6 w-6 text-brun/30" />
      </div>
    );
  }
  return (
    <img
      src={sources[step]}
      alt={alt}
      loading="lazy"
      onError={() => setStep((s) => s + 1)}
      className="h-full w-full object-cover"
    />
  );
}

// Ligne de menu façon flyer : photo, nom + pointillés + prix, et le texte
// riche en petit (la ligne résumée en doublon est retirée).
function MenuRow({ item, cat, t, i18n }) {
  const meta = t(`items.${item.id}`, { returnObjects: true }) || {};
  const priceStr = Array.isArray(item.price)
    ? item.price.map((p) => formatPrice(i18n.language, p)).join(" / ")
    : formatPrice(i18n.language, item.price);
  const richText = meta.ing || meta.desc;
  const hasPrice = item.price !== undefined && item.price !== null;

  return (
    <article className="flex items-start gap-3.5" data-testid={`menu-item-${item.id}`}>
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-beige sm:h-[72px] sm:w-[72px]" data-testid={`menu-photo-${item.id}`}>
        <ProductImage id={item.id} itemPhoto={item.photo} catPhoto={cat.photo} alt={meta.name || item.id} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline">
          <h3 className="font-serif text-[1.02rem] leading-snug text-brun sm:text-lg">{meta.name}</h3>
          {hasPrice && (
            <>
              <span className="leader" aria-hidden="true" />
              <span className="whitespace-nowrap font-price text-[0.9rem] text-terracotta-fonce" data-testid={`menu-price-${item.id}`}>
                {priceStr}
              </span>
            </>
          )}
        </div>

        {richText && <p className="mt-1.5 text-xs leading-snug text-cafemuted">{richText}</p>}

        {item.variants && (
          <ul className="mt-1.5 space-y-0.5">
            {item.variants.map((v) => (
              <li key={v.key} className="flex items-baseline text-xs">
                <span className="text-brun/85">{t(`carte.glaces.${v.key}`)}</span>
                <span className="leader" aria-hidden="true" />
                <span className="whitespace-nowrap font-price text-xs text-terracotta-fonce">
                  {formatPrice(i18n.language, v.price)}
                </span>
              </li>
            ))}
          </ul>
        )}

        {item.confirm && (
          <span className="mt-1.5 inline-block rounded-full border border-terracotta/50 px-2.5 py-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-terracotta-fonce">
            {t("carte.confirm_badge")}
          </span>
        )}
      </div>
    </article>
  );
}

// Menu « tout sur une page » : les 13 catégories se suivent, la barre
// collante sert de navigation (saut direct + surlignage automatique).
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
        <SectionHeading kicker={t("carte.kicker")} title={t("carte.title")} intro={t("carte.subtitle")} />

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

        <div className="mt-12 space-y-12 md:space-y-16">
          {CATEGORIES.map((c) => (
            <Reveal key={c.id}>
              <section id={`menu-${c.id}`} className="scroll-mt-40 md:scroll-mt-44" data-testid={`menu-category-${c.id}`}>
                <div className="flex items-baseline gap-4">
                  <h3 className="font-serif text-2xl italic text-brun sm:text-3xl">{t(`carte.categories.${c.id}`)}</h3>
                  <span className="hidden h-px flex-1 bg-brun/10 sm:block" aria-hidden="true" />
                </div>
                <div className="mt-6 grid gap-x-10 gap-y-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-12">
                  {c.items.map((item) => (
                    <MenuRow key={item.id} item={item} cat={c} t={t} i18n={i18n} />
                  ))}
                  {c.flavorsNote && (
                    <div className="self-start rounded-2xl border border-iznik/25 bg-creme p-5">
                      <p className="text-[0.66rem] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--iznik-fonce)" }}>
                        {t("carte.flavors_label")}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-cafemuted">{t("carte.flavors")}</p>
                    </div>
                  )}
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 border-t border-brun/10 pt-8 text-center">
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-cafemuted" data-testid="allergens-note">
            {t("carte.allergens_note")}
          </p>
        </div>
      </div>
    </section>
  );
}
