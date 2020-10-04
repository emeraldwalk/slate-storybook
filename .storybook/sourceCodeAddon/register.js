import { addons } from '@storybook/addons'
import { registerTab } from './SourceCodePanel'

export const addonId = 'sourceCodeAddon'

addons.register(addonId, registerTab(addonId))
