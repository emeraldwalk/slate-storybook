/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Editor, Element, Node, Path, Point, Range, Text } from 'slate'
import { useSlate } from 'slate-react'

const componentCss = css`
  th {
    text-align: left;
  }
  .anchor {
    border-right: 1px solid green;
  }
  .focus {
    border-right: 1px solid red;
  }
`

export interface NodeSpecProps {}

const NodeSpec: React.FC<NodeSpecProps> = () => {
  const editor = useSlate()
  const nodes = [...Editor.nodes(editor, { at: [] })]

  return (
    <div css={componentCss}>
      <table>
        <thead>
          <tr>
            <th>Path</th>
            <th>Node</th>
          </tr>
        </thead>
        <tbody>
          {nodes.map(([node, path]) => (
            <tr key={JSON.stringify(path)}>
              <td>{JSON.stringify(path)}</td>
              <td>
                {pathToSpace(path, 4)}
                {nodeType(editor, node)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default NodeSpec

function nodeType(editor: Editor, node: Node): React.ReactNode {
  if (Editor.isEditor(node)) {
    return 'editor'
  }

  if (Element.isElement(node)) {
    return ['element:', node.type ?? '']
  }

  if (Text.isText(node)) {
    let points: (Point & { type: 'anchor' | 'focus' })[] = []

    // build up a list of anchor and / or focus points
    if (editor.selection) {
      const [[, path]] = Editor.nodes(editor, {
        at: [],
        match: (n) => n === node,
      })

      const order: ('anchor' | 'focus')[] = Range.isForward(editor.selection)
        ? ['anchor', 'focus']
        : ['focus', 'anchor']

      // start and / or end point
      points = Range.edges(editor.selection)
        .map((point, i) => ({
          type: order[i],
          ...point,
        }))
        .filter((point) => Path.equals(point.path, path))
    }

    // build a list of tokens to render
    const tokens: (string | { type: 'anchor' | 'focus' })[] = []
    let i = 0

    for (const point of points) {
      const { offset } = point

      if (offset > i) {
        tokens.push(node.text.substr(i, offset - i))
        i = offset
      }

      tokens.push({
        type: point.type,
      })
    }

    if (i < node.text.length - 1) {
      tokens.push(node.text.substr(i))
    }

    return (
      <React.Fragment>
        <span>text:</span>
        {tokens.map((token) =>
          typeof token === 'string' ? (
            <span>{token}</span>
          ) : (
            <span className={token.type}></span>
          )
        )}
      </React.Fragment>
    )
  }

  return 'unknown'
}

function pathToSpace(path: Path, spacesPerLevel: number = 2) {
  const spaces = []
  for (let i = 0; i < path.length * spacesPerLevel; ++i) {
    spaces.push('\xa0')
  }
  return spaces.join('')
}
