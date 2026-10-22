import { useTranslation } from "react-i18next";

export default function Marquee() {
  const { t } = useTranslation();
  const words = t("marquee.words", { returnObjects: true }) || [];

  const renderSet = (prefix) =>
    words.map((w, i) => (
      <span key={`${prefix}-${i}`} className="inline-flex items-center font-serif italic text-xl sm:text-2xl text-noir">
        {w}
        <span className="mx-7 md:mx-10 inline-block h-1.5 w-1.5 rounded-full bg-noir/70" aria-hidden="true" />
      </span>
    ));

  return (
    <section aria-hidden="true" className="marquee bg-caramel py-5 border-y border-brun/25" data-testid="marquee-band">
      <div className="marquee-track">
        {renderSet("a")}
        {renderSet("b")}
      </div>
    </section>
  );
}
