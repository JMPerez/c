import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta
            name="description"
            content="A collaborative queue where you propose and vote what's going to play next. Use your Spotify account to log in"
          />
          <link rel="shortcut icon" href="/c-icon-128.png" />
          <style>{`body { margin: 0 } /* custom! */`}</style>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-39254352-3"
          />
          <script
            dangerouslySetInnerHTML={{
              __html:
                "window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments)} gtag('js', new Date()); gtag('config', 'UA-39254352-3');",
            }}
          />
          <script
            src="https://browser.sentry-cdn.com/5.27.3/bundle.tracing.min.js"
            integrity="sha384-L3tHj4nHK/1p8GjYGsCd8gVcdnsl8Gx4GbI0xwa76GI9O5Igwsd9RxET9DJRVAhP"
            crossorigin="anonymous"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
      if (location.host === 'c-spotify.herokuapp.com') {
        window.Sentry &&
        Sentry.init({ dsn: 'https://2986cc0e04bc46388f596908ba7dfb3e@o166353.ingest.sentry.io/5508928' });
      }`,
            }}
          />
        </Head>
        <body className="custom_class">
          {this.props.customValue}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
