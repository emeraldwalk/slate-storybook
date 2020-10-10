import React from 'react'
import { Story, Meta } from '@storybook/react'
import Above, { AboveProps } from './EditorAbove'
import EditorNodes, { EditorNodesProps } from './EditorNodes'
import { RenderElementProps } from 'slate-react'
import StoryContextDecorator from '../util/StoryContextDecorator'

export default {
  title: 'Interfaces/Editor',
  component: Above,
  decorators: [(Story) => <StoryContextDecorator story={Story} />],
} as Meta

/** Editor.above */

const AboveTemplate: Story<AboveProps> = (args) => <Above {...args} />

export const above = AboveTemplate.bind({})
above.storyName = 'above()'
above.argTypes = {
  at: {
    control: {
      type: 'select',
      options: ['Range ([0, 0])', 'Path', 'Point'],
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
}
nodes.parameters = {
  actions: {
    disable: true,
  },
  controls: {
    disable: true,
  },
}

function renderElement({ element, attributes, children }: RenderElementProps) {
  let E = 'p'

  switch (element.type) {
    case 'unordered-list':
      E = 'ul'
      break

    case 'list-item':
      E = 'li'
      break
  }

  return <E {...attributes}>{children}</E>
}
