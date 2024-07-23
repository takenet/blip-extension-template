export function parseNumber(value: number): string {
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  let tempValue = value;
  let suffixIndex = 0;

  while (tempValue >= 1000 && suffixIndex < suffixes.length - 1) {
    tempValue /= 1000;
    suffixIndex++;
  }

  tempValue = Math.round(tempValue * 100) / 100;

  return `${tempValue}${suffixes[suffixIndex]}`;
}
