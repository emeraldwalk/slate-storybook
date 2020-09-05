import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Editor } from '../../components'
// import { EditorProps } from '../../components/Editor/Editor'
// import EditorWithSpellcheck, {
//   EditorWithSpellcheckProps,
// } from './EditorWithSpellcheck'
import EditorWithDecorations, {
  EditorWithDecorationsProps,
} from './EditorWithDecorations'

const meta: Meta = {
  title: 'Example/Editor',
  component: Editor,
  argTypes: {
    initialValue: { control: 'object' },
  },
}

export default meta

// const Template: Story<EditorProps> = (args) => <Editor {...args} />
// const SpellcheckTemplate: Story<EditorWithSpellcheckProps> = (args) => (
//   <EditorWithSpellcheck {...args} />
// )
const DecorationsTemplate: Story<EditorWithDecorationsProps> = (args) => (
  <EditorWithDecorations {...args} />
)

const emptyValue = () => [
  {
    children: [{ text: '' }],
  },
]

// export const Empty = Template.bind({})
// Empty.args = {
//   initialValue: emptyValue(),
// }

export const Decorations = DecorationsTemplate.bind({})
Decorations.args = {
  initialValue: emptyValue(),
}

// export const Spellcheck = SpellcheckTemplate.bind({})
// Spellcheck.args = {
//   initialValue: emptyValue(),
// }
