import { MobileOrientation } from '../../constants/mobile';
import { ExtensionManifest } from '../../core/models/manifest';
import { RigExtensionView } from '../../core/models/rig';
import { ExtensionMode } from '../../constants/extension-coordinator';

export const ManifestForTest: ExtensionManifest = {
  anchor: 'panel',
  author_name: 'test',
  bits_enabled: true,
  can_install: true,
  config_url: 'test',
  description: 'test',
  eula_tos_url: 'test.com',
  icon_url: 'test.com',
  icon_urls: {},
  id: 'test',
  installation_count: 0,
  live_config_url: 'test.com',
  name: 'test',
  panel_height: 300,
  privacy_policy_url: 'test.com',
  request_identity_link: false,
  required_broadcaster_abilities: ['test'],
  screenshot_urls: ['test.png'],
  sku: 'test',
  state: 'test',
  summary: 'test',
  support_email: 'test',
  vendor_code: 'test',
  version: '0.0.1',
  views: {
    panel: {
      viewerUrl: 'test'
    },
    config: {
      viewerUrl: 'test'
    },
    liveConfig: {
      viewerUrl: 'test',
    },
    component: {
      aspectHeight: 3000,
      aspectWidth: 2500,
      zoom: false,
      viewerUrl: 'test',
    }
  },
  whitelisted_config_urls: [],
  whitelisted_panel_urls: [],
}
export const ExtensionForTest = {
  authorName: 'test',
  id: 'id',
  description: 'description',
  iconUrl: 'icon_url',
  name: 'name',
  requestIdentityLink: false,
  sku: 'sku',
  state: 'state',
  summary: 'summary',
  token: 'token',
  vendorCode: 'vendorCode',
  version: '0.1',
  views: {
    panel: {
      viewerUrl: 'test'
    },
    config: {
      viewerUrl: 'test'
    },
    liveConfig: {
      viewerUrl: 'test',
    },
    component: {
      aspectHeight: 3000,
      aspectWidth: 2500,
      zoom: false,
      viewerUrl: 'test',
    }
  },
  whitelistedConfigUrls: ['foo'],
  whitelistedPanelUrls: ['bar'],
  channelId: 'channelId',
  bitsEnabled: false,
};

export function createViewsForTest(numOfViews: number, type: string, role: string, extras?: any): Partial<RigExtensionView>[] {
  let ex = {
    x: 0,
    y: 0,
    orientation: MobileOrientation.Portrait,
  }
  const extViews = [];
  if (extras) {
    ex.x = extras.x;
    ex.y = extras.y;
  }

  for (let i = 0; i < numOfViews; i++) {
    extViews.push({
      id: (extViews.length + 1).toString(),
      type: type,
      mode: 'viewer',
      extension: ExtensionForTest,
      linked: false,
      role: role,
      x: ex.x,
      y: ex.y,
      orientation: ex.orientation,
    })
  }
  return extViews;
}
