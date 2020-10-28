/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Editor, Node, Path } from 'slate'
import { Theme } from '../../theme'
import { isNodeEntry } from '../../util/slateUtil'
import { NodeTree } from '..'
import { useSlate } from 'slate-react'
import PathView from '../PathView/PathView'

const componentCss = css``

export interface ApiResultProps {
  runId: string
  data: unknown[]
}

const ApiResult: React.FC<ApiResultProps> = ({ data, runId }) => {
  const editor = useSlate()

  return (
    <div css={componentCss}>
      <pre
        css={({ code, textInverseColor }: Theme) => css`
          background-color: ${code.backgroundColor};
          color: ${textInverseColor};
          max-height: 400px;
          overflow-y: auto;
        `}
      >
        {data.map((datum, i) => {
          return (
            <span
              css={css`
                display: flex;
              `}
              key={`${runId}-${i}`}
            >
              <span
                css={css`
                  flex-shrink: 0;
                  margin-right: 10px;
                  text-align: right;
                  width: 20px;
                `}
              >
                {i + 1}
              </span>
              {datumView(editor, datum)}
            </span>
          )
        })}
      </pre>
    </div>
  )
}

export default ApiResult

function datumView(editor: Editor, datum: unknown) {
  if (isNodeEntry(datum)) {
    return (
      <NodeTree node={datum[0]} path={datum[1]} initialIsExpanded={false} />
    )
  } else if (Path.isPath(datum)) {
    return <PathView path={datum} />
  } else if (Node.isNode(datum)) {
    const [[, path]] = Node.nodes(editor, {
      pass: ([n]) => n !== datum,
    })

    return <NodeTree node={datum} path={path} initialIsExpanded={false} />
  }

  return JSON.stringify(datum) ?? 'undefined'
}
