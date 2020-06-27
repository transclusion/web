import {css} from 'styled-components'
import {Theme, ThemeFontSize} from '../theme'

export function textBaseCss(props: {theme: Theme}) {
  const {theme} = props

  return css`
    -webkit-font-smoothing: antialiased;
    display: block;
    font-family: ${theme.fonts.text.family};
    font-weight: ${theme.fonts.text.weights.normal};
    margin: 0 -0.05em;
    padding: 1px 0 0;

    &:before {
      content: '';
      display: block;
      height: 0;
    }

    & strong {
      font-weight: ${theme.fonts.text.weights.bold};
    }

    & code {
      font-family: ${theme.fonts.code.family};
      border-radius: 1px;
      letter-spacing: 0;
    }

    & a {
      text-decoration: none;
      border-radius: 1px;
    }
  `
}

function _sizeCss(text: ThemeFontSize, code: ThemeFontSize) {
  return css`
    font-size: ${text.fontSize}px;
    line-height: ${text.lineHeight}px;
    letter-spacing: ${text.letterSpacing}px;
    transform: translateY(${text.descenderHeight}px);

    &:before {
      margin-top: ${-1 - text.ascenderHeight - text.descenderHeight}px;
    }

    & code {
      font-size: ${code.fontSize}px;
      letter-spacing: ${code.letterSpacing}px;
    }
  `
}

export function textSizeCss(props: {fontSize: number[]; theme: Theme}) {
  const {fonts} = props.theme

  return css`
    ${props.fontSize.map((sizeIndex, mqIndex) => {
      const text = fonts.text.sizes[sizeIndex] || fonts.code.sizes[2]
      const code = fonts.code.sizes[sizeIndex] || fonts.text.sizes[2]

      if (mqIndex === 0) return _sizeCss(text, code)

      return css`
        @media (min-width: ${props.theme.media[mqIndex - 1]}px) {
          ${_sizeCss(text, code)}
        }
      `
    })}
  `
}
