// Structure centralisée de la carte — prix et produits relevés sur la carte en
// ligne de Galista Café (https://www.galistacafe.fr/menu/). Les noms, descriptions
// et ingrédients traduits vivent dans src/i18n/{fr,de,en}.json, clé « items ».
// flag `confirm` = recette détaillée à confirmer par l'établissement.
// `photo` = image d'illustration de la catégorie (remplaçable par les photos officielles).

const IMG = {
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
    photo: IMG.petits_dejeuners,
    items: [
      { id: "petit_dej_classique", price: 9.9 },
      { id: "petit_dej_galista", price: 12.9 },
    ],
  },
  {
    id: "oeufs_omelettes",
    photo: IMG.oeufs_omelettes,
    items: [
      { id: "omelette_aneth", price: 6.9 },
      { id: "omelette_tomate_fromage", price: 7.9 },
      { id: "omelette_fromage", price: 7.9 },
      { id: "omelette_simit", price: 8.9 },
      { id: "menemen", price: 8.9 },
      { id: "oeufs_kavurma", price: 9.9 },
      { id: "oeufs_sucuk", price: 9.9 },
      { id: "assiette_mezze", price: 4.0 },
      { id: "frites", price: 3.5 },
      { id: "supplement_fromage", price: 1.0 },
    ],
  },
  {
    id: "sandwichs",
    photo: IMG.sandwichs,
    items: [
      { id: "croissant_sale", price: 4.0 },
      { id: "sandwich_simit_acma", price: 5.5 },
      { id: "sandwich_tomate_mozza", price: 5.5 },
      { id: "sandwich_thon", price: 6.5 },
      { id: "sandwich_poulet_curry", price: 6.5 },
      { id: "sandwich_vegetarien", price: 6.5 },
    ],
  },
  {
    id: "boreks",
    photo: IMG.boreks,
    items: [
      { id: "borek_epinards", price: 3.2, confirm: true },
      { id: "borek_pommes_terre", price: 3.2, confirm: true },
      { id: "borek_fromage", price: 3.2, confirm: true },
      { id: "borek_viande_hachee", price: 3.4, confirm: true },
    ],
  },
  {
    id: "toasts",
    photo: IMG.toasts,
    items: [
      { id: "toast_kasar", price: 3.5 },
      { id: "toast_salami_fromage", price: 4.5 },
      { id: "toast_chorizo_fromage", price: 4.5 },
      { id: "toast_galista", price: 5.5 },
    ],
  },
  {
    id: "viennoiseries",
    photo: IMG.viennoiseries,
    items: [
      { id: "croissant_pain_chocolat", price: 1.5 },
      { id: "croissant_framboise", price: 2.2 },
      { id: "bretzel", price: 1.7 },
      { id: "bretzel_gratine", price: 1.9 },
      { id: "simit_acma", price: 2.0 },
      { id: "pain_raisins", price: 2.0 },
      { id: "chausson_pommes", price: 2.0 },
      { id: "suisse_torsade_triangle", price: 2.0 },
      { id: "pogaca_fromage", price: 2.2 },
    ],
  },
  {
    id: "salades",
    photo: IMG.salades,
    items: [
      { id: "salade_saison", price: 6.9 },
      { id: "salade_poulet", price: 7.9 },
      { id: "salade_thon", price: 7.9, confirm: true },
    ],
  },
  {
    id: "patisseries",
    photo: IMG.patisseries,
    items: [
      { id: "mini_macarons", price: 1.2 },
      { id: "cookies", price: 2.5 },
      { id: "muffin_pepites", price: 3.0 },
      { id: "muffin_maxi_choco", price: 3.9 },
      { id: "eclair_choco_vanille_cafe", price: 3.5 },
      { id: "brownie", price: 3.0 },
      { id: "moka_cafe", price: 3.5 },
      { id: "mille_feuille", price: 3.9 },
      { id: "macarons_framboise", price: 4.5 },
    ],
  },
  {
    id: "glaces",
    photo: IMG.glaces,
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
    photo: IMG.milkshakes,
    flavorsNote: true,
    items: [{ id: "milkshake", price: 6.0 }],
  },
  {
    id: "cafes",
    photo: IMG.cafes,
    items: [
      { id: "espresso", price: 2.2 },
      { id: "double_espresso", price: 3.8 },
      { id: "cafe_long", price: 3.0 },
      { id: "cafe_latte", price: 3.4 },
      { id: "cappuccino", price: 3.6 },
      { id: "americano", price: 3.0 },
      { id: "latte_macchiato", price: 4.0 },
      { id: "cafe_turc", price: 3.0 },
      { id: "cafe_noisette", price: 2.5 },
      { id: "ice_coffee", price: 3.4 },
      { id: "ice_latte", price: 3.7 },
      { id: "ice_cappuccino", price: 4.0 },
      { id: "supplement_lait_avoine", price: 0.5 },
      { id: "saveur_gourmande", price: 1.0 },
    ],
  },
  {
    id: "boissons_chaudes",
    photo: IMG.boissons_chaudes,
    items: [
      { id: "the_turc", price: 2.0 },
      { id: "tisane_palais", price: 3.7 },
      { id: "lait_nature", price: 2.8 },
      { id: "lait_miel", price: 3.2 },
      { id: "chocolat_chaud", price: 3.5 },
      { id: "chocolat_chaud_lait", price: 4.0 },
    ],
  },
  {
    id: "boissons_froides",
    photo: IMG.boissons_froides,
    items: [
      { id: "eau_cristaline_volvic", price: [1.5, 2.0] },
      { id: "carola_rouge_verte", price: 2.5 },
      { id: "lemonaid_charitea", price: 3.5 },
      { id: "jus_granini_pago", price: 3.0 },
      { id: "sodas", price: 2.5 },
      { id: "red_bull", price: 3.5 },
    ],
  },
];
