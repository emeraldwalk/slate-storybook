import { css } from '@emotion/core'
import { create, themes } from '@storybook/theming'

const color = {
  node: {
    backgroundColor: '#1E1E1E',
    element: '#569CD6',
    text: '#4EC9B0',
    stringColor: '#CE9178',
  },
} as const

const theme = {
  ...create(themes.normal),
  color,
  placeholderColor: '#757575',
  code: {
    commentColor: '#6A9955',
    paramColor: '#569CD6',
    argColor: '#9CDCFE',
    backgroundColor: '#1E1E1E',
    separatorColor: '#D4D4D4',
    typeColor: '#4EC9B0',
    functionNameColor: '#DCDCAA',
  },
} as const

export default theme

export type Theme = typeof theme

export const globalStyles = css`
  body {
    font-family: 'Open Sans';
    font-size: 16px;
  }
  * {
    box-sizing: border-box;
  }
  input,
  select {
    font-size: 1em; // stop zoom on IOS
  }
`
