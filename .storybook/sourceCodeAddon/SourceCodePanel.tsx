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
    <SyntaxHighlighter
      customStyle={{ fontSize: 16 }}
      language="tsx"
      style={style}
    >
      {sourceCode[param.sourcePath] ?? ''}
    </SyntaxHighlighter>
  )
}

export default SourceCodePanel

export function registerPanel(addOnId: string) {
  const panelId = `${addOnId}/panel`

  return () => {
    const channel = addons.getChannel()

    fetch('./sourceCode.json')
      .then((response) => response.json())
      .then((data) => channel.emit('sourceCode', data))

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
