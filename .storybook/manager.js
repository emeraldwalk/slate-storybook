import { addons } from '@storybook/addons'
import theme from '../src/theme'

// NOTE: this will set the theme for Storybook, but it doesn't propagate into
// custom components for some reason, so it is also provided via a ThemeProvider
// in preview.js
addons.setConfig({
  theme,
})
