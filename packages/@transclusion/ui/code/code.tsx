import React, {forwardRef} from 'react'
import Refractor from 'react-refractor'
import styled from 'styled-components'
import {getResponsiveProp} from '../helpers'
import {codeBaseCss, codeSizeCss, codeSyntaxHighlightingStyles} from './styles'

interface CodeProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  language?: string
  fontSize?: number | number[]
}

const Root = styled.pre(codeBaseCss, codeSizeCss, codeSyntaxHighlightingStyles)

export const Code = forwardRef((props: React.HTMLProps<HTMLDivElement> & CodeProps, ref) => {
  const {children, language, fontSize: fontSizeProp, ...restProps} = props
  const fontSize = getResponsiveProp(fontSizeProp, [2])

  return (
    <Root data-ui="Code" {...restProps} ref={ref} fontSize={fontSize}>
      {!language && <code>{children}</code>}
      {language && <Refractor inline language={language} value={String(children)} />}
    </Root>
  )
})

Code.displayName = 'Code'
