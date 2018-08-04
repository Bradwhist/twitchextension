import { setupShallowTest } from '../tests/enzyme-util/shallow';
import { LoginButton } from './component';

describe('<LoginButton />', () => {
  const defaultGenerator = () => ({});
  const setupRenderer = setupShallowTest(LoginButton, defaultGenerator);

  it('renders correctly', () => {
    const { wrapper } = setupRenderer();
    expect(wrapper).toMatchSnapshot();
  });
});
