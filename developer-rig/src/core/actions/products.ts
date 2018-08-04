import { Action } from '../models/actions';
import { Product } from '../models/product';

export const LOAD_PRODUCTS_SUCCESS = 'core.products.LOAD_SUCCESS';
export const LOAD_PRODUCTS_FAILURE = 'core.products.LOAD_FAILURE';
export const SAVE_PRODUCT_SUCCESS = 'core.products.SAVE_SUCCESS';
export const SAVE_PRODUCT_FAILURE = 'core.products.SAVE_FAILURE';
export const ADD_PRODUCT = 'core.products.ADD';
export const CHANGE_PRODUCT = 'core.products.CHANGE';

interface LoadProductsSuccess extends Action<typeof LOAD_PRODUCTS_SUCCESS> {
  products: Product[];
}

interface LoadProductsFailure extends Action<typeof LOAD_PRODUCTS_FAILURE> {
  error: string;
}

interface SaveProductSuccess extends Action<typeof SAVE_PRODUCT_SUCCESS> {
  index: number;
}

interface SaveProductFailure extends Action<typeof SAVE_PRODUCT_FAILURE> {
  index: number;
  error: string;
}

interface AddProduct extends Action<typeof ADD_PRODUCT> {}

interface ChangeProductValue extends Action<typeof CHANGE_PRODUCT> {
  index: number;
  fieldName: string;
  value: string;
}

export type All = (
  | LoadProductsSuccess
  | LoadProductsFailure
  | SaveProductSuccess
  | SaveProductFailure
  | AddProduct
  | ChangeProductValue
);

export function loadProductsSuccess(products: Product[]): LoadProductsSuccess {
  return {
    type: LOAD_PRODUCTS_SUCCESS,
    products: products,
  }
}

export function loadProductsFailure(error: string): LoadProductsFailure {
  return {
    type: LOAD_PRODUCTS_FAILURE,
    error: error,
  }
}

export function saveProductSuccess(index: number): SaveProductSuccess {
  return {
    type: SAVE_PRODUCT_SUCCESS,
    index: index,
  }
}

export function saveProductFailure(index: number, error: string): SaveProductFailure {
  return {
    type: SAVE_PRODUCT_FAILURE,
    index: index,
    error: error,
  }
}

export function addProduct(): AddProduct {
  return {
    type: ADD_PRODUCT,
  }
}

export function changeProductValue(index: number, fieldName: string, value: any): ChangeProductValue {
  return {
    type: CHANGE_PRODUCT,
    index: index,
    fieldName: fieldName,
    value: value,
  }
}