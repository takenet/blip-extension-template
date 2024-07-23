const colors = [
  'dark',
  'gray',
  'red',
  'pink',
  'grape',
  'violet',
  'indigo',
  'blue',
  'cyan',
  'green',
  'lime',
  'yellow',
  'orange',
  'teal',
] as const;

export function generateColor(seed: string) {
  const hash = seed
    .split('')
    .reduce(
      (hashCode, currentVal) =>
        currentVal.charCodeAt(0) +
        (hashCode << 6) +
        (hashCode << 16) -
        hashCode,
      0,
    );

  return colors[Math.abs(hash) % colors.length];
}
