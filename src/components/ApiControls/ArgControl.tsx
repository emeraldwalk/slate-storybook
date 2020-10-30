/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Path } from 'slate'
import { ArgLabel, Selector } from '..'
import { Theme } from '../../theme'
import NodeSelector from '../NodeSelector/NodeSelector'
import {
  Arg,
  ArgValue,
  isBooleanArg,
  isFunctionArg,
  isNumberArg,
  isPathArg,
  isStringArg,
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
  let children: React.ReactNode = 'N/A'

  if (isPathArg(arg)) {
    children = (
      <div
        css={css`
          display: flex;
        `}
      >
        <ArgLabel arg={arg} />
        &nbsp;
        <NodeSelector
          mode="path"
          value={value as Path}
          onChange={onChange as (value?: Path) => void}
        />
      </div>
    )
  } else if (isStringArg(arg) || isBooleanArg(arg) || isFunctionArg(arg)) {
    children = (
      <div
        css={css`
          display: flex;
        `}
      >
        <ArgLabel arg={arg} />
        &nbsp;
        <Selector
          label={arg.name}
          options={arg.options}
          value={value as string | boolean | [string, Function]}
          onChange={
            onChange as (value?: string | boolean | [string, Function]) => void
          }
        />
      </div>
    )
  } else if (isNumberArg(arg)) {
    children = (
      <div>
        <ArgLabel arg={arg} />
        &nbsp;
        <input
          type="text"
          value={String(value ?? '')}
          onChange={({ currentTarget }) =>
            (onChange as (value?: number) => void)(Number(currentTarget.value))
          }
        />
      </div>
    )
  }

  return <div css={componentCss}>{children}</div>
}

export default ArgControl
