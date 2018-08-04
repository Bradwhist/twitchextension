import { setupShallowTest } from '../tests/enzyme-util/shallow';
import { SignInDialog } from './component';

describe('<SignInDialog />', () => {
  const setupShallow = setupShallowTest(SignInDialog, () => ({
    show: true,
    closeSignInDialog: jest.fn(),
  }));

  it('renders correctly', () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it('fires closeSignInDialog when top exit button is clicked', () => {
    const { wrapper } = setupShallow();
    wrapper.find('.top-bar-container__escape').simulate('click');
    expect(wrapper.instance().props.closeSignInDialog).toHaveBeenCalled();
  });
});
