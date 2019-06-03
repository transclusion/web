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
const initialTheme = window.localStorage.getItem('theme') || 'light'

// for debugging
window.store = store

function loadTheme (theme) {
  document.body.style = `background:${themes[theme].bg};color:${themes[theme].fg}`
  window.localStorage.setItem('theme', theme)
}

function Provider ({children}) {
  const [theme, setTheme] = useState(initialTheme)
  useEffect(() => loadTheme(theme), [theme])
  return (
    <ThemeProvider mode={theme} setTheme={setTheme}>
      <HistoryProvider source={historySource}>
        <StoreProvider store={store}>{children}</StoreProvider>
      </HistoryProvider>
    </ThemeProvider>
  )
}

// Set initial theme
loadTheme(initialTheme)

// Render React app
render(<Provider children={<App />} />, document.getElementById('root'))
