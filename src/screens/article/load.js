import {loadArticle} from '../../loaders/article'
import {loadSettings} from '../../loaders/settings'

export function load (params) {
  return [loadArticle(params.slug), loadSettings()]
}
