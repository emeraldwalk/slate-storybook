import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Editor, Element, Text } from 'slate'
import { ApiControls, ApiControlsProps } from '../../components'
import { not } from '../../util/callbacks'
import { NodeSpecContextDecorator } from '../util'
import { mockParagraphsAndList } from '../util/mockData'

export default {
  title: 'Components/ApiControls',
  component: ApiControls,
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

const Template: Story<ApiControlsProps> = (args) => <ApiControls {...args} />

export const ApiControlsDefault = Template.bind({})
ApiControlsDefault.parameters = {
  initialSlateValue: mockParagraphsAndList,
}
ApiControlsDefault.args = {
  apiFunction: {
    fn: Editor.nodes,
    name: 'nodes',
    commentBlock: `/**
 * Iterate through all of the nodes in the Editor.
 *
 * @param editor Editor containing the nodes to iterate
 * @param options.at Location to constrain the list of nodes to. Defaults to editor.selection
 * @param options.match Predicate function to filter the list of yielded nodes
 * @param options.mode
 * @param options.universal
 * @param options.reverse
 * @param options.voids
 */`,
    generics: '<T extends Node>',
    isGenerator: true,
    returnType: 'Generator<NodeEntry<T>, void, undefined>',
    args: [
      {
        argType: 'editor',
        name: 'editor',
        isOptional: false,
      },
      {
        argType: 'object',
        name: 'options',
        isOptional: true,
        args: [
          {
            argType: 'path',
            name: 'at',
            type: 'Location | Span',
            isOptional: true,
          },
          {
            argType: 'function',
            name: 'match',
            type: 'NodeMatch<T>',
            isOptional: true,
            options: [
              ['Editor.isEditor', Editor.isEditor],
              ['Element.isElement', Element.isElement],
              ['Text.isText', Text.isText],
              ['not(Editor.isEditor)', not(Editor.isEditor)],
              ['not(Element.isElement)', not(Element.isElement)],
              ['not(Text.isText)', not(Text.isText)],
            ],
          },
          {
            argType: 'string',
            name: 'mode',
            type: `'all' | 'highest' | 'lowest'`,
            isOptional: true,
            options: ['all', 'highest', 'lowest'],
          },
          {
            argType: 'boolean',
            name: 'universal',
            type: 'boolean',
            isOptional: true,
            options: [true, false],
          },
          {
            argType: 'boolean',
            name: 'reverse',
            type: 'boolean',
            isOptional: true,
            options: [true, false],
          },
          {
            argType: 'boolean',
            name: 'voids',
            type: 'boolean',
            isOptional: true,
            options: [true, false],
          },
        ],
      },
    ],
  },
}
