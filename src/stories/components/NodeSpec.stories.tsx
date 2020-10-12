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
  parameters: {
    initialSlateValue: mockParagraphsAndList,
  },
} as Meta

const Template: Story<NodeSpecProps> = (args) => <NodeSpec {...args} />

export const NodeSpecPath = Template.bind({})
NodeSpecPath.args = {
  mode: 'path',
  highlightLocations: [
    {
      anchor: {
        path: [0, 0],
        offset: 5,
      },
      focus: {
        path: [3, 2, 0],
        offset: 2,
      },
    },
    [1, 0],
    [5],
  ],
}

export const NodeSpecPoint = Template.bind({})
NodeSpecPoint.args = {
  mode: 'point',
}
