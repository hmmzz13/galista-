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
  coords: [7.735894, 48.582427],
  instagramUrl: "https://www.instagram.com/galistacafe/",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Galista+Cafe+46+Rue+du+Faubourg-National+Strasbourg",
  reviewsUrl: "https://www.google.com/search?q=Galista+Cafe+Strasbourg+avis+Google",
  reviewsSourceUrl: "https://strasbourg.food/restaurant/galista-cafe",
  reviews: {
    rating: 4.8,
    countLabel: "≈ 275",
    verifiedOnISO: "2026-10-22",
    quotes: [
      {
        name: "Bhye T.",
        rating: "5",
        text: "Endroit très sympa pour un brunch au calme et savoureux. Le service est rapide et le staff est sympathique",
      },
      {
        name: "Eda E.",
        rating: "5",
        text: "Nous avons passé un excellent moment en famille lors d'un brunch dans ce salon de thé. L'ambiance est chaleureuse et agréable, parfaite pour partager un moment convivial. Les produits étaient frais, savoureux et joliment présentés, avec un large choix pour satisfaire tout le monde. Le service était également très accueillant et attentionné. Une très belle découverte que nous recommandons sans…",
      },
      {
        name: "Çiğdem S.",
        rating: "5",
        text: "Nous avons beaucoup apprécié notre visite au Café Galistaya. Le plateau de petit-déjeuner était délicieux, et le croissant ainsi que le simit étaient excellents. Le personnel était très accueillant, souriant et attentionné. Nous reviendrons avec plaisir. Merci pour cette belle expérience !",
      },
    ],
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

// État d'ouverture calculé avec le fuseau horaire Europe/Paris.
export function openState(hours, now = new Date()) {
  const tzNow = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Paris" }));
  const day = (tzNow.getDay() + 6) % 7; // 0 = lundi
  const mins = tzNow.getHours() * 60 + tzNow.getMinutes();
  const toMin = (t) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  const today = hours[day];
  if (mins >= toMin(today.open) && mins < toMin(today.close)) {
    return { open: true, until: today.close, day, time: today.open };
  }
  if (mins < toMin(today.open)) {
    return { open: false, day, time: today.open };
  }
  const next = (day + 1) % 7;
  return { open: false, day: next, time: hours[next].open };
}

export function scrollToHash(hash, lenis) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: -70, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
