/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Editable, RenderElementProps, RenderLeafProps } from 'slate-react'
import { NodeSpecContainer } from '..'
import { ApiControls } from '..'
import { ApiFunction, ArgValue, ObjectArgValues } from '../ApiControls/model'

const componentCss = css``

export interface ApiViewProps {
  renderElement: (props: RenderElementProps) => JSX.Element
  renderLeaf: (props: RenderLeafProps) => JSX.Element
  apiFunctions: ApiFunction[]
}

const ApiView: React.FC<ApiViewProps> = ({
  renderElement,
  renderLeaf,
  apiFunctions,
}) => {
  const apiFunction = apiFunctions[0]
  const [values, setValues] = React.useState<(ArgValue | ObjectArgValues)[]>()

  // const onChangeInternal = React.useCallback(
  //   (values: (ArgValue | ObjectArgValues)[]) => {
  //     setValues(values)

  //     debugger
  //     console.log('values:', values)
  //     setApiFunction({
  //       ...apiFunction,
  //       args: apiFunction.args,
  //     })
  //   },
  //   [apiFunction]
  // )

  const onClick = React.useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault()

      let result = apiFunction.fn(...values)
      if (
        !Array.isArray(result) &&
        typeof result[Symbol.iterator] === 'function'
      ) {
        result = [...result]
      }

      console.log(result)
    },
    [apiFunction, values]
  )

  return (
    <div css={componentCss}>
      <h2>API</h2>
      <ApiControls apiFunction={apiFunction} onChange={setValues} />
      <button onClick={onClick}>Run</button>
      <div
        css={css`
          display: flex;
          > * {
            flex-grow: 1;
          }
          @media (max-width: 768px) {
            flex-direction: column;
            .no-mobile {
              display: none;
            }
          }
        `}
      >
        <div>
          <h2>Editor</h2>
          <Editable
            css={componentCss}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
          />
        </div>
        <div>
          <h2>Data Model</h2>
          <NodeSpecContainer />
        </div>
      </div>
    </div>
  )
}

export default ApiView
