import { addons } from '@storybook/addons'
import { registerPanel } from './SourceCodePanel'

export const addonId = 'sourceCodeAddon'

addons.register(addonId, registerPanel(addonId))
