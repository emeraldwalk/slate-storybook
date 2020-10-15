import { addons } from '@storybook/addons'
import { registerPanel } from './SlateControlsPanel'

export const addonId = 'slateControlsAddon'

addons.register(addonId, registerPanel(addonId))
