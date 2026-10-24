// Battle des profs en lien direct (WhatsApp...) : un code d'accès, demandé une fois par appareil.
// Les profs d'EPS qui ont déjà ouvert EPS ultime entrent directement. Majuscules et minuscules : peu importe.
// Le code déchiffre acces.chiffre.json (adresse du classement + code d'école), comme les listes de l'accueil.
(() => {
  const lire = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const LIEN = new URL('./', location.href).href;
  const b64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
  async function essai(C, code) {
    const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(code), 'PBKDF2', false, ['deriveKey']);
    const cle = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt: b64(C.s), iterations: 250000, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
    return JSON.parse(new TextDecoder().decode(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64(C.i) }, cle, b64(C.d))));
  }
  async function ouvrir(code) {
    const blocs = await (await fetch('acces.chiffre.json', { cache: 'no-cache' })).json();
    for (const C of blocs) {
      try { const o = await essai(C, code); localStorage.setItem('eps-script', o.script || ''); localStorage.setItem('eps-code', o.scode); localStorage.setItem('battle-acces', '1'); return true; } catch (e) {}
    }
    return false;
  }
  const ok = !!(lire('eps-code') && lire('eps-script')) || lire('battle-acces') === '1';
  if (!ok) {
    const st = document.createElement('style'); st.id = 'acces-cache';
    st.textContent = 'body>*:not(#acces){display:none!important}#acces{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;padding:16px;background:#101a36;font:16px system-ui,-apple-system,sans-serif;z-index:2147483647}'
      + '#acces form{width:100%;max-width:340px;background:#fff;color:#101a36;border-radius:18px;padding:24px;text-align:center;box-shadow:0 10px 40px #0006}'
      + '#acces img{width:72px;height:72px;border-radius:16px}#acces h1{font-size:24px;margin:8px 0 6px}#acces p{margin:0 0 16px;color:#555}#acces input{width:100%;box-sizing:border-box;font-size:22px;text-align:center;letter-spacing:2px;padding:12px;border:2px solid #999;border-radius:12px}'
      + '#acces button{width:100%;margin-top:12px;padding:14px;font-size:18px;font-weight:700;border:0;border-radius:12px;background:#e8590c;color:#fff}#acces .err{color:#d62828;font-weight:700;min-height:1.4em;margin:10px 0 0}';
    document.head.appendChild(st);
    const montrer = () => {
      const d = document.createElement('div'); d.id = 'acces';
      d.innerHTML = '<form><img src="../icones/battle-192.png" alt=""><h1>Battle des profs</h1><p>Entre le code reçu avec le lien. Il n\'est demandé qu\'une fois sur ce téléphone.</p><input autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" aria-label="Code" placeholder="Code"><button type="submit">Jouer</button><div class="err"></div></form>';
      document.body.appendChild(d);
      const f = d.querySelector('form'), inp = d.querySelector('input'), err = d.querySelector('.err');
      f.onsubmit = async ev => {
        ev.preventDefault(); err.textContent = 'Vérification…';
        let bon = false; try { bon = await ouvrir(inp.value.replace(/\s+/g, '').toLowerCase()); } catch (e) {}
        if (!bon) { err.textContent = navigator.onLine ? 'Code incorrect' : 'Connecte-toi à internet pour la première ouverture.'; inp.value = ''; inp.focus(); return; }
        location.reload(); // le jeu relit l'adresse du classement au chargement
      };
    };
    if (document.body) montrer(); else document.addEventListener('DOMContentLoaded', montrer);
  }
  // Bouton « Partager avec les collègues » sur la page d'accueil du jeu
  const partage = () => {
    const boite = document.querySelector('#accueil .boite') || document.getElementById('accueil'); if (!boite || document.getElementById('partage')) return;
    const code = lire('eps-code') || '';
    const msg = 'Viens jouer à Battle des profs 🎮 : ' + LIEN + (code ? '\nCode : ' + code : '');
    // petit bouton « Partager » en haut à droite de l'accueil (WhatsApp si le téléphone ne propose pas le partage)
    const bt = document.createElement('button'); bt.id = 'partage'; bt.type = 'button'; bt.innerHTML = '<i></i>Partager';
    bt.onclick = async () => {
      try { if (navigator.share) { await navigator.share({ title: 'Battle des profs', text: msg }); return; } } catch (e) { if (e && e.name === 'AbortError') return; }
      window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    };
    (document.getElementById('haut') || boite).appendChild(bt);
    // Collègue venu par le lien (sans EPS ultime) : pas de retour vers les autres applis
    if (lire('battle-acces') === '1' && !lire('eps-cle') && !lire('kl-listes-v1')) document.querySelectorAll('.eps-retour').forEach(a => { a.style.display = 'none'; });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', partage); else partage();
})();
