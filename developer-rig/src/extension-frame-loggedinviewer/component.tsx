import * as React from 'react';
import './component.sass';
import axios from 'axios';
import { RigExtension } from '../core/models/rig';
import { ExtensionPlatform, ExtensionViewType} from '../constants/extension-coordinator';

const IFRAME_CLASS = 'extension-frame';
const EXTENSION_FRAME_INIT_ACTION = 'extension-frame-init';
const PROXY = 'https://outside-hacks-api.herokuapp.com/api';

interface LoggedInViewerFrameProps {
  className: string;
  frameId: string;
  extension: RigExtension;
  type: string;
  mode: string;
  // bindIframeToParent: (iframe: HTMLIFrameElement) => void;
  request: any;
  queue: Array<Object>;
  totalContributions: number;
}

type Props = LoggedInViewerFrameProps;
interface StateProps {
  casterId: string;
  jukeboxId: string;
  searchInput: string;
  queue: Array<Object>;
  searchResults: Array<Object>;
  select: any;
  searched: boolean;
  loading: boolean;
  recent: Array<Object>;
  current: any;
  playing: any;
}

type State = StateProps;

export class LoggedInViewerFrame extends React.Component<Props, State> {
  public state: State = {
    casterId: "5b66d1369d21667c1c7d7be8",
    jukeboxId: "5b66d573ab70a27e3ec0cf8d",
    searchInput: "",
    queue: this.props.queue,
    searchResults:[],
    select: {},
    searched: false,
    loading: false,
    recent: [],
    current: {},
    playing: new Audio('https://stream.svc.7digital.net/stream/catalogue?oauth_consumer_key=7d4vr6cgb392&oauth_nonce=197584571&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1533478724&oauth_version=1.0&shopId=2020&trackId=4641958&oauth_signature=qdv%2Bgw7bcSxVgdcJ1tKYdIz4LkE%3D'),
  }

  // public iframe: HTMLIFrameElement;

  public componentDidMount(){
    console.log(this.props.queue)
    axios.get(PROXY + `/jukebox/${this.state.jukeboxId}`)
      .then(res => {
        console.log('res', res);
        this.setState({
          queue: res.data.tracks
        })
      })
    this.state.playing.play();
    this.startTimeout();
  }

  private startTimeout = () => {
    // setInterval(this.nextTrack, 5000)
  }

  private songSearch = async () => {
    this.setState({ loading: true })
    // 1) get request
    await axios.get(`https://api.7digital.com/1.2/track/search?shopId=2020&oauth_consumer_key=7d4vr6cgb392&q=${encodeURIComponent(this.state.searchInput)}&usageTypes=adsupportedstreaming`, {'headers': {"Accept": 'application/json'}})
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
              duration: results[i].track.duration
            });
          }

          await this.setState({ searchResults });
          // console.log(this.state.searchResults);
        }
      })

    // 3) clear state
    this.setState({ searchInput: "", searched: true, loading: false });
  }

  private artistSearch = async () => {
    this.setState({ loading: true })
    // 1) get request
    await axios.get(`https://api.7digital.com/1.2/artist/search?q=${this.state.searchInput}&shopId=2020&oauth_consumer_key=7d4vr6cgb392`, {'headers': {"Accept": 'application/json'}})
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
                    id: results[i].id,
                    duration: results[i].duration
                  });
                }

                await this.setState({ searchResults });
                console.log(this.state.searchResults);
              }
            })
        }
    })

    this.setState({ searchInput: "", searched: true, loading: false });
  }

  private select = (song: any) => {
    this.setState({
      select: {title: song.title, artist: song.artist, id: song.id}
    })
  }

  private request = async () => {
    const returned = await this.props.request( this.state.select.artist,
                                               this.state.select.title,
                                               this.state.select.id,
                                               this.state.jukeboxId,
                                               "5b67122eea52308b0ac53523",
                                               this.state.select.duration,
                                               this.state.casterId,
                                             );
    await this.setState({
      queue: returned.queue,
      select: {},
      searchResults: [],
      searched: false,
      searchInput: ""
    })
  }

  private renderSearchResults = () =>{
    let view = (<div className="search-container">search for music!</div>);
    if (this.state.searchResults.length!==0 && this.state.searched){
      view = (
        <div className="search-container">
          {this.state.searchResults.map(this.resultItem)}
        </div>
      )
    } else if (this.state.searchResults.length === 0 && this.state.searched){
      view = (
        <div className="search-container">
          <span>No music found :(</span>
        </div>
      )
    } else if (this.state.loading) {
      view = (
        <div className="search-container">
          <span>loading... loading...</span>
        </div>
      )
    }
    return view
  }

  private renderCurrentSong = () => {
    let view = (<span> None</span>);
    if (Object.keys(this.state.select).length > 0){
      view = (
        <div className="currentsong">
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

  private queueItem = (song: any) => {
    const view = (
      <div key={song.id} style={{borderRadius:"5px", border:"0.5px solid gray"}}>
        {song.title} - {song.artist}
      </div>
    )
    return view
  }

  private nextTrack = () => {
    console.log('next track');

    if (Object.keys(this.state.queue).length > 0 ){
      const body = {jukeboxId: this.state.jukeboxId};

      axios.delete(PROXY+`/jukebox`, {data: body})
        .then(resp => {
          const queue = resp.data;
          this.setState({ queue })
        })
    }
  }

  public render() {
    return (
      <div className="main-container">

        <h1>LOGGED IN VIEWER VIEW</h1>
        <h4>Twitch Jukebox</h4>

        <div className="search-div">
          <div className="search-selection">
            <div className="search-controls">
              <input placeholder="Search for music"
                     value = {this.state.searchInput}
                     onChange={(e)=>this.setState({ searchInput: e.target.value })}/>
              <button onClick={this.artistSearch}>Artist Search</button>
              <button onClick={this.songSearch}>Song Search</button>
            </div>
            <div>Current song selection:
              {this.renderCurrentSong()}
            </div>
          </div>

          <div className="search-results">Search results:
            {this.renderSearchResults()}
          </div>
        </div>

        <div className="music-container">
          <div className="queue-results">Queue:
            <div className="queue-container">
              {this.state.queue.map(this.queueItem)}
            </div>
          </div>
          <div className="recent-results">Recently played:
            <div className="recent-container">
              {this.state.recent.map(this.resultItem)}
            </div>
          </div>
        </div>
        {/* Object.keys(this.state.current).length > 0 */}
        {this.state.current
         ? <div id="player">
            <div className="album">
              <div className="heart"><i className="fas fa-heart"></i></div>
            </div>
            <div className="info">
              <div className="progress-bar">
                <div className="time--current">1:25</div>
                <div className="time--total">-3:15</div>
                <div className="fill"></div>
              </div>
              <div className="currently-playing">
                <h2 className="song-name">{this.state.current.title}</h2>
                <h3 className="artist-name">{this.state.current.artist}</h3>
              </div>
              <div className="controls">
                <div className="option"><i className="fas fa-bars"></i></div>
                <div className="volume"><i className="fas fa-volume-up"></i></div>
                <div className="previous"><i className="fas fa-backward"></i></div>
                <div className="play" onClick={()=> this.state.playing.play()}><i className="fas fa-play"></i></div>
                <div className="pause" onClick={() => this.state.playing.pause()}><i className="fas fa-pause"></i></div>
                <div className="next"><i className="fas fa-forward"></i></div>
                <div className="shuffle"><i className="fas fa-random"></i></div>
                <div className="add"><i className="fas fa-plus"></i></div>
              </div>
            </div>
          </div>
          : null
        }

      </div>
    );
  }


  public loggedInViewerFrameInit = () => {
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
    // this.iframe.contentWindow.postMessage(data, '*');
  }
}
