// Installer l'appli « Battle des profs » sur le téléphone (Kevin, 03/11/2026).
// Android (Chrome, Samsung…) : la vraie fenêtre « Installer » du téléphone, en un seul clic.
// iPhone : Apple ne permet pas d'installer d'un clic, on montre le mode d'emploi (Partager ⎋ → Sur l'écran d'accueil).
// Utilisé par la liste des jeux (jeux/) et par le menu Partager du flipper.
(() => {
  const lire = k => { try { return sessionStorage.getItem(k) || localStorage.getItem(k); } catch (e) { return null; } };
  const iOS = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const enAppli = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  // Ouvert depuis EPS ultime (tuile Battle des profs) : on est dans l'appli EPS, pas dans celle de la Battle
  const depuisEps = () => lire('battle-eps') === '1';
  const ICI = document.querySelector('script[src$="installer.js"]').src; // adresse de battle/installer.js
  const LIEN = new URL('jeux/', ICI).href;
  let invite = null; const abonnes = [];
  const prevenir = () => abonnes.forEach(f => { try { f(); } catch (e) {} });
  addEventListener('beforeinstallprompt', e => { e.preventDefault(); invite = e; prevenir(); });
  addEventListener('appinstalled', () => { invite = null; prevenir(); });

  function fenetre(html) {
    const old = document.getElementById('bi-aide'); if (old) old.remove();
    if (!document.getElementById('bi-style')) {
      const st = document.createElement('style'); st.id = 'bi-style';
      st.textContent = '#bi-aide{position:fixed;inset:0;z-index:2147483646;display:flex;align-items:flex-end;justify-content:center;padding:16px;padding-bottom:calc(env(safe-area-inset-bottom) + 16px);background:rgba(5,8,20,.72);font:16px/1.4 system-ui,-apple-system,sans-serif;-webkit-user-select:text;user-select:text}'
        + '#bi-aide .bi-b{width:100%;max-width:420px;background:#fff;color:#1b1030;border-radius:20px;padding:20px;text-align:left;box-shadow:0 12px 40px rgba(0,0,0,.5)}'
        + '#bi-aide .bi-t{margin:0 0 10px;font-size:21px;font-weight:900;display:flex;align-items:center;gap:10px}#bi-aide .bi-t img{width:44px;height:44px;border-radius:11px}'
        + '#bi-aide ol{margin:6px 0 4px;padding-left:22px}#bi-aide li{margin:8px 0}#bi-aide p{margin:8px 0;color:#4a4060}'
        + '#bi-aide .k{display:inline-flex;align-items:center;gap:4px;padding:1px 8px;border-radius:7px;background:#eef0f7;font-weight:800;white-space:nowrap}'
        + '#bi-aide .k svg{width:16px;height:16px}'
        + '#bi-aide button{width:100%;margin-top:12px;padding:13px;border:0;border-radius:12px;font:800 16px system-ui,-apple-system,sans-serif;background:#2a0f3d;color:#fff}'
        + '#bi-aide button.cp{background:#f0eaf6;color:#2a0f3d}';
      document.head.appendChild(st);
    }
    const d = document.createElement('div'); d.id = 'bi-aide';
    d.innerHTML = '<div class="bi-b" role="dialog" aria-modal="true">' + html + '<button type="button" class="ok">J\'ai compris</button></div>';
    d.addEventListener('click', e => { if (e.target === d || e.target.classList.contains('ok')) d.remove(); });
    const cp = d.querySelector('.cp');
    if (cp) cp.onclick = async () => {
      try { await navigator.clipboard.writeText(LIEN); cp.textContent = '✓ Lien copié'; } catch (e) { cp.textContent = LIEN; }
    };
    document.body.appendChild(d);
    return d;
  }
  const PARTAGE_IOS = '<span class="k"><svg viewBox="0 0 24 24" fill="none" stroke="#1a73e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3M7 8l5-5 5 5"/><path d="M5 11v9h14v-9"/></svg>Partager</span>';
  const TETE = '<div class="bi-t"><img src="' + new URL('../icones/battle-192.png', ICI).href + '" alt="">Installer Battle des profs</div>';
  const etapesIos = () => {
    const safari = !/CriOS|FxiOS|EdgiOS|OPiOS|GSA\/|Instagram|FBAN|FBAV|WhatsApp/.test(navigator.userAgent);
    return TETE + '<ol>'
      + '<li>Touche ' + PARTAGE_IOS + (safari ? ' en bas de l\'écran (ou en haut à droite)' : ' (ou le menu <span class="k">⋯</span>)') + '.</li>'
      + '<li>Descends et choisis <span class="k">Sur l\'écran d\'accueil</span>.</li>'
      + '<li>Touche <span class="k">Ajouter</span> : l\'icône Battle des profs arrive sur ton téléphone.</li></ol>'
      + (safari ? '' : '<p>Tu ne trouves pas ? Ouvre ce lien dans <b>Safari</b> et recommence.</p><button type="button" class="cp">🔗 Copier le lien</button>');
  };
  const etapesAndroid = () => TETE + '<ol>'
    + '<li>Touche le menu <span class="k">⋮</span> en haut à droite de Chrome.</li>'
    + '<li>Choisis <span class="k">Installer l\'appli</span> ou <span class="k">Ajouter à l\'écran d\'accueil</span>.</li>'
    + '<li>Confirme : l\'icône Battle des profs arrive sur ton téléphone.</li></ol>'
    + '<p>Ça ne marche pas ? Ouvre ce lien dans <b>Chrome</b> et recommence.</p><button type="button" class="cp">🔗 Copier le lien</button>';

  async function lancer() {
    if (invite) { // Android : la fenêtre d'installation du téléphone
      const i = invite; invite = null; prevenir();
      try { i.prompt(); await i.userChoice; } catch (e) {}
      return;
    }
    if (enAppli()) { // déjà dans une appli (EPS ultime) : il faut passer par le navigateur
      fenetre(TETE + '<p>Tu es dans l\'appli EPS ultime. Pour avoir Battle des profs à part sur ton écran d\'accueil, ouvre ce lien dans '
        + (iOS ? '<b>Safari</b>' : '<b>Chrome</b>') + ' : il te proposera de l\'installer.</p><button type="button" class="cp">🔗 Copier le lien</button>');
      return;
    }
    fenetre(iOS ? etapesIos() : etapesAndroid());
  }
  window.BattleInstall = {
    lancer, ios: iOS, lien: LIEN,
    pret: () => !!invite,
    // déjà installée : on est dans l'appli Battle des profs elle-même
    dejaLa: () => enAppli() && !depuisEps(),
    quand: f => abonnes.push(f)
  };
})();
