const __DEV__ = process.env.NODE_ENV === 'development'

function query (slug) {
  return `*[
  _type == 'article'
  && slug.current == '${slug}'
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
}

export function queryArticle (slug) {
  return {
    type: 'groq',
    key: `article/${slug}`,
    query: query(slug)
  }
}
