import { RigStore } from './rig-store';
import { GlobalState } from './models/global-state';

describe('RigStore', () => {
  it('initializes the correct reducers', () => {
    const store = new RigStore();
    const expectedState: GlobalState = {
      rig: {
        mockApi: false,
      },
      session: {},
      extensions: {},
      products: {
        products: [],
        error: '',
      },
    }
    const state = store.getState();
    expect(state).toEqual(expectedState);
  });
});
