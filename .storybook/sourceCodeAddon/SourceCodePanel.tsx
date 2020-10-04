import React from 'react'
import { useParameter } from '@storybook/api'
import { addons, types } from '@storybook/addons'
import { AddonPanel } from '@storybook/components'
import { Channel } from '@storybook/channels'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { prism as style } from 'react-syntax-highlighter/dist/esm/styles/prism'

export interface SourceCodePanelProps {
  addOnId: string
  channel: Channel
}

const SourceCodePanel: React.FC<SourceCodePanelProps> = ({
  addOnId,
  channel,
}) => {
  const param = useParameter<{ sourcePath?: string }>(addOnId) || {}
  const [sourceCode, setSourceCode] = React.useState('')

  React.useEffect(() => {
    channel.on('sourceCode', setSourceCode)
  })

  return (
    <SyntaxHighlighter language="tsx" style={style}>
      {sourceCode[param.sourcePath] ?? ''}
    </SyntaxHighlighter>
  )
}

export default SourceCodePanel

async function fetchSourceCode(channel: Channel) {
  const response = await fetch('./sourceCode.json')
  const data = await response.json()
  channel.emit('sourceCode', data)
}

export function registerPanel(addOnId: string) {
  return () => {
    const panelId = `${addOnId}/panel`
    const channel = addons.getChannel()

    fetchSourceCode(channel)

    addons.add(panelId, {
      type: types.PANEL,
      title: 'Source',
      render: ({ active, key }) => (
        <AddonPanel active={active} key={key}>
          <SourceCodePanel addOnId={addOnId} channel={channel} />
        </AddonPanel>
      ),
    })
  }
}

export function registerTab(addOnId: string) {
  return () => {
    const panelId = `${addOnId}/panel`
    const channel = addons.getChannel()

    fetchSourceCode(channel)

    addons.add(panelId, {
      type: types.TAB,
      title: 'Source',
      route: ({ storyId }) => `/sourceCode/${storyId}`,
      match: ({ viewMode }) => viewMode === 'sourceCode',
      render: () => <SourceCodePanel addOnId={addOnId} channel={channel} />,
    })
  }
}
