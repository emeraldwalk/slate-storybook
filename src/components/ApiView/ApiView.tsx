/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  useSlate,
} from 'slate-react'
import { useNodeSpecContext } from '..'
import { ApiControls } from '..'
import { asArray } from '../../util/data'
import { filterToLocations } from '../../util/slateUtil'
import { ApiFunction, useArgValues } from '../ApiControls/model'
import ApiResult from '../ApiResult/ApiResult'
import NodeTree from '../NodeTree/NodeTree'

const componentCss = css``

export interface ApiViewProps {
  title: string
  renderElement: (props: RenderElementProps) => JSX.Element
  renderLeaf: (props: RenderLeafProps) => JSX.Element
  initialApiFunction: ApiFunction
  apiFunctions: Record<string, ApiFunction>
}

const ApiView: React.FC<ApiViewProps> = ({
  title,
  renderElement,
  renderLeaf,
  initialApiFunction,
  apiFunctions,
}) => {
  const editor = useSlate()
  const { selection } = editor
  const { setHighlightLocations } = useNodeSpecContext()

  const apiFunctionList = React.useMemo(
    () => Object.keys(apiFunctions).map((name) => apiFunctions[name]),
    [apiFunctions]
  )
  const [apiFunction, setApiFunction] = React.useState(initialApiFunction)
  const { values, setValues, resetValues } = useArgValues(apiFunction.args)
  const [result, setResult] = React.useState<unknown[]>([])
  const [runId, setRunId] = React.useState(0)

  const intervalRef = React.useRef<number>()

  React.useEffect(() => {
    if (selection) {
      setHighlightLocations([selection])
    }
  }, [selection, setHighlightLocations])

  const onClick = React.useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault()

      let result
      try {
        result = apiFunction.fn(...values)
        result = asArray(result)

        if (apiFunction.returnValue.type === 'Path') {
          result = [result]
        }
      } catch (err) {
        console.error(err)
        result = [String(err)]
      }

      setResult(result)
      setRunId((id) => id + 1)
      setHighlightLocations(selection ? [selection] : [])

      if (Array.isArray(result)) {
        const locations = filterToLocations(result)
        if (selection) {
          locations.unshift(selection)
        }

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
    [apiFunction, values, selection, setHighlightLocations]
  )

  const onApiFunctionChange = React.useCallback(
    ({ currentTarget }: React.ChangeEvent<HTMLSelectElement>) => {
      const apiFunction = apiFunctions[currentTarget.value]
      setApiFunction(apiFunction)
      resetValues(apiFunction.args)
    },
    [apiFunctions, resetValues]
  )

  return (
    <div css={componentCss}>
      <h1>{title} Interface</h1>
      <select value={apiFunction.name} onChange={onApiFunctionChange}>
        {apiFunctionList.map((fn) => (
          <option key={fn.name} value={fn.name}>
            {title}.{fn.name}
          </option>
        ))}
      </select>

      <h2>Editor</h2>
      <Editable
        css={css`
          font-size: 0.9em;
        `}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
      />

      <h2>API</h2>
      <ApiControls
        css={css`
          font-size: 0.8em;
        `}
        apiFunction={apiFunction}
        values={values}
        onChange={setValues}
      />
      <button onClick={onClick}>Run</button>

      <div
        css={css`
          display: flex;
          > * {
            flex: 1 1 50%;
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
          <h2>Results</h2>
          {runId ? (
            <div>
              <ApiResult runId={String(runId)} data={result} />
            </div>
          ) : null}
        </div>
        <div>
          <h2>Data Model</h2>
          <NodeTree node={editor} showHighlightedLocations={true} />
        </div>
      </div>
    </div>
  )
}

export default ApiView
