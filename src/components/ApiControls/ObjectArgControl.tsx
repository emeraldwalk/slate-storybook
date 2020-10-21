/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Theme } from '../../theme'
import ArgControl from './ArgControl'
import { Arg, ObjectArg } from './model'

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
  onChange: (values: Record<string, Arg['value']>) => void
}

const ObjectArgControl: React.FC<ObjectArgControlProps> = ({
  arg: obj,
  onChange,
}) => {
  const [values, setValues] = React.useState(() => {
    const values: Record<string, Arg['value']> = {}

    for (const arg of obj.args) {
      values[arg.name] = arg.value
    }

    return values
  })

  const onChangeInternal = React.useCallback(
    (arg: Arg) => {
      const newValues = {
        ...values,
        [arg.name]: arg.value,
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
