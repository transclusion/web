import React from 'react'
import Lowlight from 'react-lowlight'
import styled from 'styled-components'
import {useTheme} from '../theme'

// Import languages
import js from 'highlight.js/lib/languages/javascript'
Lowlight.registerLanguage('javascript', js)

const CodeBlock = styled.div`
  font-size: 14px;
  line-height: 22px;
  margin: 0 -1.5rem;

  & > pre {
    margin: 2em 0;
  }

  & > pre > .hljs {
    padding: 1.5rem;
    outline: ${({theme}) => `1px solid ${theme.code.outline}`};
  }

  & > pre > code {
    font-family: SF Mono, Menlo, monospace;
  }
`

export function Code ({code, language}) {
  const {theme} = useTheme()
  return (
    <CodeBlock theme={theme}>
      <Lowlight language={language} value={code} />
    </CodeBlock>
  )
}
