import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';

// The document (which is SSR-only) needs to be customized to expose the locale
// data for the user's locale for React Intl to work in the browser.
export default class IntlDocument extends Document {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);
    const { req: { locale, localeDataScript } } = context;
    const { html, head, errorHtml, chunks } = context.renderPage();
    const styles = flush();
    return { html, head, errorHtml, chunks, styles, locale, localeDataScript };
  }

  render() {
    return (
      <html>
        <Head>
          <title>C - Collaborative listening on Spotify</title>
          <meta
            name="description"
            content="A collaborative queue where you propose and vote what's going to play next. Use your Spotify account to log in"
          />
          <link rel="shortcut icon" href="/static/c-icon-128.png" />
          <meta name="viewport" content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width" />
          <style>{`body { margin: 0 } /* custom! */`}</style>
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-39254352-3" />
          <script
            dangerouslySetInnerHTML={{
              __html:
                "window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments)} gtag('js', new Date()); gtag('config', 'UA-39254352-3');"
            }}
          />
        </Head>
        <body className="custom_class">
          {this.props.customValue}
          <Main />
          <script
            dangerouslySetInnerHTML={{
              __html: this.props.localeDataScript
            }}
          />
          <NextScript />
        </body>
      </html>
    );
  }
}
