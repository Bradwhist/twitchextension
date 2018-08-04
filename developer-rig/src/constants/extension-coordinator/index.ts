export enum ExtensionActivationStatus {
  Active = 'active',
  Inactive = 'inactive',
}
export enum ExtensionAnchor {
  Hidden = 'hidden',
  Panel = 'panel',
  Overlay = 'video_overlay',
  Component = 'component',
}
export enum ExtensionMode {
  Config = 'config',
  Dashboard = 'dashboard',
  Viewer = 'viewer',
}
export enum ExtensionPlatform {
  Mobile = 'mobile',
  Web = 'web',
}
export enum ExtensionState {
  Testing = 'Testing',
  HostedTest = 'Assets Uploaded',
  Approved = 'Approved',
  Released = 'Released',
  ReadyForReview = 'Ready For Review',
  InReview = 'In Review',
  PendingAction = 'Pending Action',
  Uploading = 'Uploading',
}
export enum ExtensionAction {
  TwitchExtAuth = 'twitch-ext-auth',
  TwitchExtBootstrap = 'twitch-ext-bootstrap',
  TwitchExtContext = 'twitch-ext-context',
  TwitchExtError = 'twitch-ext-error',
  TwitchExtLoaded = 'twitch-ext-loaded',
  TwitchExtLongtask = 'twitch-ext-longtask',
  TwitchExtNetworkTiming = 'twitch-ext-network-timing',
  TwitchExtReload = 'twitch-ext-reload',
  TwitchExtUserAction = 'twitch-ext-user-action',
  TwitchExtConfirmationRequest = 'twitch-ext-confirmation-request',
  TwitchExtBeginPurchase = 'twitch-ext-begin-purchase',
  TwitchExtReloadEntitlements = 'twitch-ext-reload-entitlements',
  TwitchExtProductPrices = 'twitch-ext-product-prices',
  TwitchExtVisibilityChanged = 'twitch-ext-visibility-changed',
  TwitchExtBitsProducts = 'twitch-ext-bits-products',
  TwitchExtUseBits = 'twitch-ext-use-bits',
  TwitchExtBitsTransactionComplete = 'twitch-ext-bits-transaction-complete',
  TwitchExtBitsOnHover = 'twitch-ext-bits-on-hover',
  TwitchExtPubSubReceived = 'twitch-ext-pubsub-received',
  TwitchExtPositionChanged = 'twitch-ext-position-changed',
  TwitchExtPubsubMessage = 'twitch-ext-pubsub-message',
  TwitchExtPubsubBindFailure = 'twitch-ext-pubsub-bind-failure',
  TwitchExtPubsubListen = 'twitch-ext-pubsub-listen',
  TwitchExtPubsubUnlisten = 'twitch-ext-pubsub-unlisten',
}
export const DefaultZoomPixelWidth = 1024;

export enum ExtensionViewType {
    Component = "component",
    Config = "config",
    Hidden = "hidden",
    LiveConfig = "liveConfig",
    Mobile = "mobile",
    Panel = "panel",
    VideoOverlay = "videoOverlay",
}
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
export type HiddenView = ExtensionView;
export type LiveConfigView = ExtensionView;
export type MobileView = ExtensionView;
export type PanelView = ExtensionView & {
    height: number;
};
export type VideoOverlayView = ExtensionView;
export type ExtensionViews = {
    [ExtensionViewType.Component]?: ComponentView;
    [ExtensionViewType.Config]?: ConfigView;
    [ExtensionViewType.Hidden]?: HiddenView;
    [ExtensionViewType.LiveConfig]?: LiveConfigView;
    [ExtensionViewType.Mobile]?: MobileView;
    [ExtensionViewType.Panel]?: PanelView;
    [ExtensionViewType.VideoOverlay]?: VideoOverlayView;
};
export interface ExtensionIcons {
    square24?: string;
    square100: string;
    discoverySplash?: string;
}
export interface ExtensionObject {
    authorName: string;
    bitsEnabled: boolean;
    clientId: string;
    description: string;
    iconUrl: string;
    iconUrls: ExtensionIcons;
    id: string;
    name: string;
    requestIdentityLink: boolean;
    sku: string;
    summary: string;
    token: string;
    version: string;
    views: ExtensionViews;
    vendorCode: string;
    state: ExtensionState;
    whitelistedConfigUrls: string[];
    whitelistedPanelUrls: string[];
}
export interface ExtensionActivationConfig {
    anchor: ExtensionAnchor;
    slot: string;
    state: ExtensionActivationStatus;
    x?: number;
    y?: number;
}
export interface ExtensionInstallation {
    id: string;
    extension: ExtensionObject;
    activationConfig: ExtensionActivationConfig;
}
export interface ComponentExtensionPosition {
    x: number;
    y: number;
}
export interface ComponentDisplayState {
    anchor: ExtensionAnchor.Component;
    position: ComponentExtensionPosition;
    isVisible: boolean;
}
export interface OverlayDisplayState {
    anchor: ExtensionAnchor.Overlay;
    isVisible: boolean;
}
export type ExtensionDisplayState = ComponentDisplayState | OverlayDisplayState;
