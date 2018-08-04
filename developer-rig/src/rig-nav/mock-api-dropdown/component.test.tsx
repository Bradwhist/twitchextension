import { setupShallowTest } from '../../tests/enzyme-util/shallow';
import { MockApiDropdownComponent } from './component';

describe('<MockApiDropdownComponent />', () => {
  const setupShallow = setupShallowTest(MockApiDropdownComponent, () => ({
    toggleMockApi: jest.fn()
  }));

  it('renders correctly', () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it('calls toggleMockApi when enable disable called', () => {
    const { wrapper } = setupShallow();
    wrapper.find('li>div').simulate('click');

    const instance = wrapper.instance() as MockApiDropdownComponent;
    expect(instance.props.toggleMockApi).toHaveBeenCalled();
  });
});
