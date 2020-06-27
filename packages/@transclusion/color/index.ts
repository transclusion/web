import {black, white, gray, red, orange, yellow, green, cyan, blue, purple, magenta} from './config'
import {createScale} from './helpers'
import {ColorPallette} from './types'

export * from './constants'
export * from './types'

const color: ColorPallette = {
  black: {title: 'Black', hex: black},
  white: {title: 'White', hex: white},
  gray: createScale(gray),
  red: createScale(red),
  orange: createScale(orange),
  yellow: createScale(yellow),
  green: createScale(green),
  cyan: createScale(cyan),
  blue: createScale(blue),
  purple: createScale(purple),
  magenta: createScale(magenta),
}

export default color
