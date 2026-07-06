// Les pages du musée : l'artiste, l'exposition, le livret, contact.
import { CONFIG } from '../data/config.js';

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
        <!-- Rempli par la génération des captures (voir print) -->
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

export function renderPage(container, page) {
  const wrapper = document.createElement('div');
  wrapper.className = 'page-wrapper';
  wrapper.innerHTML = PAGES[page]();
  container.append(wrapper);

  wrapper.querySelector('#print-booklet')?.addEventListener('click', () => print());

  return { destroy() {} };
}
