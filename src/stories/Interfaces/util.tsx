import React from 'react'
import { Meta, Story } from '@storybook/react'
import { Node } from 'slate'
import { renderElement, renderLeaf } from './render'
import { ApiFunction } from '../../components/ApiControls/model'
import { ApiViewProps } from '../../components'
import { NodeSpecContextDecorator } from '../util'

export function createStoryMeta(interfaceName?: string) {
  return {
    title: interfaceName
      ? `Slate/Interfaces/${interfaceName}`
      : 'Slate/Interfaces',
    decorators: [
      (Story, context) => {
        const [value, setValue] = React.useState<Node[]>(
          context.parameters.initialSlateValue
        )
        return (
          <NodeSpecContextDecorator
            story={Story}
            initialSlateValue={value}
            onChange={(value) => {
              setValue(value)
            }}
          />
        )
      },
    ],
  } as Meta
}

export function createStoryFactory<
  TApi extends Record<string, ApiFunction>,
  K extends keyof TApi
>(storyFn: () => Story<ApiViewProps>, label: string, apiFunctions: TApi) {
  return function createStory(fnName?: K) {
    const story = storyFn()
    story.storyName = (fnName as string) ?? label
    const title = fnName ? `${label}.${fnName}` : label
    if (!fnName) {
      fnName = Object.keys(apiFunctions)[0] as K
    }
    const initialApiFunction = apiFunctions[fnName]!
    story.args = {
      title,
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
}

export function initialSlateValue() {
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
