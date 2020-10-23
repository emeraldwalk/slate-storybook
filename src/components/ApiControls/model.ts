import React from 'react'
import { Editor, Path } from 'slate'
import { useSlate } from 'slate-react'

export interface ArgBase {
  name: string
  isOptional?: boolean
  type: string
  comment: string
}

export interface EditorArg extends ArgBase {
  argType: 'editor'
}

export interface PathArg extends ArgBase {
  argType: 'path'
}

export interface StringArg extends ArgBase {
  argType: 'string'
  options: string[]
}

export interface BooleanArg extends ArgBase {
  argType: 'boolean'
  options: boolean[]
}

export interface FunctionArg extends ArgBase {
  argType: 'function'
  options: [string, Function][]
}

export type ObjectArg = {
  argType: 'object'
  name: string
  isOptional: boolean
  args: Arg[]
}

export type Arg = PathArg | StringArg | BooleanArg | FunctionArg

export type ArgValue<TArg extends Arg> = {
  editor: Editor
  path: Path
  string: string
  boolean: boolean
  function: [string, Function]
}[TArg['argType']]

// export type ArgValue = string | boolean | Function | Path | undefined
export type ObjectArgValues = Record<string, ArgValue<Arg>>

export interface ApiFunction {
  fn: Function
  name: string
  commentBlock: string
  generics?: React.ReactNode
  isGenerator?: boolean
  args: (EditorArg | Arg | ObjectArg)[]
  returnType: React.ReactNode
}

export function useArgValues(args: (EditorArg | Arg | ObjectArg)[]) {
  const editor = useSlate()

  const [values, setValues] = React.useState<
    (ArgValue<Arg> | ObjectArgValues | undefined)[]
  >(() => {
    return args.map((arg) => {
      if (arg.argType === 'editor') {
        return editor
      }

      if (arg.argType === 'object') {
        return {}
      }

      return undefined
    })
  })

  return [values, setValues] as const
}

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
