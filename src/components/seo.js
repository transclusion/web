import React from 'react'
import {Helmet} from 'react-helmet'

export function SEO (props) {
  const data = props.data || {}
  const defaults = props.defaults || {}
  const title = data.title || defaults.title
  const description = data.description || defaults.description
  const url = data.url
  const image = data.image

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name='description' content={description} />}
      {/* OpenGraph */}
      {title && <meta property='og:title' content={title} />}
      {description && <meta property='og:description' content={description} />}
      {url && <meta property='og:url' content={url} />}
      {image && <meta property='og:image' content={image.url} />}
      {image && <meta property='og:image:width' content={image.width} />}
      {image && <meta property='og:image:height' content={image.height} />}
      {/* Talk to robots */}
      <meta name='robots' content='noindex, nofollow' />
    </Helmet>
  )
}
