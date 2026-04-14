import { GetDataItemDto } from '../models/api.models';
import { Holding } from '../models/holding.models';
import { calculateGrossPrice, calculateNetPrice } from '../utils/finance.utils';

export function mapHoldingDtoToModel(dto: GetDataItemDto): Holding {
  return {
    id: dto.id,
    companyName: dto.name,
    sharesQuantity: dto.shares,
    grossPrice: dto.price_gross,
    netPrice: calculateNetPrice(dto.price_gross),
  };
}

export function mapHoldingDtosToModel(dtos: GetDataItemDto[]): Holding[] {
  return dtos.map(mapHoldingDtoToModel);
}

export function mapHoldingDtoWsToModel(dto: GetDataItemDto): Holding {
  return {
    id: dto.id,
    companyName: dto.name,
    sharesQuantity: dto.shares,
    grossPrice: calculateGrossPrice(dto.price_net),
    netPrice: dto.price_net,
  };
}

export function mapHoldingDtosWsToModel(dtos: GetDataItemDto[]): Holding[] {
  return dtos.map(mapHoldingDtoWsToModel);
}
