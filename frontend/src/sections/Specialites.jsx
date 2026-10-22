import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { scrollToHash } from "@/data/site";
import SectionHeading, { Reveal } from "@/components/SectionHeading";
import PlaceholderFrame from "@/components/PlaceholderFrame";

export default function Specialites({ lenisRef }) {
  const { t } = useTranslation();
  const list = t("specialites.list", { returnObjects: true }) || [];

  const showOnMenu = (cat) => {
    window.dispatchEvent(new CustomEvent("galista:category", { detail: cat }));
    scrollToHash("#carte", lenisRef?.current);
  };

  return (
    <section id="specialites" className="bg-beige py-24 md:py-32 scroll-mt-16">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <SectionHeading kicker={t("specialites.kicker")} title={t("specialites.title")} intro={t("specialites.intro")} />

        <div className="mt-16 md:mt-20">
          {list.map((s, i) => (
            <Reveal key={s.id}>
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center py-12 md:py-14 border-t border-brun/15 last:border-b">
                <div className={i % 2 === 1 ? "md:order-2" : ""}>
                  <span className="font-price text-sm text-caramel-fonce">0{i + 1}</span>
                  <h3 className="mt-3 font-serif text-3xl sm:text-4xl text-brun">{s.title}</h3>
                  <p className="mt-4 text-cafemuted leading-relaxed max-w-md">{s.text}</p>
                  <button
                    onClick={() => showOnMenu(s.cat)}
                    className="btn btn-dark mt-7"
                    data-testid={`speciality-link-${s.id}`}
                  >
                    <span>{t("specialites.view_menu")}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                <PlaceholderFrame
                  ratio="aspect-[16/10]"
                  label={s.title}
                  caption={t("univers.photo_pending")}
                  testid={`speciality-frame-${s.id}`}
                  className={i % 2 === 1 ? "md:order-1" : ""}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
