import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import App from "next/app";
import withReduxStore from "../redux/with-redux-store";

interface AppProps {
  store: Store;
}

class MyApp extends App<AppProps> {
  render(): ReactElement {
    const { Component, pageProps, store } = this.props;

    // return (
    //   <Provider store={store}>
    //     <Component {...pageProps} />
    //   </Provider>
    // );

    return (
      <Component {...pageProps} />
    );
  }
}

export default withReduxStore(MyApp);