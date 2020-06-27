import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {getResponsiveProp} from '../helpers'
import {headingBaseCss, headingSizeCss} from './styles'

interface HeadingProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  fontSize?: number | number[]
}

const Root = styled.h1(headingBaseCss, headingSizeCss)

export const Heading = forwardRef((props: React.HTMLProps<HTMLDivElement> & HeadingProps, ref) => {
  const {children, fontSize: fontSizeProp, ...restProps} = props
  const fontSize = getResponsiveProp(fontSizeProp, [2])

  return (
    <Root data-ui="Heading" {...restProps} ref={ref} fontSize={fontSize}>
      {children}
    </Root>
  )
})

Heading.displayName = 'Heading'
