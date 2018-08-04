import { Product } from '../../core/models/product';
import * as ProductErrors from '../../constants/product-errors';

export const TestError: string = 'error';

export const TestProduct1: Product = {
  sku: 'testSku1',
  displayName: 'Test Product 1',
  amount: 100,
  inDevelopment: 'false',
  broadcast: 'false',
  deprecated: false,
  dirty: false,
  savedInCatalog: true,
};

export const TestProduct2: Product = {
  sku: 'testSku2',
  displayName: 'Test Product 2',
  amount: 500,
  inDevelopment: 'true',
  broadcast: 'false',
  deprecated: false,
  dirty: false,
  savedInCatalog: true,
};

export const UnsavedProduct: Product = {
  sku: 'testSku3',
  displayName: 'Test Product 3',
  amount: 100,
  inDevelopment: 'true',
  broadcast: 'false',
  deprecated: false,
  dirty: true,
  savedInCatalog: false,
};

export const SavedProduct: Product = {
  sku: 'testSku3',
  displayName: 'Test Product 3',
  amount: 100,
  inDevelopment: 'true',
  broadcast: 'false',
  deprecated: false,
  dirty: false,
  savedInCatalog: true,
  validationErrors: {},
};

export const UnsavedProductWithError: Product = {
  sku: 'testSku3',
  displayName: 'Test Product 3',
  amount: 100,
  inDevelopment: 'true',
  broadcast: 'false',
  deprecated: false,
  dirty: true,
  savedInCatalog: false,
  error: TestError,
  validationErrors: {},
};

export const NewProduct: Product = {
  displayName: 'New Product',
  sku: 'newSKU',
  amount: 1,
  inDevelopment: 'true',
  broadcast: 'true',
  deprecated: false,
  dirty: true,
  savedInCatalog: false,
};

export const UnchangedValidProduct: Product = {
  sku: 'testSku4',
  displayName: 'Test Product 4',
  amount: 100,
  inDevelopment: 'true',
  broadcast: 'false',
  deprecated: false,
  dirty: false,
  savedInCatalog: true,
  validationErrors: {},
};

export const ChangedValidProduct: Product = {
  sku: 'testSku4',
  displayName: 'Test Product 4',
  amount: 500,
  inDevelopment: 'true',
  broadcast: 'false',
  deprecated: false,
  dirty: true,
  savedInCatalog: true,
  validationErrors: {},
};

export const UnchangedInvalidProduct: Product = {
  sku: 'testSku5',
  displayName: 'Test Product 5',
  amount: 100,
  inDevelopment: 'true',
  broadcast: 'false',
  deprecated: false,
  dirty: false,
  savedInCatalog: true,
  validationErrors: {},
};

export const ChangedInvalidProduct: Product = {
  sku: 'test Sku5',
  displayName: 'Test Product 5',
  amount: 100,
  inDevelopment: 'true',
  broadcast: 'false',
  deprecated: false,
  dirty: true,
  savedInCatalog: true,
  validationErrors: {
    sku: ProductErrors.SKU_WHITESPACE
  },
};
