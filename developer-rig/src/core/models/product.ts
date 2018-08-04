export interface Product {
  sku: string;
  displayName: string;
  amount: number;
  inDevelopment: string;
  broadcast: string;
  deprecated: boolean;
  dirty: boolean;
  savedInCatalog: boolean;
  error?: string,
  validationErrors?: ValidationErrors;
}

export interface DeserializedProduct {
  domain: string;
  sku: string;
  displayName: string;
  cost: {
    amount: string;
    type: string;
  },
  inDevelopment: boolean;
  broadcast: boolean;
  expiration: string;
}

export interface ValidationErrors {
  sku?: string;
  displayName?: string;
  amount?: string;
  inDevelopment?: string;
  broadcast?: string;
}
