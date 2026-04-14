export interface GetDataItemDto {
  id: number;
  name: string;
  shares: number;
  price_gross: number;
  price_net: number;
}

export interface GetDataResponseDto {
  success: boolean;
  data: GetDataItemDto[];
}

export interface ApiErrorDto {
  success: false;
  message: string;
}

export interface SaveDataRequestDto {
  name: string;
  shares: number;
}

export interface WsMessageDto {
  type: 'price_update';
  data: GetDataItemDto[];
}
