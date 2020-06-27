import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {getResponsiveProp} from '../helpers'
import {textBaseCss, textSizeCss} from './styles'

interface TextProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  fontSize?: number | number[]
}

const Root = styled.div(textBaseCss, textSizeCss)

export const Text = forwardRef((props: React.HTMLProps<HTMLDivElement> & TextProps, ref) => {
  const {children, fontSize: fontSizeProp, ...restProps} = props
  const fontSize = getResponsiveProp(fontSizeProp, [2])

  return (
    <Root data-ui="Text" {...restProps} ref={ref} fontSize={fontSize}>
      {children}
    </Root>
  )
})

Text.displayName = 'Text'
