// Structure centralisée de la carte — prix et produits relevés sur la carte en
// ligne de Galista Café (https://www.galistacafe.fr/menu/). Les noms, descriptions
// et ingrédients traduits vivent dans src/i18n/{fr,de,en}.json, clé « items ».
// flag `confirm` = recette détaillée à confirmer par l'établissement.
//
// PHOTOS OFFICIELLES : chaque produit affiche en priorité le fichier
// public/photos/<id>.jpg (ex : public/photos/menemen.jpg). Il suffit de déposer
// la photo du plat avec ce nom — aucun code à modifier. Sinon, l'image
// d'illustration ci-dessous s'affiche (item.photo, puis photo de catégorie).

const CAT_IMG = {
  petits_dejeuners:
    "https://images.unsplash.com/photo-1635432877848-9c86755eb2f9?auto=format&fit=crop&w=1200&q=80",
  oeufs_omelettes:
    "https://images.pexels.com/photos/5639286/pexels-photo-5639286.jpeg?auto=compress&cs=tinysrgb&w=1200",
  sandwichs:
    "https://images.pexels.com/photos/5555754/pexels-photo-5555754.jpeg?auto=compress&cs=tinysrgb&w=1200",
  boreks:
    "https://images.pexels.com/photos/38356208/pexels-photo-38356208.jpeg?auto=compress&cs=tinysrgb&w=1200",
  toasts:
    "https://images.pexels.com/photos/5840412/pexels-photo-5840412.jpeg?auto=compress&cs=tinysrgb&w=1200",
  viennoiseries:
    "https://images.pexels.com/photos/19642548/pexels-photo-19642548.jpeg?auto=compress&cs=tinysrgb&w=1200",
  salades:
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
  patisseries:
    "https://images.unsplash.com/photo-1760124056928-a9960b1b1dd2?auto=format&fit=crop&w=1200&q=80",
  glaces:
    "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=1200&q=80",
  milkshakes:
    "https://images.pexels.com/photos/27626320/pexels-photo-27626320.jpeg?auto=compress&cs=tinysrgb&w=1200",
  cafes:
    "https://images.unsplash.com/photo-1559001724-fbad036dbc9e?auto=format&fit=crop&w=1200&q=80",
  boissons_chaudes:
    "https://images.pexels.com/photos/1493080/pexels-photo-1493080.jpeg?auto=compress&cs=tinysrgb&w=1200",
  boissons_froides:
    "https://images.unsplash.com/photo-1583577612013-4fecf7bf8f13?auto=format&fit=crop&w=1200&q=80",
};

export const CATEGORIES = [
  {
    id: "petits_dejeuners",
    photo: CAT_IMG.petits_dejeuners,
    items: [
      { id: "petit_dej_classique", price: 9.9, photo: "https://images.pexels.com/photos/20204672/pexels-photo-20204672.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: "petit_dej_galista", price: 12.9, photo: "https://images.pexels.com/photos/13653045/pexels-photo-13653045.jpeg?auto=compress&cs=tinysrgb&w=600" },
    ],
  },
  {
    id: "oeufs_omelettes",
    photo: CAT_IMG.oeufs_omelettes,
    items: [
      { id: "omelette_aneth", price: 6.9, photo: "https://images.unsplash.com/photo-1677844592730-ce9c936d8f1a?auto=format&fit=crop&w=600&q=80" },
      { id: "omelette_tomate_fromage", price: 7.9, photo: "https://images.pexels.com/photos/10934498/pexels-photo-10934498.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: "omelette_fromage", price: 7.9, photo: "https://images.pexels.com/photos/11654228/pexels-photo-11654228.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: "omelette_simit", price: 8.9, photo: "https://images.unsplash.com/photo-1677844592730-ce9c936d8f1a?auto=format&fit=crop&w=600&q=80" },
      { id: "menemen", price: 8.9, photo: "https://images.pexels.com/photos/36863875/pexels-photo-36863875.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: "oeufs_kavurma", price: 9.9, photo: "https://images.unsplash.com/photo-1759216280661-e785edc3922e?auto=format&fit=crop&w=600&q=80" },
      { id: "oeufs_sucuk", price: 9.9, photo: "https://images.pexels.com/photos/35611241/pexels-photo-35611241.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: "assiette_mezze", price: 4.0, photo: "https://images.unsplash.com/photo-1749819400297-3f34695154a9?auto=format&fit=crop&w=600&q=80" },
      { id: "frites", price: 3.5, photo: "https://images.pexels.com/photos/19297802/pexels-photo-19297802.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: "supplement_fromage", price: 1.0 },
    ],
  },
  {
    id: "sandwichs",
    photo: CAT_IMG.sandwichs,
    items: [
      { id: "croissant_sale", price: 4.0, photo: "https://images.unsplash.com/photo-1639667852145-466e29aa49fd?auto=format&fit=crop&w=600&q=80" },
      { id: "sandwich_simit_acma", price: 5.5, photo: "https://images.pexels.com/photos/29389139/pexels-photo-29389139.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: "sandwich_tomate_mozza", price: 5.5, photo: "https://images.pexels.com/photos/13995330/pexels-photo-13995330.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: "sandwich_thon", price: 6.5, photo: "https://images.unsplash.com/photo-1712746784291-e29d5d2694d4?auto=format&fit=crop&w=600&q=80" },
      { id: "sandwich_poulet_curry", price: 6.5, photo: "https://images.unsplash.com/photo-1558985250-27a406d64cb3?auto=format&fit=crop&w=600&q=80" },
      { id: "sandwich_vegetarien", price: 6.5, photo: "https://images.pexels.com/photos/14410236/pexels-photo-14410236.jpeg?auto=compress&cs=tinysrgb&w=600" },
    ],
  },
  {
    id: "boreks",
    photo: CAT_IMG.boreks,
    items: [
      { id: "borek_epinards", price: 3.2, confirm: true },
      { id: "borek_pommes_terre", price: 3.2, confirm: true },
      { id: "borek_fromage", price: 3.2, confirm: true },
      { id: "borek_viande_hachee", price: 3.4, confirm: true },
    ],
  },
  {
    id: "toasts",
    photo: CAT_IMG.toasts,
    items: [
      { id: "toast_kasar", price: 3.5, photo: "https://images.unsplash.com/photo-1612827788868-c8632040ab64?auto=format&fit=crop&w=600&q=80" },
      { id: "toast_salami_fromage", price: 4.5, photo: "https://images.unsplash.com/photo-1475090169767-40ed8d18f67d?auto=format&fit=crop&w=600&q=80" },
      { id: "toast_chorizo_fromage", price: 4.5, photo: "https://images.pexels.com/photos/13995302/pexels-photo-13995302.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: "toast_galista", price: 5.5, photo: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80" },
    ],
  },
  {
    id: "viennoiseries",
    photo: CAT_IMG.viennoiseries,
    items: [
      { id: "croissant_pain_chocolat", price: 1.5, photo: "https://images.pexels.com/photos/30846579/pexels-photo-30846579.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: "croissant_framboise", price: 2.2 },
      { id: "bretzel", price: 1.7, photo: "https://images.pexels.com/photos/1571074/pexels-photo-1571074.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: "bretzel_gratine", price: 1.9, photo: "https://images.pexels.com/photos/24643898/pexels-photo-24643898.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: "simit_acma", price: 2.0, photo: "https://images.pexels.com/photos/19642548/pexels-photo-19642548.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: "pain_raisins", price: 2.0 },
      { id: "chausson_pommes", price: 2.0 },
      { id: "suisse_torsade_triangle", price: 2.0 },
      { id: "pogaca_fromage", price: 2.2 },
    ],
  },
  {
    id: "salades",
    photo: CAT_IMG.salades,
    items: [
      { id: "salade_saison", price: 6.9 },
      { id: "salade_poulet", price: 7.9, photo: "https://images.pexels.com/photos/1540420773420-31ed25ee0cdf.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: "salade_thon", price: 7.9, confirm: true },
    ],
  },
  {
    id: "patisseries",
    photo: CAT_IMG.patisseries,
    items: [
      { id: "mini_macarons", price: 1.2 },
      { id: "cookies", price: 2.5, photo: "https://images.unsplash.com/photo-1654178990976-b88c403b3257?auto=format&fit=crop&w=600&q=80" },
      { id: "muffin_pepites", price: 3.0, photo: "https://images.pexels.com/photos/8538747/pexels-photo-8538747.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: "muffin_maxi_choco", price: 3.9, photo: "https://images.pexels.com/photos/7190694/pexels-photo-7190694.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: "eclair_choco_vanille_cafe", price: 3.5, photo: "https://images.pexels.com/photos/14996842/pexels-photo-14996842.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: "brownie", price: 3.0, photo: "https://images.unsplash.com/photo-1519682214708-973477a2529a?auto=format&fit=crop&w=600&q=80" },
      { id: "moka_cafe", price: 3.5 },
      { id: "mille_feuille", price: 3.9, photo: "https://images.pexels.com/photos/14996845/pexels-photo-14996845.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: "macarons_framboise", price: 4.5 },
    ],
  },
  {
    id: "glaces",
    photo: CAT_IMG.glaces,
    flavorsNote: true,
    items: [
      {
        id: "glace_cone",
        variants: [
          { key: "scoop_1", price: 2.5 },
          { key: "scoop_2", price: 5.0 },
          { key: "scoop_3", price: 7.0 },
        ],
      },
      {
        id: "glace_pot",
        variants: [
          { key: "scoop_1", price: 2.2 },
          { key: "scoop_2", price: 4.4 },
          { key: "scoop_3", price: 6.0 },
        ],
      },
      { id: "glace_supplement", price: 0.5 },
    ],
  },
  {
    id: "milkshakes",
    photo: CAT_IMG.milkshakes,
    flavorsNote: true,
    items: [{ id: "milkshake", price: 6.0 }],
  },
  {
    id: "cafes",
    photo: CAT_IMG.cafes,
    items: [
      { id: "espresso", price: 2.2, photo: "https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?auto=format&fit=crop&w=600&q=80" },
      { id: "double_espresso", price: 3.8, photo: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?auto=format&fit=crop&w=600&q=80" },
      { id: "cafe_long", price: 3.0, photo: "https://images.pexels.com/photos/38523136/pexels-photo-38523136.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: "cafe_latte", price: 3.4, photo: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=600&q=80" },
      { id: "cappuccino", price: 3.6, photo: "https://images.unsplash.com/photo-1559001724-fbad036dbc9e?auto=format&fit=crop&w=600&q=80" },
      { id: "americano", price: 3.0, photo: "https://images.pexels.com/photos/11160148/pexels-photo-11160148.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: "latte_macchiato", price: 4.0, photo: "https://images.unsplash.com/photo-1593858736716-99cd5822e67a?auto=format&fit=crop&w=600&q=80" },
      { id: "cafe_turc", price: 3.0, photo: "https://images.unsplash.com/photo-1506778020041-0ea35027d019?auto=format&fit=crop&w=600&q=80" },
      { id: "cafe_noisette", price: 2.5 },
      { id: "ice_coffee", price: 3.4, photo: "https://images.pexels.com/photos/35229818/pexels-photo-35229818.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: "ice_latte", price: 3.7, photo: "https://images.pexels.com/photos/33237535/pexels-photo-33237535.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: "ice_cappuccino", price: 4.0, photo: "https://images.unsplash.com/photo-1787980421480-26454109d104?auto=format&fit=crop&w=600&q=80" },
      { id: "supplement_lait_avoine", price: 0.5 },
      { id: "saveur_gourmande", price: 1.0 },
    ],
  },
  {
    id: "boissons_chaudes",
    photo: CAT_IMG.boissons_chaudes,
    items: [
      { id: "the_turc", price: 2.0, photo: "https://images.pexels.com/photos/1493080/pexels-photo-1493080.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: "tisane_palais", price: 3.7, photo: "https://images.unsplash.com/photo-1622484212110-0c65f49e6ec6?auto=format&fit=crop&w=600&q=80" },
      { id: "lait_nature", price: 2.8 },
      { id: "lait_miel", price: 3.2, photo: "https://images.pexels.com/photos/5407267/pexels-photo-5407267.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: "chocolat_chaud", price: 3.5, photo: "https://images.unsplash.com/photo-1637572815755-c4b80092dce1?auto=format&fit=crop&w=600&q=80" },
      { id: "chocolat_chaud_lait", price: 4.0, photo: "https://images.unsplash.com/photo-1700488629510-bf60790ff9fc?auto=format&fit=crop&w=600&q=80" },
    ],
  },
  {
    id: "boissons_froides",
    photo: CAT_IMG.boissons_froides,
    items: [
      { id: "eau_cristaline_volvic", price: [1.5, 2.0] },
      { id: "carola_rouge_verte", price: 2.5 },
      { id: "lemonaid_charitea", price: 3.5 },
      { id: "jus_granini_pago", price: 3.0, photo: "https://images.unsplash.com/photo-1583577612013-4fecf7bf8f13?auto=format&fit=crop&w=600&q=80" },
      { id: "sodas", price: 2.5 },
      { id: "red_bull", price: 3.5 },
    ],
  },
];
