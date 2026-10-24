import { useEffect, useRef, useState } from "react";
import { ExternalLink, Instagram } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SITE } from "@/data/site";

const SCRIPT_ID = "instagram-embed-script";

// Flux Instagram officiel (blockquote + embed.js, sans clé API), chargé
// automatiquement dès que la carte devient visible. En cas d'échec, une
// carte simple avec le profil @galistacafe et un bouton « Voir sur Instagram ».
export default function InstagramFeed() {
  const { t } = useTranslation();
  const [state, setState] = useState("pending"); // pending | loading | ready | failed
  const rootRef = useRef(null);
  const zoneRef = useRef(null);

  // Chargement automatique quand la carte entre dans le viewport.
  useEffect(() => {
    if (state !== "pending") return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState("loading");
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    if (zoneRef.current) io.observe(zoneRef.current);
    return () => io.disconnect();
  }, [state]);

  useEffect(() => {
    if (state !== "loading") return undefined;
    let cancelled = false;

    const process = () => {
      if (window.instgrm?.Embeds) window.instgrm.Embeds.process();
    };

    const existing = document.getElementById(SCRIPT_ID);
    if (existing) {
      if (window.instgrm?.Embeds) process();
      else existing.addEventListener("load", process, { once: true });
    } else {
      const s = document.createElement("script");
      s.id = SCRIPT_ID;
      s.async = true;
      s.src = "https://www.instagram.com/embed.js";
      s.onload = process;
      s.onerror = () => {
        if (!cancelled) setState("failed");
      };
      document.body.appendChild(s);
    }

    // Publication chargée => « ready » ; rien après 8 s => carte simple.
    const started = Date.now();
    const iv = window.setInterval(() => {
      if (rootRef.current?.querySelector("iframe")) {
        window.clearInterval(iv);
        if (!cancelled) setState("ready");
      } else if (Date.now() - started > 8000) {
        window.clearInterval(iv);
        if (!cancelled) setState("failed");
      }
    }, 400);

    return () => {
      cancelled = true;
      window.clearInterval(iv);
    };
  }, [state]);

  if (state === "failed") {
    return (
      <div
        className="mx-auto flex max-w-xl flex-col items-center gap-4 rounded-3xl border border-brun/10 bg-blanccasse p-8 text-center shadow-[0_18px_40px_-28px_rgba(75,48,38,0.4)]"
        data-testid="instagram-fallback"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-iznik/10 text-iznik-fonce">
          <Instagram className="h-6 w-6" />
        </span>
        <div>
          <h3 className="font-serif text-2xl text-brun" data-testid="instagram-handle-fallback">
            {t("instagram.handle")}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-cafemuted">{t("instagram.intro")}</p>
        </div>
        <a
          href={SITE.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          data-testid="instagram-open-link"
        >
          <Instagram className="h-4 w-4" />
          <span>{t("instagram.open")}</span>
        </a>
      </div>
    );
  }

  return (
    <div
      ref={zoneRef}
      className="mx-auto max-w-2xl rounded-3xl border border-brun/10 bg-blanccasse p-7 text-center shadow-[0_18px_40px_-28px_rgba(75,48,38,0.4)] md:p-9"
      data-testid="instagram-feed"
    >
      <div className="flex flex-col items-center gap-2">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-iznik/10 text-iznik-fonce">
          <Instagram className="h-6 w-6" />
        </span>
        <h3 className="font-serif text-2xl text-brun sm:text-3xl">{t("instagram.title")}</h3>
        <p className="text-sm leading-relaxed text-cafemuted">{t("instagram.intro")}</p>
        <a
          href={SITE.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-iznik-fonce underline underline-offset-4 hover:text-brun"
          data-testid="instagram-handle-link"
        >
          {t("instagram.handle")}
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <div ref={rootRef} className="mx-auto mt-6 flex min-h-[320px] w-full max-w-md justify-center overflow-hidden">
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={SITE.instagramUrl}
          data-instgrm-version="14"
          style={{ background: "#FFF", width: "calc(100% - 2px)" }}
        >
          <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer">
            {t("instagram.handle")}
          </a>
        </blockquote>
      </div>
      {state === "loading" && (
        <p className="mt-3 text-xs text-cafemuted" data-testid="instagram-loading">
          {t("instagram.loading")}
        </p>
      )}
    </div>
  );
}
