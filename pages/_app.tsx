import {GlobalStyle, lightTheme} from '@transclusion/ui'
import {AppProps} from 'next/app'
import React from 'react'
import Refractor from 'react-refractor'
import {createGlobalStyle, ThemeProvider} from 'styled-components'
// import { ClientProvider, ConfigProvider } from "../lib/sanity";

import bash from 'refractor/lang/bash'
import javascript from 'refractor/lang/javascript'
import json from 'refractor/lang/json'
import jsx from 'refractor/lang/jsx'
import typescript from 'refractor/lang/typescript'

Refractor.registerLanguage(bash)
Refractor.registerLanguage(javascript)
Refractor.registerLanguage(json)
Refractor.registerLanguage(jsx)
Refractor.registerLanguage(typescript)

const AppGlobalStyle = createGlobalStyle`
  #__next {
    height: 100%
  }

  /* @font-face {
    font-family: 'Space Grotesk';
    src: url('/fonts/SpaceGrotesk-Regular.woff') format('woff'),
         url('/fonts/SpaceGrotesk-Regular.woff2') format('woff2');
    font-weight: 400;
  }

  @font-face {
    font-family: 'Space Grotesk';
    src: url('/fonts/SpaceGrotesk-Bold.woff') format('woff'),
         url('/fonts/SpaceGrotesk-Bold.woff2') format('woff2');
    font-weight: 700;
  } */
`

function App({Component, pageProps}: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <AppGlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// App.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await NextApp.getInitialProps(appContext)

//   return {...appProps}
// }

export default App
