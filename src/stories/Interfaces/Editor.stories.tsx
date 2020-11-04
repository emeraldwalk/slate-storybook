import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Node } from 'slate'
import { NodeSpecContextDecorator } from '../util'
import { renderElement, renderLeaf } from './render'
import { ApiView, ApiViewProps } from '../../components'
import { editorApiFunctions } from '../util/api'
import { ApiFunction } from '../../components/ApiControls/model'

let persistentValue: Node[] | undefined = undefined

export default {
  title: 'Slate/Interfaces/Editor',
  decorators: [
    (Story, context) => {
      return (
        <NodeSpecContextDecorator
          story={Story}
          initialSlateValue={
            persistentValue ?? context.parameters.initialSlateValue
          }
          onChange={(value) => {
            persistentValue = value
          }}
        />
      )
    },
  ],
} as Meta

const EditorInterfaceTemplate: Story<ApiViewProps> = (args) => (
  <ApiView {...args} />
)

// console.log(
//   Object.keys(editorApiFunctions)
//     .map(
//       (method) =>
//         `export const ${method} = createStory(editorApiFunctions, '${method}')`
//     )
//     .join('\n')
// )

export const above = createStory(editorApiFunctions, 'above')
export const addMark = createStory(editorApiFunctions, 'addMark')
export const after = createStory(editorApiFunctions, 'after')
export const before = createStory(editorApiFunctions, 'before')
export const deleteBackward = createStory(editorApiFunctions, 'deleteBackward')
export const deleteForward = createStory(editorApiFunctions, 'deleteForward')
export const deleteFragment = createStory(editorApiFunctions, 'deleteFragment')
export const edges = createStory(editorApiFunctions, 'edges')
export const end = createStory(editorApiFunctions, 'end')
export const first = createStory(editorApiFunctions, 'first')
export const fragment = createStory(editorApiFunctions, 'fragment')
export const hasBlocks = createStory(editorApiFunctions, 'hasBlocks')
export const hasInlines = createStory(editorApiFunctions, 'hasInlines')
export const hasTexts = createStory(editorApiFunctions, 'hasTexts')
export const insertBreak = createStory(editorApiFunctions, 'insertBreak')
export const insertNode = createStory(editorApiFunctions, 'insertNode')
export const insertText = createStory(editorApiFunctions, 'insertText')
export const isBlock = createStory(editorApiFunctions, 'isBlock')
export const isEditor = createStory(editorApiFunctions, 'isEditor')
export const isEnd = createStory(editorApiFunctions, 'isEnd')
export const isEdge = createStory(editorApiFunctions, 'isEdge')
export const isEmpty = createStory(editorApiFunctions, 'isEmpty')
export const isInline = createStory(editorApiFunctions, 'isInline')
export const isNormalizing = createStory(editorApiFunctions, 'isNormalizing')
export const isStart = createStory(editorApiFunctions, 'isStart')
export const isVoid = createStory(editorApiFunctions, 'isVoid')
export const last = createStory(editorApiFunctions, 'last')
export const leaf = createStory(editorApiFunctions, 'leaf')
export const levels = createStory(editorApiFunctions, 'levels')
export const marks = createStory(editorApiFunctions, 'marks')
export const next = createStory(editorApiFunctions, 'next')
export const node = createStory(editorApiFunctions, 'node')
export const nodes = createStory(editorApiFunctions, 'nodes')
export const normalize = createStory(editorApiFunctions, 'normalize')
export const parent = createStory(editorApiFunctions, 'parent')
export const path = createStory(editorApiFunctions, 'path')
export const pathRef = createStory(editorApiFunctions, 'pathRef')
export const pathRefs = createStory(editorApiFunctions, 'pathRefs')
export const point = createStory(editorApiFunctions, 'point')
export const pointRef = createStory(editorApiFunctions, 'pointRef')
export const pointRefs = createStory(editorApiFunctions, 'pointRefs')
export const positions = createStory(editorApiFunctions, 'positions')
export const previous = createStory(editorApiFunctions, 'previous')
export const range = createStory(editorApiFunctions, 'range')
export const rangeRefs = createStory(editorApiFunctions, 'rangeRefs')
export const removeMark = createStory(editorApiFunctions, 'removeMark')
export const start = createStory(editorApiFunctions, 'start')
export const string = createStory(editorApiFunctions, 'string')
export const voidFn = createStory(editorApiFunctions, 'void')

function createStory<
  TApi extends Record<string, ApiFunction>,
  K extends keyof TApi
>(apiFunctions: TApi, fnName: K) {
  const initialApiFunction = apiFunctions[fnName]!
  const story = EditorInterfaceTemplate.bind({})
  story.storyName = fnName as string
  story.args = {
    title: `Editor.${fnName}`,
    renderElement,
    renderLeaf,
    initialApiFunction,
    apiFunctions,
  }
  story.parameters = {
    initialSlateValue,
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
