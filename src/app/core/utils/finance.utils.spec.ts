import { calculateNetPrice } from './finance.utils';

describe('calculateNetPrice', () => {
  it('oblicza netto z brutto przy stawce 23%', () => {
    expect(calculateNetPrice(123)).toBe(100);
  });

  it('zaokrągla do 2 miejsc po przecinku', () => {
    expect(calculateNetPrice(100)).toBe(81.3);
  });

  it('zwraca 0 dla wartości ujemnej', () => {
    expect(calculateNetPrice(-50)).toBe(0);
  });

  it('zwraca 0 dla wartości 0', () => {
    expect(calculateNetPrice(0)).toBe(0);
  });

  it('obsługuje niestandardową stawkę VAT', () => {
    expect(calculateNetPrice(110, 0.1)).toBe(100);
  });
});
