import color from '@transclusion/color'
import {Theme} from './types'

export const lightTheme: Theme = {
  color: {
    card: {
      tones: {
        transparent: {
          bg: color.gray['50'].hex,
          fg: color.gray['800'].hex,
        },
        default: {
          bg: color.white.hex,
          fg: color.gray['900'].hex,
        },
        contrast: {
          bg: color.black.hex,
          fg: color.white.hex,
        },
      },
    },
    button: {
      tones: {
        default: {
          enabled: {
            bg: color.gray['400'].hex,
            fg: color.white.hex,
          },
          hovered: {
            bg: color.gray['500'].hex,
            fg: color.white.hex,
          },
        },
        brand: {
          enabled: {
            bg: color.blue['400'].hex,
            fg: color.white.hex,
          },
          hovered: {
            bg: color.blue['500'].hex,
            fg: color.white.hex,
          },
        },
      },
    },
    syntax: {
      atrule: color.purple['600'].hex,
      attrName: color.green['600'].hex,
      attrValue: color.yellow['600'].hex,
      attribute: color.yellow['600'].hex,
      boolean: color.purple['600'].hex,
      builtin: color.orange['600'].hex,
      cdata: color.yellow['600'].hex,
      char: color.yellow['600'].hex,
      class: color.orange['600'].hex,
      className: color.cyan['600'].hex,
      comment: color.gray['300'].hex,
      constant: color.purple['600'].hex,
      deleted: color.red['600'].hex,
      doctype: color.gray['300'].hex,
      entity: color.red['600'].hex,
      function: color.green['600'].hex,
      hexcode: color.blue['600'].hex,
      id: color.purple['600'].hex,
      important: color.purple['600'].hex,
      inserted: color.yellow['600'].hex,
      keyword: color.magenta['600'].hex,
      number: color.purple['600'].hex,
      operator: color.magenta['600'].hex,
      prolog: color.gray['300'].hex,
      property: color.blue['600'].hex,
      pseudoClass: color.yellow['600'].hex,
      pseudoElement: color.yellow['600'].hex,
      punctuation: color.gray['600'].hex,
      regex: color.blue['600'].hex,
      selector: color.red['600'].hex,
      string: color.yellow['600'].hex,
      symbol: color.purple['600'].hex,
      tag: color.red['600'].hex,
      unit: color.orange['600'].hex,
      url: color.red['600'].hex,
      variable: color.red['600'].hex,
    },
  },

  container: [320, 640, 960, 1280, 1600, 1920, 2240, 2560],

  fonts: {
    code: {
      family:
        '"IBM Plex Mono", -apple-system-ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace',
      sizes: [
        {
          ascenderHeight: 3,
          descenderHeight: 3,
          fontSize: 10,
          lineHeight: 13,
          letterSpacing: 0,
        },
        {
          ascenderHeight: 4,
          descenderHeight: 4,
          fontSize: 13,
          lineHeight: 17,
          letterSpacing: 0,
        },
        {
          ascenderHeight: 5,
          descenderHeight: 5,
          fontSize: 16,
          lineHeight: 21,
          letterSpacing: 0,
        },
        {
          ascenderHeight: 6,
          descenderHeight: 6,
          fontSize: 19,
          lineHeight: 25,
          letterSpacing: 0,
        },
        {
          ascenderHeight: 7,
          descenderHeight: 7,
          fontSize: 22,
          lineHeight: 29,
          letterSpacing: 0,
        },
      ],
      weights: {
        normal: 400,
        bold: 700,
      },
    },
    heading: {
      family:
        'franklin-gothic-urw, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      sizes: [
        {
          ascenderHeight: 3,
          descenderHeight: 3,
          fontSize: 11,
          lineHeight: 13,
          letterSpacing: 0,
        },
        {
          ascenderHeight: 4,
          descenderHeight: 4,
          fontSize: 17,
          lineHeight: 19,
          letterSpacing: 0,
        },
        {
          ascenderHeight: 5,
          descenderHeight: 5,
          fontSize: 22,
          lineHeight: 25,
          letterSpacing: 0,
        },
        {
          ascenderHeight: 6,
          descenderHeight: 6,
          fontSize: 26,
          lineHeight: 29,
          letterSpacing: 0,
        },
        {
          ascenderHeight: 7,
          descenderHeight: 7,
          fontSize: 32,
          lineHeight: 35,
          letterSpacing: 0,
        },
      ],
      weights: {
        normal: 700,
        bold: 700,
      },
    },
    label: {
      family:
        'franklin-gothic-urw, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      sizes: [],
      weights: {
        normal: 400,
        bold: 700,
      },
    },
    text: {
      family:
        'franklin-gothic-urw, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      sizes: [
        {
          ascenderHeight: 3,
          descenderHeight: 3,
          fontSize: 10.5,
          lineHeight: 13,
          letterSpacing: 0.5,
        },
        {
          ascenderHeight: 4,
          descenderHeight: 4,
          fontSize: 13.5,
          lineHeight: 17,
          letterSpacing: 0.5,
        },
        {
          ascenderHeight: 5,
          descenderHeight: 5,
          fontSize: 16.5,
          lineHeight: 21,
          letterSpacing: 0.5,
        },
        {
          ascenderHeight: 6,
          descenderHeight: 6,
          fontSize: 19.5,
          lineHeight: 25,
          letterSpacing: 0.75,
        },
        {
          ascenderHeight: 7,
          descenderHeight: 7,
          fontSize: 22.5,
          lineHeight: 29,
          letterSpacing: 1,
        },
      ],
      weights: {
        normal: 400,
        bold: 700,
      },
    },
  },
  media: [320, 640, 960, 1280, 1600, 1920],
  space: [0, 4, 8, 12, 20, 32, 52, 84, 136, 220],
}
