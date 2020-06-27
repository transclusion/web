import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
  }

  html {
    background: ${({theme}) => theme.color.card.tones.transparent.bg};
    color: ${({theme}) => theme.color.card.tones.transparent.fg};
  }

  body {
    margin: 0;
  }
`
