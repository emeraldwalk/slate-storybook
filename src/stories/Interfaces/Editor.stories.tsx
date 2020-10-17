import React from 'react'
import { Story, Meta } from '@storybook/react'
// import Above, { AboveProps } from './EditorAbove'
import EditorNodes, { EditorNodesProps } from './EditorNodes'
import { RenderElementProps, RenderLeafProps } from 'slate-react'
import { NodeSpecContextDecorator } from '../util'

export default {
  title: 'Interfaces/Editor',
  // component: Above,
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

/** Editor.above */

// const AboveTemplate: Story<AboveProps> = (args) => <Above {...args} />

// export const above = AboveTemplate.bind({})
// above.storyName = 'above()'
// above.argTypes = {
//   at: {
//     control: {
//       type: 'select',
//       options: ['Range ([0, 0])', 'Path', 'Point'],
//     },
//   },
// }

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
  initialSlateValue: [
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
  ],
}

function renderElement({ element, attributes, children }: RenderElementProps) {
  let E = 'p'

  switch (element.type) {
    case 'unordered-list':
      E = 'ul'
      break

    case 'ordered-list':
      E = 'ol'
      break

    case 'list-item':
      E = 'li'
      break
  }

  return <E {...attributes}>{children}</E>
}

function renderLeaf({ leaf, attributes, children }: RenderLeafProps) {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }
  return <span {...attributes}>{children}</span>
}
