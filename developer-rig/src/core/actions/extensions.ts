import { Action } from '../models/actions';
import { ExtensionManifest } from '../models/manifest';

export const SAVE_MANIFEST = 'core.session.SAVE_MANIFEST';

interface SaveManifest extends Action<typeof SAVE_MANIFEST> {
  manifest?: ExtensionManifest;
}

export type All = (
  | SaveManifest
);

export function saveManifest(manifest: ExtensionManifest | null): SaveManifest {
  return {
    type: SAVE_MANIFEST,
    manifest: manifest,
  }
}
