import { MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SITE } from "@/data/site";
import SectionHeading, { Reveal } from "@/components/SectionHeading";
import { BeanMark } from "@/components/Nav";

export default function Infos() {
  const { t } = useTranslation();
  const days = t("infos.days", { returnObjects: true }) || [];

  return (
    <section id="infos" className="bg-noir py-24 md:py-32 text-creme scroll-mt-16">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-14 md:gap-20">
          <div>
            <SectionHeading kicker={t("infos.kicker")} title={t("infos.title")} dark />

            <div className="mt-12 space-y-10">
              <Reveal delay={0.1}>
                <div>
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.25em] text-caramel">{t("infos.address_label")}</p>
                  <p className="mt-3 font-serif text-2xl text-creme" data-testid="address-line">
                    {SITE.address.street}
                  </p>
                  <p className="mt-1 text-creme/60">
                    {SITE.address.zip} {SITE.address.city}, {SITE.address.country}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div>
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.25em] text-caramel">{t("infos.phone_label")}</p>
                  <a
                    href={SITE.phoneHref}
                    className="mt-3 inline-block font-serif text-2xl text-creme hover:text-caramel transition-colors duration-300"
                    data-testid="phone-link"
                  >
                    {SITE.phoneDisplay}
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div>
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.25em] text-caramel">{t("infos.hours_label")}</p>
                  <dl className="mt-3 max-w-sm" data-testid="opening-hours">
                    {SITE.hours.map((h, i) => (
                      <div key={i} className="flex items-baseline justify-between py-1.5 border-b border-creme/10 text-sm">
                        <dt className="text-creme/70">{days[i]}</dt>
                        <dd className="font-price text-creme/90">
                          {h.open} – {h.close}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-3 text-xs italic text-creme/45">{t("infos.hours_note")}</p>
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.2}>
            <div className="md:sticky md:top-28 rounded-3xl border border-creme/15 bg-brunprofond/70 p-8 md:p-12 flex flex-col items-start gap-8 overflow-hidden relative">
              <div className="absolute -right-10 -top-10 opacity-[0.1]">
                <BeanMark className="h-56 w-56" />
              </div>
              <img src="/logo.png" alt="" className="h-12 w-auto" data-testid="infos-logo" />
              <div>
                <p className="font-serif text-3xl leading-snug text-creme">
                  {SITE.name}
                  <span className="text-caramel"> — {SITE.address.city}</span>
                </p>
                <p className="mt-3 text-sm text-creme/60 leading-relaxed">
                  {SITE.address.street}, {SITE.address.zip} {SITE.address.city}
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-2">
                <a
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  data-testid="maps-btn"
                >
                  <MapPin className="h-4 w-4" />
                  <span>{t("infos.maps_cta")}</span>
                </a>
                <a href={SITE.phoneHref} className="btn btn-ghost" data-testid="call-btn">
                  <Phone className="h-4 w-4" />
                  <span>{t("infos.call_cta")}</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <div id="contact" className="mt-24 md:mt-32 border-t border-creme/10 pt-16 md:pt-20 grid md:grid-cols-2 gap-12 scroll-mt-20">
          <SectionHeading kicker={t("contact.kicker")} title={t("contact.title")} intro={t("contact.text")} dark />
          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row md:justify-end gap-4 md:pt-14">
              <a href={SITE.phoneHref} className="btn btn-primary" data-testid="contact-call-btn">
                <Phone className="h-4 w-4" />
                <span>{t("contact.call_cta")}</span>
              </a>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                data-testid="contact-maps-btn"
              >
                <MapPin className="h-4 w-4" />
                <span>{t("contact.maps_cta")}</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
