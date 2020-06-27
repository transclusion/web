import {mix} from 'polished'
import {COLOR_SHADES} from './constants'
import {ColorShades, ColorValue, ColorHueConfig} from './types'

export function getColorHex(config: ColorHueConfig, shade: string) {
  const shadeNum = Number(shade)
  const midPoint = config.midPoint || 500
  const darkSize = 1000 - midPoint
  const lightPosition = shadeNum / midPoint
  const darkPosition = (shadeNum - midPoint) / darkSize

  if (shadeNum === midPoint) {
    return config.mid.toLowerCase()
  }

  // light side of scale: x < midPoint
  if (shadeNum < midPoint) {
    return mix(lightPosition, config.mid, config.lightest)
  }

  // dark side of scale: x > midPoint
  return mix(darkPosition, config.darkest, config.mid)
}

export function createScale(config: ColorHueConfig) {
  const initialValue: {[key: string]: ColorValue} = {}

  return COLOR_SHADES.reduce((scale: ColorShades, shade) => {
    scale[shade] = {
      hex: getColorHex(config, shade),
      title: `${config.title} ${shade}`,
    }

    return scale

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, initialValue as any)
}
