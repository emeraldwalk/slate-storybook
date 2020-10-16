import React from 'react'
import { Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import theme, { globalStyles } from '../src/theme'
import 'typeface-open-sans'
import '../node_modules/@mdi/font/css/materialdesignicons.min.css'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}

export const decorators = [
  (Story) => {
    return (
      <React.Suspense fallback={<div>Preview Loading...</div>}>
        <Global styles={globalStyles} />
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      </React.Suspense>
    )
  },
]
