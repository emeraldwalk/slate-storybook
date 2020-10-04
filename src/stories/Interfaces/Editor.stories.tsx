import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Node } from 'slate'
import { Above, AboveProps } from './EditorAbove'
import { SlateContext } from '../util'

export default {
  title: 'Interfaces/Editor',
  component: Above,
  decorators: [
    (Story) => (
      <SlateContext initialValue={emptyValue}>
        <Story />
      </SlateContext>
    ),
  ],
} as Meta

const Template: Story<AboveProps> = (args) => <Above {...args} />

export const above = Template.bind({})
above.storyName = 'above()'
above.argTypes = {
  at: {
    control: {
      type: 'select',
      options: ['Range ([0, 0])', 'Path', 'Point'],
    },
  },
}

const emptyValue = (): Node[] => [
  {
    children: [{ text: '' }],
  },
]
