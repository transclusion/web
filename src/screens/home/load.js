import {queryArticles} from '../../queries/articles'
import {querySettings} from '../../queries/settings'

export function load () {
  return [queryArticles(), querySettings()]
}
