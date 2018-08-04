import { ExtensionAnchor, ExtensionPlatform } from './extension-coordinator';

export const ExtensionAnchors: {[key: string]: string} = {
  [ExtensionAnchor.Overlay]: 'Overlay',
  [ExtensionAnchor.Panel]: 'Panel',
  [ExtensionAnchor.Component]: 'Component',
  [ExtensionPlatform.Mobile]: 'Mobile',
};
export const DefaultExtensionType = ExtensionAnchor.Overlay;
