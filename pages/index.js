import React from "react";
import Layout from "../components/MyLayout.js";
import Users from "../components/Users";
import Queue from "../components/Queue";
import AddToQueue from "../components/AddToQueue";
import NowPlaying from "../components/NowPlaying";
import Devices from "../components/Devices";
import { usePlayback, useUsers, useSession, useQueue } from "../reducers";

const Q = () => {
  const { session } = useSession();
  const { queue } = useQueue();
  return <Queue items={queue} session={session} />;
};

const Main = () => {
  const { playback } = usePlayback();
  const { users } = useUsers();
  const { session } = useSession();
  return (
    <Layout>
      {playback && playback.track ? (
        <NowPlaying
          track={playback.track}
          user={playback.user}
          position={playback.position}
        />
      ) : null}
      <div className="app">
        <style jsx>
          {`
            .app {
              margin: 20px;
              padding: 20px;
            }
          `}
        </style>
        <div style={{ float: "left" }}>
          <Q />
          {session && session.user !== null ? <AddToQueue /> : null}
          {session && session.user !== null ? <Devices /> : null}
        </div>
        {users ? (
          <div style={{ float: "right", width: "150px" }}>
            <Users items={users} />
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default Main;
