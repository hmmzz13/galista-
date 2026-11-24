// Structure centralisée de la carte — prix et produits relevés sur la carte en
// ligne de Galista Café (https://www.galistacafe.fr/menu/). Les noms, descriptions
// et ingrédients traduits vivent dans src/i18n/{fr,de,en}.json, clé « items ».
//
// PHOTOS OFFICIELLES : chaque produit affiche en priorité le fichier
// public/photos/<id>.jpg (ex : public/photos/menemen.jpg). Il suffit de déposer
// la photo du plat avec ce nom — aucun code à modifier. Sinon, l'image
// d'illustration ci-dessous s'affiche (item.photo, puis photo de catégorie).

const CAT_IMG = {
  petits_dejeuners:
    "/photos/menu/unsplash-1635432877848-9.jpg",
  oeufs_omelettes:
    "/photos/menu/pexels-5639286.jpg",
  sandwichs:
    "/photos/menu/pexels-5555754.jpg",
  boreks:
    "/photos/borek.jpg",
  toasts:
    "/photos/toast_salami_fromage.jpg",
  viennoiseries:
    "/photos/menu/pexels-19642548.jpg",
  salades:
    "/photos/menu/unsplash-1546069901-.jpg",
  patisseries:
    "/photos/menu/unsplash-1760124056928-.jpg",
  cafes:
    "/photos/menu/unsplash-1559001724-.jpg",
  boissons_chaudes:
    "/photos/menu/pexels-1493080.jpg",
  boissons_froides:
    "/photos/menu/unsplash-1583577612013-4.jpg",
};

export const CATEGORIES = [
  {
    id: "petits_dejeuners",
    photo: CAT_IMG.petits_dejeuners,
    items: [
      { id: "petit_dej_classique", price: 9.9, photo: "/photos/menu/pexels-20204672.jpg" },
      { id: "petit_dej_galista", price: 13.9, photo: "/photos/menu/pexels-13653045.jpg" },
      { id: "assiette_mezze", price: 5.0, photo: "/photos/assiette_mezze.jpg" },
    ],
  },
  {
    id: "oeufs_omelettes",
    photo: CAT_IMG.oeufs_omelettes,
    items: [
{ id: "omelette_aneth", price: 7.9, photo: "/photos/omelette_fromage.jpg" },
{ id: "omelette_fromage", price: 8.9, photo: "/photos/menu/pexels-11654228.jpg" },
{ id: "omelette_tomate_fromage", price: 9.9, photo: "/photos/omelette_fromage.jpg" },
{ id: "omelette_simit", price: 10.9, photo: "/photos/omelette_simit.jpg" },
{ id: "menemen", price: 10.9, photo: "/photos/menemen.jpg" },
{ id: "oeufs_sucuk", price: 10.9, photo: "/photos/menu/pexels-35611241.jpg" },
{ id: "oeufs_kavurma", price: 11.9, photo: "/photos/menu/unsplash-1759216280661-.jpg" },
    ],
  },
  {
    id: "sandwichs",
    photo: CAT_IMG.sandwichs,
    items: [
      { id: "croissant_sale", price: 4.0, photo: "/photos/menu/unsplash-1639667852145-466.jpg" },
      { id: "sandwich_simit_acma", price: 5.5, photo: "/photos/menu/pexels-29389139.jpg" },
      { id: "sandwich_tomate_mozza", price: 5.5, photo: "/photos/menu/pexels-13995330.jpg" },
      { id: "sandwich_thon", price: 6.5, photo: "/photos/sandwich_thon.jpg" },
      { id: "sandwich_poulet_curry", price: 6.5, photo: "/photos/menu/unsplash-1558985250-27.jpg" },
      { id: "sandwich_vegetarien", price: 6.5, photo: "/photos/menu/pexels-14410236.jpg" },
    ],
  },
  {
    id: "boreks",
    photo: CAT_IMG.boreks,
    items: [
      { id: "borek_epinards", price: 3.9, photo: "/photos/borek.jpg" },
      { id: "borek_pommes_terre", price: 3.9, photo: "/photos/borek.jpg" },
      { id: "borek_fromage", price: 3.9, photo: "/photos/borek.jpg" },
      { id: "borek_viande_hachee", price: 4.2, photo: "/photos/borek.jpg" },
    ],
  },
  {
    id: "toasts",
    photo: CAT_IMG.toasts,
    items: [
      { id: "toast_kasar", price: 4.5, photo: "/photos/toast_salami_fromage.jpg" },
      { id: "toast_salami_fromage", price: 5.5, photo: "/photos/toast_salami_fromage.jpg" },
      { id: "toast_chorizo_fromage", price: 5.5, photo: "/photos/toast_salami_fromage.jpg" },
      { id: "toast_galista", price: 6.5, photo: "/photos/toast_salami_fromage.jpg" },
    ],
  },
  {
    id: "viennoiseries",
    photo: CAT_IMG.viennoiseries,
    items: [
      { id: "croissant_pain_chocolat", price: 1.5, photo: "/photos/menu/pexels-30846579.jpg" },
      { id: "croissant_framboise", price: 2.2, photo: "/photos/croissant_framboise.jpg" },
      { id: "bretzel", price: 1.7, photo: "/photos/menu/pexels-1571074.jpg" },
      { id: "bretzel_gratine", price: 1.9, photo: "/photos/menu/pexels-24643898.jpg" },
      { id: "simit_acma", price: 2.0, photo: "/photos/menu/pexels-19642548.jpg" },
      { id: "pain_raisins", price: 2.0 },
      { id: "chausson_pommes", price: 2.0 },
      { id: "suisse_torsade_triangle", price: 2.0 },
      { id: "pogaca_fromage", price: 2.2, photo: "/photos/pogaca_fromage.jpg" },
    ],
  },
  {
    id: "salades",
    photo: CAT_IMG.salades,
    items: [
{ id: "salade_saison", price: 7.9, photo: "/photos/salade_poulet.jpg" },
{ id: "salade_poulet", price: 8.9, photo: "/photos/salade_poulet.jpg" },
{ id: "salade_thon", price: 8.9, photo: "/photos/salade_poulet.jpg" },
{ id: "supplement_fromage", price: 1.0 },
{ id: "supplement_oeuf", price: 1.5 },
{ id: "supplement_chorizo", price: 2.0 },
    ],
  },
  {
    id: "patisseries",
    photo: CAT_IMG.patisseries,
    items: [
{ id: "baklava", price: 4.9 },
{ id: "mini_macarons", price: 1.2 },
{ id: "trilece", price: 5.5 },
{ id: "mille_feuille", price: 3.9, photo: "/photos/mille_feuille.jpg" },
{ id: "moka_cafe", price: 3.9 },
{ id: "eclair_choco_vanille_cafe", price: 3.9, photo: "/photos/menu/pexels-14996842.jpg" },
{ id: "tarte_citron", price: 4.0, photo: "/photos/tarte_citron.jpg" },
{ id: "sutlac", price: 4.5 },
{ id: "cake_pistache", price: 3.5, photo: "/photos/cake_pistache.jpg" },
{ id: "cake_choco", price: 3.5, photo: "/photos/cake_choco.jpg" },
{ id: "cake_citron", price: 3.0, photo: "/photos/cake_citron.jpg" },
{ id: "cake_carotte", price: 3.0, photo: "/photos/cake_carotte.jpg" },
{ id: "cookies", price: 2.5, photo: "/photos/menu/unsplash-1654178990976-.jpg" },
{ id: "brownie", price: 3.0, photo: "/photos/menu/unsplash-1519682214708-973477.jpg" },
{ id: "muffin_pepites", price: 3.0, photo: "/photos/menu/pexels-8538747.jpg" },
{ id: "muffin_maxi_choco", price: 3.9, photo: "/photos/menu/pexels-7190694.jpg" },
{ id: "tiramisu", price: 4.5, photo: "/photos/tiramisu.jpg" },
    ],
  },
  {
    id: "cafes",
    photo: CAT_IMG.cafes,
    items: [
      { id: "espresso", price: 2.2, photo: "/photos/menu/unsplash-1579992357154-.jpg" },
      { id: "double_espresso", price: 3.8, photo: "/photos/menu/unsplash-1610889556528-9.jpg" },
      { id: "cafe_long", price: 3.0, photo: "/photos/cafe_long.jpg" },
      { id: "cafe_latte", price: 3.4, photo: "/photos/cafe_long.jpg" },
      { id: "cappuccino", price: 3.6, photo: "/photos/cafe_long.jpg" },
      { id: "americano", price: 3.0, photo: "/photos/cafe_long.jpg" },
      { id: "latte_macchiato", price: 4.0, photo: "/photos/cafe_long.jpg" },
      { id: "cafe_turc", price: 3.0, photo: "/photos/cafe_long.jpg" },
      { id: "cafe_noisette", price: 2.5, photo: "/photos/cafe_long.jpg" },
      { id: "ice_coffee", price: 3.4, photo: "/photos/ice_coffee.jpg" },
      { id: "ice_latte", price: 3.7, photo: "/photos/ice_coffee.jpg" },
      { id: "ice_cappuccino", price: 4.0, photo: "/photos/ice_coffee.jpg" },
      { id: "supplement_lait_avoine", price: 0.5 },
      { id: "saveur_gourmande", price: 1.0 },
    ],
  },
  {
    id: "boissons_chaudes",
    photo: CAT_IMG.boissons_chaudes,
    items: [
      { id: "the_turc", price: 2.0, photo: "/photos/menu/pexels-1493080.jpg" },
      { id: "tisane_palais", price: 3.7, photo: "/photos/menu/unsplash-1622484212110-0.jpg" },
      { id: "lait_nature", price: 2.8, photo: "/photos/lait_nature.jpg" },
      { id: "lait_miel", price: 3.2, photo: "/photos/menu/pexels-5407267.jpg" },
      { id: "chocolat_chaud", price: 3.5, photo: "/photos/chocolat_chaud.jpg" },
      { id: "chocolat_chaud_lait", price: 4.0, photo: "/photos/chocolat_chaud.jpg" },
    ],
  },
  {
    id: "boissons_froides",
    photo: CAT_IMG.boissons_froides,
    items: [
{ id: "sodas", price: 2.5 },
{ id: "lemonaid_charitea", price: 3.5 },
{ id: "red_bull", price: 3.5 },
{ id: "carola_rouge_verte", price: 2.5 },
{ id: "san_pellegrino", price: 3.0 },
{ id: "eau_cristaline_volvic", price: 1.5 },
{ id: "jus_granini_pago", price: 3.0, photo: "/photos/menu/unsplash-1583577612013-4.jpg" },
{ id: "pulco", price: 3.0 },
    ],
  },
];
