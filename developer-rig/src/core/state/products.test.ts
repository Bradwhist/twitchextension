import * as ProductActions from '../actions/products';
import { productsReducer, ProductState } from './products';
import * as TestData from '../../tests/constants/products';

describe('Products', () => {
  let state: ProductState;

  it('returns a correct inital state', () => {
    state = productsReducer(undefined, { type: 'INIT' } as any);
    expect(state.products).toEqual([]);
    expect(state.error).toBeFalsy();
  });

  it('sets products on successful load', () => {
    const { TestProduct1, TestProduct2 } = TestData;
    state = productsReducer(undefined, ProductActions.loadProductsSuccess([TestProduct1, TestProduct2]));
    expect(state.products).toEqual([TestProduct1, TestProduct2]);
    expect(state.error).toBeFalsy();
  });

  it('sets error on failed load', () => {
    const { TestError } = TestData;
    state = productsReducer(undefined, ProductActions.loadProductsFailure(TestError));
    expect(state.products).toEqual([]);
    expect(state.error).toEqual(TestError);
  });

  it('updates a product on save success', () => {
    const { UnsavedProduct, SavedProduct } = TestData;
    state = productsReducer(undefined, ProductActions.loadProductsSuccess([UnsavedProduct]));
    state = productsReducer(state, ProductActions.saveProductSuccess(0))
    expect(state.products).toEqual([SavedProduct]);
    expect(state.error).toBeFalsy();
  });

  it('updates a product on save failure', () => {
    const { UnsavedProduct, UnsavedProductWithError, TestError } = TestData;
    state = productsReducer(undefined, ProductActions.loadProductsSuccess([UnsavedProduct]));
    state = productsReducer(state, ProductActions.saveProductFailure(0, TestError))
    expect(state.products).toEqual([UnsavedProductWithError]);
    expect(state.error).toBeFalsy();
  });

  it('add a new product', () => {
    const { TestProduct1, NewProduct } = TestData;
    state = productsReducer(undefined, ProductActions.loadProductsSuccess([TestProduct1]));
    state = productsReducer(state, ProductActions.addProduct())
    expect(state.products).toEqual([TestProduct1, NewProduct]);
    expect(state.error).toBeFalsy();
  });

  it('updates a valid product on value change', () => {
    const { UnchangedValidProduct, ChangedValidProduct } = TestData;
    state = productsReducer(undefined, ProductActions.loadProductsSuccess([UnchangedValidProduct]));
    state = productsReducer(state, ProductActions.changeProductValue(0, 'amount', 500))
    expect(state.products).toEqual([ChangedValidProduct]);
    expect(state.error).toBeFalsy();
  });

  it('updates an invalid product on value change', () => {
    const { UnchangedInvalidProduct, ChangedInvalidProduct } = TestData;
    state = productsReducer(undefined, ProductActions.loadProductsSuccess([UnchangedInvalidProduct]));
    state = productsReducer(state, ProductActions.changeProductValue(0, 'sku', 'test Sku5'))
    expect(state.products).toEqual([ChangedInvalidProduct]);
    expect(state.error).toBeFalsy();
  });
});
