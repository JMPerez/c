import React from 'react';

class NowPlaying extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      start: Date.now(),
      currentPosition: 0
    };
    this.timer = null;
    this.tick = () => {
      this.setState({
        currentPosition: Date.now() - this.state.start + (this.props.position || 0)
      });
    };
  }
  componentWillReceiveProps(props) {
    if (this.props.position !== props.position || this.props.track !== props.track) {
      this.setState({
        start: Date.now(),
        currentPosition: 0
      });
    }
  }
  componentDidMount() {
    this.timer = setInterval(this.tick, 300);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    const percentage = +(this.state.currentPosition * 100 / this.props.track.duration_ms).toFixed(2) + '%';
    const userName = this.props.user.display_name || this.props.user.id;
    return (
      <div className="now-playing">
        <style jsx>{`
          .now-playing {
            background-color: #424d58;
            color: #fff;
            height: 250px;
            position: relative;
            width: 100%;
          }
          .now-playing__text {
            padding: 40px;
          }
          .now-playing__bd {
            padding-left: 30px;
          }
          .now-playing__track-name {
            font-size: 2em;
            padding-top: 1.2em;
          }
          .now-playing__artist-name {
            font-size: 1.2em;
            padding-bottom: 2em;
            padding-top: 0.5em;
          }
          .now-playing__user {
            padding-top: 0.5em;
          }
          .now-playing__progress_bar {
            bottom: 0;
            background-color: #222;
            height: 5px;
            position: absolute;
            width: 100%;
          }
          .media,
          .media__bd {
            overflow: hidden;
            _overflow: visible;
            zoom: 1;
          }
          .media .media__img {
            float: left;
            margin-right: 10px;
          }
          .user-image {
            border-radius: 50%;
          }
          .user-name {
            line-height: 30px;
          }
        `}</style>
        <div className="now-playing__text media">
          <div className="media__img">
            <img src={this.props.track.album.images[1].url} width="170" height="170" />
          </div>
          <div className="now-playing__bd media__bd">
            <div className="now-playing__track-name">
              {this.props.track.name}
            </div>
            <div className="now-playing__artist-name">
              {this.props.track.artists.map(a => a.name).join(', ')}
            </div>
            <div className="media__img">
              <img
                className="user-image"
                src={
                  (this.props.user.images && this.props.user.images.length && this.props.user.images[0].url) ||
                    '/static/user-icon.png'
                }
                width="30"
                height="30"
                alt={userName}
                title={userName}
              />
            </div>
            <div className="user-name media__bd">
              {userName}
            </div>
          </div>
        </div>
        <div className="now-playing__progress">
          <div className="now-playing__progress_bar" style={{ width: percentage }} />
        </div>
      </div>
    );
  }
}

export default NowPlaying;
