import React from 'react'
import { Editor, Node, Path, Point } from 'slate'
import { useSlate } from 'slate-react'

export interface ArgBase {
  name: string
  isOptional?: boolean
  type: string
  comment: string | string[]
}

export interface EditorArg extends ArgBase {
  argType: 'editor'
}

export interface PathArg extends ArgBase {
  argType: 'path'
}

export interface PointArg extends ArgBase {
  argType: 'point'
}

export interface NodeArg extends ArgBase {
  argType: 'node'
}

export interface NumberArg extends ArgBase {
  argType: 'number'
}

export interface StringArg extends ArgBase {
  argType: 'string'
}

export interface StringLiteralArg extends ArgBase {
  argType: 'stringLiteral'
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

export type Arg =
  | NumberArg
  | PathArg
  | PointArg
  | NodeArg
  | StringArg
  | StringLiteralArg
  | BooleanArg
  | FunctionArg
  | EditorArg

export type ArgValue<TArg extends Arg> = {
  editor: Editor
  number: number
  string: string
  path: Path
  point: Point
  node: Node
  stringLiteral: string
  boolean: boolean
  function: [string, Function]
}[TArg['argType']]

// export type ArgValue = string | boolean | Function | Path | undefined
export type ObjectArgValues = Record<string, ArgValue<Arg>>

export interface ApiFunction {
  fn: Function
  name: string
  description: string | string[]
  generics?: React.ReactNode
  isGenerator?: boolean
  args: (EditorArg | Arg | ObjectArg)[]
  returnValue: {
    type: React.ReactNode
    comment: string
    yieldsComment: string
  }
}

export function useArgValues(args: (EditorArg | Arg | ObjectArg)[]) {
  const editor = useSlate()

  const initValues = React.useCallback(
    (args: (EditorArg | Arg | ObjectArg)[]) => {
      return args.map((arg) => {
        if (arg.argType === 'editor') {
          return editor
        }

        if (arg.argType === 'object') {
          return {}
        }

        return undefined
      })
    },
    [editor]
  )

  const [values, setValues] = React.useState<
    (ArgValue<Arg> | ObjectArgValues | undefined)[]
  >(() => {
    return initValues(args)
  })

  const resetValues = React.useCallback(
    (args: (EditorArg | Arg | ObjectArg)[]) => {
      setValues(initValues(args))
    },
    [initValues]
  )

  return { values, setValues, resetValues } as const
}

export function isNumberArg(arg: Arg): arg is NumberArg {
  return arg.argType === 'number'
}

export function isStringArg(arg: Arg): arg is StringArg {
  return arg.argType === 'string'
}

export function isStringLiteralArg(arg: Arg): arg is StringLiteralArg {
  return arg.argType === 'stringLiteral'
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

export function isPointArg(arg: Arg): arg is PointArg {
  return arg.argType === 'point'
}

export function isNodeArg(arg: Arg): arg is NodeArg {
  return arg.argType === 'node'
}

export function isObjectArg(arg: Arg | ObjectArg): arg is ObjectArg {
  return arg.argType === 'object'
}
