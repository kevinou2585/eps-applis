/* Carnet EPS · version de démonstration (demo-carnet/index.html, fabriquée par outils/demo.py).
   Chargé avant le carnet :
   - DEMO_LS remplace localStorage dans la page : tout est rangé sous « carnet-demo: », le vrai carnet
     du téléphone (mêmes clés sans préfixe) n'est jamais lu ni touché. Sans stockage (navigation privée) : en mémoire.
   - Date décalée : la démo vit le mardi 15 juin 2027 vers 10 h 20 (cours de 1E + 1F à la piscine), l'heure avance normalement.
   - Premier passage, ou nouvelle version des données (DEMO.v) : le carnet fictif de donnees.js est remis en place. */
(() => {
  const P = 'carnet-demo:', mem = new Map();
  let R = null; try { R = window.localStorage; R.setItem(P + '_t', '1'); R.removeItem(P + '_t'); } catch(e){ R = null; }
  const keys = () => { if (!R) return [...mem.keys()]; const out = []; for (let i = 0; i < R.length; i++){ const k = R.key(i); if (k && k.startsWith(P)) out.push(k.slice(P.length)); } return out; };
  window.DEMO_LS = {
    getItem: k => R ? R.getItem(P + k) : (mem.has(k) ? mem.get(k) : null),
    setItem: (k, v) => { if (R) R.setItem(P + k, String(v)); else mem.set(k, String(v)); },
    removeItem: k => { if (R) R.removeItem(P + k); else mem.delete(k); },
    key: i => keys()[i] ?? null,
    get length(){ return keys().length; },
    clear(){ keys().forEach(k => this.removeItem(k)); }
  };

  const RD = Date, decal = RD.parse('2027-06-15T10:20:00') - RD.now();
  class DemoDate extends RD {
    constructor(...a){ if (a.length) super(...a); else super(RD.now() + decal); }
    static now(){ return RD.now() + decal; }
  }
  window.Date = DemoDate;

  const D = window.DEMO;
  window.demoRaz = () => {
    DEMO_LS.clear();
    if (!D) return;
    DEMO_LS.setItem('carnet-eps-v1', JSON.stringify(D.S));
    DEMO_LS.setItem('carnet-eps-ui', JSON.stringify({tab: 'today', period: {}, sort: 'name'}));
    DEMO_LS.setItem('carnet-eps-annee', '2026');
    DEMO_LS.setItem('carnet-demo-v', D.v);
  };
  if (D && DEMO_LS.getItem('carnet-demo-v') !== D.v) window.demoRaz();
})();
