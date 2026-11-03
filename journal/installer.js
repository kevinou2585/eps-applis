// Installer l'appli « Journal de l'école » (Kevin, 03/11/2026) : sur un téléphone ET sur un ordinateur (PC ou Mac).
// Chrome / Edge / Samsung (Android, Windows, Mac) : la vraie fenêtre « Installer » du navigateur, en un clic.
// iPhone : Partager → Sur l'écran d'accueil. Mac Safari : Fichier → Ajouter au Dock. Firefox : passer par Chrome ou Edge.
(() => {
  const ua = navigator.userAgent;
  const iOS = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const mobile = iOS || /Android|Mobi/i.test(ua);
  const mac = !iOS && /Macintosh/.test(ua);
  const safari = /Safari/.test(ua) && !/Chrome|Chromium|CriOS|FxiOS|EdgiOS|Edg\//.test(ua);
  const firefox = /Firefox|FxiOS/.test(ua);
  const enAppli = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const LIEN = new URL('./', document.querySelector('script[src$="installer.js"]').src).href;
  let invite = null; const abonnes = [];
  const prevenir = () => abonnes.forEach(f => { try { f(); } catch (e) {} });
  addEventListener('beforeinstallprompt', e => { e.preventDefault(); invite = e; prevenir(); });
  addEventListener('appinstalled', () => { invite = null; prevenir(); });

  function fenetre(html) {
    const old = document.getElementById('ji-aide'); if (old) old.remove();
    if (!document.getElementById('ji-style')) {
      const st = document.createElement('style'); st.id = 'ji-style';
      st.textContent = '#ji-aide{position:fixed;inset:0;z-index:2147483646;display:flex;align-items:flex-end;justify-content:center;padding:16px;padding-bottom:calc(env(safe-area-inset-bottom) + 16px);background:rgba(5,20,18,.72);font:16px/1.4 system-ui,-apple-system,sans-serif}'
        + '@media (min-width:700px){#ji-aide{align-items:center}}'
        + '#ji-aide .b{width:100%;max-width:440px;background:#fff;color:#1c1917;border-radius:20px;padding:20px;text-align:left;box-shadow:0 12px 40px rgba(0,0,0,.5)}'
        + '#ji-aide .t{margin:0 0 10px;font-size:20px;font-weight:900;display:flex;align-items:center;gap:10px}#ji-aide .t img{width:44px;height:44px;border-radius:11px}'
        + '#ji-aide ol{margin:6px 0 4px;padding-left:22px}#ji-aide li{margin:8px 0}#ji-aide p{margin:8px 0;color:#57534e}'
        + '#ji-aide .k{display:inline-flex;align-items:center;gap:4px;padding:1px 8px;border-radius:7px;background:#eef2f1;font-weight:800;white-space:nowrap}'
        + '#ji-aide .lien{word-break:break-all;background:#f5f5f4;border-radius:10px;padding:8px 10px;font:600 14px ui-monospace,monospace}'
        + '#ji-aide button{width:100%;margin-top:12px;padding:13px;border:0;border-radius:12px;font:800 16px system-ui,-apple-system,sans-serif;background:#0f766e;color:#fff}'
        + '#ji-aide button.cp{background:#ccfbf1;color:#0f766e}';
      document.head.appendChild(st);
    }
    const d = document.createElement('div'); d.id = 'ji-aide';
    d.innerHTML = '<div class="b" role="dialog" aria-modal="true">' + html + '<button type="button" class="ok">J\'ai compris</button></div>';
    d.addEventListener('click', e => { if (e.target === d || e.target.classList.contains('ok')) d.remove(); });
    const cp = d.querySelector('.cp');
    if (cp) cp.onclick = async () => { try { await navigator.clipboard.writeText(LIEN); cp.textContent = '✓ Lien copié'; } catch (e) { cp.textContent = LIEN; } };
    document.body.appendChild(d);
  }
  const TETE = t => '<div class="t"><img src="' + new URL('../icones/journal-192.png', LIEN).href + '" alt="">' + t + '</div>';
  const COPIER = '<button type="button" class="cp">🔗 Copier le lien</button>';
  const PARTAGE = '<span class="k">Partager ⬆️</span>';

  function aideTel() {
    if (!mobile) return TETE('Installer sur un téléphone')
      + '<p>Ouvre ce lien sur le téléphone (envoie-le-toi par WhatsApp ou par mail) :</p><div class="lien">' + LIEN + '</div>'
      + '<ol><li><b>iPhone</b> : dans <b>Safari</b>, touche ' + PARTAGE + ' puis <span class="k">Sur l\'écran d\'accueil</span>.</li>'
      + '<li><b>Android</b> : dans <b>Chrome</b>, touche <span class="k">Installer l\'appli</span> (ou le menu <span class="k">⋮</span>).</li></ol>' + COPIER;
    if (iOS) {
      const vraiSafari = !/CriOS|FxiOS|EdgiOS|OPiOS|GSA\/|Instagram|FBAN|FBAV|WhatsApp/.test(ua);
      return TETE('Installer sur ton iPhone') + '<ol>'
        + '<li>Touche ' + PARTAGE + (vraiSafari ? ' en bas de l\'écran (ou en haut à droite)' : ' (ou le menu <span class="k">⋯</span>)') + '.</li>'
        + '<li>Descends et choisis <span class="k">Sur l\'écran d\'accueil</span>.</li>'
        + '<li>Touche <span class="k">Ajouter</span> : l\'icône Journal arrive sur ton téléphone.</li></ol>'
        + (vraiSafari ? '' : '<p>Tu ne trouves pas ? Ouvre ce lien dans <b>Safari</b> et recommence.</p>' + COPIER);
    }
    return TETE('Installer sur ton téléphone') + '<ol>'
      + '<li>Touche le menu <span class="k">⋮</span> en haut à droite de Chrome.</li>'
      + '<li>Choisis <span class="k">Installer l\'appli</span> ou <span class="k">Ajouter à l\'écran d\'accueil</span>.</li>'
      + '<li>Confirme : l\'icône Journal arrive sur ton téléphone.</li></ol>'
      + '<p>Ça ne marche pas ? Ouvre ce lien dans <b>Chrome</b> et recommence.</p>' + COPIER;
  }
  function aidePc() {
    if (mobile) return TETE('Installer sur un ordinateur')
      + '<p>Sur l\'ordinateur (PC ou Mac), ouvre ce lien dans <b>Chrome</b> ou <b>Edge</b> (ou <b>Safari</b> sur Mac) et touche « Installer sur mon ordinateur » :</p>'
      + '<div class="lien">' + LIEN + '</div>' + COPIER;
    if (mac && safari) return TETE('Installer sur ton Mac') + '<ol>'
      + '<li>Dans la barre du haut, clique sur <span class="k">Fichier</span>.</li>'
      + '<li>Choisis <span class="k">Ajouter au Dock…</span> puis <span class="k">Ajouter</span>.</li>'
      + '<li>L\'icône Journal arrive dans le Dock et dans le Launchpad.</li></ol>'
      + '<p>Pas de « Ajouter au Dock » ? Mets ton Mac à jour, ou ouvre ce lien dans <b>Chrome</b>.</p>' + COPIER;
    if (firefox) return TETE('Installer sur ton ordinateur')
      + '<p>Firefox ne sait pas installer d\'appli. Ouvre ce lien dans <b>Chrome</b> ou <b>Edge</b> (déjà sur tous les PC Windows) et clique sur « Installer sur mon ordinateur ».</p>'
      + '<div class="lien">' + LIEN + '</div>' + COPIER;
    return TETE('Installer sur ton ordinateur') + '<ol>'
      + '<li>À droite de la barre d\'adresse, clique sur l\'icône <span class="k">⊕ Installer</span> (un petit écran avec une flèche).</li>'
      + '<li>Pas d\'icône ? Menu <span class="k">⋮</span> (ou <span class="k">⋯</span> dans Edge) › <span class="k">Caster, enregistrer et partager</span> / <span class="k">Applications</span> › <span class="k">Installer la page</span>.</li>'
      + '<li>Clique sur <span class="k">Installer</span> : le Journal s\'ouvre dans sa propre fenêtre, avec une icône sur le bureau.</li></ol>' + COPIER;
  }
  async function lancer(cible) {
    const ici = cible === 'pc' ? !mobile : cible === 'tel' ? mobile : true;
    if (ici && invite) { const i = invite; invite = null; prevenir(); try { i.prompt(); await i.userChoice; } catch (e) {} return; }
    if (ici && enAppli()) {
      fenetre(TETE('Installer le Journal') + '<p>Tu es dans une appli. Pour installer le Journal à part, ouvre ce lien dans '
        + (iOS ? '<b>Safari</b>' : mac ? '<b>Safari</b> ou <b>Chrome</b>' : '<b>Chrome</b>') + ' : il te proposera de l\'installer.</p><div class="lien">' + LIEN + '</div>' + COPIER);
      return;
    }
    fenetre(cible === 'pc' ? aidePc() : aideTel());
  }
  window.JournalInstall = { lancer, ios: iOS, mobile, lien: LIEN, pret: () => !!invite, enAppli, quand: f => abonnes.push(f) };
})();
