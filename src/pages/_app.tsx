import App from "next/app";
import type { AppProps, AppContext } from "next/app";
import basicAuthCheck from "../components/basicAuthCheck";
import "../../styles/globals.css";
import "react-mde/lib/styles/css/react-mde-all.css";
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const { req, res } = appContext.ctx;
  if (req && res) {
    await basicAuthCheck(req, res);
  }

  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default MyApp;
