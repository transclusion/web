import {queryArticle} from '../../queries/article'
import {querySettings} from '../../queries/settings'

export function load (params) {
  return [queryArticle(params.slug), querySettings()]
}
