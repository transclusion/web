const __DEV__ = process.env.NODE_ENV

const QUERY_ALL_ARTICLES = `*[
  _type == $type
  && defined(slug)
  ${__DEV__ ? '' : `&& defined(publishedAt)`}
] | order(publishedAt desc) {
  publishedAt,
  "key": _id,
  metadata,
  slug,
  title,
  excerpt
}`

export function loadArticles () {
  return {
    type: 'groq',
    key: 'articles',
    query: QUERY_ALL_ARTICLES,
    params: {type: 'article'}
  }
}
