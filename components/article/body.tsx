import BlockContent from '@sanity/block-content-to-react'
import {Card, Code, Heading, Stack, Text} from '@transclusion/ui'
import React from 'react'

const HEADING_RE = /^h\d$/

function ContainerRenderer(props: {children: React.ReactNode}) {
  return <Stack spacing={4}>{props.children}</Stack>
}

// eslint-disable-next-line
const BlockRenderer = (props: any) => {
  const {style = 'normal'} = props.node

  if (HEADING_RE.test(style)) {
    // const level = Number(style.slice(1))
    // console.log('BlockRenderer', level)

    return (
      <Heading as={style} fontSize={[1, 2]}>
        {props.children}
      </Heading>
    )
  }

  if (style === 'blockquote') {
    return (
      <blockquote>
        <Text>{props.children}</Text>
      </blockquote>
    )
  }

  // Fall back to default handling
  // return BlockContent.defaultSerializers.types.block(props)
  return <Text fontSize={[1, 2]}>{props.children}</Text>
}

const CODE_LANG_MAP = {
  sh: 'bash',
}

// eslint-disable-next-line
function CodeRenderer(props: any) {
  return (
    <Card padding={[2, 3]} tone="transparent" style={{overflow: 'auto'}}>
      <Code language={CODE_LANG_MAP[props.node.language] || props.node.language} fontSize={[1, 2]}>
        {props.node.code}
      </Code>
    </Card>
  )
}

const serializers = {
  container: ContainerRenderer,
  types: {
    code: CodeRenderer,
    block: BlockRenderer,
  },
}

// eslint-disable-next-line
export function ArticleBody({blocks}: {blocks: any}) {
  return <BlockContent blocks={blocks} serializers={serializers} />
}
