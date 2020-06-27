import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {getResponsiveProp} from '../helpers'
import {stackBaseStyles, stackSpacingStyles} from './styles'

export interface StackProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  spacing?: number | number[]
}

const Root = styled.div(stackBaseStyles, stackSpacingStyles)

export const Stack = forwardRef((props: React.HTMLProps<HTMLDivElement> & StackProps, ref) => {
  const {children, spacing: spacingProp, ...restProps} = props
  const spacing = getResponsiveProp(spacingProp, [0])

  return (
    <Root data-ui="Stack" {...restProps} ref={ref} spacing={spacing}>
      {children}
    </Root>
  )
})

Stack.displayName = 'Stack'
