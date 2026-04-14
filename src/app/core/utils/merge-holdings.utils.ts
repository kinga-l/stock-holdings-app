import { Holding } from '../models/holding.models';

export function mergeHoldings(current: Holding[], incoming: Holding[]): Holding[] {
  const map = new Map(current.map((item) => [item.id, item]));
  for (const item of incoming) {
    map.set(item.id, item);
  }
  return Array.from(map.values());
}
