import React from 'react'
import BlockContent from '@sanity/block-content-to-react'

const serializers = {}

export function Excerpt ({blocks}) {
  return <BlockContent blocks={blocks} serializers={serializers} />
}
