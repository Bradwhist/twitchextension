interface VideoStats {
  bufferSize: number;
  displayResolution: string;
  skippedFrames: number;
  fps: number;
  hlsLatencyBroadcaster: number;
  hlsLatencyEncoder: number;
  memoryUsage: number;
  playbackRate: number;
  videoResolution: string;
  backendVersion: string;
}

interface EmbedPlayer {
  addEventListener(eventName: string, callback: () => void): void;
  removeEventListener(eventName: string, callback: () => void): void;

  getFullscreen(): boolean;
  getPlaybackStats(): VideoStats;
  getTheatre(): boolean;
  isPaused(): boolean;

  getMuted(): boolean;
  getVolume(): number;
}

interface VideoPlayer extends EmbedPlayer {
  setStatsEnabled(enabled: boolean): void;
}

type Player = EmbedPlayer | VideoPlayer;
