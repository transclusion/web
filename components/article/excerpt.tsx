import BlockContent from '@sanity/block-content-to-react'
import {Code, Text} from '@transclusion/ui'
import React from 'react'

// eslint-disable-next-line
const BlockRenderer = (props: any) => {
  const {style = 'normal'} = props.node

  if (/^h\d/.test(style)) {
    const level = style.replace(/[^\d]/g, '')
    return React.createElement(style, {className: `heading-${level}`}, props.children)
  }

  if (style === 'blockquote') {
    return <blockquote>{props.children}</blockquote>
  }

  // Fall back to default handling
  // return BlockContent.defaultSerializers.types.block(props)
  return <Text size={1}>{props.children}</Text>
}

// eslint-disable-next-line
function CodeRenderer(props: any) {
  return <Code data-language={props.node.language}>{props.node.code}</Code>
}

const serializers = {
  types: {
    code: CodeRenderer,
    block: BlockRenderer,
  },
}

// eslint-disable-next-line
export function ArticleExcerpt({blocks}: {blocks: any}) {
  return <BlockContent blocks={blocks} serializers={serializers} />
}
