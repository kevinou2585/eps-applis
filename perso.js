// Applis personnelles (Carnet, Battle des profs) : un 2e code, demandé une fois par appareil.
(() => {
  const CLE = 'eps-perso-ok', EMPREINTE = '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5';
  let ok = false; try { ok = localStorage.getItem(CLE) === EMPREINTE; } catch (e) {}
  if (ok) return;
  const st = document.createElement('style'); st.id = 'perso-cache';
  st.textContent = 'body>*:not(#perso){display:none!important}#perso{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;padding:16px;background:#12302b;font:16px system-ui,-apple-system,sans-serif;z-index:2147483647}'
    + '#perso form{width:100%;max-width:340px;background:#fff;color:#12302b;border-radius:18px;padding:24px;text-align:center;box-shadow:0 10px 40px #0006}'
    + '#perso h1{font-size:22px;margin:0 0 6px}#perso p{margin:0 0 16px;color:#555}#perso input{width:100%;box-sizing:border-box;font-size:24px;text-align:center;letter-spacing:4px;padding:12px;border:2px solid #999;border-radius:12px}'
    + '#perso button{width:100%;margin-top:12px;padding:14px;font-size:18px;font-weight:700;border:0;border-radius:12px;background:#e8590c;color:#fff}#perso a{display:block;margin-top:14px;color:#2f6fd0}#perso .err{color:#d62828;font-weight:700;min-height:1.4em;margin:10px 0 0}';
  document.head.appendChild(st);
  const montrer = () => {
    const d = document.createElement('div'); d.id = 'perso';
    d.innerHTML = '<form><h1>🔒 Accès réservé</h1><p>Entre le code pour ouvrir cette appli.</p><input type="password" inputmode="numeric" autocomplete="off" aria-label="Code"><button type="submit">Ouvrir</button><div class="err"></div><a href="../">‹ Retour aux applis</a></form>';
    document.body.appendChild(d);
    const f = d.querySelector('form'), inp = d.querySelector('input'), err = d.querySelector('.err');
    inp.focus();
    f.onsubmit = async ev => {
      ev.preventDefault();
      const h = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(inp.value.trim())))).map(b => b.toString(16).padStart(2, '0')).join('');
      if (h !== EMPREINTE) { err.textContent = 'Code incorrect'; inp.value = ''; inp.focus(); return; }
      try { localStorage.setItem(CLE, h); } catch (e) {}
      d.remove(); st.remove();
      window.dispatchEvent(new Event('resize'));
    };
  };
  if (document.body) montrer(); else document.addEventListener('DOMContentLoaded', montrer);
})();
