/* Scanner de document pour le Carnet (certificats médicaux).
   scanDoc(fichier, boite) affiche la photo avec 4 coins à placer (trouvés tout seuls si la feuille
   ressort du fond), redresse la feuille puis la passe en noir et blanc bien contrasté.
   Renvoie une image JPEG (data URL) ou null si on annule. */
(() => {
  const charger = f => new Promise((ok, ko) => { const u = URL.createObjectURL(f), i = new Image(); i.onload = () => { URL.revokeObjectURL(u); ok(i); }; i.onerror = ko; i.src = u; });

  // Coins de la feuille : zone claire la plus grande (seuil d'Otsu), puis ses 4 extrémités.
  function coins(img){
    const k = 360 / Math.max(img.naturalWidth, img.naturalHeight), w = Math.max(1, Math.round(img.naturalWidth * k)), h = Math.max(1, Math.round(img.naturalHeight * k));
    const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
    const cx = cv.getContext('2d'); cx.drawImage(img, 0, 0, w, h);
    const d = cx.getImageData(0, 0, w, h).data, g = new Uint8Array(w * h), hist = new Array(256).fill(0);
    for (let i = 0; i < w * h; i++){ const v = (d[i * 4] * 3 + d[i * 4 + 1] * 6 + d[i * 4 + 2]) / 10 | 0; g[i] = v; hist[v]++; }
    let somme = 0; for (let i = 0; i < 256; i++) somme += i * hist[i];
    let sB = 0, wB = 0, meil = 0, seuil = 128;
    for (let t = 0; t < 256; t++){ wB += hist[t]; if (!wB) continue; const wF = w * h - wB; if (!wF) break; sB += t * hist[t];
      const mB = sB / wB, mF = (somme - sB) / wF, v = wB * wF * (mB - mF) * (mB - mF); if (v > meil){ meil = v; seuil = t; } }
    const vu = new Uint8Array(w * h), pile = new Int32Array(w * h);
    let best = null, bestN = 0;
    for (let s = 0; s < w * h; s++){
      if (vu[s] || g[s] <= seuil) continue;
      let n = 0, top = 0, tl = [0, 0, 1e9], br = [0, 0, -1e9], tr = [0, 0, -1e9], bl = [0, 0, 1e9];
      pile[top++] = s; vu[s] = 1;
      while (top){ const p = pile[--top], x = p % w, y = p / w | 0; n++;
        if (x + y < tl[2]) tl = [x, y, x + y]; if (x + y > br[2]) br = [x, y, x + y];
        if (x - y > tr[2]) tr = [x, y, x - y]; if (x - y < bl[2]) bl = [x, y, x - y];
        if (x > 0 && !vu[p - 1] && g[p - 1] > seuil){ vu[p - 1] = 1; pile[top++] = p - 1; }
        if (x < w - 1 && !vu[p + 1] && g[p + 1] > seuil){ vu[p + 1] = 1; pile[top++] = p + 1; }
        if (y > 0 && !vu[p - w] && g[p - w] > seuil){ vu[p - w] = 1; pile[top++] = p - w; }
        if (y < h - 1 && !vu[p + w] && g[p + w] > seuil){ vu[p + w] = 1; pile[top++] = p + w; } }
      if (n > bestN){ bestN = n; best = [tl, tr, br, bl]; }
    }
    const marge = [[.06, .06], [.94, .06], [.94, .94], [.06, .94]].map(([a, b]) => [a * img.naturalWidth, b * img.naturalHeight]);
    if (!best || bestN < w * h * .12 || bestN > w * h * .97) return marge;
    return best.map(([x, y]) => [x / k, y / k]);
  }

  // Homographie qui envoie le rectangle de sortie sur les 4 coins de la photo.
  function homographie(src, W, H){
    const dst = [[0, 0], [W, 0], [W, H], [0, H]], A = [], b = [];
    for (let i = 0; i < 4; i++){ const [x, y] = dst[i], [u, v] = src[i];
      A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]); b.push(u);
      A.push([0, 0, 0, x, y, 1, -v * x, -v * y]); b.push(v); }
    for (let c = 0; c < 8; c++){ let m = c; for (let r = c + 1; r < 8; r++) if (Math.abs(A[r][c]) > Math.abs(A[m][c])) m = r;
      [A[c], A[m]] = [A[m], A[c]]; [b[c], b[m]] = [b[m], b[c]];
      for (let r = 0; r < 8; r++){ if (r === c) continue; const f = A[r][c] / A[c][c]; for (let k = c; k < 8; k++) A[r][k] -= f * A[c][k]; b[r] -= f * b[c]; } }
    return b.map((v, i) => v / A[i][i]);
  }
  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);

  function redresser(img, q){
    const larg = Math.max(dist(q[0], q[1]), dist(q[3], q[2])), haut = Math.max(dist(q[0], q[3]), dist(q[1], q[2]));
    const s = Math.min(1, 1500 / Math.max(larg, haut)), W = Math.round(larg * s), H = Math.round(haut * s);
    // photo d'origine, au plus 2400 px
    const k = Math.min(1, 2400 / Math.max(img.naturalWidth, img.naturalHeight)), sw = Math.round(img.naturalWidth * k), sh = Math.round(img.naturalHeight * k);
    const sc = document.createElement('canvas'); sc.width = sw; sc.height = sh; const sx = sc.getContext('2d'); sx.drawImage(img, 0, 0, sw, sh);
    const sd = sx.getImageData(0, 0, sw, sh).data, gs = new Float32Array(sw * sh);
    for (let i = 0; i < sw * sh; i++) gs[i] = (sd[i * 4] * 3 + sd[i * 4 + 1] * 6 + sd[i * 4 + 2]) / 10;
    const M = homographie(q.map(([x, y]) => [x * k, y * k]), W, H), out = new Float32Array(W * H);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++){
      const z = M[6] * x + M[7] * y + 1, u = (M[0] * x + M[1] * y + M[2]) / z, v = (M[3] * x + M[4] * y + M[5]) / z;
      const x0 = Math.max(0, Math.min(sw - 2, u | 0)), y0 = Math.max(0, Math.min(sh - 2, v | 0)), fx = Math.min(1, Math.max(0, u - x0)), fy = Math.min(1, Math.max(0, v - y0)), p = y0 * sw + x0;
      out[y * W + x] = (gs[p] * (1 - fx) + gs[p + 1] * fx) * (1 - fy) + (gs[p + sw] * (1 - fx) + gs[p + sw + 1] * fx) * fy;
    }
    return {W, H, out};
  }

  // Noir et blanc : on enleve les ombres (fond flou) puis on pousse le contraste.
  function encrer({W, H, out}){
    const pc = document.createElement('canvas'); pc.width = W; pc.height = H; const px = pc.getContext('2d');
    const im = px.createImageData(W, H);
    for (let i = 0; i < W * H; i++){ const v = out[i]; im.data[i * 4] = im.data[i * 4 + 1] = im.data[i * 4 + 2] = v; im.data[i * 4 + 3] = 255; }
    px.putImageData(im, 0, 0);
    const bw = Math.max(1, Math.round(W / 24)), bh = Math.max(1, Math.round(H / 24)), bc = document.createElement('canvas'); bc.width = bw; bc.height = bh;
    const bx = bc.getContext('2d'); bx.imageSmoothingEnabled = true; bx.drawImage(pc, 0, 0, bw, bh);
    const fc = document.createElement('canvas'); fc.width = W; fc.height = H; const fx = fc.getContext('2d'); fx.imageSmoothingEnabled = true; fx.filter = 'blur(6px)'; fx.drawImage(bc, 0, 0, W, H);
    const fond = fx.getImageData(0, 0, W, H).data;
    for (let i = 0; i < W * H; i++){
      let v = out[i] / Math.max(40, fond[i * 4]);       // 1 = papier, < 1 = encre
      v = (v - .55) / (.9 - .55); v = v < 0 ? 0 : v > 1 ? 1 : v; v = Math.pow(v, 1.6) * 255;
      im.data[i * 4] = im.data[i * 4 + 1] = im.data[i * 4 + 2] = v;
    }
    px.putImageData(im, 0, 0);
    return pc;
  }
  function jpeg(cv){
    for (const [cote, q] of [[1500, .72], [1300, .65], [1100, .6], [900, .55], [750, .5]]){
      const k = Math.min(1, cote / Math.max(cv.width, cv.height)), c2 = document.createElement('canvas');
      c2.width = Math.round(cv.width * k); c2.height = Math.round(cv.height * k); c2.getContext('2d').drawImage(cv, 0, 0, c2.width, c2.height);
      const d = c2.toDataURL('image/jpeg', q); if (d.length < 230000) return d;
    }
    throw new Error('trop grand');
  }

  window.scanDoc = async (fichier, boite) => {
    const img = await charger(fichier), q = coins(img);
    return new Promise(fin => {
      boite.innerHTML = `<div class="small muted" style="margin:4px 0">Place les 4 ronds sur les coins de la feuille, puis valide.</div>
        <div style="position:relative;touch-action:none;user-select:none"><canvas id="sc-cv" style="width:100%;display:block;border-radius:10px"></canvas></div>
        <div class="row2" style="margin-top:8px"><button class="btn" type="button" id="sc-brut">Garder la photo</button><button class="btn pri" type="button" id="sc-ok">✓ Valider le scan</button></div>`;
      const cv = boite.querySelector('#sc-cv'), k = Math.min(1, 900 / Math.max(img.naturalWidth, img.naturalHeight));
      cv.width = Math.round(img.naturalWidth * k); cv.height = Math.round(img.naturalHeight * k);
      const cx = cv.getContext('2d'), pts = q.map(([x, y]) => [x * k, y * k]);
      const dessin = () => {
        cx.drawImage(img, 0, 0, cv.width, cv.height);
        cx.fillStyle = 'rgba(0,0,0,.35)'; cx.beginPath(); cx.rect(0, 0, cv.width, cv.height); cx.moveTo(...pts[0]); [3, 2, 1].forEach(i => cx.lineTo(...pts[i])); cx.closePath(); cx.fill('evenodd');
        cx.strokeStyle = '#1f5fd1'; cx.lineWidth = Math.max(2, cv.width / 220); cx.beginPath(); pts.forEach((p, i) => i ? cx.lineTo(...p) : cx.moveTo(...p)); cx.closePath(); cx.stroke();
        const r = Math.max(10, cv.width / 32);
        pts.forEach(p => { cx.beginPath(); cx.arc(p[0], p[1], r, 0, 7); cx.fillStyle = 'rgba(31,95,209,.35)'; cx.fill(); cx.lineWidth = Math.max(2, cv.width / 260); cx.strokeStyle = '#fff'; cx.stroke(); });
      };
      dessin();
      let pris = -1;
      const pos = e => { const b = cv.getBoundingClientRect(); return [(e.clientX - b.left) * cv.width / b.width, (e.clientY - b.top) * cv.height / b.height]; };
      cv.addEventListener('pointerdown', e => { const p = pos(e); let m = 1e9; pts.forEach((q, i) => { const d = dist(p, q); if (d < m){ m = d; pris = i; } }); if (m > cv.width / 4) pris = -1; else { cv.setPointerCapture(e.pointerId); e.preventDefault(); } });
      cv.addEventListener('pointermove', e => { if (pris < 0) return; const p = pos(e); pts[pris] = [Math.max(0, Math.min(cv.width, p[0])), Math.max(0, Math.min(cv.height, p[1]))]; dessin(); e.preventDefault(); });
      const lacher = () => pris = -1; cv.addEventListener('pointerup', lacher); cv.addEventListener('pointercancel', lacher);
      boite.querySelector('#sc-ok').onclick = () => {
        boite.querySelector('#sc-ok').textContent = 'Un instant…';
        setTimeout(() => { try { fin(jpeg(encrer(redresser(img, pts.map(([x, y]) => [x / k, y / k]))))); } catch(e){ fin(null); } }, 30);
      };
      boite.querySelector('#sc-brut').onclick = () => { const c2 = document.createElement('canvas'); c2.width = img.naturalWidth; c2.height = img.naturalHeight; c2.getContext('2d').drawImage(img, 0, 0); try { fin(jpeg(c2)); } catch(e){ fin(null); } };
    });
  };
})();
