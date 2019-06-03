import React, {useContext} from 'react'

export const themes = {
  dark: {
    bg: '#282a36',
    fg: '#f8f8f2',
    code: {
      bg: '#282a36',
      fg: '#f8f8f2',
      outline: 'rgba(255, 255, 255, 0.1)'
    },
    link: {
      fg: '#99f'
    }
  },
  light: {
    bg: '#fff',
    fg: '#282a36',
    code: {
      bg: '#f8f8f2',
      fg: '#282a36',
      outline: 'transparent'
    },
    link: {
      fg: '#30f'
    }
  }
}

export const ThemeContext = React.createContext(themes.light)

export function ThemeProvider ({children, mode, setTheme}) {
  const theme = themes[mode] || themes.light
  return <ThemeContext.Provider value={{mode, setTheme, theme}}>{children}</ThemeContext.Provider>
}

export function useTheme () {
  return useContext(ThemeContext)
}
