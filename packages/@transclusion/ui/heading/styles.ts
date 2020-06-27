import {css} from 'styled-components'
import {Theme, ThemeFontSize} from '../theme'

export function headingBaseCss(props: {theme: Theme}) {
  const {theme} = props

  return css`
    -webkit-font-smoothing: antialiased;
    display: block;
    font-family: ${theme.fonts.heading.family};
    font-weight: ${theme.fonts.heading.weights.normal};
    margin: 0 -0.05em;
    padding: 1px 0 0;

    &:before {
      content: '';
      display: block;
      height: 0;
    }

    & strong {
      font-weight: ${theme.fonts.heading.weights.bold};
    }

    & code {
      font-family: ${theme.fonts.code.family};
      border-radius: 1px;
    }

    & a {
      text-decoration: none;
      border-radius: 1px;
    }
  `
}

function _sizeCss(size: ThemeFontSize) {
  return css`
    font-size: ${size.fontSize}px;
    line-height: ${size.lineHeight}px;
    letter-spacing: ${size.letterSpacing}px;
    transform: translateY(${size.descenderHeight}px);

    &:before {
      margin-top: ${-1 - size.ascenderHeight - size.descenderHeight}px;
    }
  `
}

export function headingSizeCss(props: {fontSize: number[]; theme: Theme}) {
  const {sizes} = props.theme.fonts.heading

  return css`
    ${props.fontSize.map((sizeIndex, mqIndex) => {
      const size = sizes[sizeIndex] || sizes[2]

      if (mqIndex === 0) return _sizeCss(size)

      return css`
        @media (min-width: ${props.theme.media[mqIndex - 1]}px) {
          ${_sizeCss(size)}
        }
      `
    })}
  `
}
