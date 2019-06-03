import React from 'react'
import {render} from 'react-dom'
import {App} from './app'
import {createBrowserHistorySource, HistoryProvider} from './history'
import {createStore} from './lib/store'
import {StoreProvider} from './store'
import {ThemeProvider, themes} from './theme'

const theme = 'light'
const store = createStore({initialState: window.__state || {}})

// for debugging
window.store = store

function Provider ({children}) {
  return (
    <ThemeProvider mode={theme}>
      <HistoryProvider source={createBrowserHistorySource()}>
        <StoreProvider store={store}>{children}</StoreProvider>
      </HistoryProvider>
    </ThemeProvider>
  )
}

document.body.style = `background:${themes[theme].bg};color:${themes[theme].fg}`

render(<Provider children={<App />} />, document.getElementById('root'))
