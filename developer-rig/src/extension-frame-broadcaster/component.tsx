import * as React from 'react';
import './component.sass';
import axios from 'axios';
import { RigExtension } from '../core/models/rig';
import { ExtensionPlatform, ExtensionViewType} from '../constants/extension-coordinator';

const IFRAME_CLASS = 'extension-frame';
const EXTENSION_FRAME_INIT_ACTION = 'extension-frame-init';
const PROXY = 'https://outside-hacks-api.herokuapp.com/api';

interface BroadcasterFrameProps {
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

type Props = BroadcasterFrameProps;

interface StateProps {
  casterId: string;
  jukeboxId: string;
  searchInput: string;
  queue: Array<Object>;
  searchResults: Array<Object>;
  select: any;
  searched: boolean;
  totalContributions: number;
  loading: boolean;
  recent: Array<Object>;
  current: any;
  playing: any;
  startTime: number;
  clicked: boolean;
  transform: number;
  trivia: boolean;
}

type State = StateProps;

export class BroadcasterFrame extends React.Component<Props, State> {
  public state: State = {
    casterId: "5b66d1369d21667c1c7d7be8",
    jukeboxId: "5b66d573ab70a27e3ec0cf8d",
    searchInput: "",
    queue: this.props.queue,
    searchResults:[],
    select: {},
    searched: false,
    totalContributions: this.props.totalContributions,
    loading: false,
    recent: [],
    current: {title: 'Title',
              artist: 'Artist',
              duration: 0,
              trackId: 0
    },
    startTime: 0,
    playing: new Audio('https://stream.svc.7digital.net/stream/catalogue?oauth_consumer_key=7d4vr6cgb392&oauth_nonce=197584571&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1533478724&oauth_version=1.0&shopId=2020&trackId=4641958&oauth_signature=qdv%2Bgw7bcSxVgdcJ1tKYdIz4LkE%3D'),
    clicked: false,
    transform: -50,
    trivia: true
  }

  public componentDidMount(){
    axios.get(PROXY + `/jukebox/${this.state.jukeboxId}`)
      .then(async res => {
        // console.log('res', res);
        const totalContributions = res.data.totalContributions;
        const queue = res.data.tracks;
        await this.setState({
          totalContributions: res.data.totalContributions,
          queue: res.data.tracks
        })
        console.log(this.state.queue);
        await this.nextTrack();
        console.log(this.state.current);
        this.startTimeout();
      })
  }

  private startTimeout = () => {
    console.log('current', this.state.current);
    if (Object.keys(this.state.queue).length > 0 ){
      const temp = this.state.queue.slice().shift();
      const current = Object.assign(temp);
      console.log(current.duration);
      // const duration = temp.duration*1000;
      // console.log(duration);
      setInterval(this.incrementTime, 1000);
      setInterval(this.nextTrack, 10000);
    } else {
      setInterval(this.startTimeout, 3000)
    }
  }

  private incrementTime = () => {
    this.setState({
      startTime: this.state.startTime + 1,
    })
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
              duration: results[i].track.duration,
              image: results[i].track.release.image
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
                    duration: results[i].duration,
                    image: results[i].release.image
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
      select: { title: song.title,
                artist: song.artist,
                id: song.id,
                duration: song.duration,
                image: song.image,
             }
    })
  }

  private request = async () => {
    const returned = await this.props.request( this.state.select.artist,
                                               this.state.select.title,
                                               this.state.select.id,
                                               this.state.jukeboxId,
                                               "5b67122eea52308b0ac53523",
                                               this.state.select.duration,
                                               this.state.select.image,
                                             );
    await this.setState({
      queue: returned.queue,
      totalContributions: returned.totalContributions,
      select: {},
      searchResults: [],
      searched: false,
      searchInput: ""
    })
  }

  private renderSearchResults = () =>{
    let view = (<div className="search-container" style={{border: "0.5px solid gray"}}>search for music!</div>);
    if (this.state.searchResults.length!==0 && this.state.searched){
      view = (
        <div className="search-container" style={{border: "0.5px solid gray"}}>
          {this.state.searchResults.map(this.resultItem)}
        </div>
      )
    } else if (this.state.searchResults.length === 0 && this.state.searched){
      view = (
        <div className="search-container" style={{border: "0.5px solid gray"}}>
          <span>No music found :(</span>
        </div>
      )
    } else if (this.state.loading) {
      view = (
        <div className="search-container" style={{border: "0.5px solid gray"}}>
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

  private removeQueue = (song: any) => {
    let queue = this.state.queue.slice();
    queue = queue.filter((item: any) => item.id !== song.id);
    this.setState({ queue });
  }

  private nextTrack = () => {
    console.log('next track');
    this.setState({ startTime: 0})
    this.state.playing.pause();

    if (Object.keys(this.state.queue).length > 0 ){
      const body = {id: this.state.jukeboxId};
      console.log(body);
      axios.delete(PROXY+`/jukebox`, {data: body})
        .then((resp: any) => {
          const queue = resp.data.tracks;
          const current = resp.data.deleted;
          const playing = new Audio(this.generateStream(parseInt(current.trackId)));
          this.setState({ queue, current, playing })
          this.state.playing.play()
        })
    }
  }

  private convertTime = (value: any) => {
    return Math.floor(value / 60) + ":" + (value % 60 ? value % 60 : '00')
  }

  private generateStream = (trackId: number) => {
    var api = require('7digital-api').configure({
        consumerkey: '7d4vr6cgb392',
        consumersecret: 'm4ntskavq56rddsa',
    });
    var oauth = new api.OAuth();
    var previewUrl = oauth.sign('http://previews.7digital.com/clip/12345');
    var signedUrl = oauth.sign('https://stream.svc.7digital.net/stream/catalogue', {
        trackId: trackId,
        shopId: 2020,
    });
    return signedUrl;
  }

  private queueListClicked = () => {
    this.setState({
       clicked: true,
       transform: 200
     })
  }

  private radioBtnClicked = () => {
    axios.post(PROXY+'/jukebox/answerTrivia', {jukeboxId: this.state.jukeboxId, userId: this.state.casterId})
      .then(res => {
        console.log(res)
        this.setState({
          trivia: false
        })
      })

  }


  public render() {
    const styles = {
      transform: `translateY(${this.state.transform}px)`
    }

    const buttonStyle ={
      height: "30px",
      padding: "5px"
    }

    return (
      <div>
      {/* <div className="main-container">
        {this.state.trivia ?
          <div className="card">
            <h5 className="card-header info-color white-text text-center py-4">
              <strong>Trivia</strong>
            </h5>
            <div className="card-body px-lg-5 text-center">
                <p>Who is my favorite champion?</p>
                <div className="radio">
                  <label><input type="radio" name="optradio" checked/>Akali</label>
                </div>
                <div className="radio">
                  <label><input type="radio" name="optradio"/>Ahri</label>
                </div>
                <div className="radio">
                  <label><input type="radio" name="optradio"/>Bard</label>
                </div>
                <div className="radio">
                  <label><input type="radio" name="optradio"/>Teemo</label>
                </div>
              <div className = "text-center">
                <button onClick = {() => this.radioBtnClicked()} className="btn btn-outline-info btn-rounded z-depth-0 my-4 waves-effect" type="submit" style = 'width: 20%'>Submit</button>
              </div>
            </div>
          </div> : null}
          </div> */}
        <h1>Twitch Jukebox</h1>
        <h3>Total contributions: ${this.state.totalContributions}</h3>

        <div className="search-div">
          <div className="search-selection">
            <div className="search-controls">
              <input placeholder="Search for music"
                     style = {{height: "30px", width: "300px", padding: "5px"}}
                     value = {this.state.searchInput}
                     onChange={(e)=>this.setState({ searchInput: e.target.value })}/><br/>
              <button style={buttonStyle} onClick={this.artistSearch}>Artist Search</button>
              <button style={buttonStyle} onClick={this.songSearch}>Song Search</button>
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
          <div id="player-container">
          <div id="player">
             <div className="album" style={{background: `linear-gradient(rgba($dark, 0.25), rgba($primary, 0.55)), url(${this.state.current.image})`}}>
               <div className="heart"><i className="fas fa-heart"></i></div>
             </div>
             <div className="info">
               <div className="progress-bar">
                 <div className="time--current">{this.convertTime(this.state.startTime)}</div>
                 <div className="time--total">{this.convertTime(parseInt(this.state.current.duration))}</div>
                 <div className="fill"></div>
               </div>
               <div className="currently-playing">
                 <h2 className="song-name">{this.state.current.title}</h2>
                 <h3 className="artist-name">{this.state.current.artist}</h3>
               </div>
               <div className="controls">
                 <div className="option" onClick = {() => this.queueListClicked()}><i className="fas fa-bars"></i></div>
                 <div className="volume"><i className="fas fa-volume-up"></i></div>
                 <div className="play" onClick={()=> this.state.playing.play()}><i className="fas fa-play"></i></div>
                 <div className="pause" onClick={() => this.state.playing.pause()}><i className="fas fa-pause"></i></div>
                 <div className="shuffle"><i className="fas fa-random"></i></div>
                 <div className="add"><i className="fas fa-plus"></i></div>
               </div>
             </div>
             </div>
           </div>
          <div className="queue-results" style={{marginTop:"25px"}}>Queue:
            <div className="queue-container" style={{border: "none", marginTop:"25px"}}>
              {this.state.queue.map((track:any, index:number) =>
                <div className="queueTrack" style = {styles}>
                  <p key = {index + 1}>{index + 1}</p>
                  <h2 className="song-name">{track.title}</h2>
                  <h3 className="artist-name">{track.artist}</h3>
                </div>)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  private bindIframeRef = (iframe: HTMLIFrameElement) => {
    // this.iframe = iframe;
    // this.props.bindIframeToParent(iframe);
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
      // action: EXTENSION_FRAME_INIT_ACTION,
      // frameId: this.props.frameId,
    }
    // this.iframe.contentWindow.postMessage(data, '*');
  }
}
