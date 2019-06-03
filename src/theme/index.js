import React, {useContext} from 'react'
import dark from './dark'
import light from './light'

export const themes = {dark, light}

export const ThemeContext = React.createContext(themes.light)

export function ThemeProvider ({children, mode, setTheme}) {
  const theme = themes[mode] || themes.light
  return <ThemeContext.Provider value={{mode, setTheme, theme}}>{children}</ThemeContext.Provider>
}

export function useTheme () {
  return useContext(ThemeContext)
}
