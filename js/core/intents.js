// Le cerveau du médiateur : matching par mots-clés, aucune IA, aucun réseau.
// Les actions sont des données ({ type, ... }) exécutées par l'UI.
import { CONFIG } from '../data/config.js';
import { getEntry } from '../data/exhibition.js';

export function normalize(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

const favoriteDay = getEntry(CONFIG.favoriteId)?.day ?? 1;

export const INTENTS = [
  {
    id: 'salut',
    keywords: ['bonjour', 'salut', 'hello', 'coucou', 'bonsoir', 'hey'],
    responses: [
      "Bienvenue dans l'exposition. Je suis le médiateur — posez-moi vos questions, ou dites « surprends-moi ».",
      "Bonjour ! Vous visitez GENUARY 2025 : 31 œuvres génératives, une par jour de janvier. Que voulez-vous savoir ?",
    ],
  },
  {
    id: 'artiste',
    keywords: ['qui es', 'artiste', 'auteur', 'matteo', 'toi', 'createur', 'qui a fait'],
    responses: [
      "Les œuvres sont de Mattéo Marchelli, étudiant à l'IIM. Je vous emmène à la page de l'artiste.",
      "Un seul artiste pour 31 salles : Mattéo Marchelli. Suivez-moi, sa page vous en dira plus.",
    ],
    action: { type: 'goto-hash', hash: '#/artiste' },
  },
  {
    id: 'genuary',
    keywords: ['genuary', 'challenge', 'defi', 'janvier', 'prompt', 'exposition', 'projet'],
    responses: [
      "Genuary est un challenge international : chaque jour de janvier, un prompt, une œuvre. Les 31 prompts officiels 2025 sont sur les cartels. Je vous ouvre la page de l'exposition.",
      "31 jours, 31 contraintes imposées par la communauté genuary.art — et 31 réponses en Canvas 2D. La page de l'exposition raconte tout.",
    ],
    action: { type: 'goto-hash', hash: '#/exposition' },
  },
  {
    id: 'technique',
    keywords: ['technique', 'canvas', 'code', 'seed', 'aleatoire', 'comment', 'fabrique', 'librairie', 'javascript'],
    responses: [
      "Tout est en Canvas 2D natif, sans aucune librairie. Chaque œuvre est nourrie par un générateur pseudo-aléatoire seedé : même seed, même image. Essayez le bouton « Régénérer » dans une salle !",
      "Du JavaScript vanilla, un canvas, et un PRNG reproductible. L'aléatoire y est domestiqué : le seed décide de tout, et vous pouvez le changer dans chaque salle.",
    ],
  },
  {
    id: 'favori',
    keywords: ['preferee', 'prefere', 'favorite', 'favori', 'meilleure', 'coup de coeur'],
    responses: [
      "Celle que l'artiste préfère ? « Op », jour 19 — des rayures qui bombent sans bomber. Je vous y emmène.",
      "Son coup de cœur est la salle 19, l'hommage à Bridget Riley. Suivez-moi.",
    ],
    action: { type: 'goto-day', day: favoriteDay },
  },
  {
    id: 'surprise',
    keywords: ['surprends', 'surprise', 'hasard', 'aleatoire', 'random', 'importe'],
    responses: [
      "Fermez les yeux, je choisis une salle pour vous…",
      "Le hasard est le troisième artiste de cette exposition. Allons-y.",
    ],
    action: { type: 'goto-random-day' },
  },
  {
    id: 'imprimer',
    keywords: ['imprimer', 'livret', 'papier', 'zine', 'impression', 'pdf'],
    responses: [
      "L'exposition existe en version papier : la page « Le livret » compose un A4 avec les 31 œuvres et un QR code. Je vous y conduis.",
      "Ctrl+P depuis la page du livret, et l'exposition tient dans votre imprimante. Allons-y.",
    ],
    action: { type: 'goto-hash', hash: '#/livret' },
  },
  {
    id: 'aide',
    keywords: ['aide', 'help', 'quoi demander', 'sais faire', 'options', 'menu'],
    responses: [
      "Je peux vous parler de l'artiste, du challenge Genuary, de la technique, vous montrer l'œuvre favorite, le livret imprimable — ou vous téléporter au hasard : dites « surprends-moi ».",
      "Essayez : « c'est quoi Genuary ? », « ta préférée ? », « comment c'est fabriqué ? » ou « surprends-moi ».",
    ],
  },
  {
    id: 'fallback',
    keywords: [],
    responses: [
      "Hmm, cette question dépasse mon petit script — je ne suis qu'un médiateur sans IA. Essayez « aide » pour voir ce que je sais faire.",
      "Je n'ai pas cette fiche dans mon classeur (je suis écrit à la main, sans réseau ni IA). Dites « aide », ou « surprends-moi ».",
    ],
  },
];

export function matchIntent(text, intents) {
  const input = normalize(text);
  let best = null;
  let bestScore = 0;
  for (const intent of intents) {
    let score = 0;
    for (const kw of intent.keywords) {
      if (input.includes(normalize(kw))) score++;
    }
    if (score > bestScore) {
      best = intent;
      bestScore = score;
    }
  }
  return best ?? intents.find(i => i.id === 'fallback');
}
