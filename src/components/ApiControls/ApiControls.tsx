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
  EditorArg,
  ObjectArg,
  isObjectArg,
} from './model'
import ObjectArgControl from './ObjectArgControl'

const componentCss = ({ code }: Theme) => css`
  background-color: ${code.backgroundColor};
  padding: 10px;
  overflow-x: auto;
  .commentBlock {
    color: ${code.commentColor};
  }
  .paramToken {
    color: ${code.paramColor};
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
  className?: string
  apiFunction: ApiFunction
  values: (ArgValue<Arg> | ObjectArgValues | undefined)[]
  onChange: (values: (ArgValue<Arg> | ObjectArgValues | undefined)[]) => void
}

const ApiControls: React.FC<ApiControlsProps> = ({
  className,
  apiFunction,
  values,
  onChange,
}) => {
  const {
    name,
    description,
    generics,
    isGenerator,
    args,
    returnValue,
  } = apiFunction
  return (
    <pre css={componentCss} className={className}>
      <div className="commentBlock">
        {[
          '/**',
          (Array.isArray(description) ? description : [description]).map(
            (d) => `\n * ${d}`
          ),
          '\n * ',
          ...args.map((a) => paramComment(a)),
          returnValue.yieldsComment || returnValue.comment ? (
            <React.Fragment key="returnComment">
              {'\n *'}
              {(returnValue.yieldsComment || returnValue.comment)
                .split('\r\n')
                .map(
                  commentLine(returnValue.yieldsComment ? 'yields' : 'returns')
                )}
            </React.Fragment>
          ) : (
            ''
          ),
          '\n */',
        ]}
      </div>
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
              value={values[i] as ArgValue<Exclude<Arg, EditorArg>>}
              onChange={(value) => {
                const newValues = values.slice(0)
                newValues.splice(
                  i,
                  1,
                  isFunctionArg(arg) ? (value as any)?.[1] : value
                )
                onChange(newValues)
              }}
            />
          )
        )}
      </div>
      <span className="separatorToken">): </span>
      <span className="typeToken">{returnValue.type}</span>
    </pre>
  )
}

export default ApiControls

function paramComment(
  arg: EditorArg | Arg | ObjectArg,
  prefix?: string
): React.ReactNode {
  const name = prefix ? `${prefix}.${arg.name}` : arg.name

  return isObjectArg(arg) ? (
    arg.args.map((a) => paramComment(a, name))
  ) : (
    <React.Fragment key={name}>
      {(typeof arg.comment === 'string' ? [arg.comment] : arg.comment).map(
        commentLine('param', name)
      )}
    </React.Fragment>
  )
}

function commentLine(
  paramType: 'returns' | 'yields' | 'param',
  paramName?: string
) {
  return (comment: string, i: number) => {
    return (
      <React.Fragment key={`${comment}-${i}`}>
        {'\n'}
        <span> * </span>
        {i === 0 ? <span className="paramToken">@{paramType}</span> : null}
        {i === 0 && paramName ? (
          <span className="argToken"> {paramName}</span>
        ) : null}
        <span> {comment}</span>
      </React.Fragment>
    )
  }
}
