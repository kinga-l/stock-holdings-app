import { mergeHoldings } from './merge-holdings.utils';
import { Holding } from '../models/holding.models';

let nextId = 1;

const makeHolding = (companyName: string, sharesQuantity = 10): Holding => ({
  id: nextId++,
  companyName,
  sharesQuantity,
  grossPrice: 1000,
  netPrice: 813,
});

describe('mergeHoldings', () => {
  beforeEach(() => {
    nextId = 1;
  });

  it('scala aktualną listę z nową', () => {
    const current = [makeHolding('Orlen')];
    const incoming = [makeHolding('PKN')];
    const result = mergeHoldings(current, incoming);
    expect(result).toHaveLength(2);
  });

  it('nadpisuje istniejący wpis po id', () => {
    const existing = makeHolding('Orlen');
    const updated = { ...existing, sharesQuantity: 20 };
    const result = mergeHoldings([existing], [updated]);
    expect(result).toHaveLength(1);
    expect(result[0].sharesQuantity).toBe(20);
  });

  it('zwraca pustą tablicę gdy obie listy są puste', () => {
    expect(mergeHoldings([], [])).toHaveLength(0);
  });
});
