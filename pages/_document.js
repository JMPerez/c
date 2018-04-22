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
          <link rel="shortcut icon" href="/static/c-icon-128.png" />
          <meta name="viewport" content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width" />
          <style>{`body { margin: 0 } /* custom! */`}</style>
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
          <script
            dangerouslySetInnerHTML={{
              __html:
                "(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;e=o.createElement(i);r=o.getElementsByTagName(i)[0];e.src='//www.google-analytics.com/analytics.js';r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));ga('create','UA-39254352-1');ga('send','pageview');"
            }}
          />
        </body>
      </html>
    );
  }
}
