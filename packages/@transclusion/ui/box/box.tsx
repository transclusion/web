import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {getResponsiveProp} from '../helpers'
import {boxPaddingStyles} from './styles'

interface BoxProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  padding?: number | number[]
}

const Root = styled.div(boxPaddingStyles)

export const Box = forwardRef((props: React.HTMLProps<HTMLDivElement> & BoxProps, ref) => {
  const {as: asProp = 'div', padding: paddingProp, ...restProps} = props
  const padding = getResponsiveProp(paddingProp, [0])

  return (
    <Root data-ui="Box" {...restProps} as={asProp} padding={padding} ref={ref}>
      {props.children}
    </Root>
  )
})

Box.displayName = 'Box'
