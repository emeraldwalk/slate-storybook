import React from 'react'
import { Story, Meta } from '@storybook/react'
// import EditorWithSpellcheck, {
//   EditorWithSpellcheckProps,
// } from './EditorWithSpellcheck'
import EditorWithDecorations, {
  EditorWithDecorationsProps,
} from './EditorWithDecorations'

const meta: Meta = {
  title: 'Slate/Concepts',
  component: EditorWithDecorations,
  argTypes: {
    initialValue: { control: 'object' },
  },
}

export default meta

/** Templates */

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

export const Decorations = DecorationsTemplate.bind({})
Decorations.args = {
  initialValue: emptyValue(),
}
Decorations.parameters = {
  actions: {
    disable: true,
  },
  // docs: {
  //   page: null,
  // },
  previewTabs: {
    'storybook/docs/panel': {
      hidden: true,
    },
  },
  sourceCodeAddon: {
    sourcePath: '/stories/Editor/EditorWithDecorations.tsx',
  },
}

// export const CustomSpellcheck = SpellcheckTemplate.bind({})
// CustomSpellcheck.args = {
//   initialValue: emptyValue(),
// }
