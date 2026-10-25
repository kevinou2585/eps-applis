// EPS ultime : sauvegarde complète en un seul fichier .zip (l'appli elle-même + toutes les données de
// cet appareil : carnet, tournoi, Koh-Lanta, Le Fist, classeur, battle), et restauration de ce fichier.
// Protégée par le code de sauvegarde : seule son empreinte SHA-256 est ici.
(() => {
  const DEPOT = 'kevinou2585/eps-applis';
  const CODE = '5a4f1fc2e2f9ff186e08f14e49ccffaaa21387df54239b78a012140aad67489e';
  // Clés des applis EPS (Happiness partage le même site : ses clés maison… ne sont pas prises)
  const A_NOUS = /^(carnet-|kl-|eps-|battle-|tournoi-|le-fist-)/;
  const enc = new TextEncoder(), dec = new TextDecoder();

  async function codeOk(c) {
    const h = await crypto.subtle.digest('SHA-256', enc.encode(String(c || '').trim().toLowerCase()));
    return [...new Uint8Array(h)].map(b => b.toString(16).padStart(2, '0')).join('') === CODE;
  }

  // ---------- Petit zip (sans compression), lisible par Windows, Mac et téléphones ----------
  const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
  const crc32 = u => { let c = 0xFFFFFFFF; for (let i = 0; i < u.length; i++) c = CRC[(c ^ u[i]) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; };
  function zip(fichiers) {   // [{nom, data: Uint8Array}]
    const parts = [], centre = []; let pos = 0;
    const d = new Date(), heure = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1), jour = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
    for (const f of fichiers) {
      const n = enc.encode(f.nom), c = crc32(f.data), h = new DataView(new ArrayBuffer(30));
      [[0, 0x04034b50, 4], [4, 20, 2], [6, 0x0800, 2], [8, 0, 2], [10, heure, 2], [12, jour, 2], [14, c, 4], [18, f.data.length, 4], [22, f.data.length, 4], [26, n.length, 2], [28, 0, 2]]
        .forEach(([o, v, l]) => l === 4 ? h.setUint32(o, v, true) : h.setUint16(o, v, true));
      const ce = new DataView(new ArrayBuffer(46));
      [[0, 0x02014b50, 4], [4, 20, 2], [6, 20, 2], [8, 0x0800, 2], [10, 0, 2], [12, heure, 2], [14, jour, 2], [16, c, 4], [20, f.data.length, 4], [24, f.data.length, 4], [28, n.length, 2], [30, 0, 2], [32, 0, 2], [34, 0, 2], [36, 0, 2], [38, 0, 4], [42, pos, 4]]
        .forEach(([o, v, l]) => l === 4 ? ce.setUint32(o, v, true) : ce.setUint16(o, v, true));
      parts.push(h, n, f.data); centre.push(ce, n); pos += 30 + n.length + f.data.length;
    }
    const tailleC = centre.reduce((s, x) => s + x.byteLength, 0), fin = new DataView(new ArrayBuffer(22));
    [[0, 0x06054b50, 4], [8, fichiers.length, 2], [10, fichiers.length, 2], [12, tailleC, 4], [16, pos, 4]].forEach(([o, v, l]) => l === 4 ? fin.setUint32(o, v, true) : fin.setUint16(o, v, true));
    return new Blob([...parts, ...centre, fin], {type: 'application/zip'});
  }
  function dezip(buf) {      // lit les zips faits ci-dessus (sans compression) : {nom: Uint8Array}
    const v = new DataView(buf), u = new Uint8Array(buf), out = {};
    let e = buf.byteLength - 22; while (e >= 0 && v.getUint32(e, true) !== 0x06054b50) e--;
    if (e < 0) throw new Error("Ce fichier n'est pas une sauvegarde EPS ultime.");
    let p = v.getUint32(e + 16, true);
    for (let i = 0, n = v.getUint16(e + 10, true); i < n; i++) {
      const meth = v.getUint16(p + 10, true), t = v.getUint32(p + 20, true), ln = v.getUint16(p + 28, true), lx = v.getUint16(p + 30, true), lc = v.getUint16(p + 32, true), off = v.getUint32(p + 42, true);
      const nom = dec.decode(u.subarray(p + 46, p + 46 + ln));
      if (meth === 0) { const d0 = off + 30 + v.getUint16(off + 26, true) + v.getUint16(off + 28, true); out[nom] = u.subarray(d0, d0 + t); }
      p += 46 + ln + lx + lc;
    }
    return out;
  }

  // ---------- Sauvegarder ----------
  async function listeAppli() {
    try {
      const r = await fetch(`https://api.github.com/repos/${DEPOT}/git/trees/main?recursive=1`);
      const o = await r.json(); const l = (o.tree || []).filter(x => x.type === 'blob').map(x => x.path);
      if (l.length > 10) return l;
    } catch (e) {}
    // Sans GitHub : la liste des fichiers que l'appli garde pour marcher hors ligne
    const sw = await (await fetch('sw.js')).text();
    const l = [...(sw.match(/FICHIERS = \[([\s\S]*?)\]/) || ['', ''])[1].matchAll(/'\.\/([^']*)'/g)].map(x => x[1] === '' || x[1].endsWith('/') ? x[1] + 'index.html' : x[1]);
    return [...new Set(['sw.js', 'README.md', ...l])];
  }
  const nbClasses = D => { try { return (JSON.parse(D['carnet-eps-v1']).classes || []).length; } catch (e) { return 0; } };

  async function sauvegarder(dire) {
    const F = [], date = new Date().toISOString().slice(0, 10);
    dire('Je rassemble l\'appli…');
    const liste = await listeAppli();
    for (const [i, p] of liste.entries()) {
      try { const r = await fetch(p); if (r.ok) F.push({nom: 'appli/' + p, data: new Uint8Array(await r.arrayBuffer())}); } catch (e) {}
      if (i % 10 === 0) dire(`Je rassemble l'appli… ${i}/${liste.length}`);
    }
    dire('Je rassemble tes données…');
    const D = {};
    for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (A_NOUS.test(k)) D[k] = localStorage.getItem(k); }
    // Carnet relié au Drive : on joint aussi la copie du Drive (celle de tous tes appareils réunis)
    let drive = null;
    try {
      const o = JSON.parse(localStorage.getItem('carnet-drive') || '{}');
      if (o.url && o.cle && navigator.onLine) {
        dire('Je récupère la copie du carnet sur le Drive…');
        const an = localStorage.getItem('carnet-eps-annee') || '';
        const r = await (await fetch(o.url + (o.url.includes('?') ? '&' : '?') + 'cle=' + encodeURIComponent(o.cle) + '&annee=' + encodeURIComponent(an))).json();
        if (r.ok && r.copie) { drive = r.copie; F.push({nom: 'donnees/carnet-copie-drive.json', data: enc.encode(JSON.stringify(r.copie))}); }
      }
    } catch (e) {}
    const S = {app: 'EPS ultime', version: 1, date: new Date().toISOString(), donnees: D};
    F.push({nom: 'donnees/eps-ultime-donnees.json', data: enc.encode(JSON.stringify(S))});
    const n = nbClasses(D);
    F.push({nom: 'LISEZ-MOI.txt', data: enc.encode(LISEZ(date, n, !!drive))});
    dire('Je prépare le fichier…');
    const z = zip(F), a = document.createElement('a');
    a.href = URL.createObjectURL(z); a.download = `eps-ultime-sauvegarde-${date}.zip`; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 60000);
    return {n, taille: z.size, drive: !!drive};
  }

  const LISEZ = (date, n, drive) => `SAUVEGARDE COMPLÈTE D'EPS ULTIME du ${date}
Carnet EPS : ${n} classe${n > 1 ? 's' : ''}, avec tes notes, évaluations, prépas et réglages, plus les données du Tournoi, de Koh-Lanta Arène, du Fist, du Classeur et de la Battle des profs.
${drive ? 'La copie du carnet qui est sur ton Drive est jointe aussi (donnees/carnet-copie-drive.json).' : 'Le carnet de cet appareil n\'était pas relié au Drive (ou pas d\'internet) : c\'est la copie de cet appareil.'}

Garde ce fichier sur ton ordinateur (et une copie sur une clé USB). Il contient les noms et les notes de tes élèves : ne l'envoie à personne.

DANS CE FICHIER
- appli/      : l'appli elle-même (toutes ses pages), telle qu'elle est en ligne.
- donnees/    : toutes tes données (eps-ultime-donnees.json).

1. REMETTRE TES DONNÉES (nouveau téléphone, appli effacée…)
   Ouvre EPS ultime, en bas de l'accueil : ⚙️ Paramètres › 💾 Sauvegarde complète,
   tape le code de sauvegarde, touche « Restaurer une sauvegarde » et choisis ce fichier .zip (pas besoin de le décompresser).
   Si le carnet est relié au Drive, il reprend ensuite tout seul ce qui est plus récent sur le Drive.

2. L'APPLI N'EST PLUS EN LIGNE
   Décompresse ce fichier. Sur github.com, crée un dépôt (par exemple « eps-applis »), touche « Add file › Upload files »
   et glisse-y tout le contenu du dossier appli/. Puis Settings › Pages › Branch : main › Save.
   Quelques minutes plus tard, l'appli est en ligne à l'adresse https://TON-NOM.github.io/eps-applis/ ; fais ensuite l'étape 1.
   (Ou donne simplement ce fichier à Claude : il saura tout remettre en ligne.)
`;

  // ---------- Restaurer ----------
  async function lire(fichier) {
    const Z = dezip(await fichier.arrayBuffer()), j = Z['donnees/eps-ultime-donnees.json'];
    if (!j) throw new Error("Ce fichier n'est pas une sauvegarde EPS ultime.");
    const S = JSON.parse(dec.decode(j));
    return {date: S.date, classes: nbClasses(S.donnees || {}), donnees: S.donnees || {}};
  }
  function remettre(L) {
    let n = 0;
    Object.entries(L.donnees).forEach(([k, v]) => { if (!A_NOUS.test(k)) return; try { localStorage.setItem(k, v); n++; } catch (e) { throw new Error('Plus de place sur cet appareil pour tout remettre.'); } });
    return n;
  }

  window.Sauvegarde = {codeOk, sauvegarder, lire, remettre, _zip: zip, _dezip: dezip};
})();
