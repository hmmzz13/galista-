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

## Itération v6 (24/10/2026, retour client)
- Horaires officiels confirmés par l'établissement : lundi-jeudi 07:00-17:00, vendredi-dimanche 07:00-16:00 (identiques aux valeurs déjà codées — vérifié ligne à ligne). Badge Ouvert/Fermé désormais juste à 100 %.
- Retiré la mention « horaires à confirmer par l'établissement » : remplacée par « Horaires officiels — le café est ouvert 7 jours sur 7. » (DE/EN traduits), flag `hoursToConfirm` supprimé de site.js (jamais lu ailleurs ; `pricesToConfirm` reste vrai — prix toujours à confirmer).
- Vérifié par capture : badge « Ouvert · jusqu'à 16:00 » correct le samedi, 7 jours listés à l'identique du confirmation client, ancienne mention absente.

## Itération v7 (24/10/2026, liste de 15 corrections client)
Bugs corrigés :
1. Avis : garde `hasQuotes` — le carrousel (données réelles nom/étoiles/texte) se masque automatiquement si les données disparaissent ; la note 4,8, « ≈ 275 avis Google » et le bouton Google restent.
2. Ligne coupée sous les onglets de la carte : barre collante passée en fond 100 % solide (fini le 95 % + flou qui montrait la moitié des lignes glissant dessous) + bordure basse.
3. Onglets mobiles : une seule ligne à défilement horizontal (flex-nowrap, pills flex:none) avec recentrage automatique de l'onglet actif (scrollIntoView inline:center <1024 px).
4. Badge « Made with Emergent » : script de masquage (MutationObserver, textes fixed/absolute) dans index.html — le watermark injecté à l'deployment disparaît.
5. Instagram : plus de bouton « Charger les publications » — l'embed officiel sans clé se charge automatiquement à l'entrée dans le viewport (IntersectionObserver) ; échec (8 s) → carte simple @galistacafe + « Voir sur Instagram ».
Design :
6. Label « INGRÉDIENTS » retiré (description seule), lignes aérées (gap-y-10), prix alignés à droite.
7. Contraste : cafemuted #6E5B53 → #5C4A42 (>7:1 AA), textes brun/70 → /85.
8. Hero : photo plein écran de la salle turquoise + overlay sombre léger (dégradé brunprofond), texte crème + iznik clair #7EC8C6, logo sur pastille crème, plus d'effet pâle/flou ni de mentions « IMAGE D'ILLUSTRATION » / « PHOTO OFFICIELLE » / « photographies officielles à venir ».
9. Carte « Nous trouver » : plate et lisible (pitch 0, plus de rotation ni bouton pause), boutons Appeler / Google Maps conservés.
10. Barre mobile bas confirmée (Appeler + Itinéraire) + padding safe-area iOS.
SEO/technique (skill farm-seo-setup) :
11. og-image.jpg 1200x630 (photo salle) + og:image absolu + dimensions/alt + twitter:card summary_large_image.
12. JSON-LD CafeOrCoffeeShop enrichi : url, image, geo, 2 openingHoursSpecification (lun-jeu 7h-17h, ven-dim 7h-16h), sameAs Instagram, aggregateRating 4.8/275 (confirmés par le client) ; noscript mis à jour (« La pause istanbulienne », horaires officiels).
13. Canonical https://www.galistacafe.fr/fr + hreflang fr/en/de/x-default + sitemap.xml (3 routes) + ligne Sitemap dans robots.txt ; favicon présent ; domaine fourni par le client sans connexion DNS demandée.
16. Mention allergènes « Pour toute information sur les allergènes, demandez à notre équipe. » en bas de la carte.
- Tests : agent de test iteration_3.json — 100 % (15/15 points, FR desktop + mobile 375-390 px, DE/EN sans clé brute, og-image 200 image/jpeg, robots text/plain + sitemap application/xml, embed Instagram chargé, aucun débordement, pas d'erreur console nouvelle).

## Itération v8 (24/10/2026, retour client : menu simplifié)
- Carte refondue « tout sur une page » : les 13 catégories (78 produits) sont affichées l'une sous l'autre — plus de changement d'onglet ni de remontée nécessaire. La barre d'onglets collante est devenue une navigation : saut direct vers la catégorie (ancres #menu-<id>, calcul manuel getBoundingClientRect + scrollY, offset -155 mobile / -180 desktop via Lenis) et scroll-spy qui surligne automatiquement la catégorie lue (seuils 170/210 px, bas de page = dernière catégorie). L'onglet actif se recentre seul dans la barre défilante mobile.
- Toutes les images de la carte retirées (miniatures produits + photo de catégorie) — l'établissement enverra ses propres photos ; champs photo conservés dans menu.js pour la réintégration future.
- Section « Les mots de la carte » (glossaire) supprimée du rendu ; clés carte.glossary_title/glossary vidées dans les 3 langues.
- Lignes aérées en grille 2 colonnes desktop / 1 colonne mobile ; variantes Glaces et encadré « Parfums recensés » conservés ; allergènes en bas.
- Tests : agent de test iteration_4.json — 100 % (13 catégories FR/DE/EN, 0 image, sauts précis top 154-180 px desktop et mobile, scroll-spy complet jusqu'au bas de page, onglet actif visible, 0 erreur JS, pas d'overflow).

## Itération v9 (24/10/2026, retour client : prix officiels)
- Prix confirmés par le client : mention « à confirmer par l'établissement avant publication » retirée partout — bloc de note prix supprimé de l'en-tête de la carte, ligne retirée du bas du footer, flag site.js passé à pricesToConfirm: false.
- Sous-titre de la carte reformulé : « les prix sont ceux de la carte de l'établissement. » (DE/EN traduits).
- Le badge « Ingrédients à confirmer » reste affiché sur les böreks et la salade au thon (seuls les prix ont été confirmés, pas tous les ingrédients).
- Vérifié par captures : plus aucune mention prix à confirmer dans #carte ni footer, sous-titre officiel en place, badge ingrédients conservé, scroll-spy Böreks actif.

## Itération v10 (24/10/2026, retour client : menu « flyer » avec photos)
- Le client trouvait la carte trop longue à parcourir pour choisir (« comme un flyer qu'on balaye d'un coup d'œil ») → refonte FLYER COMPACT (choix retenu, avis client) :
  - Une photo à côté de chaque plat (64 px mobile / 72 px desktop) — ProductImage avec chaîne de repli : /photos/<id>.jpg (futures photos officielles) → item.photo → cat.photo → marqueur BeanMark. Le client enverra ses vraies photos ; elles s'intégreront automatiquement.
  - Texte riche conservé mais en petit (text-xs) ; la ligne résumée « desc » supprimée quand « ing » existe (fini le doublon).
  - Grille compacte : 1 colonne mobile / 2 colonnes md / 3 colonnes xl ; interlignes réduits ; hauteur carte ~5 700 px (avant : ~8 000 px+).
  - Navigation conservée : onglets collants, sauts d'ancre précis (offset -155/-180), scroll-spy (170/210), recentrage mobile.
- Bug corrigé (remonté par l'agent de test iteration_5, HIGH) : « NaN € » affiché sur la ligne de prix des produits à variantes seulement (Cornet/Pot de glace) — la ligne prix n'est plus rendue quand item.price est absent ; variantes 1/2/3 boules intactes. Vérifié FR/DE/EN.
- Doublon visuel corrigé : l'encadré « Parfums recensés » ne s'affiche plus deux fois de suite (retiré de Milk-shakes, conservé sur Glaces).
- Tests : agent de test iteration_5.json — 95 % puis correctifs vérifiés (77 photos OK, 0 cassée, sauts précis desktop/mobile, scroll-spy complet, i18n propre, pas d'overflow).

## Itération v12 (26/10/2026, retour client : badge lisible + loader logo + ingrédients confirmés)
- BUG corrigé : badge Ouvert/Fermé illisible sur la bannière sombre (fonds translucides 15 %) → badge SOLIDE partout : ouvert = fond vert #3E9B63 + texte blanc + point blanc pulsant (contraste 4,7:1, WCAG AA) ; fermé = fond terracotta + texte crème. Lisible au hero, sur la puce de la carte MapLibre et dans la section horaires.
- Ingrédients confirmés par le client : badges orange « Ingrédients à confirmer » retirés (5 drapeaux menu.js : 4 böreks + salade au thon, bloc de rendu MenuRow supprimé, clé i18n confirm_badge vidée ×3).
- Loader amélioré avec le logo officiel : /logo.png (identique md5 au fichier client) en 96 px avec ombre douce, flottement et fade-in d'entrée, au-dessus de la tasse 3D CSS réduite (rayon 28, soucoupe 104), tagline en fade décalé, barre de progression — durée totale inchangée (~2 s + fondu), une fois par session.
- Tests : agent de test iteration_6.json — 100 % (badge hero/carte/infos lisibles, 0 badge à confirmer en FR/DE/EN, loader desktop+mobile sans overlap ni débordement, aucune régression).

## Itération v11 (24/10/2026, photos officielles de la galerie)
- 5 photographies officielles fournies par l'établissement, optimisées (max 1600 px, JPEG ~84, 147-286 Ko) et intégrées dans public/photos/ : galerie-patisseries.jpg (vitrine croissants), galerie-boissons.jpg (machine espresso rex-royle dans la vapeur), galerie-petits-dejeuners.jpg (espresso + journal + croissant), galerie-specialites.jpg (œuvre simit + thé turc), galerie-ambiance.jpg (néon Galista Café sur mur végétal).
- Galerie passée de 8 à 6 encadrés — uniquement des photos officielles, plus aucun placeholder Unsplash/Pexels ; spans ajustés pour une mosaïque pleine (2x2 + 2 + 1 + 1 + 2 + 2) ; alt texts simplifiés (labels i18n) ; logique lightbox simplifiée (src direct).
- Libellés des encadrés réduits à 6 dans les 3 langues (fr/de/en galerie.frames).
- Vérifié par captures (desktop + mobile 375) : 6 photos chargent (naturalWidth > 0), lightbox ouvre la bonne photo avec légende « 4 / 6 — Les pâtisseries », fermeture OK, pas de débordement.
- Reste à recevoir : photos officielles des plats pour la carte (les placeholders Unsplash de la carte attendent les vraies).

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
