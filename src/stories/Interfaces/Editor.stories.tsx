import React from 'react'
import { Story, Meta } from '@storybook/react'
import { NodeSpecContextDecorator } from '../util'
import { renderElement, renderLeaf } from './render'
import { ApiView, ApiViewProps } from '../../components'
import { editorApiFunctions } from '../util/api'
import { ApiFunction } from '../../components/ApiControls/model'

export default {
  title: 'Interfaces/Editor',
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

const EditorInterfaceTemplate: Story<ApiViewProps> = (args) => (
  <ApiView {...args} />
)

export const above = createStory(editorApiFunctions.above)
export const addMark = createStory(editorApiFunctions.addMark)
export const nodes = createStory(editorApiFunctions.nodes)
export const removeMark = createStory(editorApiFunctions.removeMark)

function createStory(apiFunction: ApiFunction) {
  const story = EditorInterfaceTemplate.bind({})
  story.storyName = apiFunction.name
  story.args = {
    title: `Editor.${apiFunction.name}`,
    renderElement,
    renderLeaf,
    apiFunction,
  }
  story.parameters = {
    initialSlateValue: initialSlateValue(),
    actions: {
      disable: true,
    },
    controls: {
      disable: true,
    },
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
      'sourceCodeAddon/panel': {
        hidden: true,
      },
    },
  }

  return story
}

function initialSlateValue() {
  return [
    {
      type: 'paragraph',
      children: [
        {
          text:
            "This sandbox is designed to allow interaction with some of Slate's APIs. There are 4 primary panels. The Editor instance tied to this Editable will be passed to any API methods that accept and Editor argument.",
        },
      ],
    },
    {
      type: 'ordered-list',
      children: [
        {
          type: 'list-item',
          children: [
            {
              text: 'Editor',
              bold: true,
            },
            {
              text:
                ' - by default this contains the instructions you are currently reading, but you can modify the content as well.',
            },
          ],
        },
        {
          type: 'list-item',
          children: [
            {
              text: 'API',
              bold: true,
            },
            {
              text:
                ' - this panel contains controls to provide values to API methods. The result of the method call will be shown in the Results panel and in some cases will be applied to the Data Model panel.',
            },
          ],
        },
        {
          type: 'list-item',
          children: [
            {
              text: 'Results',
              bold: true,
            },
            {
              text: ' - contains the results of the last API run.',
            },
          ],
        },
        {
          type: 'list-item',
          children: [
            {
              text: 'Data Model',
              bold: true,
            },
            {
              text:
                ' - this panel shows the paths + nodes in the data model for the current editor. The current selection is represented by a green and red vertical pipe representing the anchor and focus points respectively (try changing the content or the selection to see how it impacts the nodes).',
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          text: 'To test an API method:',
        },
      ],
    },
    {
      type: 'ordered-list',
      children: [
        {
          type: 'list-item',
          children: [
            {
              text: 'Set api parameters.',
            },
          ],
        },
        {
          type: 'list-item',
          children: [
            {
              text: 'Optionally select text in the Editor.',
            },
          ],
        },
        {
          type: 'list-item',
          children: [
            {
              text: 'Click "run" to see the results of the API call.',
            },
          ],
        },
      ],
    },
  ]
}
