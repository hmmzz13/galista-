import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SITE, openState } from "@/data/site";

export default function OpenBadge({ className = "" }) {
  const { t } = useTranslation();
  const [state, setState] = useState(() => openState(SITE.hours));

  useEffect(() => {
    const tick = () => setState(openState(SITE.hours));
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  const days = t("infos.days", { returnObjects: true }) || [];
  const label = state.open
    ? t("practical.open_badge_open", { time: state.until })
    : t("practical.open_badge_closed", { when: `${days[state.day] || ""} ${state.time}` });

  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-xs font-semibold tracking-wide ${
        state.open ? "border-[#3E9B63]/40 bg-[#3E9B63]/10 text-[#2E6E48]" : "border-terracotta/40 bg-terracotta/10 text-terracotta-fonce"
      } ${className}`}
      data-testid="open-badge"
      role="status"
    >
      <span className={`open-dot ${state.open ? "open-dot--live" : "open-dot--off"}`} aria-hidden="true" />
      {label}
    </span>
  );
}
