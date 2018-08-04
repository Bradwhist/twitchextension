import { ExtensionAnchor, ExtensionPlatform } from '../../constants/extension-coordinator';

export function getSupportedAnchors(views: ManifestViews): ExtensionAnchor[] {
  const anchors = [];
  if (views.videoOverlay && views.videoOverlay.viewerUrl) {
    anchors.push(ExtensionAnchor.Overlay);
  }

  if (views.panel && views.panel.viewerUrl) {
    anchors.push(ExtensionAnchor.Panel);
  }

  if (views.component && views.component.viewerUrl) {
    anchors.push(ExtensionAnchor.Component);
  }

  return anchors;
}
export function getSupportedPlatforms(views: ManifestViews): ExtensionPlatform[] {
  const platforms = [ExtensionPlatform.Web];

  if (views.mobile && views.mobile.viewerUrl) {
    platforms.push(ExtensionPlatform.Mobile);
  }

  return platforms;
}

export interface View {
  aspectHeight?: number;
  aspectWidth?: number;
  size?: number;
  zoom?: boolean;
  zoomPixels?: number;
  height?: number;
  viewerUrl: string;
}

export interface ManifestViews {
  config?: View;
  liveConfig?: View;
  panel?: View;
  videoOverlay?: View;
  mobile?: View;
  component?: View;
}

export interface ExtensionManifest {
  anchor: string;
  asset_urls?: string[];
  author_name: string;
  bits_enabled: boolean;
  can_install: boolean;
  config_url?: string;
  description: string;
  eula_tos_url: string;
  icon_url: string;
  icon_urls: Object;
  id: string;
  installation_count: number;
  live_config_url?: string;
  name: string;
  panel_height?: number;
  privacy_policy_url: string;
  request_identity_link: boolean;
  required_broadcaster_abilities?: string[];
  screenshot_urls?: string[];
  sku: string;
  state: string;
  summary: string;
  support_email: string;
  vendor_code: string;
  version: string;
  viewer_url?: string;
  viewer_urls?: Object;
  views: ManifestViews;
  whitelisted_config_urls: string[];
  whitelisted_panel_urls: string[];
}
