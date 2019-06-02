import * as React from 'react'
import styled from 'styled-components'

const dashOffset = 114
const duration = 1.4 // s

const Root = styled.svg`
  animation: rotator ${duration}s linear infinite;

  @keyframes rotator {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(270deg);
    }
  }
`

const Circle = styled.circle`
  stroke-dasharray: ${dashOffset};
  stroke-dashoffset: 0;
  transform-origin: center;
  stroke: currentColor;
  fill: none;
  animation: dash ${duration}s ease-in-out infinite;

  @keyframes dash {
    0% {
      stroke-dashoffset: ${dashOffset};
    }
    50% {
      stroke-dashoffset: ${dashOffset / 4};
      transform: rotate(135deg);
    }
    100% {
      stroke-dashoffset: ${dashOffset};
      transform: rotate(450deg);
    }
  }
`

export function Spinner (props) {
  return (
    <Root viewBox='0 0 41 41' width='40px' height='40px'>
      <Circle strokeWidth='1' cx='20.5' cy='20.5' r='20' strokeLinecap='round' />
    </Root>
  )
}
