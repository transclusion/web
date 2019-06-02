const QUERY_SETTINGS = `*[_type == $type && _id == $id][0] {
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

export function loadSettings () {
  return {
    type: 'groq',
    key: 'settings',
    query: QUERY_SETTINGS,
    params: {type: 'settings', id: 'settings'}
  }
}
