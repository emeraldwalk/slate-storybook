/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Path } from 'slate'
import { Selector } from '..'
import { Theme } from '../../theme'
import NodeSelector from '../NodeSelector/NodeSelector'
import {
  Arg,
  ArgValue,
  isBooleanArg,
  isFunctionArg,
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
        <label>
          <span className="argToken">{arg.name}</span>
          <span className="separatorToken">
            {arg.isOptional ? '?' : ''}:&nbsp;
          </span>
          <span className="typeToken">{arg.type}</span>
        </label>
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
        <label>
          <span className="argToken">{arg.name}</span>
          <span className="separatorToken">
            {arg.isOptional ? '?' : ''}:&nbsp;
          </span>
          <span className="typeToken">{arg.type}</span>
        </label>
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
  }

  return <div css={componentCss}>{children}</div>
}

export default ArgControl
