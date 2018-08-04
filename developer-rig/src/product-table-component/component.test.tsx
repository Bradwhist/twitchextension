import { setupShallowTest } from '../tests/enzyme-util/shallow';
import { ProductTableComponent } from './component';
import { ProductRow } from './product-row';
import * as TestData from '../tests/constants/products';

function mockApiFunctions() {
  const original = require.requireActual('../util/api');
  return {
    ...original,
    fetchProducts: jest.fn().mockImplementation(() => Promise.resolve()),
    saveProduct: jest.fn().mockImplementation(() => Promise.resolve()),
  }
}
jest.mock('../util/api', () => mockApiFunctions());
const api = require.requireMock('../util/api');

const CLIENT_ID = 'client-id';
const TOKEN = 'token';

describe('<ProductTableComponent />', () => {
  const defaultGenerator = () => ({
    clientId: CLIENT_ID,
    products: [ TestData.TestProduct1, TestData.TestProduct2 ],
    token: TOKEN,
    error: '',

    loadProductsSuccess: jest.fn(),
    loadProductsFailure: jest.fn(),
    saveProductsSuccess: jest.fn(),
    saveProductsFailure: jest.fn(),
    addProduct: jest.fn(),
    changeProductValue: jest.fn(),
  });
  const setupRenderer = setupShallowTest(ProductTableComponent, defaultGenerator);

  it('renders correctly', () => {
    const { wrapper } = setupRenderer();
    expect(wrapper).toMatchSnapshot();
  });

  it('should fetch products', () => {
    expect(api.fetchProducts).toHaveBeenCalledTimes(1);
  });

  it('adds a product when the Add Product button is clicked', () => {
    const { wrapper } = setupRenderer();
    wrapper.find('.product-table__add-button').simulate('click');
    expect(wrapper.instance().props.addProduct).toHaveBeenCalledTimes(1);
  });

  it('changes product values when editing products', () => {
    const { wrapper } = setupRenderer();
    const fieldName = 'sku';
    const value = 'newSku';
    const productRowWrapper = wrapper.find(ProductRow).first().dive();
    productRowWrapper.find('input[name="sku"]').simulate('change', {currentTarget: {name: fieldName, value: value}});
    expect(wrapper.instance().props.changeProductValue).toHaveBeenCalledWith(0, fieldName, value);
  });

  it('deprecates a product when the Deprecate button is clicked', () => {
    const { wrapper } = setupRenderer();
    const productRowWrapper = wrapper.find(ProductRow).first().dive();
    productRowWrapper.find('.product-row__deprecate-button').simulate('click');
    expect(wrapper.instance().props.changeProductValue).toHaveBeenCalledWith(0, 'deprecated', true);
  });

  it('saves dirty product when the Save All button is clicked', () => {
    const { wrapper } = setupRenderer({
      products: [ TestData.TestProduct1, TestData.UnsavedProduct ],
    });
    wrapper.find('.product-table__save-button').simulate('click');
    expect(api.saveProduct).toHaveBeenCalledTimes(1);
  });

  it('disables save button when a product is invalid', () => {
    const { wrapper } = setupRenderer({
      products: [ TestData.TestProduct1, TestData.ChangedInvalidProduct ],
    });
    expect(wrapper.find('.product-table__save-button').prop('disabled')).toBeTruthy();
  });

  it('disables save button when duplicate SKUs are found', () => {
    const { wrapper } = setupRenderer({
      products: [ TestData.TestProduct1, TestData.TestProduct1 ],
    });
    expect(wrapper.find('.product-table__save-button').prop('disabled')).toBeTruthy();
  });
});

describe('<ProductRow />', () => {
  const setupShallow = setupShallowTest((ProductRow as any), () => ({
    product: TestData.TestProduct1
  }));

  it('renders correctly', () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it('shows validation errors', () => {
    const { wrapper } = setupShallow({
      product: {
        ...TestData.TestProduct1,
        validationErrors: {
          sku: 'SKU is invalid'
        }
      }
    });
    expect(wrapper.find('input.invalid[name="sku"]')).toHaveLength(1);
    expect(wrapper.find('p.invalid-hint').filterWhere(n => n.text() === 'SKU is invalid')).toHaveLength(1);
  });

  it('shows row as dirty', () => {
    const { wrapper } = setupShallow({
      product: TestData.UnsavedProduct,
    });
    expect(wrapper.find('.dirty-indicator')).toHaveLength(1);
  });
});
