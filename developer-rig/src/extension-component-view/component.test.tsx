import { setupShallowTest } from '../tests/enzyme-util/shallow';
import { ExtensionComponentView } from './component';
import { ViewerTypes } from '../constants/viewer-types';
import { ExtensionForTest } from '../tests/constants/extension';

describe('<ExtensionComponentView />', () => {
  const setupShallow = setupShallowTest(ExtensionComponentView, () => ({
    id: '1',
    extension: ExtensionForTest,
    frameSize: { width: 800, height: 600 },
    position: { x: 10, y: 10 },
    role: ViewerTypes.Broadcaster,
    biindIframeToParent: jest.fn(),
  }));

  it('renders correctly', () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly when zoom is true', () => {
    const ext = Object.assign({}, ExtensionForTest, {
      ...ExtensionForTest,
      views: {
        component: {
          aspectWidth: 3000,
          aspectHeight: 2000,
          zoom: true,
        },
        config: {
          viewerUrl: "test",
        },
        liveConfig: {
          viewerUrl: "test",
        },
        panel: {
          viewerUrl: 'test',
          height: '300px'
        }
      },
    });
    const { wrapper } = setupShallow({
      extension: ext,
    });
    expect(wrapper).toMatchSnapshot();
  });
});
