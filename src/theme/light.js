import {lighten} from 'polished'
import {black} from './base'

const fg = black

export default {
  bg: '#fff',
  fg,
  bodyText: {
    color: lighten(0.2, fg)
  },
  code: {
    bg: black,
    fg: '#fff'
  },
  link: {
    fg: '#30f'
  }
}
