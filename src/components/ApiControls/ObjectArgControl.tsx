/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Theme } from '../../theme'
import ArgControl from './ArgControl'
import {
  Arg,
  ArgValue,
  isFunctionArg,
  ObjectArg,
  ObjectArgValues,
} from './model'

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
  values: ObjectArgValues
  onChange: (values: ObjectArgValues) => void
}

const ObjectArgControl: React.FC<ObjectArgControlProps> = ({
  arg: obj,
  values,
  onChange,
}) => {
  // const [values, setValues] = React.useState(() => {
  //   const values: ObjectArgValues = {}

  //   for (const arg of obj.args) {
  //     const value = isFunctionArg(arg) ? arg.value?.[1] : arg.value
  //     values[arg.name] = value
  //   }

  //   return values
  // })

  // const onChangeInternal = React.useCallback(
  //   function (value: ArgValue<Arg>) {
  //     const newValues = {
  //       ...values,
  //       [arg.name]: isFunctionArg(arg) ? arg.value?.[1] : arg.value,
  //     }

  //     // setValues(newValues)
  //     onChange(newValues)
  //   },
  //   [values, onChange]
  // )

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
          <ArgControl
            key={arg.name}
            arg={arg}
            value={values[arg.name]}
            onChange={<TArg extends Arg>(value?: ArgValue<TArg>) => {
              const newValues = {
                ...values,
                [arg.name]: isFunctionArg(arg) ? (value as any)?.[1] : value,
              }

              onChange(newValues)
            }}
          />
        ))}
      </div>
      <span className="braceToken">{'}'}</span>
    </div>
  )
}

export default ObjectArgControl
