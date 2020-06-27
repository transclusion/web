import {css} from 'styled-components'
import {Theme} from '../theme'
import {ButtonTone} from './types'

export function buttonBaseCss() {
  return css`
    -webkit-appearance: none;
    display: inline-block;
    appearance: none;
    font: inherit;
    border: 0;
    margin: 0;
    padding: 0;
    border-radius: 3px;
    outline: none;
  `
}

export function buttonColorCss(props: {theme: Theme; tone?: ButtonTone}) {
  const tone = props.theme.color.button.tones[props.tone || 'default']

  return css`
    background: ${tone.enabled.bg};
    color: ${tone.enabled.fg};

    @media (hover: hover) {
      &:hover {
        background: ${tone.hovered.bg};
        color: ${tone.hovered.fg};
      }
    }
  `
}
