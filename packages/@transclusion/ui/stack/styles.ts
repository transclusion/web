import {css} from 'styled-components'
import {Theme} from '../theme'

export function stackBaseStyles() {
  return css`
    display: grid;
    grid-template-columns: minmax(0, 1fr);
  `
}

function _spacingCss(space: number) {
  return css`
    grid-gap: ${space}px;
  `
}

export function stackSpacingStyles(props: {spacing: number[]; theme: Theme}) {
  const {space} = props.theme

  return css`
    ${props.spacing.map((spaceIndex, mqIndex) => {
      if (mqIndex === 0) return _spacingCss(space[spaceIndex])

      return css`
        @media (min-width: ${props.theme.media[mqIndex - 1]}px) {
          ${_spacingCss(space[spaceIndex])}
        }
      `
    })}
  `
}
