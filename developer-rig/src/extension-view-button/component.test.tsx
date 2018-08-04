import { setupShallowTest } from '../tests/enzyme-util/shallow';
import { ExtensionViewButton } from './component';

describe('<ExtensionViewButton />', () => {
  const setupShallow = setupShallowTest(ExtensionViewButton, () => ({
    onClick: jest.fn(),
  }));

  it('renders correctly', () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it('fires onClick when clicked on', () => {
    const { wrapper } = setupShallow();
    wrapper.find('.circle-button').simulate('click');
    expect(wrapper.instance().props.onClick).toHaveBeenCalled();
  });
});
