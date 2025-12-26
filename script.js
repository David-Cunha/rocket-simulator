function simulateMEF() {
  const rocket = document.getElementById("rocket");
  const status = document.getElementById("status");
  rocket.innerHTML = "";

  const velocity = Number(document.getElementById("speed").value);
  const payload = Number(document.getElementById("payload").value);

  // =========================
  // CONFIGURAÇÕES DO MODELO
  // =========================
  const segments = 25;

  // Propriedades do aço
  const E = 210e9;            // Pa
  const yieldStress = 250e6;  // Pa

  // Geometria (simplificada)
  const A = 0.008;            // m² (≈ 10 cm de diâmetro)

  // =========================
  // CARGAS
  // =========================
  const g = 9.81;
  const weightForce = payload * g;

  // Termo dinâmico fictício (representa empuxo / aceleração)
  const dynamicForce = velocity * 800;

  const totalForce = weightForce + dynamicForce;

  let maxStrain = 0;
  let results = [];

  // =========================
  // MEF AXIAL 1D
  // =========================
  for (let i = 0; i < segments; i++) {
    // Quanto mais próximo da base, maior a força acumulada
    const forceAtSegment = totalForce * ((i + 1) / segments);

    const stress = forceAtSegment / A;
    const strain = stress / E;

    results.push({ stress, strain });
    maxStrain = Math.max(maxStrain, strain);
  }

  // =========================
  // VISUALIZAÇÃO (MAPA DE CALOR)
  // =========================
  let yielded = false;

  results.forEach(r => {
    const intensity = r.strain / maxStrain;

    const segment = document.createElement("div");
    segment.className = "segment";

    // Azul (baixo) → Vermelho (alto)
    segment.style.background = `rgb(
      ${Math.floor(255 * intensity)},
      ${Math.floor(80 * (1 - intensity))},
      ${Math.floor(255 * (1 - intensity))}
    )`;

    // Indicação de escoamento
    if (r.stress >= yieldStress) {
      segment.style.outline = "2px solid yellow";
      yielded = true;
    }

    rocket.appendChild(segment);
  });

  // =========================
  // STATUS
  // =========================
  status.innerText =
    yielded
      ? "⚠️ Escoamento detectado (σ ≥ σy) – Aço"
      : "✅ Regime elástico – Aço (MEF 1D)";
}
