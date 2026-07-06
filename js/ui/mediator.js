// Le médiateur : un audio-guide textuel, scripté à la main (aucune IA,
// aucun appel réseau). Il répond et peut guider la visite via le routeur.
import { INTENTS, matchIntent } from '../core/intents.js';
import { gotoDay, gotoHash } from '../router.js';

const SUGGESTIONS = [
  { label: 'Surprends-moi', text: 'Surprends-moi' },
  { label: "C'est quoi Genuary ?", text: "C'est quoi Genuary ?" },
  { label: 'Ta préférée ?', text: 'Quelle est ton œuvre préférée ?' },
  { label: 'Comment c’est fait ?', text: 'Quelle est la technique ?' },
];

// Rotation des réponses : chaque intent égrène ses réponses tour à tour
const rotation = new Map();
const nextResponse = intent => {
  const i = rotation.get(intent.id) ?? 0;
  rotation.set(intent.id, i + 1);
  return intent.responses[i % intent.responses.length];
};

const runAction = action => {
  if (!action) return;
  if (action.type === 'goto-day') gotoDay(action.day);
  else if (action.type === 'goto-random-day') gotoDay(1 + Math.floor(Math.random() * 31));
  else if (action.type === 'goto-hash') gotoHash(action.hash);
};

export function renderMediator(root) {
  root.innerHTML = `
    <div class="mediator">
      <button class="mediator-toggle" aria-expanded="false" aria-controls="mediator-panel">
        <span aria-hidden="true">◈</span> Médiateur
      </button>
      <div class="mediator-panel" id="mediator-panel" role="complementary" aria-label="Médiateur de l'exposition" hidden>
        <header class="mediator-header">
          <div>
            <p class="mediator-name">Le médiateur</p>
            <p class="mediator-status">scripté à la main · sans IA</p>
          </div>
          <button class="mediator-close" aria-label="Fermer le médiateur">✕</button>
        </header>
        <div class="mediator-messages" aria-live="polite"></div>
        <div class="mediator-suggestions">
          ${SUGGESTIONS.map(s => `<button class="mediator-chip" data-text="${s.text}">${s.label}</button>`).join('')}
        </div>
        <form class="mediator-form" autocomplete="off">
          <input class="mediator-input" type="text" maxlength="200"
                 placeholder="Posez une question…" aria-label="Écrire au médiateur">
          <button class="mediator-send" type="submit" aria-label="Envoyer">↑</button>
        </form>
      </div>
    </div>
  `;

  const toggle = root.querySelector('.mediator-toggle');
  const panel = root.querySelector('.mediator-panel');
  const messages = root.querySelector('.mediator-messages');
  const form = root.querySelector('.mediator-form');
  const input = root.querySelector('.mediator-input');

  const addMessage = (text, who) => {
    const p = document.createElement('p');
    p.className = `mediator-msg mediator-msg--${who}`;
    p.textContent = text;
    messages.append(p);
    messages.scrollTop = messages.scrollHeight;
  };

  const respond = text => {
    addMessage(text, 'visitor');
    const intent = matchIntent(text, INTENTS);
    setTimeout(() => {
      addMessage(nextResponse(intent), 'bot');
      // L'action attend un instant de plus, le temps de lire
      if (intent.action) setTimeout(() => runAction(intent.action), 900);
    }, 450);
  };

  const open = () => {
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    if (!messages.childElementCount) {
      addMessage('Bienvenue. Je suis le médiateur de l’exposition — sans IA, tout est écrit à la main. Que puis-je pour vous ?', 'bot');
    }
    input.focus();
  };
  const close = () => {
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => (panel.hidden ? open() : close()));
  root.querySelector('.mediator-close').addEventListener('click', close);

  root.querySelectorAll('.mediator-chip').forEach(chip =>
    chip.addEventListener('click', () => respond(chip.dataset.text)));

  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    respond(text);
  });
}
