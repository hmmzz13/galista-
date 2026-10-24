import { Phone, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SITE } from "@/data/site";

export default function MobileActionBar() {
  const { t } = useTranslation();

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-brun/10 bg-creme/95 px-4 py-3 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      data-testid="mobile-action-bar"
    >
      <a href={SITE.phoneHref} className="btn btn-primary flex-1 justify-center !py-3" data-testid="call-bar-call-btn">
        <Phone className="h-4 w-4" />
        <span>{t("contact.call_cta")}</span>
      </a>
      <a
        href={SITE.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline flex-1 justify-center !py-3"
        data-testid="call-bar-maps-btn"
      >
        <MapPin className="h-4 w-4" />
        <span>{t("contact.maps_cta")}</span>
      </a>
    </div>
  );
}
