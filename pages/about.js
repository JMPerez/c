import Layout from '../components/MyLayout.js';

const About = () => (
  <div>

    <p>
      This is a personal project by <a href="https://jmperezperez.com">José M. Pérez</a> that uses{' '}
      <a href="https://github.com/zeit/next.js">Next.js</a> and{' '}
      <a href="https://developer.spotify.com/web-api/web-api-connect-endpoint-reference/">
        Spotify's Connect API endpoints
      </a>.
    </p>
    <p>
      Read more about it on{' '}
      <a href="https://medium.com/@jmperezperez/collaborative-listening-on-spotify-using-connect-endpoints-7695603e17d1">
        my blog post on Medium
      </a>.
    </p>
    <p>
      You can see the source code <a href="https://github.com/JMPerez/c">on GitHub</a>.
    </p>
    </div>
);

export default About;
