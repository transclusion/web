import {css} from 'styled-components'
import {Theme, ThemeFontSize} from '../theme'

export function codeBaseCss(props: {theme: Theme}) {
  const {theme} = props

  return css`
    -webkit-font-smoothing: antialiased;
    display: block;
    font-family: ${theme.fonts.code.family};
    font-weight: ${theme.fonts.code.weights.normal};
    margin: 0 -0.05em;
    padding: 1px 0 0;

    &:before {
      content: '';
      display: block;
      height: 0;
    }

    & strong {
      font-weight: ${theme.fonts.code.weights.bold};
    }

    & code {
      font-family: inherit;
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

export function codeSizeCss(props: {fontSize: number[]; theme: Theme}) {
  const {sizes} = props.theme.fonts.code

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

export function codeSyntaxHighlightingStyles({theme}: {theme: Theme}) {
  const {syntax} = theme.color

  return css`
    & > code.refractor {
      & .token {
        &.atrule {
          color: ${syntax.atrule};
        }
        &.attr-name {
          color: ${syntax.attrName};
        }
        &.attr-value {
          color: ${syntax.attrValue};
        }
        &.attribute {
          color: ${syntax.attribute};
        }
        &.boolean {
          color: ${syntax.boolean};
        }
        &.builtin {
          color: ${syntax.builtin};
        }
        &.cdata {
          color: ${syntax.cdata};
        }
        &.char {
          color: ${syntax.char};
        }
        &.class {
          color: ${syntax.class};
        }
        &.class-name {
          color: ${syntax.className};
        }
        &.comment {
          color: ${syntax.comment};
        }
        &.constant {
          color: ${syntax.constant};
        }
        &.deleted {
          color: ${syntax.deleted};
        }
        &.doctype {
          color: ${syntax.doctype};
        }
        &.entity {
          color: ${syntax.entity};
        }
        &.function {
          color: ${syntax.function};
        }
        &.hexcode {
          color: ${syntax.hexcode};
        }
        &.id {
          color: ${syntax.id};
        }
        &.important {
          color: ${syntax.important};
        }
        &.inserted {
          color: ${syntax.inserted};
        }
        &.keyword {
          color: ${syntax.keyword};
        }
        &.number {
          color: ${syntax.number};
        }
        &.operator {
          color: ${syntax.operator};
        }
        &.prolog {
          color: ${syntax.prolog};
        }
        &.property {
          color: ${syntax.property};
        }
        &.pseudo-class {
          color: ${syntax.pseudoClass};
        }
        &.pseudo-element {
          color: ${syntax.pseudoElement};
        }
        &.punctuation {
          color: ${syntax.punctuation};
        }
        &.regex {
          color: ${syntax.regex};
        }
        &.selector {
          color: ${syntax.selector};
        }
        &.string {
          color: ${syntax.string};
        }
        &.symbol {
          color: ${syntax.symbol};
        }
        &.tag {
          color: ${syntax.tag};
        }
        &.unit {
          color: ${syntax.unit};
        }
        &.url {
          color: ${syntax.url};
        }
        &.variable {
          color: ${syntax.variable};
        }
      }
    }
  `
}
