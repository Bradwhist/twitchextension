export function newMockCoordinator() {
  let coordinator = {} as any;

  coordinator.ExtensionMode = {
    Viewer: 'viewer',
    Dashboard: 'dashboard',
    Config: 'config',
  };

  coordinator.ExtensionPlatform = {
    Web: 'web',
    Mobile: 'mobile'
  };

  coordinator.ExtensionAnchor = {
    Panel: 'panel',
    Overlay: 'video_overlay',
    Component: 'component',
  };

  coordinator.ExtensionViewType = {
    Component: 'component',
    Config: 'config',
    LiveConfig: 'liveConfig',
    Mobile: 'mobile',
    Panel: 'panel',
    VideoOverlay: 'videoOverlay',
  };

  coordinator.getComponentPositionFromView = () => ({
    x: 20,
    y: 20,
  });

  coordinator.getComponentSizeFromView = () => ({
    width: 10,
    height: 10,
    zoomScale: 1024,
  })

  return coordinator;
}
