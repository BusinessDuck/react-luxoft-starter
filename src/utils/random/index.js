export function random(min, max) {
  return min + Math.round(Math.random() * (max - min));
}

export function randomPercentage(number, min, max) {
  return Math.floor(number * random(min, max) / 100);
}
