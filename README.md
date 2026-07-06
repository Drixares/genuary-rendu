# GENUARY 2025 — Une exposition

31 œuvres génératives pour [Genuary 2025](https://genuary.art), présentées comme
un musée numérique : un plan de la collection, des salles avec cartels, un livret
imprimable et un médiateur scripté (sans IA).

Projet réalisé par **Mattéo Marchelli** dans le cadre du cours Veille & Techno — IIM B3.

---

## Le concept

Le site est une exposition :

| Salle du musée   | Ce que c'est |
|------------------|--------------|
| **Le plan** (`#/`)          | Mosaïque des 31 vignettes génératives, rendues paresseusement ; les œuvres animées s'animent au survol |
| **Les salles** (`#/jour/07`) | Une œuvre plein écran + son cartel (prompt officiel, note d'intention, technique, seed) ; navigation ← → au clavier, bouton « Régénérer » |
| **L'artiste** (`#/artiste`)  | Bio |
| **L'exposition** (`#/exposition`) | Le challenge Genuary et les contraintes choisies |
| **Le livret** (`#/livret`)   | Édition imprimable A4 : couverture, les 31 œuvres capturées à la volée, textes, QR code |
| **Contact** (`#/contact`)    | Email, GitHub, site |
| **Le médiateur** (bouton flottant) | Chatbot non-IA écrit à la main ; il répond et peut guider la visite (« surprends-moi » téléporte dans une salle) |

Les 31 prompts sont les **prompts officiels Genuary 2025**, reproduits verbatim
sur les cartels avec leurs crédits.

## Lancer le site

Site 100 % statique, zéro dépendance, zéro build. Les modules ES exigent juste
un serveur HTTP :

```bash
python3 -m http.server 8000     # ou : npx serve .
# → http://localhost:8000
```

## Lancer les tests

La logique pure (PRNG, données, routeur, intents du médiateur, contrat des
31 sketches) est testée avec le runner intégré de Node (≥ 18) :

```bash
node --test tests/*.test.mjs
```

## Architecture

```
index.html                  coquille : header, <main id="view">, footer
css/
  base.css                  jetons de design (white cube), reset, typographie
  layout.css                plan, salle, pages, médiateur, aperçu livret
  print.css                 le livret en A4 (seul contenu imprimé)
js/
  app.js                    bootstrap : routeur → montage des vues
  router.js                 parseHash pur + startRouter (#/jour/NN, #/artiste…)
  data/
    config.js               identité (nom, email, GitHub, site, œuvre favorite)
    exhibition.js           les 31 entrées : prompt officiel, titre, note, technique
  core/
    prng.js                 PRNG seedé (fnv1a + mulberry32) — même seed, même image
    canvas.js               fitCanvas (DPR), runSketch (boucle rAF / frame unique)
    intents.js              le cerveau du médiateur (matching mots-clés, pur)
  sketches/
    index.js                registre Map des 31 modules
    jan-01.js … jan-31.js   une œuvre = un module
  ui/
    floorplan.js            la mosaïque (IntersectionObserver, survol animé)
    room.js                 la salle (cartel, clavier, régénération de seed)
    pages.js                artiste / exposition / livret / contact
    mediator.js             le widget du médiateur
tests/                      node --test (prng, données, routeur, intents, sketches)
assets/
  icons/favicon.svg
  images/qr-code.png        QR réel vers matteo-marchelli.com
```

## Le contrat d'un sketch

Chaque œuvre est un module indépendant :

```js
// js/sketches/jan-32.js (exemple d'ajout)
export default {
  animated: false,                 // true = boucle requestAnimationFrame
  draw(ctx, w, h, rand, t) {       // t en secondes, rand = PRNG seedé recréé à chaque frame
    ctx.fillStyle = '#f5f1e8';
    ctx.fillRect(0, 0, w, h);
  },
};
```

Règles :

- **Déterminisme** : `rand` est recréé depuis la seed à chaque frame — consommer
  les tirages dans le même ordre à chaque frame, et n'utiliser que `t` pour le
  mouvement. Même seed ⇒ même image, y compris en animation.
- **Pas de DOM au niveau module** : les modules sont importés sous Node par les
  tests. (`OffscreenCanvas`/`ImageData` dans `draw` sont shimés par le smoke test.)
- Déclarer le module dans `js/sketches/index.js` et ses métadonnées dans
  `js/data/exhibition.js`.

## Personnaliser

Tout part de `js/data/config.js` : nom, rôle, email, GitHub, site, et
`favoriteId` (l'œuvre marquée d'un point rouge sur le plan, cible de la question
« ta préférée ? » du médiateur).

## Imprimer le livret

Aller sur **Le livret** (`#/livret`) puis `Cmd/Ctrl + P` (ou le bouton
« Imprimer le livret »). La feuille `css/print.css` compose un A4 : couverture,
mosaïque des 31 captures (générées à l'instant depuis les canvas), textes et QR
code. Activer « Imprimer les arrière-plans » pour les œuvres sombres.

## Accessibilité

- `prefers-reduced-motion: reduce` : aucune boucle d'animation, frame fixe.
- Navigation clavier dans les salles (`←` `→` `Échap`), ARIA sur les contrôles.

## Crédits

- Prompts © [genuary.art](https://genuary.art) et leurs auteurs (crédités sur chaque cartel).
- Sketches, site et textes : Mattéo Marchelli — cours Veille & Techno, IIM B3.
