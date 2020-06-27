import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {boxPaddingStyles} from '../box'
import {getResponsiveProp} from '../helpers'
import {cardBaseStyles, cardColorStyles} from './styles'
import {CardTone} from './types'

interface CardProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  padding?: number | number[]
  tone?: CardTone
}

const Root = styled.div(boxPaddingStyles, cardBaseStyles, cardColorStyles)

export const Card = forwardRef((props: React.HTMLProps<HTMLDivElement> & CardProps, ref) => {
  const {children, padding: paddingProp, tone, ...restProps} = props
  const padding = getResponsiveProp(paddingProp, [0])

  return (
    <Root data-ui="Card" {...restProps} padding={padding} ref={ref} tone={tone}>
      {children}
    </Root>
  )
})

Card.displayName = 'Card'
