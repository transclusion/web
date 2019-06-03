import {darken} from 'polished'
import {black} from './base'

const fg = '#dfe1e6'

export default {
  bg: darken(0.05, black),
  fg: fg,
  bodyText: {
    color: darken(0.2, fg)
  },
  code: {
    bg: black,
    fg: '#dfe1e6'
  },
  link: {
    fg: '#c196f5'
  }
}
