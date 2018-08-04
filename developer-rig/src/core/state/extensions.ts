import { ExtensionManifest } from '../models/manifest';
import { GlobalState } from '../models/global-state';
import * as extensionActions from '../actions/extensions';

export interface ExtensionsState {
  manifest?: ExtensionManifest;
}

export const getInitialState = (): ExtensionsState => ({});

export function extensionsReducer(state = getInitialState(), action: extensionActions.All): ExtensionsState {
  switch (action.type) {
    case extensionActions.SAVE_MANIFEST:
      return {
        ...state,
        manifest: action.manifest,
      };
    default:
      return state;
  }
}

export function getManifest(state: GlobalState) {
  return state.extensions && state.extensions.manifest;
}
