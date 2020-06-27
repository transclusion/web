export interface ThemeFontSize {
  ascenderHeight: number
  descenderHeight: number
  fontSize: number
  letterSpacing: number
  lineHeight: number
}

interface ThemeFont {
  family: string
  sizes: ThemeFontSize[]
  weights: {normal: number; bold: number}
}

interface ThemeColorButtonTone {
  enabled: {
    bg: string
    fg: string
  }
  hovered: {
    bg: string
    fg: string
  }
}

interface ThemeColorCardTone {
  bg: string
  fg: string
}

interface ThemeColor {
  button: {
    tones: {
      default: ThemeColorButtonTone
      brand: ThemeColorButtonTone
    }
  }

  card: {
    tones: {
      transparent: ThemeColorCardTone
      default: ThemeColorCardTone
      contrast: ThemeColorCardTone
    }
  }

  syntax: {
    atrule: string
    attrName: string
    attrValue: string
    attribute: string
    boolean: string
    builtin: string
    cdata: string
    char: string
    class: string
    className: string
    comment: string
    constant: string
    deleted: string
    doctype: string
    entity: string
    function: string
    hexcode: string
    id: string
    important: string
    inserted: string
    keyword: string
    number: string
    operator: string
    prolog: string
    property: string
    pseudoClass: string
    pseudoElement: string
    punctuation: string
    regex: string
    selector: string
    string: string
    symbol: string
    tag: string
    unit: string
    url: string
    variable: string
  }
}

export interface Theme {
  color: ThemeColor
  container: number[]
  media: number[]
  space: number[]
  fonts: {
    code: ThemeFont
    heading: ThemeFont
    label: ThemeFont
    text: ThemeFont
  }
}
