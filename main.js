import { drawStreamline } from './core/streamlines.js';
import { velocityField } from './core/field.js';
import { colorMap } from './core/colormap.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.onresize = resize;

function render() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  const U = parseFloat(document.getElementById('velocity').value);
  const density = parseInt(document.getElementById('density').value);

  const params = {
    U,
    cx: canvas.width/2,
    cy: canvas.height/2
  };

  // mapa de velocidade
  for (let x = 0; x < canvas.width; x += 8) {
    for (let y = 0; y < canvas.height; y += 8) {
      const { u, v } = velocityField(x,y,params);
      const mag = Math.sqrt(u*u + v*v);
      ctx.fillStyle = colorMap(mag, 3);
      ctx.fillRect(x,y,8,8);
    }
  }

  // linhas
  ctx.strokeStyle = 'rgba(255,255,255,0.7)';
  for (let y = 0; y < canvas.height; y += density) {
    drawStreamline(ctx, 0, y, params);
  }

  requestAnimationFrame(render);
}

render();
