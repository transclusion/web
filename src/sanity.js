import sanityClient from '@sanity/client'
import createImageUrlBuilder from '@sanity/image-url'

export const config = {
  projectId: 'ykqc8n2b',
  dataset: 'production',
  useCdn: true
}

export const client = sanityClient(config)

const imageUrlBuilder = createImageUrlBuilder(client)

export function imageUrl (source) {
  return imageUrlBuilder.image(source)
}

export function createShareImage (data) {
  if (!data || !data.asset) return null

  const width = 1200
  const height = data.ratio ? Math.round(width / data.ratio) : 600

  return {
    url: imageUrl(data)
      .width(width)
      .height(height)
      .auto('format')
      .url(),
    width,
    height
  }
}
