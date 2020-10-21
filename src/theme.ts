import { css } from '@emotion/core'
import { create, themes } from '@storybook/theming'

const theme = {
  ...create(themes.normal),
  placeholderColor: '#757575',
  code: {
    commentColor: '#6A9955',
    argColor: '#9CDCFE',
    backgroundColor: '#1E1E1E',
    separatorColor: '#D4D4D4',
    typeColor: '#4EC9B0',
    functionNameColor: '#DCDCAA',
  },
}

export default theme

export type Theme = typeof theme

export const globalStyles = css`
  body {
    font-family: 'Open Sans';
  }
  * {
    box-sizing: border-box;
  }
`
