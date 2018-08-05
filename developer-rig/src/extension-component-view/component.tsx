import * as React from 'react';
import { ExtensionFrame } from '../extension-frame';
import { BroadcasterFrame } from '../extension-frame-broadcaster';
import { LoggedInViewerFrame } from '../extension-frame-loggedinviewer';
import { LoggedOutViewerFrame } from '../extension-frame-loggedoutviewer';
import { RigExtension, FrameSize } from '../core/models/rig';
import { Position } from '../types/extension-coordinator';
import { ExtensionMode, ExtensionViewType } from '../constants/extension-coordinator';
const { getComponentPositionFromView, getComponentSizeFromView } = window['extension-coordinator'];
import axios from 'axios';

const PROXY = 'https://outside-hacks-api.herokuapp.com/api';

interface ExtensionComponentViewProps {
  id: string
  extension: RigExtension;
  frameSize: FrameSize;
  position: Position;
  role: string;
  bindIframeToParent: (iframe: HTMLIFrameElement) => void;
}

interface StateProps {
  queue: Array<Object>;
  totalContributions: number;
}

type State = StateProps;

type Props = ExtensionComponentViewProps & React.HTMLAttributes<HTMLDivElement>;

// export function request(artist:string, title:string, trackId:string, jukeboxId:string, duration:number){
//   const body = {
//     artist: artist,
//     title: title,
//     trackId: trackId,
//     casterId: jukeboxId,
//     userId: "5b67122eea52308b0ac53523",
//     duration: duration
//   }
//
//   axios.post(PROXY+`/jukebox`, body)
//     .then(resp => {
//       // console.log('resp', resp)
//       const queue = resp.data.tracks;
//       console.log(queue);
//       const totalContributions = resp.data.totalContributions;
//       return {queue, totalContributions}
//     })
// }

export class ExtensionComponentView extends React.Component<Props, State> {
  public state: State = {
    queue: [],
    totalContributions: 0,
  }

  public shouldComponentUpdate(){
    return true;
  }


  private computeViewStyles(): React.CSSProperties {
    const extension = this.props.extension;
    const positionFromView = getComponentPositionFromView(
      this.props.frameSize.width,
      this.props.frameSize.height,
      {
        x: this.props.position.x * 100,
        y: this.props.position.y * 100,
      });
    const sizeFromView = getComponentSizeFromView(
      this.props.frameSize.width,
      this.props.frameSize.height,
      extension.views.component);

    let viewStyles:  React.CSSProperties = {
      border: '1px solid #7D55C7',
      position: 'absolute',
      left: positionFromView.x + 'px',
      top: positionFromView.y + 'px',
      width: `${sizeFromView.width}px`,
      height: `${sizeFromView.height}px`,
    }

    if (extension.views.component.zoom) {
      viewStyles = {
        ...viewStyles,
        width: `${sizeFromView.width / sizeFromView.zoomScale}px`,
        height: `${sizeFromView.height / sizeFromView.zoomScale}px`,
        transformOrigin: '0 0',
        transform: `scale(${sizeFromView.zoomScale})`,
      }
    }

    return viewStyles;
  }

  private renderFrame(){
    let view = null;
    if (this.props.role === "Broadcaster"){
      view = (
          <BroadcasterFrame
            className="view"
            frameId={`frameid-${this.props.id}`}
            extension={this.props.extension}
            type={ExtensionViewType.Component}
            mode={ExtensionMode.Viewer}
            request={this.request}
            queue={this.state.queue}
            totalContributions={this.state.totalContributions}
          />
      );
    } else if (this.props.role === "Logged-In Viewer"){
      view = (
        <LoggedInViewerFrame
          className="view"
          frameId={`frameid-${this.props.id}`}
          extension={this.props.extension}
          type={ExtensionViewType.Component}
          mode={ExtensionMode.Viewer}
          request={this.request}
          queue={this.state.queue}
          totalContributions={this.state.totalContributions}
        />
      );
    } else if (this.props.role === "Logged-Out Viewer"){
      view = (
        <LoggedOutViewerFrame
          className="view"
          frameId={`frameid-${this.props.id}`}
          extension={this.props.extension}
          type={ExtensionViewType.Component}
          mode={ExtensionMode.Viewer}
        />
      );
    }
    return view
  }

  private request = async (artist:string, title:string, trackId:string,
      jukeboxId:string, userId:string,duration:number, image:string, casterId: string) => {
    console.log('requesting in parent')
    const body = { artist, title, trackId, jukeboxId, userId, duration, image, casterId }

    await axios.post(PROXY+`/jukebox`, body)
      .then(async resp => {
        console.log(resp);
        const queue = resp.data.tracks;
        const totalContributions = resp.data.totalContributions;
        await this.setState({ queue, totalContributions })
        console.log('after', this.state.queue, this.state.totalContributions)
      })

    return { queue: this.state.queue, totalContributions: this.state.totalContributions}
  }

  public render() {
    return (
      <div>
        <div
          className="view component-view"
          style={{
            width: this.props.frameSize.width + 'px',
            height: this.props.frameSize.height + 'px',
          }}>
          <div style={this.computeViewStyles()}>
            {this.renderFrame()}
          </div>
        </div>
      </div>
    );
  }
}
