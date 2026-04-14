export function calculateNetPrice(priceGross: number, vatRate = 0.23): number {
  if (priceGross < 0) return 0;
  const priceNetto = priceGross / (1 + vatRate);
  return Math.round(priceNetto * 100) / 100;
}

export function calculateGrossPrice(priceNet: number, vatRate = 0.23): number {
  if (priceNet < 0) return 0;
  const priceGross = priceNet * (1 + vatRate);
  return Math.round(priceGross * 100) / 100;
}
