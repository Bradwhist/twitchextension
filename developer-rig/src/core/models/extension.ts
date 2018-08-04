export type ExtensionView = {
  viewerUrl: string;
};

export type ComponentView = ExtensionView & {
  aspectHeight: number;
  aspectWidth: number;
  zoom: boolean;
  zoomPixels: number;
};

export type ConfigView = ExtensionView;
export type LiveConfigView = ExtensionView;
export type MobileView = ExtensionView;
export type PanelView = ExtensionView & {
  height: number;
};
export type VideoOverlayView = ExtensionView;

export type ExtensionViews = {
  component?: ComponentView;
  config?: ConfigView;
  liveConfig?: LiveConfigView;
  mobile?: MobileView;
  panel?: PanelView;
  videoOverlay?: VideoOverlayView;
};

export interface Extension {
  authorName: string;
  id: string;
  description: string;
  iconUrl: string;
  name: string;
  requestIdentityLink: boolean
  sku: string;
  state: string;
  summary: string;
  token: string;
  vendorCode: string;
  version: string;
  views: ExtensionViews;
  whitelistedConfigUrls: string[];
  whitelistedPanelUrls: string[];
  channelId: string;
}
