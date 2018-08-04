import { Action } from '../models/actions';

export const TOGGLE_MOCK_API = 'core.rig.TOGGLE_MOCK_API';

interface ToggleMockApi extends Action<typeof TOGGLE_MOCK_API> {}

export type All = (
  | ToggleMockApi
);

export function toggleMockApi(): ToggleMockApi {
  return {
    type: TOGGLE_MOCK_API,
  }
}
