import { GlobalState } from '../models/global-state';
import * as RigActions from '../actions/rig';

export interface RigState {
  mockApi?: boolean;
}

export const getInitialState = (): RigState => ({
  mockApi: false,
});

export function rigReducer(state = getInitialState(), action: RigActions.All): RigState {
  switch (action.type) {
    case RigActions.TOGGLE_MOCK_API:
      return {
        ...state,
        mockApi: !state.mockApi,
      };
    default:
      return state;
  }
}

export function mockApiEnabled(state: GlobalState) {
  return state.rig && state.rig.mockApi;
}
