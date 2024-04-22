export function formatNumber(num: number, precision = 2) {
  const map = [
    { suffix: "T", threshold: 1e12 },
    { suffix: "B", threshold: 1e9 },
    { suffix: "M", threshold: 1e6 },
    { suffix: "K", threshold: 1e3 },
    { suffix: "", threshold: 1 },
  ];
  const found = map.find((x) => Math.abs(num) >= x.threshold);
  if (found) {
    let formatted = (num / found.threshold).toFixed(precision) + found.suffix;
    if (formatted.endsWith(".00")) {
      formatted = formatted.slice(0, -3);
    }
    return formatted;
  }
  return num;
}