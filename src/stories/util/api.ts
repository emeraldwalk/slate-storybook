import { Editor, Element, Text } from 'slate'
import { ApiFunction } from '../../components/ApiControls/model'
import { not } from '../../util/callbacks'

export const editorApiFunctions: Record<string, ApiFunction> = {
  above: {
    fn: Editor.above,
    name: 'above',
    description: [
      'Get the ancestor above a location in the document.',
      '',
      'If the location is a range, it will look for a common ancestor to both',
      'the anchor and focus points.',
    ],
    generics: '<T extends Ancestor>',
    returnValue: {
      type: 'NodeEntry<T> | undefined',
      comment: 'A [Node, Path] tuple for the first matching ancestor',
    },
    args: [
      {
        argType: 'editor',
        name: 'editor',
        type: 'Editor',
        isOptional: false,
        comment: 'Editor instance to search',
      },
      {
        argType: 'object',
        name: 'options',
        isOptional: true,
        args: [
          {
            argType: 'path',
            name: 'at',
            type: 'Location',
            isOptional: true,
            comment: 'Location to start at. Defaults to editor.selection',
          },
          {
            argType: 'function',
            name: 'match',
            type: 'NodeMatch<T>',
            isOptional: true,
            comment: 'Predicate for matching the ancestor to return',
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
            type: `'highest' | 'lowest'`,
            isOptional: true,
            comment:
              'Whether to return highest or lowest ancestor in the node tree. Defaults to lowest',
            options: ['highest', 'lowest'],
          },
          {
            argType: 'boolean',
            name: 'voids',
            type: 'boolean',
            isOptional: true,
            comment: 'Whether or not to include void elements in the result',
            options: [true, false],
          },
        ],
      },
    ],
  },
  nodes: {
    fn: Editor.nodes,
    name: 'nodes',
    description: 'Iterate through all of the nodes in the Editor.',
    generics: '<T extends Node>',
    isGenerator: true,
    returnValue: {
      type: 'Generator<NodeEntry<T>, void, undefined>',
      comment: 'Generator that yields [Node, Path] tuples',
    },
    args: [
      {
        argType: 'editor',
        name: 'editor',
        type: 'Editor',
        isOptional: false,
        comment: 'Editor containing the nodes to iterate',
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
            comment:
              'Location to constrain the list of nodes to. Defaults to editor.selection',
          },
          {
            argType: 'function',
            name: 'match',
            type: 'NodeMatch<T>',
            isOptional: true,
            comment: 'Predicate function to filter the list of yielded nodes',
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
            comment:
              'Further constrains the yielded node set to a single level of the tree',
            options: ['all', 'highest', 'lowest'],
          },
          {
            argType: 'boolean',
            name: 'universal',
            type: 'boolean',
            isOptional: true,
            comment:
              'Setting this to true means that all Text nodes that are included in the at + mode constraints must also satisfy the match constraint',
            options: [true, false],
          },
          {
            argType: 'boolean',
            name: 'reverse',
            type: 'boolean',
            isOptional: true,
            comment:
              'everse the order of nodes yielded across the current level',
            options: [true, false],
          },
          {
            argType: 'boolean',
            name: 'voids',
            type: 'boolean',
            isOptional: true,
            comment: 'Whether or not to include void elements in the result',
            options: [true, false],
          },
        ],
      },
    ],
  },
}
