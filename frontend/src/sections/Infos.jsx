import { useEffect, useRef, useState } from "react";
import { Instagram, MapPin, Pause, Phone, Play } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SITE } from "@/data/site";
import SectionHeading, { Reveal } from "@/components/SectionHeading";
import OpenBadge, { useOpenState } from "@/components/OpenBadge";
import { BeanMark } from "@/components/Nav";

// Carte interactive en 3D (vue inclinée) avec rotation automatique douce.
// La rotation se met en pause à l'interaction et reprend ensuite.
function Map3D({ openState, reduced }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const spinRef = useRef({ enabled: true, interacting: false });
  const [spinOn, setSpinOn] = useState(true);
  const [failed, setFailed] = useState(false);
  const open = openState.open;

  useEffect(() => {
    let map = null;
    let cancelled = false;

    const ensureMapCss = () => {
      if (!document.getElementById("maplibre-css")) {
        const l = document.createElement("link");
        l.id = "maplibre-css";
        l.rel = "stylesheet";
        l.href = "https://cdn.jsdelivr.net/npm/maplibre-gl@5/dist/maplibre-gl.css";
        document.head.appendChild(l);
      }
    };

    const init = async () => {
      try {
        ensureMapCss();
        const maplibregl = await import("maplibre-gl");
        const center = SITE.coords;
        if (cancelled) return;

        map = new maplibregl.Map({
          container: containerRef.current,
          style: {
            version: 8,
            sources: {
              osm: {
                type: "raster",
                tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
                tileSize: 256,
                attribution: "© OpenStreetMap contributors",
              },
            },
            layers: [{ id: "osm", type: "raster", source: "osm" }],
          },
          center,
          zoom: 16.5,
          pitch: 55,
          bearing: -16,
          interactive: true,
        });
        mapRef.current = map;
        map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-right");
        map.on("error", () => {});
        map.on("load", () => {
          if (cancelled) return;
          const el = document.createElement("div");
          const edge = open ? "#3E9B63" : "#C26A3D";
          el.style.cssText = `width:46px;height:46px;background:#FFFCF7;border:3px solid ${edge};border-radius:999px;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 24px rgba(75,48,38,0.4);`;
          el.innerHTML = '<svg viewBox="0 0 64 64" width="24" height="24" aria-hidden="true"><g fill="none" stroke="#2F8B89" stroke-width="3" stroke-linecap="round"><path d="M27 7 c-2.5 3.5 2.5 5.5 0 9"/><path d="M35 7 c-2.5 3.5 2.5 5.5 0 9"/></g><path d="M13 27 h36 v6 a13 13 0 0 1 -13 13 h-10 a13 13 0 0 1 -13 -13 z" fill="#2F8B89"/><ellipse cx="31" cy="53" rx="19" ry="3.4" fill="#2F8B89" opacity="0.75"/></svg>';
          new maplibregl.Marker({ element: el }).setLngLat(center).addTo(map);
          if (!reduced) {
            map.easeTo({ pitch: 60, bearing: -34, duration: 2600 });
            // Rotation automatique : pause à l'interaction, reprise après 4 s.
            const spin = () => {
              const s = spinRef.current;
              if (cancelled || !s.enabled || s.interacting) return;
              map.easeTo({ bearing: map.getBearing() - 0.45, duration: 100, easing: (n) => n });
            };
            map.on("moveend", spin);
            setTimeout(spin, 2700);
            const pause = () => { spinRef.current.interacting = true; };
            const resume = () => { spinRef.current.interacting = false; };
            map.on("mousedown", pause);
            map.on("touchstart", pause);
            map.on("mouseup", resume);
            map.on("touchend", resume);
            map.on("dragstart", pause);
            map.on("dragend", () => { setTimeout(resume, 4000); });
          }
        });
      } catch (e) {
        console.error("Map3D init error:", e);
        setFailed(true);
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          init();
          io.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    if (containerRef.current) io.observe(containerRef.current);

    return () => {
      cancelled = true;
      io.disconnect();
      if (map) map.remove();
    };
  }, [open, reduced]);

  const toggleSpin = () => {
    const next = !spinOn;
    setSpinOn(next);
    spinRef.current.enabled = next;
  };

  const edgeColor = open ? "ring-[#3E9B63]/60" : "ring-terracotta/60";

  return (
    <div className={`relative h-[420px] w-full rounded-[22px] shadow-[0_24px_50px_-24px_rgba(75,48,38,0.45)] ring-2 ${edgeColor} transition-colors duration-700 md:h-[480px]`} data-testid="map-3d-wrapper">
      {failed ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-beige p-8 text-center">
          <BeanMark className="h-10 w-10" />
          <p className="text-sm text-cafemuted">
            {SITE.address.street}, {SITE.address.zip} {SITE.address.city}
          </p>
        </div>
      ) : (
        <div ref={containerRef} className="h-full w-full overflow-hidden rounded-[20px]" data-testid="map-3d" />
      )}
      <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-brun/10" aria-hidden="true" />

      <div className="absolute left-3 top-3 z-10 rounded-full bg-blanccasse/95 p-1 shadow-[0_8px_20px_rgba(75,48,38,0.25)]">
        <OpenBadge state={openState} />
      </div>

      <button
        onClick={toggleSpin}
        data-testid="map-spin-toggle"
        aria-label={spinOn ? "Pause rotation" : "Reprendre rotation"}
        className="absolute bottom-4 left-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-brun/15 bg-blanccasse/95 text-brun shadow-[0_8px_20px_rgba(75,48,38,0.25)] transition-colors hover:border-iznik hover:text-iznik-fonce"
      >
        {spinOn ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </button>
    </div>
  );
}

export default function Infos() {
  const { t } = useTranslation();
  const days = t("infos.days", { returnObjects: true }) || [];
  const openStateNow = useOpenState();
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <section id="infos" className="scroll-mt-16 bg-blanccasse py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading kicker={t("infos.kicker")} title={t("infos.title")} />

            <div className="mt-10 space-y-9">
              <Reveal delay={0.08}>
                <div className="flex flex-wrap items-center gap-3">
                  <OpenBadge state={openStateNow} />
                  <span className="text-xs italic text-cafemuted">{t("infos.hours_note")}</span>
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.25em] text-iznik-fonce">{t("infos.address_label")}</p>
                    <p className="mt-3 font-serif text-xl text-brun" data-testid="address-line">
                      {SITE.address.street}
                    </p>
                    <p className="mt-1 text-sm text-cafemuted">
                      {SITE.address.zip} {SITE.address.city}, {SITE.address.country}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.25em] text-iznik-fonce">{t("infos.phone_label")}</p>
                    <a
                      href={SITE.phoneHref}
                      className="mt-3 inline-block font-serif text-xl text-brun transition-colors duration-300 hover:text-iznik-fonce"
                      data-testid="phone-link"
                    >
                      {SITE.phoneDisplay}
                    </a>
                    <p className="mt-4">
                      <a
                        href={SITE.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="instagram-link"
                        className="inline-flex items-center gap-2.5 rounded-full border border-brun/15 bg-creme px-4 py-2.5 text-sm font-semibold text-brun transition-all duration-300 hover:-translate-y-0.5 hover:border-iznik hover:text-iznik-fonce"
                      >
                        <Instagram className="h-4 w-4" />
                        {t("practical.instagram")}
                      </a>
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <div>
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.25em] text-iznik-fonce">{t("infos.hours_label")}</p>
                  <dl className="mt-3 max-w-sm" data-testid="opening-hours">
                    {SITE.hours.map((h, i) => {
                      const isToday = i === openStateNow.day;
                      return (
                        <div
                          key={i}
                          className={`flex items-baseline justify-between rounded-lg border-b border-brun/10 px-2.5 py-1.5 text-sm ${
                            isToday
                              ? openStateNow.open
                                ? "bg-[#3E9B63]/15 font-semibold text-[#2E6E48]"
                                : "bg-terracotta/15 font-semibold text-terracotta-fonce"
                              : ""
                          }`}
                          data-testid={isToday ? "hours-today-row" : undefined}
                        >
                          <dt className="flex items-center gap-2">
                            {days[i]}
                            {isToday && (
                              <span
                                className={`rounded-full px-2 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.12em] ${
                                  openStateNow.open ? "bg-[#3E9B63] text-blanccasse" : "bg-terracotta text-blanccasse"
                                }`}
                              >
                                {t("practical.today")}
                              </span>
                            )}
                          </dt>
                          <dd className="font-price text-brun/90">
                            {h.open} – {h.close}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="hidden flex-wrap gap-4 md:flex">
                  <a href={SITE.phoneHref} className="btn btn-primary" data-testid="call-btn">
                    <Phone className="h-4 w-4" />
                    <span>{t("contact.call_cta")}</span>
                  </a>
                  <a
                    href={SITE.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    data-testid="maps-btn"
                  >
                    <MapPin className="h-4 w-4" />
                    <span>{t("infos.maps_cta")}</span>
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.15}>
            <div>
              <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.25em] text-iznik-fonce">{t("practical.map_title")}</p>
              <Map3D openState={openStateNow} reduced={reduced} />
              <p className="mt-3 text-xs text-cafemuted">{t("practical.map_note")}</p>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline mt-4 w-full justify-center md:hidden"
                data-testid="maps-btn-mobile"
              >
                <MapPin className="h-4 w-4" />
                <span>{t("infos.maps_cta")}</span>
              </a>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 rounded-3xl border border-brun/10 bg-creme p-8 md:p-10">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="kicker">{t("contact.kicker")}</p>
                <p className="mt-4 font-serif text-2xl text-brun sm:text-3xl">{t("contact.title")}</p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-cafemuted">{t("contact.text")}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <a href={SITE.phoneHref} className="btn btn-primary" data-testid="contact-call-btn">
                  <Phone className="h-4 w-4" />
                  <span>{t("contact.call_cta")}</span>
                </a>
                <a
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  data-testid="contact-instagram-btn"
                >
                  <Instagram className="h-4 w-4" />
                  <span>{t("practical.instagram")}</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
