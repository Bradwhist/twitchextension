export interface ComponentViewSizeProps {
    aspectWidth?: number;
    aspectHeight?: number;
    zoom?: boolean;
    zoomPixels?: number;
}
export interface ComponentSizingInfo {
    width: number;
    height: number;
    zoomScale: number;
}
export interface Position {
    x: number;
    y: number;
}
export declare function getComponentPositionFromView(playerWidth: number, playerHeight: number, configPosition: Position): Position;
export declare function getComponentSizeFromView(playerWidth: number, playerHeight: number, component: ComponentViewSizeProps): ComponentSizingInfo;
