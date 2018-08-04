import * as rigActions from '../actions/rig';
import { rigReducer, RigState } from './rig';

describe('Extensions', () => {
  let state: RigState;

  it('returns a correct inital state', () => {
    state = rigReducer(undefined, { type: 'INIT' } as any);
    expect(state.mockApi).toBeFalsy();
  });

  it('sets a correct mockApi value', () => {
    state = rigReducer(undefined, rigActions.toggleMockApi());
    expect(state.mockApi).toBeTruthy();
  });
});
