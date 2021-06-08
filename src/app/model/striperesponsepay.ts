export interface StripeSessionResponse {
  object: string;
  data: Paiement[]
}

export interface Paiement {
  id: string;
  object: string;
  amount_total: number;
  currency: string;
  price: Price;
  quantity: number;
}

export interface Price {
  id: string;
  object: string;
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: string;
  livemode: boolean;
  lookup_key?: any;
  product: string;
  recurring?: any;
  tiers_mode?: any;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
}
