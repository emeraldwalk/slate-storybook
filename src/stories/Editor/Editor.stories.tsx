import React from 'react'
import { Story, Meta } from '@storybook/react'
// import { EditorProps } from '../../components/Editor/Editor'
import EditorWithSpellcheck, {
  EditorWithSpellcheckProps,
} from './EditorWithSpellcheck'
import EditorWithDecorations, {
  EditorWithDecorationsProps,
} from './EditorWithDecorations'
import EditorVirtualScrolling, {
  EditorVirtualScrollingProps,
} from './EditorVirtualScrolling'

const meta: Meta = {
  title: 'Editor',
  component: EditorWithDecorations,
  argTypes: {
    initialValue: { control: 'object' },
  },
}

export default meta

/** Templates */

const SpellcheckTemplate: Story<EditorWithSpellcheckProps> = (args) => (
  <EditorWithSpellcheck {...args} />
)
const DecorationsTemplate: Story<EditorWithDecorationsProps> = (args) => (
  <EditorWithDecorations {...args} />
)
const VirtualScrollingTemplate: Story<EditorVirtualScrollingProps> = (args) => (
  <EditorVirtualScrolling {...args} />
)

const emptyValue = () => [
  {
    children: [{ text: '' }],
  },
]

export const Decorations = DecorationsTemplate.bind({})
Decorations.args = {
  initialValue: emptyValue(),
}

export const CustomSpellcheck = SpellcheckTemplate.bind({})
CustomSpellcheck.args = {
  initialValue: emptyValue(),
}

export const VirtualScrolling = VirtualScrollingTemplate.bind({})
VirtualScrolling.args = {
  initialValue: emptyValue(),
}
