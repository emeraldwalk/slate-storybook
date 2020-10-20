/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Path } from 'slate'
import { Selector } from '..'
import NodeSelector from '../NodeSelector/NodeSelector'
import {
  Arg,
  ArgValue,
  isBooleanArg,
  isFunctionArg,
  isPathArg,
  isStringArg,
} from './model'

const componentCss = css``

export interface ArgControlProps<TArg extends Arg> {
  arg: TArg
  onChange: (arg: TArg) => void
}

const ArgControl = <TArg extends Arg>({
  arg,
  onChange,
}: ArgControlProps<TArg>) => {
  const onChangeInternal = React.useCallback(
    (value: ArgValue<TArg>) => {
      onChange({
        ...arg,
        value,
      })
    },
    [arg, onChange]
  )

  let children: React.ReactNode = 'N/A'

  if (isPathArg(arg)) {
    children = (
      <React.Fragment>
        <label>
          <span>{arg.name}</span>
          <span>{arg.isOptional ? '?' : ''}:</span> <span>{arg.type}</span>
        </label>
        <NodeSelector
          mode="path"
          value={arg.value}
          onChange={onChangeInternal as (value?: Path) => void}
        />
      </React.Fragment>
    )
  } else if (isStringArg(arg) || isBooleanArg(arg) || isFunctionArg(arg)) {
    children = (
      <React.Fragment>
        <label>
          <span>{arg.name}</span>
          <span>{arg.isOptional ? '?' : ''}:</span> <span>{arg.type}</span>
        </label>
        <Selector
          label={arg.name}
          options={arg.options}
          value={arg.value}
          onChange={
            onChangeInternal as (
              value?: string | boolean | [string, Function]
            ) => void
          }
        />
      </React.Fragment>
    )
  }

  return <div css={componentCss}>{children}</div>
}

export default ArgControl
