/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Theme } from '../../theme'
import ArgControl from './ArgControl'
import {
  ApiFunction,
  isFunctionArg,
  ArgValue,
  Arg,
  ObjectArgValues,
} from './model'
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
  apiFunction: ApiFunction
  values: (ArgValue<Arg> | ObjectArgValues | undefined)[]
  onChange: (values: (ArgValue<Arg> | ObjectArgValues | undefined)[]) => void
}

const ApiControls: React.FC<ApiControlsProps> = ({
  apiFunction,
  values,
  onChange,
}) => {
  const {
    name,
    commentBlock,
    generics,
    isGenerator,
    args,
    returnType,
  } = apiFunction

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
            <ObjectArgControl
              key={arg.name}
              arg={arg}
              values={values[i] as ObjectArgValues}
              onChange={(val) =>
                onChange(values.slice(0, i).concat(val, values.slice(i + 1)))
              }
            />
          ) : arg.argType === 'editor' ? (
            <div key={arg.name}>
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
              value={values[i] as ArgValue<Arg>}
              onChange={(value) =>
                onChange(
                  values
                    .slice(0, i)
                    .concat(
                      isFunctionArg(arg) ? (value as any)?.[1] : value,
                      values.slice(i + 1)
                    )
                )
              }
            />
          )
        )}
      </div>
      <span className="separatorToken">): </span>
      <span className="typeToken">{returnType}</span>
    </pre>
  )
}

export default ApiControls
