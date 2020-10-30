import React from 'react'
import { Story, Meta } from '@storybook/react'
import { NodeSelector, NodeSelectorProps } from '../../components'
import { SlateContextDecorator } from '../util'
import { mockParagraphsAndList } from '../util/mockData'
import { Path, Point } from 'slate'

export default {
  title: 'Storybook/Components/NodeSelector',
  component: NodeSelector,
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

const Template: Story<NodeSelectorProps<'path' | 'point'>> = (args) => {
  const [value, setValue] = React.useState<Path | Point | undefined>(undefined)
  return <NodeSelector {...args} value={value} onChange={setValue} />
}

export const PathSelector = Template.bind({})
PathSelector.args = {
  mode: 'path',
}
PathSelector.parameters = {
  initialSlateValue: mockParagraphsAndList,
}

export const PointSelector = Template.bind({})
PointSelector.args = {
  mode: 'point',
}
PointSelector.parameters = {
  initialSlateValue: mockParagraphsAndList,
}
