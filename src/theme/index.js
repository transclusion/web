import React, {useContext} from 'react'

export const themes = {
  dark: {
    bg: '#112',
    fg: '#ddd',
    code: {
      bg: '#223',
      fg: '#ddd'
    },
    link: {
      fg: '#99f'
    }
  },
  light: {
    bg: '#fff',
    fg: '#223',
    code: {
      bg: '#334',
      fg: '#fff'
    },
    link: {
      fg: '#30f'
    }
  }
}

export const ThemeContext = React.createContext(themes.light)

export function ThemeProvider ({children, mode}) {
  const theme = themes[mode] || themes.light
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

export function useTheme () {
  return useContext(ThemeContext)
}
