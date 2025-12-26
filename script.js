function launch() {
  const speed = Number(document.getElementById("speed").value);
  const payload = Number(document.getElementById("payload").value);
  const rocket = document.getElementById("rocket");
  const engine = document.getElementById("engine");
  const status = document.getElementById("status");

  const maxPayload = speed * 10;

  if (payload > maxPayload) {
    status.innerText = "❌ Falha: carga muito pesada!";
    engine.style.background = "red";
    rocket.style.bottom = "0px";
    return;
  }

  const height = speed * 30;
  engine.style.background = speed > 7 ? "cyan" : "orange";

  rocket.style.transition = `bottom ${11 - speed}s linear`;
  rocket.style.bottom = height + "px";

  status.innerText = `✅ Lançamento OK!
Velocidade: ${speed}
Carga: ${payload}kg`;
}
