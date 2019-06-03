const __DEV__ = process.env.NODE_ENV === 'development'

const query = `*[
  _type == 'article'
  && defined(slug)
  ${__DEV__ ? '' : `&& defined(publishedAt)`}
] | order(publishedAt desc) {
  'key': _id,
  publishedAt,
  metadata,
  slug,
  title,
  excerpt
}`

export function queryArticles () {
  return {
    type: 'groq',
    key: 'articles',
    query
  }
}
