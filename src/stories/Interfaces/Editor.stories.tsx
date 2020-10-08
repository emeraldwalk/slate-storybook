import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Node } from 'slate'
import { Above, AboveProps } from './EditorAbove'
import { NodeSpec, SlateContext } from '../util'

export default {
  title: 'Interfaces/Editor',
  component: Above,
  decorators: [
    (Story) => (
      <SlateContext initialValue={emptyValue}>
        <Story />
        <NodeSpec />
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
    type: 'paragraph',
    children: [{ text: 'Aaa aaa aaa.' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Bbb bbb bbb.' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Ccc ccc ccc.' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Ddd ddd ddd.' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Eee eee eee.' }],
  },
]
