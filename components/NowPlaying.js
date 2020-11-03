import React, { useEffect, useState } from "react";
import { connect, disconnect } from "../actions/playbackActions";
import { login } from "../actions/sessionActions";
import { usePlayback, useSession } from "../reducers";
import lang from "../lang/en.json";
import ButtonStyle from "./ButtonStyle";
import ButtonDarkStyle from "./ButtonDarkStyle";
import { initializeStore } from "../store/store";

const NowPlaying = (props) => {
  const { playback } = usePlayback();
  const { session } = useSession();
  const [start, setStart] = useState(playback.startTimestamp);
  const [currentPosition, setCurrentPosition] = useState(
    new Date() - playback.startTimestamp
  );

  console.log(
    "init: setting position to ",
    new Date() - playback.startTimestamp
  );

  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;

  let timer = null;
  const tick = () => {
    setCurrentPosition(
      playback.startTimestamp === 0 ? 0 : Date.now() - playback.startTimestamp
    );
    console.log(
      "tick: setting position to ",
      playback.startTimestamp === 0 ? 0 : Date.now() - playback.startTimestamp,
      playback.startTimestamp
    );
  };

  useEffect(() => {
    // setStart(Date.now()); // todo: set this when track changes
    console.log(
      "useEffect: setting position to ",
      Date.now() - playback.startTimestamp
    );
    setCurrentPosition(Date.now() - playback.startTimestamp);
    timer = setInterval(tick, 300);
    return () => {
      clearInterval(timer);
    };
  }, [props.position, props.track]);

  console.log({ currentPosition, startTime: playback.startTimestamp });
  const percentage =
    +((currentPosition * 100) / playback.track.duration_ms).toFixed(2) + "%";
  const userName = props.user.display_name || props.user.id;
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
          padding-top: 0.2em;
        }
        .now-playing__artist-name {
          font-size: 1.2em;
          padding-bottom: 0.5em;
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
        .btn--play {
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 3px 25px;
          font-size: 1.1em;
        }
        .owner {
          padding-bottom: 0.7em;
        }
      `}</style>
      <style jsx>{ButtonStyle}</style>
      <style jsx>{ButtonDarkStyle}</style>
      <div className="now-playing__text media">
        <div className="media__img">
          <img src={props.track.album.images[1].url} width="170" height="170" />
        </div>
        <div className="now-playing__bd media__bd">
          <div className="now-playing__track-name">{props.track.name}</div>
          <div className="now-playing__artist-name">
            {props.track.artists.map((a) => a.name).join(", ")}
          </div>
          <div className="media owner">
            <div className="media__img">
              <img
                className="user-image"
                src={
                  (props.user.images &&
                    props.user.images.length &&
                    props.user.images[0].url) ||
                  "/user-icon.png"
                }
                width="30"
                height="30"
                alt={userName}
                title={userName}
              />
            </div>
            <div className="user-name media__bd">{userName}</div>
          </div>
          <div>
            <button
              className="btn btn--dark btn--play"
              onClick={() => {
                if (session.user === null) {
                  dispatch(login()); // TODO: Start playback once logged in
                } else {
                  if (playback.isConnectedToPlayback) {
                    dispatch(disconnect());
                  } else {
                    dispatch(connect());
                  }
                }
              }}
            >
              {!playback.isConnectedToPlayback ? lang["play"] : lang["pause"]}
            </button>
          </div>
        </div>
      </div>
      <div className="now-playing__progress">
        <div
          className="now-playing__progress_bar"
          style={{ width: percentage }}
        />
      </div>
    </div>
  );
};

export default NowPlaying;
