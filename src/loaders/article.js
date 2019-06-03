const __DEV__ = process.env.NODE_ENV

const QUERY_ARTICLE = `*[
  _type == $type
  && slug.current == $slug
  ${__DEV__ ? '' : `&& defined(publishedAt)`}
]{
  publishedAt,
  metadata,
  title,
  excerpt,
  body,
  seo {
    ...,
    image{
      asset,
      'ratio': asset->metadata.dimensions.aspectRatio
    }
  }
}[0]`

export function loadArticle (slug) {
  return {
    type: 'groq',
    key: `article/${slug}`,
    query: QUERY_ARTICLE,
    params: {type: 'article', slug}
  }
}
