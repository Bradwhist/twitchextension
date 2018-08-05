import * as React from 'react';
import './component.sass';
import axios from 'axios';
import { RigExtension } from '../core/models/rig';
import { ExtensionPlatform, ExtensionViewType} from '../constants/extension-coordinator';

const IFRAME_CLASS = 'extension-frame';
const EXTENSION_FRAME_INIT_ACTION = 'extension-frame-init';

interface BroadcasterFrameProps {
  className: string;
  frameId: string;
  extension: RigExtension;
  type: string;
  mode: string;
  bindIframeToParent: (iframe: HTMLIFrameElement) => void;
}

type Props = BroadcasterFrameProps;

interface StateProps {
  artistInput: string;
  songInput: string;
  searchInput: string;
  queue: Array<Object>;
  searchResults: Array<Object>;
  select: any;
  searched: boolean;
  totalContributions: number;
}

type State = StateProps;

export class BroadcasterFrame extends React.Component<Props, State> {
  public state: State = {
    artistInput: "",
    songInput: "",
    searchInput: "",
    queue: [],
    searchResults:[],
    select: {},
    searched: false,
    totalContributions: 0
  }

  public iframe: HTMLIFrameElement;

  public componentDidMount() {
    if (this.iframe) {
      this.iframe.onload = this.broadcasterFrameInit;
    }
  }

  private songSearch = () => {
    // 1) get request
    axios.get(`https://api.7digital.com/1.2/track/search?shopId=2020&oauth_consumer_key=7d4vr6cgb392&q=${encodeURIComponent(this.state.searchInput)}&usageTypes=adsupportedstreaming`, {'headers': {"Accept": 'application/json'}})
      .then(async res => {
        console.log(res);
        const results = res.data.searchResults.searchResult;
        if (results.length > 0 ) {
          const searchResults = [];

          for (let i = 0 ; i < results.length ; i ++ ) {
            searchResults.push({
              title: results[i].track.title,
              artist: results[i].track.artist.name,
              id: results[i].track.id,
            });
          }

          await this.setState({ searchResults, searched: true });
          console.log(this.state.searchResults);
        }
      })

    // 3) clear state
    this.setState({ searchInput: "" });
  }

  private artistSearch = () => {
    // 1) get request
    axios.get(`https://api.7digital.com/1.2/artist/search?q=${this.state.searchInput}&shopId=2020&oauth_consumer_key=7d4vr6cgb392`, {'headers': {"Accept": 'application/json'}})
    .then(async res => {
        // console.log(res);
        const output = res.data.searchResults.searchResult;
        console.log(output.length);
        let artistId = null;
        if (output.length> 0){
          artistId = output[0].artist.id;
        }

        if (artistId){
          axios.get(`https://api.7digital.com/1.2/artist/toptracks?artistId=${encodeURIComponent(artistId)}&usageTypes=adsupportedstreaming&shopId=2020&oauth_consumer_key=7d4vr6cgb392`, {'headers': {"Accept": 'application/json'}})
            .then(async tracks => {
              console.log(tracks);
              const results = tracks.data.tracks.track;
              if (results.length > 0) {
                const searchResults = [];

                for (let i = 0 ; i < results.length ; i ++ ) {
                  searchResults.push({
                    title: results[i].title,
                    artist: results[i].artist.name,
                    id: results[i].id
                  });
                }

                await this.setState({ searchResults, searched: true });
                console.log(this.state.searchResults);
              }
            })
        }
    })

    this.setState({ searchInput: "" });
  }

  private select = (song: any) => {
    this.setState({
      select: {title: song.title, artist: song.artist, id: song.id}
    })
  }

  private request = () => {
    const queue = this.state.queue.slice();
    queue.push(this.state.select);
    //reset all states
    this.setState({ queue, select:{}, searchResults: [], searched: false })
  }

  private renderSearchResults = () =>{
    let view = null;
    if (this.state.searchResults.length!==0 && this.state.searched){
      view = (
        <div style={{border: "2px solid black"}}>Search results:
          {this.state.searchResults.map(this.resultItem)}
          </div>
      )
    } else if (this.state.searchResults.length === 0 && this.state.searched){
      view = (
        <span>No music found :(</span>
      )
    }
    return view
  }

  private renderCurrentSong = () => {
    let view = (<span>None</span>);
    if (Object.keys(this.state.select).length > 0){
      view = (
        <div>
          <span>{this.state.select.title} by {this.state.select.artist}</span>
          <button onClick={this.request}>Request</button>
        </div>
      )
    }
    return view
  }

  private resultItem = (song: any) => {
    const view = (
      <div onClick={()=>this.select(song)} key={song.id} style={{borderRadius:"5px", border:"0.5px solid gray"}}>
        {song.title} - {song.artist}
      </div>
    )
    return view
  }

  public render() {
    return (
      <div>
        <h1>BROADCASTER VIEW</h1>
        <h4>Twitch Jukebox</h4>
        <h3>Total contributions: ${this.state.totalContributions}</h3>
        <input placeholder="Search for music"
               onChange={(e)=>this.setState({ searchInput: e.target.value })}/>
        <button onClick={this.artistSearch}>Artist Search</button>
        <button onClick={this.songSearch}>Song Search</button>

        {this.renderSearchResults()}

        <div>Current song selection:
          {this.renderCurrentSong()}
        </div>

        <div style={{border: "2px solid black"}}>Queue:
          {this.state.queue.map(this.resultItem)}
        </div>
      </div>
    );
  }

  private bindIframeRef = (iframe: HTMLIFrameElement) => {
    this.iframe = iframe;
    this.props.bindIframeToParent(iframe);
  }

  public broadcasterFrameInit = () => {
    const extension: any = {
      anchor: this.props.type,
      channelId: this.props.extension.channelId,
      loginId: null,
      extension: this.props.extension,
      mode: this.props.mode,
      platform: (this.props.type === ExtensionViewType.Mobile) ? ExtensionPlatform.Mobile : ExtensionPlatform.Web,
      trackingProperties: {},
      iframeClassName: IFRAME_CLASS,
    }
    const data = {
      extension: extension,
      action: EXTENSION_FRAME_INIT_ACTION,
      frameId: this.props.frameId,
    }
    this.iframe.contentWindow.postMessage(data, '*');
  }
}
