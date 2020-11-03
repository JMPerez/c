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
