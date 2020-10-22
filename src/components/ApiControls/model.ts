import { Editor, Path } from 'slate'

export interface EditorArg {
  argType: 'editor'
  name: string
  isOptional?: boolean
}

export interface PathArg {
  argType: 'path'
  name: string
  type: string
  isOptional: boolean
  value?: Path
}

export interface StringArg {
  argType: 'string'
  name: string
  type: string
  isOptional: boolean
  options: string[]
  value?: string
}

export interface BooleanArg {
  argType: 'boolean'
  name: string
  type: string
  isOptional: boolean
  options: boolean[]
  value?: boolean
}

export interface FunctionArg {
  argType: 'function'
  name: string
  type: string
  isOptional: boolean
  options: [string, Function][]
  value?: [string, Function]
}

export type ObjectArg = {
  argType: 'object'
  name: string
  isOptional: boolean
  args: Arg[]
}

export type Arg = PathArg | StringArg | BooleanArg | FunctionArg

export type ArgValueT<TArg extends Arg> = {
  editor: Editor
  path: Path
  string: string
  boolean: boolean
  function: [string, Function]
}[TArg['argType']]

export type ArgValue = string | boolean | Function | Path | undefined
export type ObjectArgValues = Record<string, ArgValue>

export function isStringArg(arg: Arg): arg is StringArg {
  return arg.argType === 'string'
}

export function isBooleanArg(arg: Arg): arg is BooleanArg {
  return arg.argType === 'boolean'
}

export function isFunctionArg(arg: Arg): arg is FunctionArg {
  return arg.argType === 'function'
}

export function isPathArg(arg: Arg): arg is PathArg {
  return arg.argType === 'path'
}

export function isObjectArg(arg: Arg | ObjectArg): arg is ObjectArg {
  return arg.argType === 'object'
}
