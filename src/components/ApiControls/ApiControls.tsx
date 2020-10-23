/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { useSlate } from 'slate-react'
import { Theme } from '../../theme'
import ArgControl from './ArgControl'
import { ArgValue, ApiFunction, ObjectArgValues, isFunctionArg } from './model'
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
  onChange: (values: (ArgValue | ObjectArgValues)[]) => void
}

const ApiControls: React.FC<ApiControlsProps> = ({ apiFunction, onChange }) => {
  const {
    name,
    commentBlock,
    generics,
    isGenerator,
    args,
    returnType,
  } = apiFunction
  const editor = useSlate()
  const [values, setValues] = React.useState<(ArgValue | ObjectArgValues)[]>(
    () => {
      return args.map((arg) => {
        if (arg.argType === 'editor') {
          return editor
        }

        if (arg.argType === 'object') {
          return {}
        }

        return 'value' in arg ? arg.value : undefined
      })
    }
  )

  React.useEffect(() => {
    onChange(values)
  }, [values, onChange])

  const onChangeInternal = React.useCallback(
    (values: (ArgValue | ObjectArgValues)[]) => {
      setValues(values)
      onChange(values)
    },
    [onChange]
  )

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
              onChange={(val) =>
                onChangeInternal(
                  values.slice(0, i).concat(val, values.slice(i + 1))
                )
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
              onChange={(arg) =>
                onChangeInternal(
                  values
                    .slice(0, i)
                    .concat(
                      isFunctionArg(arg) ? arg.value?.[1] : arg.value,
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
