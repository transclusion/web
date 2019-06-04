import qs from 'qs'
import React from 'react'
import {renderToString} from 'react-dom/server'
import {Helmet} from 'react-helmet'
import {ServerStyleSheet} from 'styled-components'
import {URL} from 'url'
import {App, matchRoute} from './app'
import {createServerHistorySource, HistoryProvider} from './history'
import {createStore} from './lib/store'
import {resolveLoaders} from './loader'
import screens from './screens'
import {StoreProvider} from './store'
import {ThemeProvider, themes} from './theme'

function renderDocument ({helmet, html, state, style, theme}) {
  return `<!doctype html>
<html lang="en">
  <head>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-141373569-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-141373569-1');
    </script>
    <meta charset="utf-8">
    ${helmet.title.toString()}
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
    ${helmet.meta.toString()}
    <link rel="apple-touch-icon" href="/static/assets/apple-touch-icon.png">
    <link rel="apple-touch-icon-precomposed" href="/static/assets/apple-touch-icon-precomposed.png">
    <meta name="apple-mobile-web-app-title" content="Transclusion">
    <meta name="apple-mobile-web-app-capable">
    <meta name="application-name" class="app-title" content="Transclusion">
    <meta name="theme-color" content="#166DF9">
    <link rel="stylesheet" href="/static/styles/highlight.css">
    <link rel="stylesheet" href="/static/styles/base.css">
    <link rel="icon" type="image/png" href="/static/assets/favicon-16x16.png" sizes="16x16">
    <link rel="icon" type="image/png" href="/static/assets/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="/static/assets/favicon-96x96.png" sizes="96x96">
    ${style}
  </head>
  <body style="background:${theme.bg};color:${theme.fg}">
    <div id="root">${html}</div>
    <script>window.__state = ${JSON.stringify(state)}</script>
    <script src="/static/client.js"></script>
  </body>
</html>`
}

function Provider ({children, location, store, theme}) {
  return (
    <ThemeProvider mode='light' setTheme={() => void 0}>
      <HistoryProvider source={createServerHistorySource(location)}>
        <StoreProvider store={store}>{children}</StoreProvider>
      </HistoryProvider>
    </ThemeProvider>
  )
}

export default (req, res) => {
  const theme = themes.light
  const store = createStore()
  const sheet = new ServerStyleSheet()
  const url = new URL(req.url, 'http://localhost:3000')
  const query = qs.parse((url.search || '').substr(1))
  const location = {path: url.pathname, query}
  const route = matchRoute(location)
  const screen = screens[route.name]

  const promise = screen.load
    ? resolveLoaders(store.ref(), screen.load(route.params))
    : Promise.resolve({})

  promise
    .then(() => {
      const state = store.get()

      try {
        const html = renderToString(
          sheet.collectStyles(
            <Provider location={location} store={store}>
              <App />
            </Provider>
          )
        )
        res.end(
          renderDocument({
            helmet: Helmet.renderStatic(),
            html,
            state,
            style: sheet.getStyleTags(),
            theme
          })
        )
      } catch (err) {
        console.error('Error: ' + err.message)
        res.end('Something went wrong')
      } finally {
        sheet.seal()
      }
    })
    .catch(err => {
      res.end(err.message)
    })
}
