import { Editor, Element, Text } from 'slate'
import { ApiFunction } from '../../components/ApiControls/model'
import { not } from '../../util/callbacks'

export const editorApiFunctions: Record<string, ApiFunction> = {
  above: {
    fn: Editor.above,
    name: 'above',
    commentBlock: '',
    generics: '<T extends Ancestor>',
    returnType: 'NodeEntry<T> | undefined',
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
        type: 'Editor',
        isOptional: false,
        comment: '',
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
            comment: '',
          },
          {
            argType: 'function',
            name: 'match',
            type: 'NodeMatch<T>',
            isOptional: true,
            comment: '',
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
            comment: '',
            options: ['all', 'highest', 'lowest'],
          },
          {
            argType: 'boolean',
            name: 'universal',
            type: 'boolean',
            isOptional: true,
            comment: '',
            options: [true, false],
          },
          {
            argType: 'boolean',
            name: 'reverse',
            type: 'boolean',
            isOptional: true,
            comment: '',
            options: [true, false],
          },
          {
            argType: 'boolean',
            name: 'voids',
            type: 'boolean',
            isOptional: true,
            comment: '',
            options: [true, false],
          },
        ],
      },
    ],
  },
}
