export interface GenericResponse {
  name: string;
}
export interface OnContextResponse extends GenericResponse {
  mode: string;
  bitrate: number;
  bufferSize: number;
  displayResolution: string;
  game: string;
  hlsLatencyBroadcaster: number;
  isFullScreen: boolean;
  isPaused: boolean;
  isTheatreMode: boolean;
  language: string;
  playbackMode: string;
  theme: string;
  videoResolution: string;
}

export interface OnAuthorizedResponse extends GenericResponse{
  channelId: string;
  clientId: string;
  token: string;
  userId: string;
}

export interface RunList {
  onContext: OnContextResponse[];
  onAuthorized: OnAuthorizedResponse[];
  [key: string]: (OnAuthorizedResponse | OnContextResponse)[];
}
