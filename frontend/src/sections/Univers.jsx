import { useTranslation } from "react-i18next";
import SectionHeading, { Reveal } from "@/components/SectionHeading";
import PlaceholderFrame from "@/components/PlaceholderFrame";

export default function Univers() {
  const { t } = useTranslation();
  const tags = t("univers.tags", { returnObjects: true }) || [];

  return (
    <section id="univers" className="relative bg-creme py-24 md:py-32 scroll-mt-16">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div>
          <SectionHeading kicker={t("univers.kicker")} title={t("univers.title")} />
          <Reveal delay={0.2}>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-cafemuted max-w-xl">{t("univers.text")}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <ul className="mt-10 space-y-4">
              {tags.map((tag, i) => (
                <li key={i} className="flex items-center gap-4 font-serif text-xl sm:text-2xl text-brun">
                  <span className="font-price text-xs text-iznik-fonce">0{i + 1}</span>
                  <span className="h-px w-10 bg-iznik/50" aria-hidden="true" />
                  {tag}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <PlaceholderFrame
            label={t("univers.photo_label")}
            caption={t("univers.photo_pending")}
            ratio="aspect-[4/5]"
            testid="univers-photo-frame"
          />
        </Reveal>
      </div>
    </section>
  );
}
