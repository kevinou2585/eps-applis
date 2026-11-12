// Ancienne adresse (github.io) : EPS ultime déménage sur beapp.be. Copie sur beapp.be + bandeau « Passer sur beapp.be ».
// Copie sur beapp.be : tout ce que l'appli garde sur cet appareil part aussi dans le coffre de beapp.be,
// sous un nom + un petit code (le Drive continue de marcher comme avant). Sert aussi à passer de github.io
// à beapp.be : « Passer sur beapp.be » envoie tout, puis « Récupérer mes données » le remet sur beapp.be.
// Chargé par prive.js sur chaque page (Happiness et EPS ultime), ou directement sur les anciennes versions.
(() => {
  if (window.CopieBeapp) return;
  const COFFRE = window.COFFRE_BEAPP || 'https://beapp.be/donnees/copie';
  const ICI = () => /(^|\.)beapp\.be$/.test(location.hostname) || !!window.COFFRE_ICI;   // sur beapp.be (sinon : ancienne adresse github.io…)
  const EPS = /^(carnet-|kl-|eps-|battle-|tournoi-|le-fist-)/;          // mêmes données que la sauvegarde complète d'EPS ultime
  const JAMAIS = /^(copie:|maison:acces$|eps:acces$|eps-acces$)/;         // ni l'accès de cet appareil, ni la copie elle-même
  const APP = /\/eps-applis\//i.test(location.pathname) ? 'eps' : 'maison';
  const NOM_APP = APP === 'eps' ? 'EPS ultime' : 'Happiness';
  const aMoi = k => !JAMAIS.test(k) && (APP === 'eps' ? EPS.test(k) : !EPS.test(k));
  const K = 'copie:' + APP, KE = K + ':etat';
  const lit = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } };
  const ecrit = (k, v) => { try { _set.call(localStorage, k, JSON.stringify(v)); } catch (e) {} };
  const _set = Storage.prototype.setItem, _rem = Storage.prototype.removeItem;
  const qui = () => { const q = lit(K, null); return q && q.nom && q.code ? q : null; };
  const appareil = () => (/iphone|ipad/i.test(navigator.userAgent) ? 'iPhone' : /android/i.test(navigator.userAgent) ? 'Android' : /windows/i.test(navigator.userAgent) ? 'PC' : /mac/i.test(navigator.userAgent) ? 'Mac' : 'appareil') + ' · ' + location.host;

  function donnees() {
    const D = {};
    for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (aMoi(k)) D[k] = localStorage.getItem(k); }
    return D;
  }
  async function appel(o) {
    const r = await fetch(COFFRE, {method: 'POST', headers: {'Content-Type': 'text/plain;charset=utf-8'}, body: JSON.stringify(Object.assign({app: APP}, o))});
    const x = await r.json();
    if (!x.ok) throw new Error({mauvais: 'Code incorrect pour ce nom.', inconnu: 'Aucune copie à ce nom.', bloque: 'Trop d\'essais : réessaie dans 15 minutes.', code: 'Le code doit faire au moins 4 caractères.', nom: 'Écris ton prénom (au moins 2 lettres).', vide: 'Aucune copie à ce nom.', trop: 'Trop de demandes : réessaie plus tard.'}[x.err] || x.err || 'erreur');
    return x;
  }
  // Petite empreinte pour ne rien renvoyer si rien n'a changé
  const empreinte = s => { let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36) + ':' + s.length; };

  let enCours = false, minuteur = 0;
  async function copier(force) {
    const q = qui(); if (!q || enCours || !navigator.onLine) return null;
    const D = donnees(), s = JSON.stringify(D), emp = empreinte(s), E = lit(KE, {});
    if (!force && E.emp === emp) return null;
    if (!force && E.quand && Date.now() - E.quand < 60000) { planifier(65000); return null; }
    enCours = true;
    try {
      const x = await appel({a: 'deposer', nom: q.nom, code: q.code, donnees: D, appareil: appareil()});
      ecrit(KE, {emp, quand: Date.now(), taille: s.length, err: ''});
      return x;
    } catch (e) { ecrit(KE, Object.assign(E, {err: e.message, essai: Date.now()})); if (force) throw e; return null; }
    finally { enCours = false; }
  }
  function planifier(ms) { clearTimeout(minuteur); minuteur = setTimeout(() => copier(), ms || 30000); }

  // Chaque changement des données relance une copie (30 s plus tard, une par minute au plus)
  Storage.prototype.setItem = function (k, v) { _set.call(this, k, v); if (this === localStorage && aMoi(k) && qui()) planifier(); };
  Storage.prototype.removeItem = function (k) { _rem.call(this, k); if (this === localStorage && aMoi(k) && qui()) planifier(); };
  document.addEventListener('visibilitychange', () => { if (document.hidden && qui()) copier(); });
  window.addEventListener('online', () => planifier(5000));
  if (qui()) planifier(8000);

  async function reprendre(nom, code) {
    const x = await appel({a: 'reprendre', nom, code});
    let n = 0;
    Object.keys(x.donnees || {}).forEach(k => { if (!aMoi(k)) return; try { _set.call(localStorage, k, x.donnees[k]); n++; } catch (e) { throw new Error('Plus de place sur cet appareil pour tout remettre.'); } });
    ecrit(K, {nom: x.nom, code, titre: nom});
    ecrit(KE, {emp: empreinte(JSON.stringify(donnees())), quand: Date.now(), err: ''});
    return {n, quand: x.quand, appareil: x.appareil};
  }

  // ---------- Fenêtre ----------
  const esc = t => String(t == null ? '' : t).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
  const quandTxt = ms => ms ? new Date(ms).toLocaleString('fr-BE', {day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'}) : '';
  function style() {
    if (document.getElementById('cb-style')) return;
    const s = document.createElement('style'); s.id = 'cb-style';
    s.textContent = `.cb-fond{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;font:16px/1.45 system-ui,-apple-system,Segoe UI,Arial,sans-serif}
.cb-boite{background:#fff;color:#1f2421;border-radius:18px;max-width:440px;width:100%;max-height:90vh;overflow:auto;padding:20px;box-shadow:0 10px 40px rgba(0,0,0,.3)}
.cb-boite h3{margin:0 0 8px;font-size:20px}.cb-boite p{margin:8px 0}.cb-boite .cb-n{color:#5b6670;font-size:14px}
.cb-boite label{display:block;font-weight:600;margin:12px 0 4px}.cb-boite input{width:100%;box-sizing:border-box;font-size:17px;padding:11px;border:1px solid #b9c3cb;border-radius:10px}
.cb-btns{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}.cb-btns button{flex:1 1 auto;font-size:16px;padding:12px 14px;border-radius:12px;border:1px solid #b9c3cb;background:#f2f5f7;color:#1f2421;cursor:pointer}
.cb-btns .cb-go{background:#0b6e8f;border-color:#0b6e8f;color:#fff;font-weight:700}.cb-err{color:#b3261e;font-weight:600}.cb-ok{color:#1e7d32;font-weight:600}
.cb-bandeau{position:relative;z-index:9999;background:#fff4d6;color:#4a3b00;border-bottom:1px solid #e8cf86;padding:10px 14px;font:15px/1.4 system-ui,-apple-system,Segoe UI,Arial,sans-serif;display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.cb-bandeau b{flex:1 1 200px}.cb-bandeau button{font-size:15px;padding:8px 12px;border-radius:10px;border:0;background:#0b6e8f;color:#fff;font-weight:700;cursor:pointer}.cb-bandeau .cb-x{background:transparent;color:#4a3b00;font-weight:400}
@media (prefers-color-scheme: dark){.cb-boite{background:#1d2328;color:#e8edf0}.cb-boite input{background:#11161a;color:#e8edf0;border-color:#3a464f}.cb-btns button{background:#2a3238;color:#e8edf0;border-color:#3a464f}.cb-boite .cb-n{color:#9aa7b1}}`;
    document.head.append(s);
  }
  function fenetre(html, brancher) {
    style();
    const f = document.createElement('div'); f.className = 'cb-fond';
    f.innerHTML = `<div class="cb-boite" role="dialog" aria-modal="true">${html}</div>`;
    f.addEventListener('click', e => { if (e.target === f) f.remove(); });
    document.body.append(f);
    const $ = s => f.querySelector(s), fermer = () => f.remove();
    brancher($, fermer);
    const i = f.querySelector('input'); if (i) setTimeout(() => i.focus(), 50);
    return f;
  }
  const champs = (nom) => `<label for="cb-nom">Ton prénom</label><input id="cb-nom" autocomplete="given-name" value="${esc(nom || '')}" placeholder="ex. Delphine">
    <label for="cb-code">Choisis ton mot de passe (4 caractères ou plus)</label><input id="cb-code" type="password" autocomplete="new-password" autocapitalize="none" placeholder="Mot de passe">
    <p class="cb-n">Retiens bien ce prénom et ce mot de passe : sur beapp.be, ils ouvrent ton compte et toutes tes données, sur tous tes appareils.</p>`;
  const lire = $ => ({nom: $('#cb-nom').value.trim(), code: $('#cb-code').value.trim()});

  /** Réglage « Copie sur beapp.be » (dans les paramètres). mode : 'passer' = depuis l'ancienne adresse (github.io). */
  function ouvrir(mode) {
    const q = qui(), E = lit(KE, {}), ailleurs = !ICI();
    if (mode === 'passer' || (ailleurs && !q)) return fenetre(`<h3>🚚 Passer sur beapp.be</h3>
      <p>${NOM_APP} déménage sur <b>beapp.be</b>. Ce bouton envoie <b>toutes tes données</b> de cet appareil (classes, horaires, notes, tout) dans un coffre à ton nom.</p>${champs(q && q.titre)}
      <p class="cb-n" id="cb-etat"></p><div class="cb-btns"><button type="button" id="cb-non">Plus tard</button><button type="button" class="cb-go" id="cb-oui">Envoyer mes données</button></div>`, ($, fermer) => {
      $('#cb-non').onclick = fermer;
      $('#cb-oui').onclick = async () => {
        const v = lire($); $('#cb-oui').disabled = true; $('#cb-etat').className = 'cb-n'; $('#cb-etat').textContent = 'Envoi…';
        try {
          if (v.nom.length < 2) throw new Error('Écris ton prénom (au moins 2 lettres).');
          if (v.code.length < 4) throw new Error('Le code doit faire au moins 4 caractères.');
          ecrit(K, {nom: v.nom, code: v.code, titre: v.nom});
          const x = await copier(true), n = Object.keys(donnees()).length;
          try { _set.call(localStorage, K + ':passe', '1'); } catch (e) {} document.querySelectorAll('.cb-bandeau').forEach(b => b.remove());
          const lien = APP === 'eps' ? 'https://beapp.be/eps-applis/installer/' : 'https://beapp.be/Maison/installer/';
          $('.cb-boite').innerHTML = `<h3>✅ C'est parti !</h3><p class="cb-ok">${n} éléments envoyés sur beapp.be au nom de « ${esc(x ? x.nom : v.nom)} ».</p>
            <p><b>Maintenant :</b></p><p>① Ouvre <a href="${lien}">${lien.replace('https://', '')}</a> et installe ${NOM_APP} (même façon que d'habitude).</p>
            <p>② L'appli te demande de te connecter : tape ce même prénom et ce même mot de passe. Kevin accepte ton compte, et toutes tes données sont là.</p>
            <p>③ Sur ton ordinateur ou un autre appareil : beapp.be/eps-applis, même prénom, même mot de passe. Tout reste synchronisé.</p>
            <p class="cb-n">Cette ancienne appli marche encore : rien n'est effacé ici. Tu pourras la supprimer de ton écran d'accueil quand tout est bon sur beapp.be.</p>
            <div class="cb-btns"><button type="button" class="cb-go" id="cb-aller">Ouvrir beapp.be</button><button type="button" id="cb-f">Fermer</button></div>`;
          $('#cb-aller').onclick = () => { location.href = lien; };
          $('#cb-f').onclick = fermer;
        } catch (e) { $('#cb-etat').className = 'cb-err'; $('#cb-etat').textContent = '⚠️ ' + e.message; $('#cb-oui').disabled = false; }
      };
    });
    if (q) return fenetre(`<h3>☁️ Copie sur beapp.be</h3><p class="cb-ok">Active, au nom de « ${esc(q.titre || q.nom)} ».</p>
      <p class="cb-n">Chaque changement de ${NOM_APP} sur cet appareil part aussi dans le coffre de beapp.be (en plus du Drive).${E.quand ? ' Dernière copie : ' + quandTxt(E.quand) + '.' : ''}${E.err ? ' ⚠️ Dernier essai : ' + esc(E.err) : ''}</p>
      <p class="cb-n" id="cb-etat"></p><div class="cb-btns"><button type="button" class="cb-go" id="cb-maint">Copier maintenant</button><button type="button" id="cb-rep">Récupérer mes données</button><button type="button" id="cb-stop">Arrêter sur cet appareil</button><button type="button" id="cb-f">Fermer</button></div>`, ($, fermer) => {
      $('#cb-f').onclick = fermer;
      $('#cb-maint').onclick = async () => { $('#cb-etat').textContent = 'Copie…'; try { const x = await copier(true); $('#cb-etat').className = 'cb-ok'; $('#cb-etat').textContent = x && x.pareil ? '✓ Déjà à jour.' : '✓ Copie faite.'; } catch (e) { $('#cb-etat').className = 'cb-err'; $('#cb-etat').textContent = '⚠️ ' + e.message; } };
      $('#cb-rep').onclick = () => { fermer(); recuperer(q.titre || q.nom); };
      $('#cb-stop').onclick = () => { if (confirm('Arrêter la copie sur beapp.be pour cet appareil ? (Rien n\'est effacé dans le coffre.)')) { _rem.call(localStorage, K); _rem.call(localStorage, KE); fermer(); } };
    });
    return fenetre(`<h3>☁️ Copie sur beapp.be</h3><p>Garde aussi une copie de ${NOM_APP} dans le coffre de beapp.be, à ton nom (en plus du Drive). Elle se met à jour toute seule à chaque changement.</p>${champs('')}
      <p class="cb-n" id="cb-etat"></p><div class="cb-btns"><button type="button" class="cb-go" id="cb-oui">Activer la copie</button><button type="button" id="cb-rep">J'ai déjà une copie : récupérer</button><button type="button" id="cb-f">Fermer</button></div>`, ($, fermer) => {
      $('#cb-f').onclick = fermer;
      $('#cb-rep').onclick = () => { const v = lire($); fermer(); recuperer(v.nom); };
      $('#cb-oui').onclick = async () => {
        const v = lire($); $('#cb-etat').className = 'cb-n'; $('#cb-etat').textContent = 'Envoi…';
        try {
          if (v.nom.length < 2) throw new Error('Écris ton prénom (au moins 2 lettres).');
          if (v.code.length < 4) throw new Error('Le code doit faire au moins 4 caractères.');
          ecrit(K, {nom: v.nom, code: v.code, titre: v.nom});
          await copier(true);
          $('#cb-etat').className = 'cb-ok'; $('#cb-etat').textContent = '✓ Copie activée.'; setTimeout(fermer, 1200);
        } catch (e) { _rem.call(localStorage, K); $('#cb-etat').className = 'cb-err'; $('#cb-etat').textContent = '⚠️ ' + e.message; }
      };
    });
  }
  /** « C'est qui ? » → récupérer la copie (après un passage depuis github.io, ou sur un nouvel appareil). */
  function recuperer(nom) {
    return fenetre(`<h3>👋 C'est qui ?</h3><p>Écris le prénom et le code choisis quand tu as envoyé tes données, et ${NOM_APP} les remet sur cet appareil.</p>${champs(nom)}
      <p class="cb-n" id="cb-etat"></p><div class="cb-btns"><button type="button" id="cb-f">Fermer</button><button type="button" class="cb-go" id="cb-oui">Récupérer mes données</button></div>`, ($, fermer) => {
      $('#cb-f').onclick = () => { try { _set.call(localStorage, K + ':non', '1'); } catch (e) {} fermer(); };
      $('#cb-oui').onclick = async () => {
        const v = lire($); $('#cb-etat').className = 'cb-n'; $('#cb-etat').textContent = 'Recherche…';
        try {
          if (v.nom.length < 2) throw new Error('Écris ton prénom (au moins 2 lettres).');
          const deja = Object.keys(donnees()).length;
          const x = await appel({a: 'verifier', nom: v.nom, code: v.code});
          if (!x.derniere) throw new Error('Aucune copie à ce nom.');
          if (!confirm(`Récupérer la copie du ${quandTxt(x.derniere.quand * 1000)} (${x.derniere.appareil || 'autre appareil'}) ?` + (deja ? `\n\nLes données ${NOM_APP} de cet appareil seront remplacées par celles de la copie.` : ''))) { $('#cb-etat').textContent = ''; return; }
          const r = await reprendre(v.nom, v.code);
          $('#cb-etat').className = 'cb-ok'; $('#cb-etat').textContent = `✓ ${r.n} éléments remis. L'appli se recharge…`;
          setTimeout(() => location.reload(), 1500);
        } catch (e) { $('#cb-etat').className = 'cb-err'; $('#cb-etat').textContent = '⚠️ ' + e.message; }
      };
    });
  }
  /** Bandeau en haut de l'accueil : sur l'ancienne adresse « on déménage », sur beapp.be « récupère tes données ». */
  function bandeau() {
    const ailleurs = !ICI();
    if (!ailleurs && (qui() || localStorage.getItem(K + ':non') || Object.keys(donnees()).length > 3)) return;
    if (ailleurs && localStorage.getItem(K + ':passe')) return;
    style();
    const b = document.createElement('div'); b.className = 'cb-bandeau';
    b.innerHTML = ailleurs ? `<b>🚚 ${NOM_APP} déménage sur beapp.be. Un bouton envoie toutes tes données là-bas.</b><button type="button">Passer sur beapp.be</button><button type="button" class="cb-x" aria-label="Fermer">✕</button>`
      : `<b>👋 Tu avais déjà ${NOM_APP} (ancienne adresse ou autre appareil) ? Récupère toutes tes données.</b><button type="button">Récupérer mes données</button><button type="button" class="cb-x" aria-label="Fermer">✕</button>`;
    b.querySelector('button').onclick = () => ailleurs ? ouvrir('passer') : recuperer('');
    b.querySelector('.cb-x').onclick = () => { b.remove(); if (!ailleurs) try { _set.call(localStorage, K + ':non', '1'); } catch (e) {} };
    document.body.prepend(b);
  }

  window.CopieBeapp = {app: APP, qui, copier, ouvrir, recuperer, bandeau, donnees, _reprendre: reprendre};
})();
(() => {
  const go = () => {
    const C = window.CopieBeapp, p = document.getElementById('param');
    if (!C) return;
    if (p && !document.getElementById('cb-param')) {
      const h = document.createElement('h2'); h.id = 'cb-param'; h.textContent = '🚚 Passer sur beapp.be';
      const d = document.createElement('div');
      d.innerHTML = '<p class="note" style="padding:0;margin:0 0 8px">EPS ultime déménage sur beapp.be. Ce bouton envoie toutes tes données (classes, horaires, notes, tout) dans un compte à ton prénom, avec un mot de passe. Sur beapp.be, tu te connectes et tout est là, sur tous tes appareils. Cette appli-ci continue de marcher.</p><div class="btns"><button type="button" class="go" id="cb-ouvrir">Passer sur beapp.be…</button></div>';
      const avant = [...p.querySelectorAll('h2')].find(x => /Sauvegarde complète/.test(x.textContent));
      if (avant) { p.insertBefore(h, avant); p.insertBefore(d, avant); } else p.prepend(h, d);
      d.querySelector('#cb-ouvrir').onclick = () => C.ouvrir('passer');
    }
    // kevin (12/11) : pas de bandeau, juste le bouton dans ⚙️ Paramètres (il le fera avec ses collègues à l'école)
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
})();
