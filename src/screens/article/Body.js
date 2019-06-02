import BlockContent from '@sanity/block-content-to-react'
import React from 'react'
import Highlight from 'react-highlight'
import styled from 'styled-components'
import {config} from '../../sanity'

const CodeBlock = styled.div`
  font-size: 14px;
  line-height: 22px;
  margin: 0 -1.5rem;

  & > pre {
    margin: 2em 0;
  }

  & > pre > .hljs {
    /* background: #eee; */
    padding: 1.5rem;
  }

  & > pre > code {
    font-family: SF Mono, Menlo, monospace;
  }
`

const serializers = {
  types: {
    code: props => {
      console.log(props)
      return (
        <CodeBlock>
          <Highlight className={props.node.language}>{props.node.code}</Highlight>
        </CodeBlock>
      )
      // return <pre>{JSON.stringify(props.node, null, 2)}</pre>
    }
  }
}

function Body ({blocks}) {
  return <BlockContent {...config} blocks={blocks} serializers={serializers} />
}

export default Body
