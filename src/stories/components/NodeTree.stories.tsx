import React from 'react'
import { Story, Meta } from '@storybook/react'
import { NodeTree, NodeTreeProps } from '../../components'
import { mockParagraphsAndList } from '../util/mockData'
import { NodeSpecContextDecorator } from '../util'
import { useSlate } from 'slate-react'

export default {
  title: 'Storybook/Components/NodeTree',
  component: NodeTree,
  decorators: [
    (Story, context) => {
      return (
        <NodeSpecContextDecorator
          story={Story}
          initialSlateValue={context.parameters.initialSlateValue}
          initialHighlightLocations={[
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
          ]}
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
