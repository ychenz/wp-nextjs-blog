import React, { ReactElement } from "react";
import { Store } from "redux";
import App from "next/app";
import Head from "next/head";
import "src/styles/style.scss";

interface AppProps {
  store: Store;
}

class MyApp extends App<AppProps> {
  render(): ReactElement {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>Yuchen Blog</title>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                      window.adaSettings = {
                        domain: "ada-dev"
                      }
                  `,
            }}
          />
          <script
            id="__ada"
            data-handle="polina1"
            // data-handle="yuchenbot"
            src="https://static.ada.support/embed2.js"
          />
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp;
