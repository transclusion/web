import React from 'react'
import {render} from 'react-dom'
import {App} from './app'
import {createBrowserHistorySource, HistoryProvider} from './history'
import {createStore} from './lib/store'
import {StoreProvider} from './store'

const store = createStore({initialState: window.__state || {}})
// window.store = store;

function Provider ({children}) {
  return (
    <HistoryProvider source={createBrowserHistorySource()}>
      <StoreProvider store={store}>{children}</StoreProvider>
    </HistoryProvider>
  )
}

render(<Provider children={<App />} />, document.getElementById('root'))
