import BlockContent from '@sanity/block-content-to-react'
import React from 'react'
import Highlight from 'react-highlight'
import styled from 'styled-components'
import {config} from '../../../sanity'

const CodeBlock = styled.div`
  font-size: 14px;
  line-height: 22px;
  margin: 0 -1.5rem;

  & > pre {
    margin: 2em 0;
  }

  & > pre > .hljs {
    padding: 1.5rem;
  }

  & > pre > code {
    font-family: SF Mono, Menlo, monospace;
  }
`

function Code ({code, language}) {
  return (
    <CodeBlock>
      <Highlight className={language}>{code}</Highlight>
    </CodeBlock>
  )
}

const serializers = {
  types: {
    code: props => {
      return <Code {...props.node} />
    }
  }
}

export function Body ({blocks}) {
  return <BlockContent {...config} blocks={blocks} serializers={serializers} />
}
