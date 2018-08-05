import * as React from 'react';
import { ExtensionView } from '../extension-view';
import { ExtensionViewButton } from '../extension-view-button';
import { ExtensionMode } from '../constants/extension-coordinator';
import './component.sass';
import { RigExtensionView, RigExtension } from '../core/models/rig';
import axios from 'axios';

const PROXY = 'https://outside-hacks-api.herokuapp.com/api';


interface ExtensionViewContainerProps {
  mode: string;
  extensionViews: RigExtensionView[];
  openEditViewHandler?: (id: string) => void;
  deleteExtensionViewHandler: (id: string) => void;
  openExtensionViewHandler: Function;
  extension: RigExtension;
}

type Props = ExtensionViewContainerProps;

interface StateProps {
  queue: Array<Object>;
  totalContributions: number;
}

type State = StateProps;

export class ExtensionViewContainer extends React.Component<Props, State> {
  public state: State = {
    queue: [],
    totalContributions: 0,
  }

  private openExtensionViewDialog = () => {
    this.props.openExtensionViewHandler();
  }

  private request = async (artist:string, title:string, trackId:string,
      jukeboxId:string, userId:string,duration:number, image:string) => {
    console.log('requesting in parent')
    const body = { artist, title, trackId, jukeboxId, userId, duration, image }

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
    if (this.props.mode !== ExtensionMode.Viewer) {
      const configType = this.props.mode === ExtensionMode.Config ? ExtensionMode.Config : ExtensionMode.Dashboard;
      return (<ExtensionView
        id={this.props.mode}
        type={configType}
        extension={this.props.extension}
        mode={this.props.mode}
        key={this.props.mode}
        request={this.request}
        queue={this.state.queue}
        totalContributions={this.state.totalContributions}
      />
      );
    }

    let extensionViews: JSX.Element[] = [];
    if (this.props.extensionViews && this.props.extensionViews.length > 0) {
      extensionViews = this.props.extensionViews.map(view => {
        return <ExtensionView
          key={view.id}
          id={view.id}
          extension={view.extension}
          type={view.type}
          mode={this.props.mode}
          role={view.role}
          frameSize={view.frameSize}
          position={{x: view.x, y: view.y}}
          linked={view.linked}
          orientation={view.orientation}
          openEditViewHandler={this.props.openEditViewHandler}
          deleteViewHandler={this.props.deleteExtensionViewHandler}
          request={this.request}
          queue={this.state.queue}
          totalContributions={this.state.totalContributions}
        />
      });
    }

    return (
      <div className='view-container-wrapper'>
          <div className="view-container">
          { extensionViews }
        </div>
        <div>
          <ExtensionViewButton
            onClick={this.openExtensionViewDialog}>
          </ExtensionViewButton>
        </div>
      </div>
    );
  }
}
