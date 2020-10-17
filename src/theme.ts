import { css } from '@emotion/core'
import { create, themes } from '@storybook/theming'

const theme = {
  ...create(themes.normal),
  placeholderColor: '#757575',
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
