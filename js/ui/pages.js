// Les pages du musée : l'artiste, l'exposition, le livret, contact.
import { CONFIG } from '../data/config.js';
import { EXHIBITION } from '../data/exhibition.js';
import { SKETCHES } from '../sketches/index.js';
import { runSketch } from '../core/canvas.js';

const PAGES = {
  artiste: () => `
    <article class="page">
      <p class="page-kicker">L’artiste</p>
      <h1 class="page-title">${CONFIG.name}</h1>
      <p class="page-role">${CONFIG.role}</p>
      <div class="page-prose">
        <p>
          Je suis étudiant en troisième année à l’IIM, et le creative coding est
          l’endroit où mes deux curiosités se rejoignent : le code, parce qu’il ne
          triche pas, et le dessin, parce qu’il n’obéit pas. Genuary m’a servi de
          discipline : un prompt par jour, publié par la communauté, et l’obligation
          d’y répondre avec une image avant minuit.
        </p>
        <p>
          J’ai choisi de travailler sans aucune librairie — uniquement le Canvas 2D
          du navigateur et un générateur pseudo-aléatoire que je peux rejouer à
          l’identique. La contrainte n’est pas une punition : c’est elle qui décide
          à ma place quand je tergiverse, et c’est souvent elle qui trouve l’idée.
        </p>
      </div>
      <ul class="facts">
        <li><span class="fact-label">Outils</span><span>Canvas 2D · JavaScript vanilla</span></li>
        <li><span class="fact-label">École</span><span>IIM — B3</span></li>
        <li><span class="fact-label">Cours</span><span>Veille &amp; Techno</span></li>
      </ul>
    </article>
  `,

  exposition: () => `
    <article class="page">
      <p class="page-kicker">L’exposition</p>
      <h1 class="page-title">31 jours, 31 contraintes</h1>
      <div class="page-prose">
        <p>
          <a href="https://genuary.art" target="_blank" rel="noopener noreferrer">Genuary</a>
          est un challenge international de creative coding : chaque jour de janvier,
          un prompt est publié, et chacun y répond avec les outils qu’il veut.
          Les 31 prompts de cette édition 2025 — de « Vertical or horizontal lines
          only » à « Pixel sorting » — sont reproduits à l’identique sur les cartels.
        </p>
        <h2>Les contraintes choisies</h2>
        <p>
          Canvas 2D natif, zéro librairie, zéro image importée. Chaque œuvre est un
          module JavaScript indépendant alimenté par un générateur pseudo-aléatoire
          <em>seedé</em> : le même seed produit toujours exactement la même image.
          C’est ce qui rend la collection reproductible — et c’est ce que le bouton
          « Régénérer » des salles met en évidence : changez le seed, l’algorithme
          reste, l’œuvre change.
        </p>
        <h2>La scénographie</h2>
        <p>
          Ce site est pensé comme un musée : un plan de la collection, des salles,
          des cartels, un livret imprimable et un médiateur qui répond aux visiteurs.
          Le blanc cassé des murs n’est pas un hasard — les œuvres sont la seule
          source de couleur, l’interface s’efface.
        </p>
      </div>
    </article>
  `,

  livret: () => `
    <article class="page page--livret">
      <p class="page-kicker">Le livret</p>
      <h1 class="page-title">L’édition imprimée</h1>
      <div class="page-prose">
        <p>
          L’exposition existe aussi sur papier : un livret A4 avec la couverture,
          les 31 œuvres capturées depuis leurs canvas, les textes de l’exposition
          et un QR code qui ramène ici. Tout est composé par la feuille de style
          d’impression — aucune image n’est stockée, les captures sont générées
          à l’instant où vous imprimez.
        </p>
        <p>
          <button class="btn-print" id="print-booklet">Imprimer le livret ⎙</button>
          <span class="print-hint">ou Cmd/Ctrl + P depuis cette page</span>
        </p>
      </div>
      <div class="booklet" id="booklet" aria-label="Aperçu du livret imprimable">
        <section class="booklet-cover">
          <p class="booklet-kicker">une exposition</p>
          <h2 class="booklet-title">GENUARY<br>2025</h2>
          <p class="booklet-author">${CONFIG.name}</p>
          <p class="booklet-meta">31 œuvres génératives · janvier 2025 · Veille &amp; Techno · IIM B3</p>
        </section>
        <section class="booklet-grid" id="booklet-grid"></section>
        <section class="booklet-texts">
          <div>
            <h3>L’artiste</h3>
            <p>${CONFIG.name}, ${CONFIG.role}. Genuary 2025 est son premier défi
            public de creative coding : un prompt par jour, une image par jour,
            sans librairie et sans filet.</p>
          </div>
          <div>
            <h3>L’exposition</h3>
            <p>31 réponses aux prompts officiels de genuary.art, en Canvas 2D natif
            et JavaScript vanilla. Chaque œuvre est seedée et reproductible : le
            même seed produit toujours la même image.</p>
          </div>
        </section>
        <section class="booklet-colophon">
          <img class="booklet-qr" src="assets/images/qr-code.png" alt="QR code vers ${CONFIG.siteUrl}">
          <p>
            L’exposition continue en ligne —<br>
            <strong>${CONFIG.siteUrl.replace('https://', '')}</strong><br>
            <span class="booklet-colophon-small">Captures générées à l’impression · prompts © genuary.art</span>
          </p>
        </section>
      </div>
    </article>
  `,

  contact: () => `
    <article class="page">
      <p class="page-kicker">Contact</p>
      <h1 class="page-title">Écrivez-moi</h1>
      <ul class="contact-list">
        <li>
          <span class="fact-label">Email</span>
          <a href="mailto:${CONFIG.email}">${CONFIG.email}</a>
        </li>
        <li>
          <span class="fact-label">GitHub</span>
          <a href="${CONFIG.githubUrl}" target="_blank" rel="noopener noreferrer">${CONFIG.githubUrl.replace('https://', '')}</a>
        </li>
        <li>
          <span class="fact-label">Site</span>
          <a href="${CONFIG.siteUrl}" target="_blank" rel="noopener noreferrer">${CONFIG.siteUrl.replace('https://', '')}</a>
        </li>
      </ul>
    </article>
  `,
};

// Capture chaque œuvre sur un canvas hors écran → <img> pour l'impression.
// Par petits lots pour ne pas geler la page.
function buildBookletCaptures(grid) {
  let cancelled = false;
  const entries = [...EXHIBITION];

  const captureBatch = () => {
    if (cancelled) return;
    for (const e of entries.splice(0, 4)) {
      const canvas = document.createElement('canvas');
      runSketch(canvas, SKETCHES.get(e.id), {
        seed: e.id, cssWidth: 300, cssHeight: 300, animate: false, at: 6.5,
      });
      const fig = document.createElement('figure');
      const img = document.createElement('img');
      img.src = canvas.toDataURL('image/png');
      img.alt = `${e.title} — jour ${e.day}`;
      const cap = document.createElement('figcaption');
      cap.textContent = `${String(e.day).padStart(2, '0')} · ${e.title}`;
      fig.append(img, cap);
      grid.append(fig);
    }
    if (entries.length) setTimeout(captureBatch, 16);
  };
  captureBatch();

  return () => { cancelled = true; };
}

export function renderPage(container, page) {
  const wrapper = document.createElement('div');
  wrapper.className = 'page-wrapper';
  wrapper.innerHTML = PAGES[page]();
  container.append(wrapper);

  wrapper.querySelector('#print-booklet')?.addEventListener('click', () => print());

  let cancelCaptures = null;
  const grid = wrapper.querySelector('#booklet-grid');
  if (grid) cancelCaptures = buildBookletCaptures(grid);

  return { destroy() { cancelCaptures?.(); } };
}
