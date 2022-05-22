export const distance = (x1, y1, x2, y2) => {
  const x = x2 - x1;
  const y = y2 - y1;
  return Math.sqrt(x * x + y * y);
};

export const collide = (x1, y1, x2, y2, radius) => distance(x1, y1, x2, y2) <= radius;
