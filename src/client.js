import 'intersection-observer'

import React, {useEffect, useState} from 'react'
import {render} from 'react-dom'
import {App} from './app'
import {createBrowserHistorySource, HistoryProvider} from './history'
import {createStore} from './lib/store'
import {StoreProvider} from './store'
import {ThemeProvider, themes} from './theme'

const store = createStore({initialState: window.__state || {}})
const historySource = createBrowserHistorySource()

// for debugging
window.store = store

function Provider ({children}) {
  const [theme, setTheme] = useState('light')
  useEffect(() => {
    document.body.style = `background:${themes[theme].bg};color:${themes[theme].fg}`
  }, [theme])
  return (
    <ThemeProvider mode={theme} setTheme={setTheme}>
      <HistoryProvider source={historySource}>
        <StoreProvider store={store}>{children}</StoreProvider>
      </HistoryProvider>
    </ThemeProvider>
  )
}

render(<Provider children={<App />} />, document.getElementById('root'))
