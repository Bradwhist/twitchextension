import { setupShallowTest } from '../tests/enzyme-util/shallow';
import { UserDropdownComponent } from './component';

describe('<UserDropdownComponent />', () => {
  const defaultGenerator = () => ({
    session: { login: 'test', profileImageUrl: 'test.png', authToken: 'test' },
  });
  const setupRenderer = setupShallowTest(UserDropdownComponent, defaultGenerator);

  it('renders correctly', () => {
    const { wrapper } = setupRenderer();
    expect(wrapper).toMatchSnapshot();
  });

  it('does not render if session null', () => {
    const { wrapper } = setupRenderer({
      session: null,
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('remders correctly when clicked', () => {
    const { wrapper } = setupRenderer();
    wrapper.simulate('click');
    expect(wrapper.find('.user-dropdown__menu.open')).toHaveLength(1);

    wrapper.simulate('click');
    expect(wrapper.find('.open')).toHaveLength(0);
  });
});
