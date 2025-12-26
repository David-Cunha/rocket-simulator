import { velocityField } from './field.js';

export function drawStreamline(ctx, x0, y0, params) {
  let x = x0;
  let y = y0;

  ctx.beginPath();
  ctx.moveTo(x, y);

  for (let i = 0; i < 200; i++) {
    const { u, v } = velocityField(x, y, params);
    const dt = 0.5;

    x += u * dt;
    y += v * dt;

    ctx.lineTo(x, y);
  }
  ctx.stroke();
}
