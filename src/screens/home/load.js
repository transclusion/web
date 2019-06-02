import {loadArticles} from '../../loaders/articles'
import {loadSettings} from '../../loaders/settings'

export function load () {
  return [loadArticles(), loadSettings()]
}
