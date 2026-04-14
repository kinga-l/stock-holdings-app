import { mapHoldingDtoToModel, mapHoldingDtosToModel } from './holding.mapper';
import { GetDataItemDto } from '../models/api.models';

const mockDto: GetDataItemDto = {
  id: 1,
  name: 'Orlen',
  shares: 100,
  price_gross: 12300,
  price_net: 10000,
};

describe('mapHoldingDtoToModel', () => {
  it('mapuje DTO do mappedDtos z poprawną netPrice', () => {
    const mappedDto = mapHoldingDtoToModel(mockDto);
    expect(mappedDto.id).toBe(1);
    expect(mappedDto.companyName).toBe('Orlen');
    expect(mappedDto.sharesQuantity).toBe(100);
    expect(mappedDto.grossPrice).toBe(12300);
    expect(mappedDto.netPrice).toBe(10000);
  });

  it('mapuje tablicę DTO do tablicy mappedDtos', () => {
    const mappedDtos = mapHoldingDtosToModel([mockDto, { ...mockDto, name: 'PKN' }]);
    expect(mappedDtos).toHaveLength(2);
    expect(mappedDtos[1].companyName).toBe('PKN');
  });
});
