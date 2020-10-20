/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import ArgControl from './ArgControl'
import { Arg, ObjectArg } from './model'
import ObjectArgControl from './ObjectArgControl'

const componentCss = css``

export interface ApiControlsProps {
  args: (Arg | ObjectArg)[]
}

const ApiControls: React.FC<ApiControlsProps> = ({ args }) => {
  const [values, setValues] = React.useState(() => {
    return args.map((arg) => {
      if (arg.argType === 'object') {
        return {}
      }

      return arg.value
    })
  })

  console.log(values)

  return (
    <div css={componentCss}>
      {args.map((arg, i) =>
        arg.argType === 'object' ? (
          <ObjectArgControl key={arg.name} arg={arg} onChange={console.log} />
        ) : (
          <ArgControl
            key={arg.name}
            arg={arg}
            onChange={(arg) => {
              setValues((values) =>
                values.slice(0, i).concat(arg.value, values.slice(i + 1))
              )
            }}
          />
        )
      )}
    </div>
  )
}

export default ApiControls
