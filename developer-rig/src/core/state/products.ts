import { Product, ValidationErrors } from '../models/product';
import { GlobalState } from '../models/global-state';
import * as ProductActions from '../actions/products';
import * as ProductErrors from '../../constants/product-errors';

export interface ProductState {
  products: Product[];
  error: string;
}

export const getInitialState = (): ProductState => ({
  products: [],
  error: '',
});

export function productsReducer(state = getInitialState(), action: ProductActions.All): ProductState {
  let products: Product[] = state.products;

  switch (action.type) {
    case ProductActions.LOAD_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.products,
      };

    case ProductActions.LOAD_PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.error,
      }

    case ProductActions.SAVE_PRODUCT_SUCCESS:
      products = updateProduct(
        state,
        action.index,
        { savedInCatalog: true, dirty: false }
      );
      return {
        ...state,
        products: products
      };

    case ProductActions.SAVE_PRODUCT_FAILURE:
      products = updateProduct(
        state,
        action.index,
        { error: action.error }
      );
      return {
        ...state,
        products: products
      };

    case ProductActions.ADD_PRODUCT:
      products = [...state['products']];
      products.push({
        displayName: 'New Product',
        sku: 'newSKU',
        amount: 1,
        inDevelopment: 'true',
        broadcast: 'true',
        deprecated: false,
        dirty: true,
        savedInCatalog: false,
      });
      return {
        ...state,
        products: products
      };

    case ProductActions.CHANGE_PRODUCT:
      products = updateProduct(
        state,
        action.index,
        { [action.fieldName]: action.value, dirty: true }
      );
      return {
        ...state,
        products: products
      };
      
    default:
      return state;
  }
}

export function getProducts(state: GlobalState) {
  return state.products && state.products.products;
}

export function getError(state: GlobalState) {
  return state.products && state.products.error;
}

function updateProduct(state: ProductState, index: number, partial: object): Product[] {
  return state.products.map((product, idx) => {
    if (idx === index) {
      let newProduct = {
        ...product,
        ...partial
      };
      newProduct.validationErrors = validateProduct(newProduct);
      return newProduct;
    }
    return product;
  });
}

function validateProduct(product: Product): ValidationErrors {
  let validationErrors: ValidationErrors = {};

  if (!product.displayName) {
    validationErrors.displayName = ProductErrors.NAME_EMPTY;
  } else if (product.displayName.length > 255) {
    validationErrors.displayName = ProductErrors.NAME_CHAR_LIMIT;
  }

  if (!product.sku) {
    validationErrors.sku = ProductErrors.SKU_EMPTY;
  } else if (product.sku.search(/^\S*$/)) {
    validationErrors.sku = ProductErrors.SKU_WHITESPACE;
  } else if (product.sku.length > 255) {
    validationErrors.sku = ProductErrors.SKU_CHAR_LIMIT;
  }

  if (!product.amount) {
    validationErrors.amount = ProductErrors.AMOUNT_EMPTY;
  } else if (product.amount < 1 || product.amount > 10000) {
    validationErrors.amount = ProductErrors.AMOUNT_OUT_OF_RANGE;
  }

  return validationErrors;
}
