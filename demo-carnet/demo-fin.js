/* Carnet EPS · démo : bandeau « démonstration » et bouton pour tout remettre à zéro.
   Bloqués : liaison Google Drive (script retiré par outils/demo.py), favori Skore, sauvegarde/restauration. */
(() => {
  const st = document.createElement('style');
  st.textContent = `.demo-bd{display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px;max-width:680px;margin:8px auto 0;padding:8px 12px;border-radius:12px;
    background:#fff4d6;color:#5b4300;border:1.5px solid #e8c766;font:500 13.5px/1.35 system-ui,-apple-system,sans-serif;box-sizing:border-box;width:calc(100% - 32px)}
  .demo-bd b{font-weight:700} .demo-bd span{flex:1 1 220px}
  .demo-bd button{flex:none;border:1.5px solid #b08a1c;background:#fff;color:#5b4300;border-radius:999px;padding:6px 12px;font:600 13px system-ui,-apple-system,sans-serif;min-height:34px;cursor:pointer}
  @media (prefers-color-scheme:dark){.demo-bd{background:#3a2f12;color:#f3dc9b;border-color:#7a6224}.demo-bd button{background:#2a2310;color:#f3dc9b;border-color:#a8892f}}
  #reg-skore,#reg-save,#drv{display:none!important}`;
  document.head.appendChild(st);
  const bd = document.createElement('div'); bd.className = 'demo-bd'; bd.setAttribute('role', 'note');
  bd.innerHTML = '<span><b>Démo</b> · élèves fictifs, on est le mardi 15 juin 2027. Essaie tout : rien n\'est envoyé.</span><button type="button" id="demo-raz">Remettre à zéro</button>';
  document.body.prepend(bd);
  bd.querySelector('#demo-raz').onclick = () => {
    if (!confirm('Effacer ce que tu as essayé et retrouver le carnet de démonstration du début ?')) return;
    window.demoRaz(); location.reload();
  };
  try { for (let i = REG_SECS.length - 1; i >= 0; i--) if (['reg-skore', 'reg-save'].includes(REG_SECS[i][0])) REG_SECS.splice(i, 1); } catch(e){}
})();
