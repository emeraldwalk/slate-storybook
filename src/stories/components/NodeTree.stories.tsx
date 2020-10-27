import React from 'react'
import { Story, Meta } from '@storybook/react'
import { NodeTree, NodeTreeProps } from '../../components'
import { mockParagraphsAndList } from '../util/mockData'
import { SlateContextDecorator } from '../util'
import { useSlate } from 'slate-react'

export default {
  title: 'Components/NodeTree',
  component: NodeTree,
  decorators: [
    (Story, context) => {
      return (
        <SlateContextDecorator
          story={Story}
          initialSlateValue={context.parameters.initialSlateValue}
        />
      )
    },
  ],
  parameters: {
    initialSlateValue: mockParagraphsAndList,
  },
} as Meta

const Template: Story<NodeTreeProps> = (args) => {
  const editor = useSlate()
  return <NodeTree {...args} node={editor} />
}

export const NodeTreeDefault = Template.bind({})
