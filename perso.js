// Carnet : plus de 2e code (kevin, 27/10). Le code EPS ultime de l'accueil suffit ;
// sans lui (lien direct vers carnet/), on renvoie à l'accueil qui le demande.
(() => {
  let ok = false; try { ok = !!(localStorage.getItem('eps-cle') || localStorage.getItem('eps-code')); } catch (e) { ok = true; }
  if (!ok) location.replace(new URL('../', location.href).href);
})();
