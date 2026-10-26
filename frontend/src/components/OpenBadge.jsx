import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SITE, openState } from "@/data/site";

// État d'ouverture partagé (rafraîchi chaque minute).
export function useOpenState() {
  const [state, setState] = useState(() => openState(SITE.hours));
  useEffect(() => {
    const tick = () => setState(openState(SITE.hours));
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);
  return state;
}

export default function OpenBadge({ className = "", state }) {
  const { t } = useTranslation();
  const auto = useOpenState();
  const open = state || auto;

  const days = t("infos.days", { returnObjects: true }) || [];
  const label = open.open
    ? t("practical.open_badge_open", { time: open.until })
    : t("practical.open_badge_closed", { when: `${days[open.day] || ""} ${open.time}` });

  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-semibold tracking-wide shadow-[0_10px_24px_-10px_rgba(36,26,22,0.55)] ${
        open.open
          ? "bg-[#3E9B63] text-white"
          : "bg-terracotta text-[#FAF5EC]"
      } ${className}`}
      data-testid="open-badge"
      role="status"
    >
      <span className={`open-dot ${open.open ? "open-dot--live" : "open-dot--off"}`} aria-hidden="true" />
      {label}
    </span>
  );
}
