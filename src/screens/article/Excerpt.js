import React from 'react'
import BlockContent from '@sanity/block-content-to-react'

const serializers = {}

function Excerpt ({blocks}) {
  return <BlockContent blocks={blocks} serializers={serializers} />
}

export default Excerpt
