/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Editor, Node, Path, Point } from 'slate'
import { useSlate, ReactEditor } from 'slate-react'
import { ArgLabel, Selector } from '..'
import { Theme } from '../../theme'
import NodeSelector from '../NodeSelector/NodeSelector'
import {
  Arg,
  ArgValue,
  isBooleanArg,
  isFunctionArg,
  isNumberArg,
  isNodeArg,
  isPathArg,
  isPointArg,
  isStringArg,
  isStringLiteralArg,
} from './model'

const componentCss = ({ code }: Theme) =>
  css`
    .argToken {
      color: ${code.argColor};
    }
    .separatorToken {
      color: ${code.separatorColor};
    }
    .typeToken {
      color: ${code.typeColor};
    }
  `

export interface ArgControlProps<TArg extends Arg> {
  arg: TArg
  value?: ArgValue<TArg>
  onChange: (value?: ArgValue<TArg>) => void
}

const ArgControl = <TArg extends Arg>({
  arg,
  value,
  onChange,
}: ArgControlProps<TArg>) => {
  const editor = useSlate()

  let children: React.ReactNode = (
    <span
      css={css`
        color: #fff;
      `}
    >
      'N/A'
    </span>
  )

  if (isPathArg(arg)) {
    children = (
      <NodeSelector
        mode="path"
        value={value as Path}
        onChange={onChange as (value?: Path) => void}
      />
    )
  } else if (isPointArg(arg)) {
    children = (
      <NodeSelector
        mode="point"
        value={value as Point}
        onChange={onChange as (value?: Point) => void}
      />
    )
  } else if (isNodeArg(arg)) {
    const path = Node.isNode(value)
      ? ReactEditor.findPath(editor, value)
      : value
    children = (
      <NodeSelector
        mode="path"
        value={path as Path}
        onChange={(value) => {
          onChange((value ? Editor.node(editor, value)[0] : undefined) as any)
        }}
      />
    )
  } else if (
    isStringLiteralArg(arg) ||
    isBooleanArg(arg) ||
    isFunctionArg(arg)
  ) {
    children = (
      <Selector
        label={arg.name}
        options={arg.options}
        value={value as string | boolean | [string, Function]}
        onChange={
          onChange as (value?: string | boolean | [string, Function]) => void
        }
      />
    )
  } else if (isNumberArg(arg) || isStringArg(arg)) {
    const cast = isNumberArg(arg) ? Number : String
    children = (
      <input
        type="text"
        value={String(value ?? '')}
        onChange={({ currentTarget }) =>
          (onChange as (value?: number | string) => void)(
            cast(currentTarget.value)
          )
        }
      />
    )
  }

  return (
    <div css={componentCss}>
      <div
        css={css`
          display: flex;
        `}
      >
        <ArgLabel arg={arg} />
        &nbsp;
        {children}
      </div>
    </div>
  )
}

export default ArgControl
