export interface Holding {
  id: number;
  companyName: string;
  sharesQuantity: number;
  grossPrice: number;
  netPrice: number;
}

export interface HomeState {
  holdings: Holding[];
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
}
