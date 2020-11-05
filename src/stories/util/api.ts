import { Editor, Element, Path, Text } from 'slate'
import {
  ApiFunction,
  Arg,
  EditorArg,
  ObjectArg,
} from '../../components/ApiControls/model'
import { not } from '../../util/callbacks'

import editorJson from '../specs/editor.json'
import pathJson from '../specs/path.json'

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
      : argType === 'boolean'
      ? [true, false]
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
  return loadApi(Editor, editorJson as ApiRaw)
}

export function loadPathApi(): Record<keyof typeof Path, ApiFunction> {
  return loadApi(Path, pathJson as ApiRaw)
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
        generics: `<${method.typeParameters?.join(', ')}>`,
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
export const pathApiFunctions = loadPathApi()
