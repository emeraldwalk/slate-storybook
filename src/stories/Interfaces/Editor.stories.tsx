import React from 'react'
import { Story, Meta } from '@storybook/react'
import EditorNodes, { EditorNodesProps } from './EditorNodes'
import { NodeSpecContextDecorator } from '../util'
import { renderElement, renderLeaf } from './render'
import { ApiView, ApiViewProps } from '../../components'
import { editorApiFunctions } from '../util/api'

export default {
  title: 'Interfaces/Editor',
  decorators: [
    (Story, context) => {
      return (
        <NodeSpecContextDecorator
          story={Story}
          initialSlateValue={context.parameters.initialSlateValue}
        />
      )
    },
  ],
} as Meta

const EditorInterfaceTemplate: Story<ApiViewProps> = (args) => (
  <ApiView {...args} />
)

export const editor = EditorInterfaceTemplate.bind({})
editor.args = {
  renderElement,
  renderLeaf,
  apiFunctions: editorApiFunctions,
}
editor.parameters = {
  initialSlateValue: initialSlateValue(),
  actions: {
    disable: true,
  },
  controls: {
    disable: true,
  },
  previewTabs: {
    'storybook/docs/panel': {
      hidden: true,
    },
    'sourceCodeAddon/panel': {
      hidden: true,
    },
  },
}

/** Editor.nodes */

const NodesTemplate: Story<EditorNodesProps> = (args) => (
  <EditorNodes {...args} />
)

export const nodes = NodesTemplate.bind({})
nodes.storyName = 'nodes()'
nodes.args = {
  renderElement,
  renderLeaf,
}
nodes.parameters = {
  actions: {
    disable: true,
  },
  controls: {
    disable: true,
  },
  previewTabs: {
    'storybook/docs/panel': {
      hidden: true,
    },
    'sourceCodeAddon/panel': {
      hidden: true,
    },
  },
  initialSlateValue: initialSlateValue(),
}

function initialSlateValue() {
  return [
    {
      type: 'paragraph',
      children: [
        {
          text:
            "This sandbox is designed to allow interaction with some of Slate's APIs. There are 3 primary panels.",
        },
      ],
    },
    {
      type: 'ordered-list',
      children: [
        {
          type: 'list-item',
          children: [
            {
              text: 'Editor',
              bold: true,
            },
            {
              text:
                '- by default this contains the instructions you are currently reading, but you can modify the content as well.',
            },
          ],
        },
        {
          type: 'list-item',
          children: [
            {
              text: 'Data Model',
              bold: true,
            },
            {
              text:
                '- this panel shows the paths + nodes in the data model for the current editor. The current selection is represented by a green and red vertical pipe representing the anchor and focus points respectively (try changing the content or the selection to see how it impacts the nodes).',
            },
          ],
        },
        {
          type: 'list-item',
          children: [
            {
              text: 'API',
              bold: true,
            },
            {
              text:
                '- this panel contains controls to provide values to API methods. The result of the method call will be shown in the Data Model panel.',
            },
          ],
        },
      ],
    },
  ]
}
