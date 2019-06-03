import BlockContent from '@sanity/block-content-to-react'
import React from 'react'
import {Code} from '../../../components'
import {config} from '../../../sanity'

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
