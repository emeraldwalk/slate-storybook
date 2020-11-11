import React from 'react'
import { Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import theme, { globalStyles } from '../src/theme'
import 'typeface-open-sans'
import '../node_modules/@mdi/font/css/materialdesignicons.min.css'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort,
    showPanel: false, // panel containing actions and controls. Have to set explicitly here to allow stories to override
  },
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

const sortPriority = {
  'Slate/Interfaces': 1,
  'Slate/Concepts': 2,
}

/** Sort stories in sidebar */
function storySort(a, b) {
  // within category, just use default sort
  if (a[1].kind === b[1].kind) {
    return 0
  }

  const aI = sortPriority[a[1].kind] ?? 9999
  const bI = sortPriority[b[1].kind] ?? 9999

  return aI - bI

  // const aId = forceExampleLast(a[1].id)
  // const bId = forceExampleLast(b[1].id)
  // console.log('=================================')
  // console.log(JSON.stringify(a, undefined, 2))
  // return aId.localeCompare(bId, { numeric: true })
}

// /** Force example stories to sort last */
// function forceExampleLast(id) {
//   return (id.startsWith('example-') ? '' : '_') + id
// }
