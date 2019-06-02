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

function renderDocument ({helmet, html, state, style}) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    ${helmet.title.toString()}
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
    ${helmet.meta.toString()}
    <link rel="stylesheet" href="/static/client.css">
    ${style}
  </head>
  <body>
    <div id="root">${html}</div>
    <script>window.__state = ${JSON.stringify(state)}</script>
    <script src="/static/client.js"></script>
  </body>
</html>`
}

function Provider ({children, location, store}) {
  return (
    <HistoryProvider source={createServerHistorySource(location)}>
      <StoreProvider store={store}>{children}</StoreProvider>
    </HistoryProvider>
  )
}

export default (req, res) => {
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
            style: sheet.getStyleTags()
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
