import React from 'react';
import Document, { Main, Head, NextScript } from 'next/document';

import Nav from '../components/nav';

export default class DefaultDocument extends Document {
  static async getInitialProps(ctx) {
    return await Document.getInitialProps(ctx);
  }

  render() {
    return (
      <html>
        <Head>
          <meta charset="UTF-8" />
          <title>S&P Winners & Losers | Stock Movers</title>
          <meta name="description" content="Stock market movements" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Work+Sans:400,600,700" />

          <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
          <link rel="apple-touch-icon" href="/static/touch-icon.png" />
          <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
          <link rel="icon" href="/static/favicon.ico" />
          <link rel="stylesheet" href="/static/lit.css" />

          <style jsx global>{`
            :global(body) {
              margin: 0;
              font-family: 'Work Sans', sans-serif;
              background-color: #f7f6ed;
            }
          `}</style>
        </Head>

        <body>
          <Nav />
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
