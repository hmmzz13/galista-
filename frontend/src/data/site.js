export const SITE = {
  name: "Galista Café",
  city: "Strasbourg",
  address: {
    street: "46 Rue du Faubourg-National",
    zip: "67000",
    city: "Strasbourg",
    country: "France",
  },
  phoneDisplay: "+33 6 31 11 95 83",
  phoneHref: "tel:+33631119583",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Galista+Cafe+46+Rue+du+Faubourg-National+Strasbourg",
  reviewsUrl: "https://www.google.com/search?q=Galista+Cafe+Strasbourg+avis+Google",
  reviews: {
    rating: 4.8,
    countLabel: "≈ 275",
    verifiedOnISO: "2026-10-22",
  },
  hours: [
    { open: "07:00", close: "17:00" },
    { open: "07:00", close: "17:00" },
    { open: "07:00", close: "17:00" },
    { open: "07:00", close: "17:00" },
    { open: "07:00", close: "16:00" },
    { open: "07:00", close: "16:00" },
    { open: "07:00", close: "16:00" },
  ],
  hoursToConfirm: true,
  pricesToConfirm: true,
};

export function scrollToHash(hash, lenis) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: -70, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
