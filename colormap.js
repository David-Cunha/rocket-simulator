export function colorMap(value, max) {
  const t = Math.min(value / max, 1);

  const r = Math.floor(255 * t);
  const g = Math.floor(100 * (1 - t));
  const b = Math.floor(255 * (1 - t));

  return `rgb(${r},${g},${b})`;
}
