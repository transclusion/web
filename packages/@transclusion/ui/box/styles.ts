import {css} from 'styled-components'
import {Theme} from '../theme'

function _paddingStyles(space: number) {
  return css`
    padding: ${space}px;
  `
}

export function boxPaddingStyles(props: {padding: number[]; theme: Theme}) {
  const {space} = props.theme

  return css`
    ${props.padding.map((spaceIndex, mqIndex) => {
      if (mqIndex === 0) return _paddingStyles(space[spaceIndex])

      return css`
        @media (min-width: ${props.theme.media[mqIndex - 1]}px) {
          ${_paddingStyles(space[spaceIndex])}
        }
      `
    })}
  `
}
