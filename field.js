export function velocityField(x, y, params) {
  const { U, cx, cy } = params;

  // deslocamento
  const dx = x - cx;
  const dy = y - cy;
  const r2 = dx*dx + dy*dy + 0.001;

  // fluxo uniforme
  let u = U;
  let v = 0;

  // dupleto (simula corpo)
  const k = 2;
  u += -k * (dx*dx - dy*dy) / (r2*r2);
  v += -2*k * dx * dy / (r2*r2);

  return { u, v };
}
