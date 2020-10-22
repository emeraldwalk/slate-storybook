/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Theme } from '../../theme'
import ArgControl from './ArgControl'
import { Arg, EditorArg, ObjectArg } from './model'
import ObjectArgControl from './ObjectArgControl'

const componentCss = ({ code }: Theme) => css`
  background-color: ${code.backgroundColor};
  padding: 10px;
  .commentBlock {
    color: ${code.commentColor};
  }
  .iteratorToken {
    color: ${code.separatorColor};
  }
  .functionNameToken {
    color: ${code.functionNameColor};
  }
  .genericsToken {
    color: ${code.separatorColor};
  }
  .parenToken {
    color: ${code.separatorColor};
  }
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

export interface ApiControlsProps {
  name: string
  commentBlock: string
  generics?: React.ReactNode
  isGenerator?: boolean
  args: (EditorArg | Arg | ObjectArg)[]
  returnType: React.ReactNode
}

const ApiControls: React.FC<ApiControlsProps> = ({
  name,
  commentBlock,
  generics,
  isGenerator,
  args,
  returnType,
}) => {
  const [values, setValues] = React.useState(() => {
    return args.map((arg) => {
      if (arg.argType === 'object') {
        return {}
      }

      return 'value' in arg && arg.value
    })
  })

  console.log(values)

  return (
    <pre css={componentCss}>
      <div className="commentBlock">{commentBlock}</div>
      {isGenerator ? <span className="iteratorToken">*</span> : null}
      <span className="functionNameToken">{name}</span>
      {generics ? <span className="genericsToken">{generics}</span> : null}
      <span className="parenToken">(</span>
      <div
        css={css`
          padding-left: 20px;
        `}
      >
        {args.map((arg, i) =>
          arg.argType === 'object' ? (
            <ObjectArgControl key={arg.name} arg={arg} onChange={console.log} />
          ) : arg.argType === 'editor' ? (
            <div>
              <span className="argToken">{arg.name}</span>
              <span className="separatorToken">
                {arg.isOptional ? '?' : ''}:&nbsp;
              </span>
              <span className="typeToken">Editor</span>
              <span className="separatorToken">,</span>
            </div>
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
    </pre>
  )
}

export default ApiControls
