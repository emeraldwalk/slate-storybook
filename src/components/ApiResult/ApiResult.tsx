/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Theme } from '../../theme'
import { isNodeEntry } from '../../util/slateUtil'
import { NodeTree } from '..'

const componentCss = css``

export interface ApiResultProps {
  data: unknown[]
}

const ApiResult: React.FC<ApiResultProps> = ({ data }) => {
  return (
    <div css={componentCss}>
      <pre
        css={({ code, textInverseColor }: Theme) => css`
          background-color: ${code.backgroundColor};
          color: ${textInverseColor};
          max-height: 200px;
          overflow-y: auto;
        `}
      >
        {data.map((datum, i) => {
          if (isNodeEntry(datum)) {
            return (
              <span
                css={css`
                  display: flex;
                `}
                key={i}
              >
                <span
                  css={css`
                    margin-right: 10px;
                    text-align: right;
                    width: 20px;
                  `}
                >
                  {i + 1}
                </span>
                <NodeTree
                  node={datum[0]}
                  path={datum[1]}
                  initialIsExpanded={false}
                />
              </span>
            )
          }
          return JSON.stringify(datum) ?? 'undefined'
        })}
      </pre>
    </div>
  )
}

export default ApiResult
