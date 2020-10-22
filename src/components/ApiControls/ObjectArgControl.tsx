/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Theme } from '../../theme'
import ArgControl from './ArgControl'
import { Arg, isFunctionArg, ObjectArg, ObjectArgValues } from './model'

const componentCss = ({ code }: Theme) => css`
  .argToken {
    color: ${code.argColor};
  }
  .separatorToken {
    color: ${code.separatorColor};
  }
  .braceToken {
    color: ${code.separatorColor};
  }
`

export interface ObjectArgControlProps {
  arg: ObjectArg
  onChange: (values: ObjectArgValues) => void
}

const ObjectArgControl: React.FC<ObjectArgControlProps> = ({
  arg: obj,
  onChange,
}) => {
  const [values, setValues] = React.useState(() => {
    const values: ObjectArgValues = {}

    for (const arg of obj.args) {
      const value = isFunctionArg(arg) ? arg.value?.[1] : arg.value
      values[arg.name] = value
    }

    return values
  })

  const onChangeInternal = React.useCallback(
    (arg: Arg) => {
      const newValues = {
        ...values,
        [arg.name]: isFunctionArg(arg) ? arg.value?.[1] : arg.value,
      }

      setValues(newValues)
      onChange(newValues)
    },
    [values, onChange]
  )

  return (
    <div css={componentCss}>
      <span className="argToken">{obj.name}</span>
      <span className="separatorToken">{obj.isOptional ? '?' : ''}:</span>
      <span className="braceToken">{' {'}</span>
      <div
        css={css`
          padding-left: 20px;
        `}
      >
        {obj.args.map((arg) => (
          <ArgControl key={arg.name} arg={arg} onChange={onChangeInternal} />
        ))}
      </div>
      <span className="braceToken">{'}'}</span>
    </div>
  )
}

export default ObjectArgControl
