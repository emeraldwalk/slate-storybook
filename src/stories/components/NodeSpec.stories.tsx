import React from 'react'
import { Story, Meta } from '@storybook/react'
import { NodeSpec, NodeSpecProps } from '../../components'
import { SlateContextDecorator } from '../util'
import { mockParagraphsAndList } from '../util/mockData'

export default {
  title: 'Components/NodeSpec',
  component: NodeSpec,
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
} as Meta

const Template: Story<NodeSpecProps> = (args) => <NodeSpec {...args} />

export const NodeSpecDefault = Template.bind({})
NodeSpecDefault.args = {
  selection: {
    anchor: {
      path: [0, 0],
      offset: 5,
    },
    focus: {
      path: [3, 2, 0],
      offset: 2,
    },
  },
}
NodeSpecDefault.parameters = {
  initialSlateValue: mockParagraphsAndList,
}
