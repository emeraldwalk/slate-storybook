import { Editor, Element, Text } from 'slate'
import {
  ApiFunction,
  Arg,
  EditorArg,
  ObjectArg,
} from '../../components/ApiControls/model'
import { not } from '../../util/callbacks'

import json from '../specs/editor.json'

interface ApiRaw {
  name: string
  methods: MethodRaw[]
}

interface MethodRaw {
  name: string
  args: ArgRaw[]
  documentation: string[]
  returnValue: {
    type: string
    comment: string
  }
  typeParameters: string[]
}

type ArgRaw =
  | {
      isOptional: boolean
      name: string
      type: string
      comment?: string
    }
  | {
      isOptional: boolean
      name: string
      args: ArgRaw[]
      comment?: string
    }

const typeMap: Record<string, Arg['argType']> = {
  Editor: 'editor',
  Location: 'path',
  Path: 'path',
  Point: 'point',
  'Range | Path | Point': 'path',
  'Range | Path | Point | Span': 'path',
  'NodeMatch<T>': 'function',
  '((node: Node) => boolean) | ((node: Node) => node is T)': 'function',
  '((node: Node) => boolean) | ((node: Node) => node is T_1)': 'function',
  '((node: Node) => boolean) | ((node: Node) => node is T_2)': 'function',
  '((node: Node) => boolean) | ((node: Node) => node is T_3)': 'function',
  '((node: Node) => boolean) | ((node: Node) => node is T_4)': 'function',
  Element: 'node',
  Node: 'node',
  boolean: 'boolean',
  number: 'number',
  string: 'string',
  any: 'string',
}

const nodePredicateOptions = [
  ['Editor.isEditor', Editor.isEditor],
  ['Element.isElement', Element.isElement],
  ['Text.isText', Text.isText],
  ['not(Editor.isEditor)', not(Editor.isEditor)],
  ['not(Element.isElement)', not(Element.isElement)],
  ['not(Text.isText)', not(Text.isText)],
] as [string, Function][]

/**
 * Parse raw arg to an arg
 */
function parseArg(argRaw: ArgRaw): EditorArg | Arg | ObjectArg {
  let arg: EditorArg | Arg | ObjectArg

  if ('args' in argRaw) {
    arg = {
      name: argRaw.name,
      argType: 'object',
      isOptional: argRaw.isOptional,
      args: argRaw.args.map(parseArg) as Arg[],
    }
  } else {
    let argType = typeMap[argRaw.type]

    if (argType == null && argRaw.type.match(/" | "/)) {
      argType = 'stringLiteral'
    }

    if (argType == null) {
      throw new Error(`Unmapped '${argRaw.type}'`)
    }

    const options = (argType === 'function'
      ? nodePredicateOptions
      : argType === 'stringLiteral'
      ? argRaw.type.replace(/[ "]/g, '').split('|')
      : []) as any

    arg = {
      name: argRaw.name,
      comment: argRaw.comment ?? '',
      type: argRaw.type,
      argType,
      isOptional: argRaw.isOptional,
      options,
    }
  }

  return arg
}

export function loadEditorApi(): Record<keyof typeof Editor, ApiFunction> {
  return loadApi(Editor, json as ApiRaw)
}

function loadApi<TApi>(api: TApi, json: ApiRaw): Record<string, ApiFunction> {
  const result: Record<string, ApiFunction> = {}

  for (const method of json.methods) {
    try {
      const args: (EditorArg | Arg | ObjectArg)[] = []

      for (const argRaw of method.args) {
        args.push(parseArg(argRaw))
      }

      result[method.name] = {
        fn: (api[method.name as keyof TApi] as unknown) as Function,
        name: method.name,
        description: method.documentation,
        generics: method.typeParameters?.join(', '),
        returnValue: {
          type: method.returnValue.type,
          comment: method.returnValue.comment ?? '',
        },
        args,
      }
    } catch (err) {
      console.log(method.name, ':', String(err).replace('Error: ', ''))
    }
  }

  return result
}

export const editorApiFunctions = loadEditorApi()

export const editorApiFunctions2: Record<string, ApiFunction> = {
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
            argType: 'stringLiteral',
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
  addMark: {
    fn: Editor.addMark,
    name: 'addMark',
    description: [
      'Add a custom property to the leaf text nodes in the current selection.',
      '',
      'If the selection is currently collapsed, the marks will be added to the',
      '`editor.marks` property instead, and applied when text is inserted next.',
    ],
    returnValue: {
      type: 'void',
      comment: '',
    },
    args: [
      {
        argType: 'editor',
        name: 'editor',
        type: 'Editor',
        comment: 'Editor instance that will receive the mark',
      },
      {
        argType: 'stringLiteral',
        name: 'key',
        type: 'string',
        comment: 'Property key that will be added to the matching leaf nodes',
        options: ['bold', 'italic'],
      },
      {
        argType: 'boolean',
        name: 'value',
        type: 'any',
        comment: '',
        options: [true, false],
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
            argType: 'stringLiteral',
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
  path: {
    fn: Editor.path,
    name: 'path',
    description: 'Get the path of a location.',
    returnValue: {
      type: 'Path',
      comment: 'The path matching the given criteria',
    },
    args: [
      {
        argType: 'editor',
        name: 'editor',
        type: 'Editor',
        comment: 'Editor containing the location to check',
      },
      {
        argType: 'path',
        name: 'at',
        type: 'Location',
        comment: 'Location to check',
      },
      {
        argType: 'object',
        name: 'options',
        isOptional: false,
        args: [
          {
            argType: 'number',
            name: 'depth',
            type: 'number',
            isOptional: true,
            comment: 'Max path depth to search',
          },
          {
            argType: 'stringLiteral',
            name: 'edge',
            type: 'string',
            isOptional: true,
            comment: [
              'Return the Path to the start or end leaf node for the',
              'tree determined by the `at` and `options.depth` args',
            ],
            options: ['start', 'end'],
          },
        ],
      },
    ],
  },
  removeMark: {
    fn: Editor.removeMark,
    name: 'removeMark',
    description: [
      'Remove a custom property from all of the leaf text nodes in the current',
      'selection.',
      '',
      'If the selection is currently collapsed, the removal will be stored on',
      '`editor.marks` and applied to the text inserted next.',
    ],
    returnValue: {
      type: 'void',
      comment: '',
    },
    args: [
      {
        argType: 'editor',
        name: 'editor',
        type: 'Editor',
        comment: 'Editor instance that will have the mark removed',
      },
      {
        argType: 'stringLiteral',
        name: 'key',
        type: 'string',
        comment: 'Property key that will be removed',
        options: ['bold', 'italic'],
      },
    ],
  },
}
