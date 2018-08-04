import { setupShallowTest } from '../tests/enzyme-util/shallow';
import { RunListTrigger } from './component';
import { setupMountTest } from '../tests/enzyme-util/mount';
import { runInContext } from 'vm';

describe('<RunListTrigger />', () => {
  const setupShallow = setupMountTest(RunListTrigger, () => ({
    runList: {
      'onContext': [{
        'name': 'testContext',
      }],
      'onAuthorized': [{
        'name': 'testAuth',
      }],
    }
  }));

  it('renders correctly', () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it('changing different triggers sets state correctly', () => {
    const { wrapper } = setupShallow();
    let instance = wrapper.instance() as RunListTrigger;
    const opts = wrapper.find('option');
    expect(instance.state.selectedTrigger).toEqual('testContext');

    instance.onChange({
      currentTarget: {
        name: 'auth option',
        value: opts.last().text(),
      }
    } as React.FormEvent<HTMLSelectElement>);

    expect(instance.state.selectedTrigger).toEqual('testAuth');
  });
});
