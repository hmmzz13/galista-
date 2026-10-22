import { useTranslation } from "react-i18next";

export default function Marquee() {
  const { t } = useTranslation();
  const words = t("marquee.words", { returnObjects: true }) || [];

  const renderSet = (prefix) =>
    words.map((w, i) => (
      <span key={`${prefix}-${i}`} className="inline-flex items-center font-serif italic text-xl sm:text-2xl text-creme">
        {w}
        <span className="mx-7 md:mx-10 inline-block h-1.5 w-1.5 rounded-full bg-creme/70" aria-hidden="true" />
      </span>
    ));

  return (
    <section aria-hidden="true" className="marquee bg-iznik py-5" data-testid="marquee-band">
      <div className="marquee-track">
        {renderSet("a")}
        {renderSet("b")}
      </div>
    </section>
  );
}
