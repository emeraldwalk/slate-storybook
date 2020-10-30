import React from 'react'
import { Story, Meta } from '@storybook/react'
import Sandbox, { SandboxProps } from './Sandbox'
import { NodeSpecContextDecorator } from '../util'
import { mockParagraphsAndList } from '../util/mockData'
import { renderElement, renderLeaf } from './render'

export default {
  title: 'Interfaces/Sandbox',
  component: Sandbox,
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

const Template: Story<SandboxProps> = (args) => <Sandbox {...args} />

export const SandboxDefault = Template.bind({})
SandboxDefault.args = {
  renderElement,
  renderLeaf,
}
SandboxDefault.parameters = {
  initialSlateValue: mockParagraphsAndList,
}
