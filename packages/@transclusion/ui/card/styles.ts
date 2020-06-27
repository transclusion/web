import {css} from 'styled-components'
import {Theme} from '../theme'
import {CardTone} from './types'

export function cardBaseStyles() {
  return css``
}

export function cardColorStyles(props: {theme: Theme; tone?: CardTone}) {
  const tone = props.theme.color.card.tones[props.tone || 'default']

  return css`
    background: ${tone.bg};
    color: ${tone.fg};
  `
}
