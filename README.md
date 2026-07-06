# GENUARY 2025 — Site éditorial

Site final autour des 31 sketches Genuary 2025, avec chatbot non-IA et section Big Zine.

---

## Concept

Ce projet regroupe :
- **31 sketches** Canvas 2D en JavaScript vanilla, réalisés chaque jour de janvier 2025 pour le challenge [Genuary](https://genuary.art)
- **Un site éditorial expérimental** qui les présente avec une interface asymétrique, typographiée et filtrable
- **Un chatbot non-IA scripté** (aucun appel API, logique entièrement écrite à la main)
- **Une section Big Zine** préparée pour l'impression saddle-stitched, avec `@media print` dédié

---

## Lancer le site

Le site est entièrement statique — il suffit d'un serveur HTTP local pour que les modules ES6 fonctionnent.

**Option 1 — Node.js :**
```bash
npx serve .
```

**Option 2 — Python :**
```bash
python -m http.server 8000
```

**Option 3 — VS Code Live Server :**
Clic droit sur `index.html` → "Open with Live Server"

> Ouvrir directement `index.html` avec `file://` peut bloquer les modules ES6 dans certains navigateurs.

---

## Structure du projet

```
GENUARY_2025_IIMB3/
├── index.html                 ← site final (SPA sections)
├── README.md
├── css/
│   └── style.css              ← design éditorial + @media print
├── js/
│   ├── genuary-data.js        ← CONFIG + 31 entrées de données
│   ├── main.js                ← navigation, rendu cartes, filtres, lightbox
│   └── chatbot.js             ← chatbot non-IA scripté
├── assets/
│   ├── images/
│   │   ├── geometric-zine.svg ← dessin vectoriel zine (placeholder)
│   │   └── raster-01…10.jpg  ← images raster zine (placeholders)
│   └── icons/
│       └── favicon.svg
├── prompts/                   ← 31 sketches Genuary (existants, non modifiés)
│   ├── sketch.js
│   └── jan-01.html … jan-31.html
└── chatbot/                   ← archive chatbot RiveScript (non lié)
```

---

## Personnaliser la configuration

Tout part d'un seul endroit : le bloc `CONFIG` en tête de [`js/genuary-data.js`](js/genuary-data.js).

```javascript
export const CONFIG = {
  studentName:       "Ton Nom",          // ton vrai nom
  role:              "creative coder / generative artist / student",
  githubUrl:         "https://github.com/tonprofil",
  contactEmail:      "tonmail@example.com",
  siteUrl:           "https://tonsite.com",
  favoriteGenuaryId: "jan-24",           // id de ton sketch préféré
};
```

Ces valeurs se propagent automatiquement dans la splash, la section About Me, le footer, les contacts et le chatbot.

---

## Brancher les URLs des 31 sketches

Dans `js/genuary-data.js`, chaque entrée a un champ `url` :

```javascript
// BRANCHER ICI : remplacer url si sketch hébergé ailleurs
url: "prompts/jan-01.html",
```

Par défaut, les URLs pointent vers `prompts/jan-XX.html` (relatif depuis la racine). Une fois le site déployé, remplace chaque `url` par l'URL absolue du sketch hébergé :

```javascript
url: "https://tonsite.com/prompts/jan-01.html",
```

---

## Modifier les données des 31 Genuary

Chaque projet dans le tableau `GENUARY_PROJECTS` peut être édité :

| Champ             | Rôle                                                        |
|-------------------|-------------------------------------------------------------|
| `title`           | Titre du prompt Genuary (en anglais)                        |
| `shortDescription`| Description courte en français (1 phrase)                   |
| `tags`            | Mots-clés pour les filtres (`gradient`, `pixel`, `animation`, etc.) |
| `mood`            | Adjectif éditorial utilisé pour le filtre et le chatbot     |
| `animated`        | `true` si le sketch tourne en boucle, `false` s'il est statique |
| `credit`          | Nom de crédits affiché                                      |
| `url`             | Lien vers le sketch (voir ci-dessus)                        |

---

## Personnaliser le chatbot

Le chatbot (`js/chatbot.js`) fonctionne sans aucune IA — tout est écrit à la main.

**Ajouter un intent :**

```javascript
{
  id: 'mon-intent',
  keywords: ['mot1', 'mot2', 'phrase complete'],
  responses: [
    "Première réponse possible.",
    "Deuxième réponse, utilisée en rotation.",
  ],
},
```

Placer l'intent dans le tableau `INTENTS` **avant** l'entrée `fallback`.

**Changer les suggestions rapides :**

Modifier le tableau `SUGGESTIONS` en tête de `chatbot.js` :

```javascript
const SUGGESTIONS = [
  { label: "Mon label", text: "texte envoyé au bot" },
  ...
];
```

**Changer la personnalité / les réponses :** chaque intent a un tableau `responses` — modifier directement les textes.

---

## Utiliser la section Print / Zine

### 1. Remplacer le dessin vectoriel

Remplacer `assets/images/geometric-zine.svg` par ton propre dessin vectoriel. Le `<img>` dans `index.html` le chargera automatiquement.

### 2. Remplacer les 10 images raster

Remplacer les fichiers `assets/images/raster-01.jpg` … `raster-10.jpg` par tes vraies captures ou exports des sketches. Le format JPG/PNG fonctionne — les placeholders actuels sont des SVG renommés.

### 3. Imprimer le big zine (Ctrl+P)

La section `#print-zine` est la seule visible à l'impression. Le `@media print` dans `style.css` :
- Masque navigation, chatbot, splash
- Force fond blanc, texte noir, marges 2cm (A4)
- Organise vectoriel + 10 raster + textes About + QR en grille

Pour imprimer depuis le navigateur : aller à la section Zine, puis `Ctrl+P` (ou `Cmd+P`). Pour un rendu optimal, utiliser Chrome ou Edge et cocher "Graphiques d'arrière-plan".

### 4. Générer le vrai QR code

Remplacer le QR SVG placeholder dans `index.html` par un vrai QR code généré depuis `siteUrl`. Service libre : [https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TON_URL](https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://tonsite.com)

Télécharger le PNG et le placer dans `assets/images/qr-code.png`, puis remplacer le SVG dans `index.html` par :

```html
<img src="assets/images/qr-code.png" alt="QR code vers le site" class="qr-svg">
```

---

## Ajouter un lien retour dans les sketches

Pour que chaque sketch `prompts/jan-XX.html` propose un retour vers le site, ajouter dans le `<main>` de chaque fichier :

```html
<a href="../index.html#genuary" style="font-family:monospace;font-size:0.8rem;color:#8aa0b3;display:block;margin-bottom:1rem">← Retour au site</a>
```

---

## Crédits & Licence

Sketches et site réalisés dans le cadre du cours Veille & Techno — IIMB3.  
Challenge Genuary : [genuary.art](https://genuary.art)
