import NextDocument, {DocumentContext, DocumentProps, Head, Main, NextScript} from 'next/document'
import React from 'react'
import {ServerStyleSheet} from 'styled-components'

class Document extends NextDocument<DocumentProps & {styleTags: React.ReactNode}> {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      // Wraps the collectStyles provider around our <App />.
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })

      // Extract the initial props that may be present.
      const initialProps = await NextDocument.getInitialProps(ctx)

      // Returning the original props together with our styled components.
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <html>
        <Head>
          {this.props.styleTags}

          {/* Fonts */}
          <link rel="stylesheet" href="https://use.typekit.net/qcd7dpc.css" />
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap"
            rel="stylesheet"
          />

          {/* Favicons */}
          <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
          <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default Document
