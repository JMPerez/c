import Layout from '../components/MyLayout.js';
import withRedux from 'next-redux-wrapper';

import { initStore } from '../store/store';
import PageWithIntl from '../components/PageWithIntl';

const About = () => (
  <Layout>
    <style jsx>
      {`
        p {
          margin: 20px;
          padding: 20px;
        }
      `}
    </style>
    <p>
      This is a personal project by <a href="https://jmperezperez.com">José M. Pérez</a> that uses{' '}
      <a href="https://github.com/zeit/next.js">Next.js</a> and{' '}
      <a href="https://developer.spotify.com/web-api/web-api-connect-endpoint-reference/">
        Spotify's Connect API endpoints.
      </a>. You can see the source code <a href="https://github.com/JMPerez/c">on GitHub</a>.
    </p>
  </Layout>
);

export default withRedux(initStore, null, null)(PageWithIntl(About));
