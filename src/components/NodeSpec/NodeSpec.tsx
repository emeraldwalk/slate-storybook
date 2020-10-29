/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import {
  Editor,
  Element,
  Location,
  Node,
  NodeEntry,
  Path,
  Point,
  Range,
  Text,
} from 'slate'
import { useSlate } from 'slate-react'
import { Theme } from '../../theme'
import { siftLocations } from '../../util/slateUtil'

const componentCss = css`
  display: flex;
  flex-direction: column;

  header {
    border-bottom: 1px solid #333;
    padding: 0 10px;
  }
  main {
    overflow-y: auto;
    padding: 0 10px;
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

const selectedNodeCss = (theme: Theme) => css`
  background-color: ${theme.barSelectedColor};
  color: ${theme.textInverseColor};
`

const hoverCss = (theme: Theme) => css`
  :hover:not(.selected) {
    background-color: rgb(0, 0, 0, 0.05);
    color: ${theme.textColor};
    cursor: pointer;
  }
`

export interface NodeSpecProps {
  className?: string
  rootNode?: Node
  mode: 'path' | 'point'
  onSelect?: (pointOrPoint: Path | Point) => void
  highlightLocations?: Location[]
}

const NodeSpec: React.FC<NodeSpecProps> = ({
  className,
  rootNode,
  mode,
  highlightLocations = [],
  onSelect,
}) => {
  const editor = useSlate()
  const nodeEntries = [...Node.nodes(rootNode ?? editor)]

  const {
    paths: highlightPaths,
    points: highlightPoints,
    ranges: highlightRanges,
  } = React.useMemo(() => siftLocations(highlightLocations), [
    highlightLocations,
  ])

  const labeledPoints = React.useMemo(
    () =>
      highlightRanges
        .map(toLabeledRange)
        .flat()
        .concat(highlightPoints.map((point) => ({ label: 'point', point }))),
    [highlightRanges, highlightPoints]
  )

  const onClickNode = React.useCallback(
    ([node, path]: NodeEntry<Node>) => {
      if (mode === 'path') {
        onSelect?.(path)
        return
      }

      const { anchorNode, anchorOffset } = document.getSelection() ?? {}
      let offset = 0

      if (Text.isText(node) && anchorNode) {
        const spanElement = anchorNode.parentElement

        if (spanElement?.classList.contains('text-token')) {
          const nodeText = anchorNode.textContent
          const containerText = spanElement?.parentElement?.textContent

          if (nodeText && containerText) {
            offset = containerText.lastIndexOf(nodeText) + anchorOffset!
          }
        }
      }

      onSelect?.({
        path,
        offset,
      })
    },
    [mode, onSelect]
  )

  return (
    <div css={componentCss} className={className}>
      <header>
        <span>Path</span>
        <span>Node</span>
      </header>
      <main>
        <ul>
          {nodeEntries.map(([node, path]) => {
            const isSelected = highlightPaths.find((p) => Path.equals(p, path))
            return (
              <li
                css={(theme: Theme) => css`
                  display: flex;
                  ${mode === 'path' && onSelect && hoverCss(theme)}
                  ${isSelected ? selectedNodeCss(theme) : undefined}
                `}
                className={isSelected ? 'selected' : undefined}
                key={JSON.stringify(path)}
                onClick={() => onClickNode([node, path])}
              >
                <span>
                  {JSON.stringify(path)}
                  {pathToSpace(path, 4)}
                </span>
                <span
                  css={css`
                    position: relative;
                  `}
                >
                  {nodeSpec(mode, [node, path], labeledPoints)}
                </span>
              </li>
            )
          })}
        </ul>
      </main>
    </div>
  )
}

export default NodeSpec

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

/** Return a ordered, labeled range */
function toLabeledRange(
  range: Range
): [{ label: string; point: Point }, { label: string; point: Point }] {
  const anchor = { label: 'anchor', point: range.anchor }
  const focus = { label: 'focus', point: range.focus }

  return Range.isForward(range) ? [anchor, focus] : [focus, anchor]
}

function nodeSpec(
  mode: 'path' | 'point',
  [node, path]: NodeEntry<Node>,
  labeledPoints: { label: string; point: Point }[] = []
): React.ReactNode {
  if (Editor.isEditor(node)) {
    return 'editor'
  }

  if (Element.isElement(node)) {
    return `type:${node.type ?? ''}`
  }

  if (Text.isText(node)) {
    const tokens = nodeTokens([node, path], labeledPoints)

    return (
      <span
        css={
          mode === 'point' &&
          css`
            :hover {
              background-color: #1fa8fd;
            }
          `
        }
        className="text-node-content"
      >
        {tokens.map((token, i) =>
          typeof token === 'string' ? (
            <span
              css={
                mode === 'point' &&
                css`
                  cursor: text;
                `
              }
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

  return 'unknown'
}

function pathToSpace(path: Path, spacesPerLevel: number = 2) {
  const spaces = []
  for (let i = 0; i < path.length * spacesPerLevel; ++i) {
    spaces.push('\xa0')
  }
  return spaces.join('')
}
