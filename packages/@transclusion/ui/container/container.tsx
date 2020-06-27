import React from 'react'
import styled, {css} from 'styled-components'
import {Theme} from '../theme'

interface ContainerProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements

  // @todo: Make this responsive
  maxWidth: number
}

function containerBaseStyles(props: {maxWidth: number; theme: Theme}) {
  return css`
    max-width: ${props.theme.container[props.maxWidth]}px;
    margin: 0 auto;
  `
}

const Root = styled.div(containerBaseStyles)

export function Container(props: React.HTMLProps<HTMLDivElement> & ContainerProps) {
  const {children, maxWidth = 3, ...restProps} = props

  return (
    <Root data-ui="container" {...restProps} maxWidth={maxWidth}>
      {children}
    </Root>
  )
}
