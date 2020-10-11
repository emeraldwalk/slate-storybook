/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import {
  Editor,
  Element,
  Node,
  NodeEntry,
  Path,
  Point,
  Range,
  Text,
} from 'slate'
import { useSlate } from 'slate-react'

const componentCss = css`
  display: flex;
  flex-direction: column;
  padding: 0 10px;

  header {
    border-bottom: 1px solid #333;
  }
  main {
    overflow-y: auto;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  header > span:nth-of-type(1) {
    margin-right: 20px;
  }
  li > span:nth-of-type(1) {
    margin-right: 40px;
  }
  .anchor {
    border-right: 1px solid green;
  }
  .focus {
    border-right: 1px solid red;
  }
`

const selectedNodeCss = css`
  background-color: #ccc;
`

export interface NodeSpecProps {
  className?: string
  selectedNodeEntries: NodeEntry<Node>[]
  onClickPoint?: (point: Point) => void
  selection?: Range
}

const NodeSpec: React.FC<NodeSpecProps> = ({
  className,
  selectedNodeEntries = [],
  onClickPoint,
  selection,
}) => {
  const editor = useSlate()
  const nodeEntries = [...Editor.nodes(editor, { at: [] })]

  const onClickNode = React.useCallback(
    ([node, path]: NodeEntry<Node>) => {
      const { anchorNode, anchorOffset } = document.getSelection() ?? {}
      let offset = 0

      if (Text.isText(node) && anchorNode) {
        const spanElement = anchorNode.parentElement

        if (spanElement?.className === 'text-token') {
          const nodeText = anchorNode.textContent
          const containerText = spanElement?.parentElement?.textContent

          if (nodeText && containerText) {
            offset = containerText.lastIndexOf(nodeText) + anchorOffset!
          }
        }
      }

      onClickPoint?.({
        path,
        offset,
      })
    },
    [onClickPoint]
  )

  return (
    <div css={componentCss} className={className}>
      <header>
        <span>Path</span>
        <span>Node</span>
      </header>
      <main>
        <ul>
          {nodeEntries.map(([node, path]) => (
            <li
              css={
                selectedNodeEntries.find(([n]) => n === node)
                  ? selectedNodeCss
                  : undefined
              }
              key={JSON.stringify(path)}
              onClick={() => onClickNode([node, path])}
            >
              <span>{JSON.stringify(path)}</span>
              <span>
                {pathToSpace(path, 4)}
                {nodeSpec(editor, node, selection)}
              </span>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default NodeSpec

function nodeSpec(
  editor: Editor,
  node: Node,
  selection = editor.selection
): React.ReactNode {
  if (Editor.isEditor(node)) {
    return 'editor'
  }

  if (Element.isElement(node)) {
    return `type:${node.type ?? ''}`
  }

  if (Text.isText(node)) {
    let points: (Point & { type: 'anchor' | 'focus' })[] = []

    // build up a list of anchor and / or focus points
    if (selection) {
      const [[, path]] = Editor.nodes(editor, {
        at: [],
        match: (n) => n === node,
      })

      const order: ('anchor' | 'focus')[] = Range.isForward(selection)
        ? ['anchor', 'focus']
        : ['focus', 'anchor']

      // start and / or end point
      points = Range.edges(selection)
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

    if (i < node.text.length) {
      tokens.push(node.text.substr(i))
    }

    return (
      <span className="text-node-content">
        {tokens.map((token, i) =>
          typeof token === 'string' ? (
            <span className="text-token" key={i}>
              {token}
            </span>
          ) : (
            <span key={i} className={token.type}></span>
          )
        )}
      </span>
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
