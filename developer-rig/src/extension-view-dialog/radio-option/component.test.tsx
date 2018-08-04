import { setupShallowTest } from '../../tests/enzyme-util/shallow';
import { RadioOption } from './component';

describe('<RadioOption />', () => {
  const setupShallow = setupShallowTest(RadioOption, () => ({
    name: 'test',
    value: 'test',
    onChange: jest.fn(),
    checked: false,
  }));

  it('renders correctly', () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });
});
