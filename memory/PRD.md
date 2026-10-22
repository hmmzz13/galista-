# PRD — Galista Café (refonte du site officiel)

## Problème initial
Refonte complète du site officiel de Galista Café (46 Rue du Faubourg-National, 67000 Strasbourg — +33 6 31 11 95 83) : site vitrine haut de gamme, avec carte complète avec prix et ingrédients, avis Google, galerie, informations pratiques, trilingue FR/DE/EN, SEO local. Pas de commande/panier/paiement. Le site existant (galistacafe.fr) reste intact.

## Itération v2 (22/10/2026, retour client)
- Suppression complète de l'expérience 3D « Du grain à la tasse » (jugée trop animée) : le client doit accéder à la carte le plus vite possible.
- Hero simple : logo officiel fourni par le client (tasse turquoise + lettrage sable) mis en scène sur fond brun profond avec motif étoile de Seldjouk, titre officiel, sous-titre, 2 CTA, et une rangée de raccourcis vers la carte (Petits déjeuners, Café turc, Böreks, Pâtisseries, Glaces) qui ouvrent la carte directement sur la bonne catégorie.
- Identité « stambouliote » : turquoise Iznik #2F8B89 (extrait du logo) en accent principal (boutons, kickers, pills actifs, marquee, cadres), caramel conservé pour les prix/étoiles, motifs ottomans (étoile à huit branches) en ornement et trame de fond, marque cup SVG dérivée du logo.
- Favicon PNG dérivé du logo officiel ; logo intégré dans la navigation, le hero, le footer et la carte d'informations.
- Animations réduites : révélations rapides au chargement, plus de scroll piloté par la 3D, lenis et reveals conservés (discrets).

## Décisions validées par l'utilisateur
1. Pas de formulaire de contact — contact par téléphone, adresse, itinéraire uniquement.
2. Structure one-page (sections ancrées).
3. Avis Google : valeurs vérifiées (4,8/5, ≈ 275 avis) avec date de vérification + bouton vers Google (sans API).
4. Photographies : emplacements réservés élégants (« photographie officielle à venir ») en attendant les photos officielles de l'établissement.
5. v2 : plus de 3D, rendu stambouliote, logo officiel, accès carte immédiat.

## Architecture
- Frontend React (CRA) one-page routé par langue : /fr, /de, /en (redirection / selon langue mémorisée ou navigateur).
- i18next + react-i18next : src/i18n/{fr,de,en}.json — 77 produits entièrement traduits (noms, descriptions, ingrédients) + UI complète.
- Données centralisées : src/data/menu.js (catégories, produits, prix, flags « à confirmer ») et src/data/site.js (coordonnées, horaires, avis, liens).
- Lenis (scroll fluide, désactivé si prefers-reduced-motion), framer-motion (révélations, micro-interactions), marquee éditorial turquoise.
- Backend FastAPI inchangé (santé /api) — aucune donnée n'est collectée (pas de formulaire).
- SEO : head statique FR (title, description, OG, Twitter, JSON-LD CafeOrCoffeeShop avec adresse/téléphone confirmés), robots.txt, llms.txt, favicon PNG (logo officiel), noscript, hiérarchie H1/H2/H3, alt, liens <a> réels. Canonical/sitemap/hreflang omis volontairement tant que le domaine de production n'est pas confirmé (à activer au déploiement).

## Implémenté
- 22/10/2026 (v1) : site complet trilingue, carte 13 catégories, avis, infos pratiques, galerie lightbox, footer légal.
- 22/10/2026 (v2) : refonte hero sans 3D avec logo officiel + accès rapide carte, palette stambouliote (Iznik #2F8B89), motifs ottomans, marquee turquoise, favicon/logo intégrés.

## Personas
- Client de passage à Strasbourg (mobile) : horaires, itinéraire, téléphone ou carte — tout est accessible dès le premier écran.
- Client régulier : consulte la carte et les spécialités turques via les raccourcis.
- Établissement : remplace les cadres réservés par ses photos officielles, fait confirmer prix/horaires/ingrédients.

## Backlog priorisé
- P0 : remplacer les emplacements réservés par les photographies officielles ; faire confirmer par l'établissement prix, horaires, ingrédients détaillés (böreks, sauces) et allergènes ; confirmer le compte Instagram officiel puis l'ajouter.
- P1 : canonical + sitemap.xml + hreflang dès que le domaine de production est connu.
- P2 : formulaire de contact éventuel (Resend), JSON-LD horaires/aggregateRating après vérification.


## Décisions validées par l'utilisateur (ask_human)
1. Pas de formulaire de contact — contact par téléphone, adresse, itinéraire uniquement.
2. Structure one-page (sections ancrées).
3. Avis Google : valeurs vérifiées (4,8/5, ≈ 275 avis) avec date de vérification + bouton vers Google (sans API).
4. Photographies : emplacements réservés élégants (« photographie officielle à venir ») en attendant les photos officielles de l'établissement.

## Architecture
- Frontend React (CRA) one-page routé par langue : /fr, /de, /en (redirection / selon langue mémorisée ou navigateur).
- i18next + react-i18next : src/i18n/{fr,de,en}.json — 77 produits entièrement traduits (noms, descriptions, ingrédients) + UI complète.
- Données centralisées : src/data/menu.js (catégories, produits, prix, flags « à confirmer ») et src/data/site.js (coordonnées, horaires, avis, liens).
- 3D : Three.js + @react-three/fiber (src/components/three/Experience.jsx) — grain procédural (géométrie déformée + texture canvas), particules café, disque vortex espresso (shader GLSL), tasse en céramique crème (LatheGeometry) avec latte art + nom GALISTA CAFÉ, vapeur, grains en orbite, caméra synchronisée au scroll (hero sticky 520vh), parallaxe souris, version mobile allégée, fallback statique si WebGL indisponible ou prefers-reduced-motion.
- Lenis (scroll fluide, désactivé si reduced-motion), framer-motion (révélations, micro-interactions), marquee éditorial caramel.
- Backend FastAPI inchangé (santé /api) — aucune donnée n'est collectée (pas de formulaire).
- SEO : head statique FR (title, description, OG, Twitter, JSON-LD CafeOrCoffeeShop avec adresse/téléphone confirmés), robots.txt, llms.txt, favicon SVG original (grain de café), noscript, hiérarchie H1/H2/H3, alt, liens <a> réels. Canonical/sitemap/hreflang omis volontairement tant que le domaine de production n'est pas confirmé (à activer au déploiement).

## Implémenté (22/10/2026)
- Hero 3D « Du grain à la tasse » : scène 1 (grain + logo), scène 2 (particules + vortex), scène 3 (tasse + titre + CTA), scène 4 (tasse glisse à droite), indicateur de scroll, fallback.
- Navigation transparente → crème verre au scroll, menu mobile animé, sélecteur FR/DE/EN, bouton « Nous trouver ».
- Sections : Notre univers, marquee, La carte (13 catégories, onglets, leaders pointillés, ingrédients, badges « à confirmer », lexique des termes turcs), Nos spécialités (7, liens vers la carte avec présélection), Galerie (bento + lightbox clavier), Avis Google (4,8/5, ≈ 275 avis, vérifié le 22/10/2026), Informations pratiques (adresse, téléphone, horaires + mention à confirmer, Google Maps), Contact (appel + itinéraire), Footer complet (modales mentions légales/confidentialité avec champs à compléter par l'établissement).
- Trilingue intégral, mémorisé (localStorage), prix identiques formatés par langue (9,90 € / €9.90).

## Personas
- Client de passage à Strasbourg (mobile) : trouve horaires, itinéraire, téléphone en 2 taps.
- Client régulier : consulte la carte et les spécialités turques.
- Établissement : remplace les cadres réservés par ses photos officielles, fait confirmer prix/horaires/ingrédients.

## Backlog priorisé
- P0 : remplacer les emplacements réservés par les photographies officielles ; faire confirmer par l'établissement prix, horaires, ingrédients détaillés (böreks, sauces) et allergènes ; confirmer le compte Instagram officiel puis l'ajouter.
- P1 : canonical + sitemap.xml + hreflang à générer dès que le domaine de production est connu ; balises hreflang /fr/ /de/ /en/.
- P2 : formulaire de contact éventuel (Resend), données structurées d'horaires après confirmation, JSON-LD aggregateRating après vérification des chiffres réels.
