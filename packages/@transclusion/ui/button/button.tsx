import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {boxPaddingStyles} from '../box'
import {getResponsiveProp} from '../helpers'
import {Text} from '../text'
import {buttonBaseCss, buttonColorCss} from './styles'
import {ButtonTone} from './types'

interface ButtonProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  padding?: number | number[]
  size?: number | number[]
  tone?: ButtonTone
  type?: 'button' | 'reset' | 'submit'
}

const Root = styled.button(buttonBaseCss, buttonColorCss, boxPaddingStyles)

export const Button = forwardRef((props: React.HTMLProps<HTMLButtonElement> & ButtonProps, ref) => {
  const {children, padding: paddingProp, size, ...restProps} = props
  const padding = getResponsiveProp(paddingProp, [4])

  return (
    <Root data-ui="Button" {...restProps} padding={padding} ref={ref}>
      {children && <Text size={size}>{children}</Text>}
    </Root>
  )
})

Button.displayName = 'Button'
