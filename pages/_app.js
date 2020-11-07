import Head from "next/head";
import { Provider } from "react-redux";
import { useStore } from "../store/store";

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <>
      <Head>
        <title>C - Collaborative listening on Spotify</title>
        <meta
          name="viewport"
          content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
        />
        <meta
          name="google-site-verification"
          content="XXYqCIYYKZhJRSo9Lq2J7t6om3QNtVCa6yPCyWXX9lY"
        />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
