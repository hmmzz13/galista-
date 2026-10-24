# PRD — Galista Café (refonte du site officiel)

## Problème initial
Refonte complète du site officiel de Galista Café (46 Rue du Faubourg-National, 67000 Strasbourg — +33 6 31 11 95 83) : site vitrine haut de gamme, avec carte complète avec prix et ingrédients, avis Google, galerie, informations pratiques, trilingue FR/DE/EN, SEO local. Pas de commande/panier/paiement. Le site existant (galistacafe.fr) reste intact.

## Itération v2 (22/10/2026, retour client)
- Suppression complète de l'expérience 3D « Du grain à la tasse » (jugée trop animée) : le client doit accéder à la carte le plus vite possible.
- Hero simple : logo officiel fourni par le client (tasse turquoise + lettrage sable), titre officiel, sous-titre, 2 CTA.
- Identité « stambouliote » : turquoise Iznik #2F8B89 (extrait du logo) en accent principal, caramel conservé pour les prix/étoiles.
- Favicon PNG dérivé du logo officiel ; logo intégré dans la navigation, le hero, le footer et la carte d'informations.
- Animations réduites : révélations rapides au chargement, plus de scroll piloté par la 3D, lenis et reveals conservés (discrets).

## Itération v3 (22/10/2026, retour client) — direction artistique claire + 5 sections
- DA refondue : fond crème clair #FAF5EC, texte brun chocolat #4B3026, accents teal logo + terracotta #C26A3D. Plus aucun aplat marron foncé (hero, avis, infos, footer désormais clairs).
- Structure 5 sections max : 1. Hero plein écran (split : contenu crème + grande photo petit déjeuner turc, badge d'ouverture en direct, « Voir la carte » + « Itinéraire »), 2. La carte (onglets sticky, photo grand format par catégorie, prix terracotta, ingrédients), 3. Galerie mosaïque (8 photos, lightbox clavier), 4. Avis Google (4,8/5, ≈275 avis, 3 extraits AUTHENTIQUES relayés par strasbourg.food avec attribution exacte : Bhye T., Eda E., Çiğdem S.), 5. Infos pratiques (adresse, téléphone, Instagram, horaires, badge ouvert/fermé, carte 3D).
- Supprimé : Notre univers, Nos spécialités, marquee, placeholders « photo à venir ». Vraies photos (Unsplash/Pexels) marquées « image d'illustration » — remplaçables par les photos officielles.
- Badge horaire : calcul fiable fuseau Europe/Paris (Intl), état ouvert/fermé + prochaine ouverture, rafraîchi chaque minute, mention « horaires à confirmer ».
- Carte 3D : MapLibre GL (pitch 55-60, bearing animé, contrôles), tuiles OSM raster + attribution, marqueur tasse du logo, coordonnées exactes au numéro (7.735894, 48.582427 via api-adresse.data.gouv.fr, hardcodées — pas de géocodage runtime, Nominatim bloqué CORS). Import dynamique (lazy) + fallback statique.
- Instagram officiel https://www.instagram.com/galistacafe/ : infos pratiques, contact, footer.
- Mobile first : barre d'action fixe en bas « Appeler / Itinéraire » toujours accessible.
- Nav claire permanente, liens réduits (La carte, Galerie, Avis clients, Contact).
- CTAs mis à jour : « Voir la carte » / « Itinéraire » (FR/DE/EN).

## Décisions validées par l'utilisateur
1. Pas de formulaire de contact — contact par téléphone, adresse, itinéraire uniquement.
2. Structure one-page (sections ancrées).
3. Avis Google : valeurs vérifiées (4,8/5, ≈ 275 avis) avec date de vérification + bouton vers Google (sans API).
4. Photographies : emplacements réservés élégants (« photographie officielle à venir ») en attendant les photos officielles de l'établissement.
5. v2 : plus de 3D, rendu stambouliote, logo officiel, accès carte immédiat.

## Itération v4 (24/10/2026, retour client)
- Carrousel d'avis (Avis.jsx) : un avis à la fois (choix utilisateur) avec flèches gauche/droite, 10 points de navigation cliquables, compteur « n / 10 », balayage tactile (drag framer-motion, seuil 60 px) et bouclage infini. La section gagne en compacité.
- Texte de bannière changé en « La pause istanbulienne. » (choix utilisateur) + sous-titre pause/saveurs d'Istanbul — décliné DE (« Eine Auszeit wie in Istanbul. ») et EN (« A coffee break, the Istanbul way. »).
- Ingrédients enrichis : les 77 produits de la carte ont désormais une description détaillée de 1-2 phrases (origine, préparation, textures, saveurs) au lieu de listes de mots — rédigée en FR, DE et EN (clé items.*.ing).
- Écran de chargement 3D pur CSS (Loader.jsx) : tasse en cylindre 3D en rotation (20 tranches), grains en orbite, vapeur, soucoupe, barre de progression — pas de WebGL ni Three.js (contrainte v2 conservée). Durée ~2 s + fondu 0,45 s, une seule fois par session (sessionStorage galista-loader-seen), 0,5 s en prefers-reduced-motion, scroll bloqué pendant l'affichage.
- Tests : agent de test iteration_1.json — 100 % réussi (loader, hero 3 langues, carrousel flèches/dots/drag/bouclage, ingrédients enrichis, régressions nav/carte/badge/carte MapLibre, pas d'overflow desktop/mobile, pas d'erreur console nouvelle). Reste connu : warning MapLibre worker préexistant (non bloquant, la carte s'affiche).

## Itération v5 (24/10/2026, retour client)
- Avis en auto-défilement (choix utilisateur : toutes les 3 secondes) : le carrousel avance seul, bouton pause/reprise rond à côté du compteur (icônes lucide Pause/Play, aria-pressed, libellés traduits FR/DE/EN), timer réinitialisé à chaque navigation manuelle, désactivé par défaut en prefers-reduced-motion.
- Flux Instagram dans la galerie (InstagramFeed.jsx) : intégration officielle sans clé API (blockquote + embed.js) au sein de la section #galerie — chargement au clic (« Charger les publications ») pour ne contacter Instagram qu'après consentement explicite du visiteur (visiteurs UE), détection d'iframe par polling (400 ms, max 8 s) et repli élégant vers le profil @galistacafe en cas d'échec. Clés i18n instagram.* dans les 3 langues + mention de confidentialité ajoutée à footer.privacy_body.
- Choix d'intégration validé par le playbook : embed officiel de profil Instagram (pas d'API Meta, pas de widget payant, pas de scraping) — le nombre/le rendu des publications est contrôlé par Instagram.
- Tests : agent de test iteration_2.json — 100 % réussi (défilement 3 s mesuré, pause figée 4,5 s, reprise, reset du timer au clic manuel, zéro requête instagram.com avant le clic, iframe chargée en ~5 s, i18n DE/EN, lightbox et régressions OK).

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

## Itération v4 (22/10/2026, retour client)
- Photo par PLAT dans la carte : chaque produit affiche une vignette (76-96px) à gauche du nom. Mécanisme en cascade : 1) photo officielle de l'établissement si le fichier public/photos/<id>.jpg existe (dépôt sans toucher au code, documenté dans public/photos/README.txt), 2) image d'illustration produit (images.unsplash/pexels sourcées pour ~45 produits : petits déjeuners, omelettes, menemen, mezze, frites, sandwichs, toasts, croissants, bretzels, simit, cookies, muffins, éclairs, brownies, mille-feuille, cafés, thés, chocolats chauds, jus…), 3) photo de la catégorie.
- 10 avis Google authentiques affichés (minimum demandé) : 5 nommés notés 5/5 relayés par strasbourg.food (Bhye T., Hafize A., Eda E., Richard A., Çiğdem S.) + 5 anonymes relayés par exa.ai, textes d'origine conservés (non traduits), sources citées avec liens. Note agrégée 4,8/5 · ≈ 275 avis inchangée.

## Personas
- Client de passage à Strasbourg (mobile) : horaires, itinéraire, téléphone ou carte — tout est accessible dès le premier écran.
- Client régulier : consulte la carte et les spécialités turques via les raccourcis.
- Établissement : remplace les emplacements photo par ses photos officielles, fait confirmer prix, horaires, ingrédients détaillés et allergènes.

## Backlog priorisé
- P0 : remplacer les images d'illustration par les photographies officielles (dépôt des fichiers dans public/photos/<id>.jpg) ; faire confirmer par l'établissement prix, horaires, ingrédients détaillés (böreks, sauces) et allergènes.
- P1 : canonical + sitemap.xml + hreflang dès que le domaine de production est connu.
- P2 : formulaire de contact éventuel (Resend), JSON-LD horaires/aggregateRating après vérification.

## Itération v6 (22/10/2026, retour client)
- Bannière photo pleine largeur avec la photographie officielle de l'intérieur du café (arches turquoise, néon Galista, vitrine à pâtisseries) : parallaxe douce au scroll + respiration du zoom, label « Notre café à Strasbourg » traduit, placée entre la carte et la galerie.
- Même photo officielle en tête de galerie avec badge vert « Photo officielle » (les autres restent des images d'illustration, alt honnêtes). Fichier optimisé : public/photos/cafe-interior.jpg (1920×1080, 414 KB).

## Itération v7 (22/10/2026, retour client)
- Bannière principale de début de page : illustration fournie par le client (intérieur chaleureux du café, style animé, Dola AI) placée en fond du hero pleine largeur, watermark rogné, fichier public/photos/hero-illustration.jpg (736×414, 59 KB).
- Hero recomposé : parallaxe douce (y + scale au scroll), voile dégradé crème (fort à gauche sur desktop, dense sur mobile), contenu aligné à gauche sur desktop / centré sur mobile, logo + titre + sous-titre + badge d'ouverture + CTA « Voir la carte » / « Itinéraire » (+ « Appeler » sur mobile), tag « image d'illustration » discret.
- La photographie officielle de l'intérieur reste en bannière secondaire entre la carte et la galerie.

## Itération v5 (22/10/2026, retour client)
- Carte 3D animée : rotation automatique douce en continu (pattern moveend MapLibre), pause à l'interaction et reprise après 4 s, bouton pause/reprise, désactivée si prefers-reduced-motion.
- État ouvert/fermé relié partout : badge vert « Ouvert · jusqu'à HH:MM » (ou terracotta « Fermé · ouvre… ») superposé sur la carte, anneau de la carte vert quand ouvert / terracotta quand fermé, marqueur tasse bordé de la même couleur, ligne du jour courant surlignée dans le tableau des horaires avec badge « Aujourd'hui » (vert si ouvert, terracotta si fermé).
- Hook useOpenState partagé (rafraîchi chaque minute, fuseau Europe/Paris).


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
