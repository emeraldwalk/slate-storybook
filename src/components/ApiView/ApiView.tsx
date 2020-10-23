/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Editable, RenderElementProps, RenderLeafProps } from 'slate-react'
import { NodeSpecContainer, useNodeSpecContext } from '..'
import { ApiControls } from '..'
import { filterToLocations } from '../../util/slateUtil'
import { ApiFunction, useArgValues } from '../ApiControls/model'

const componentCss = css``

export interface ApiViewProps {
  renderElement: (props: RenderElementProps) => JSX.Element
  renderLeaf: (props: RenderLeafProps) => JSX.Element
  apiFunction: ApiFunction
}

const ApiView: React.FC<ApiViewProps> = ({
  renderElement,
  renderLeaf,
  apiFunction,
}) => {
  const { setHighlightLocations } = useNodeSpecContext()

  const [values, setValues] = useArgValues(apiFunction.args)

  const intervalRef = React.useRef<number>()

  const onClick = React.useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault()

      let result = apiFunction.fn(...values)
      if (
        result &&
        !Array.isArray(result) &&
        typeof result[Symbol.iterator] === 'function'
      ) {
        result = [...result]
      }

      setHighlightLocations([])

      if (Array.isArray(result)) {
        const locations = filterToLocations(result)
        window.clearInterval(intervalRef.current)

        let i = 0
        intervalRef.current = window.setInterval(() => {
          if (++i <= locations.length) {
            setHighlightLocations(locations.slice(0, i))
          } else {
            window.clearInterval(intervalRef.current)
          }
        }, 500)
      }
    },
    [apiFunction, values, setHighlightLocations]
  )

  return (
    <div css={componentCss}>
      <h2>API</h2>
      <ApiControls
        apiFunction={apiFunction}
        values={values}
        onChange={setValues}
      />
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
