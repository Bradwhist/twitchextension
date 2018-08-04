import { setupShallowTest } from '../tests/enzyme-util/shallow';
import { EditViewDialog } from './component';
import { ViewerTypes } from '../constants/viewer-types';
import { createViewsForTest } from '../tests/constants/extension';
import { MobileOrientation } from '../constants/mobile';
import { ExtensionViewType } from '../constants/extension-coordinator';

describe('<EditViewDialog />', () => {
  const setupShallow = setupShallowTest(EditViewDialog, () => ({
    show: true,
    idToEdit: '1',
    views: createViewsForTest(2, ExtensionViewType.Component, ViewerTypes.LoggedOut, { x: 10, y: 10 }),
    closeHandler: jest.fn(),
    saveViewHandler: jest.fn(),
  }));

  it('renders correctly', () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it('does not render if show is false', () => {
    const { wrapper } = setupShallow({
      show: false,
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('correctly closes', () => {
    const { wrapper } = setupShallow();
    wrapper.find('.top-bar-container__escape').simulate('click');
    expect(wrapper.instance().props.closeHandler).toHaveBeenCalled();

    wrapper.find('.bottom-bar__cancel').simulate('click');
    expect(wrapper.instance().props.closeHandler).toHaveBeenCalledTimes(2);
  });

  it('saves correctly', () => {
    const { wrapper } = setupShallow();
    wrapper.find('.bottom-bar__save').simulate('click');
    expect(wrapper.instance().props.saveViewHandler).toHaveBeenCalled();
  });

  it('component state changes position correctly', () => {
    const { wrapper } = setupShallow();
    const expectedPosition = { x: 10, y: 10 };
    const expectedChangedPosition = { x: 50, y: 50 };

    let inputs = wrapper.find('div.edit-subcontainer__input > input');
    expect(inputs.get(0).props.value).toEqual(expectedPosition.x);
    expect(inputs.get(1).props.value).toEqual(expectedPosition.y);

    inputs.first().simulate('change', { 'currentTarget': { 'name': 'x', 'value': 50 } });
    inputs.first().simulate('change', { 'currentTarget': { 'name': 'y', 'value': 50 } });

    wrapper.update();
    inputs = wrapper.find('div.edit-subcontainer__input > input');
    expect(inputs.get(0).props.value).toEqual(expectedChangedPosition.x);
    expect(inputs.get(1).props.value).toEqual(expectedChangedPosition.y);
  });

  it('component state changes orientation correctly', () => {
    const { wrapper } = setupShallow({
      idToEdit: '1',
      views: createViewsForTest(2, ExtensionViewType.Mobile, ViewerTypes.LoggedOut, { orientation: MobileOrientation.Portrait}),
    });

    let inputs = wrapper.find('RadioOption');
    expect(inputs.get(0).props.checked).toBeTruthy();
    expect(inputs.get(1).props.checked).toBeFalsy();

    inputs.last().simulate('change', { 'currentTarget': { 'name': 'orientation', 'value': MobileOrientation.Landscape }});

    wrapper.update();

    inputs = wrapper.find('RadioOption');
    expect(inputs.get(0).props.checked).toBeFalsy();
    expect(inputs.get(1).props.checked).toBeTruthy();
  });
});
