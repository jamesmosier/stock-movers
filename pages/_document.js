import React from 'react'
import Document, { Main, Head, NextScript } from 'next/document'

export default class DefaultDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <Head>
          <meta name="description" content="Stock market movements" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Work+Sans:400,600,700&display=swap"
          />
          {/* <link rel="icon" href="/static/favicon.ico" /> */}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
