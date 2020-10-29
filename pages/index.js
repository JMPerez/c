import Link from 'next/link';
import React, {useEffect} from 'react';
import withRedux from 'next-redux-wrapper';
import Layout from '../components/MyLayout.js';
import { initializeStore, wrapper } from '../store/store';

import Users from '../components/Users';
import Queue from '../components/Queue';
import AddToQueue from '../components/AddToQueue';
import NowPlaying from '../components/NowPlaying';
import Devices from '../components/Devices';
import { useStore } from '../store/store'
import { useSelector, shallowEqual } from 'react-redux'

const usePlayback = () => {
  return useSelector(
    (state) => ({
      playback: state.playback,
    }),
    shallowEqual
  )
}


const useUsers = () => {
  return useSelector(
    (state) => ({
      users: state.users,
    }),
    shallowEqual
  )
}

const useQueue = () => {
  return useSelector(
    (state) => ({
      queue: state.queue,
    }),
    shallowEqual
  )
}

const useSession = () => {
  return useSelector(
    (state) => ({
      session: state.session,
    }),
    shallowEqual
  )
}

const Q = () => {
  const { session } = useSession();
  const { queue } = useQueue();
  return <Queue items={queue} session={session} />
}

const Main = (props) => {
    const { playback } = usePlayback();
    const { users } = useUsers();
    const { session } = useSession();
    console.log("rendering index", props, {playback}, {users});
    return (
      <Layout>
        {playback && playback.track
          ? <NowPlaying
              track={playback.track}
              user={playback.user}
              position={playback.position}
            />
          : null}
        <div className="app">
          <style jsx>
            {`
              .app {
                margin: 20px;
                padding: 20px;
              }
            `}
          </style>
          <div style={{ float: 'left' }}>
            <Q />
            {session && session.user !== null ? <AddToQueue /> : null}
            {session &&session.user !== null ? <Devices /> : null}
          </div>
          {users ?
          <div style={{ float: 'right', width: '150px' }}>
            <Users items={users} />
          </div> : null}
        </div>
      </Layout>
    );
  }

export default Main;
