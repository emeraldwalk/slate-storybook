/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Node, NodeEntry, Path, Point, Text } from 'slate'
import { useNodeSpecContext } from '..'
import { Theme } from '../../theme'

const componentCss = css`
  .anchor,
  .focus,
  .point {
    border-right: 2px solid;
    position: absolute;
    height: 1.2em;
  }
  .anchor {
    border-color: green;
    background-color: green;
  }
  .focus {
    border-color: red;
    background-color: red;
  }
  .point {
    border-color: blue;
    background-color: blue;
  }
`

export interface TextNodeContentProps {
  node: Text
  path: Path
}

const TextNodeContent: React.FC<TextNodeContentProps> = ({ node, path }) => {
  const { labeledPoints } = useNodeSpecContext()
  const tokens = nodeTokens([node, path], labeledPoints)

  return (
    <span
      css={componentCss}
      // css={
      //   mode === 'point' &&
      //   css`
      //     :hover {
      //       background-color: #1fa8fd;
      //     }
      //   `
      // }
      className="text-node-content"
    >
      {tokens.map((token, i) =>
        typeof token === 'string' ? (
          <span
            // css={
            //   mode === 'point' &&
            //   css`
            //     cursor: text;
            //   `
            // }
            className="text-token"
            key={i}
          >
            {token}
          </span>
        ) : (
          <span
            title={token.label}
            css={(theme: Theme) => css`
              position: relative;
              span {
                background-color: inherit;
                color: ${theme.textInverseColor};
                position: absolute;
                top: -8px;
                font-size: 10px;
                padding: 0 4px;
              }
            `}
            key={i}
            className={token.label}
          >
            <span>{token.label.substr(0, 1)}</span>
          </span>
        )
      )}
    </span>
  )
}

export default TextNodeContent

function nodeTokens(
  [node, path]: NodeEntry<Node>,
  points: { label: string; point: Point }[]
): (string | { label: string })[] {
  const nodeText = Node.string(node)
  const tokens: (string | { label: string })[] = []

  // filter down to only points in current path
  const pointsInPath = points.filter(({ point }) =>
    Path.equals(point.path, path)
  )

  let i = 0

  // tokenize text using any points that apply
  for (const { label, point } of pointsInPath) {
    const { offset } = point

    if (offset > i) {
      tokens.push(nodeText.substr(i, offset - i))
      i = offset
    }

    tokens.push({
      label,
    })
  }

  if (i < nodeText.length) {
    tokens.push(nodeText.substr(i))
  }

  return tokens
}
