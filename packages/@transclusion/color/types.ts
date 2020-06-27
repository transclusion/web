export interface ColorHueConfig {
  darkest: string
  mid: string
  lightest: string
  midPoint: number
  title: string
}

export interface ColorValue {
  hex: string
  title: string
}

export type ColorShadeKey =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | '950'

export interface ColorShades {
  '50': ColorValue
  '100': ColorValue
  '200': ColorValue
  '300': ColorValue
  '400': ColorValue
  '500': ColorValue
  '600': ColorValue
  '700': ColorValue
  '800': ColorValue
  '900': ColorValue
  '950': ColorValue
}

export type ColorName =
  | 'gray'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'cyan'
  | 'blue'
  | 'purple'
  | 'magenta'

export interface ColorPallette {
  black: ColorValue
  white: ColorValue
  gray: ColorShades
  red: ColorShades
  orange: ColorShades
  yellow: ColorShades
  green: ColorShades
  cyan: ColorShades
  blue: ColorShades
  purple: ColorShades
  magenta: ColorShades
}
