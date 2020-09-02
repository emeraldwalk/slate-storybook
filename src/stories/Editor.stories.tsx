import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Editor } from '../components'
import { EditorProps } from '../components/Editor/Editor'

const meta: Meta = {
  title: 'Example/Editor',
  component: Editor,
}

export default meta

const Template: Story<EditorProps> = (args) => <Editor {...args} />

export const Empty = Template.bind({})
Empty.args = {
  initialValue: [{
    children: [
      { text: '' }
    ]
  }]
}