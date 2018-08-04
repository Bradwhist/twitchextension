import * as extensionActions from '../actions/extensions';
import { extensionsReducer, ExtensionsState } from './extensions';
import { ManifestForTest } from '../../tests/constants/extension';

describe('Extensions', () => {
  let state: ExtensionsState;

  it('returns a correct inital state', () => {
    state = extensionsReducer(undefined, { type: 'INIT' } as any);
    expect(state.manifest).toBeUndefined();
  });

  it('sets a correct extension manifest', () => {
    state = extensionsReducer(undefined, extensionActions.saveManifest(ManifestForTest));
    expect(state.manifest).toEqual(ManifestForTest);
  });
});
