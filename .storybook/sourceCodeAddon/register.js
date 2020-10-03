import React from 'react'
import { addons, types } from '@storybook/addons'
import { useParameter } from '@storybook/api'
import { AddonPanel } from '@storybook/components'

const ADDON_ID = 'sourceCodeAddon'
const PANEL_ID = `${ADDON_ID}/panel`

/**
 * @param props {{ channel: import('@storybook/channels').Channel}}
 */
const SourceCodePanel = ({ channel }) => {
  const param = useParameter(ADDON_ID) || {}
  const [sourceCode, setSourceCode] = React.useState('')

  React.useEffect(() => {
    channel.on('sourceCode', setSourceCode)
  })

  return <pre>{sourceCode[param.sourcePath]}</pre>
}

addons.register(ADDON_ID, (api) => {
  const channel = addons.getChannel()

  fetch('./sourceCode.json')
    .then((response) => response.json())
    .then((data) => channel.emit('sourceCode', data))

  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Source Code',
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <SourceCodePanel channel={channel} />
      </AddonPanel>
    ),
  })
})
