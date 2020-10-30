/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Arg } from './model'

const componentCss = css``

export interface ArgLabelProps<TArg extends Arg> {
  arg: TArg
}

const ArgLabel = <TArg extends Arg>({ arg }: ArgLabelProps<TArg>) => {
  return (
    <label css={componentCss}>
      <span className="argToken">{arg.name}</span>
      <span className="separatorToken">{arg.isOptional ? '?' : ''}:&nbsp;</span>
      <span className="typeToken">{arg.type}</span>
    </label>
  )
}

export default ArgLabel
