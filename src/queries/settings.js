const query = `*[_type == 'settings' && _id == 'settings'][0] {
  baseUrl,
  title,
  description,
  seo {
    ...,
    image{
      asset,
      'ratio': asset->metadata.dimensions.aspectRatio
    }
  }
}`

export function querySettings () {
  return {
    type: 'groq',
    key: 'settings',
    query
  }
}
