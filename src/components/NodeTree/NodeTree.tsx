/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Editor, Node, Element, Text, Path } from 'slate'
import { EditorNode, ElementNode, TextNode } from '..'
import { Theme } from '../../theme'
import { useNodeSpecContext } from '../NodeSpec'
import TextNodeContent from './TextNodeContent'

const componentCss = ({ textInverseColor, color: { node } }: Theme) =>
  css`
    background-color: ${node.backgroundColor};
    color: ${textInverseColor};
    font-size: 0.9em;
  `

const selectedNodeCss = (theme: Theme) => css`
  background-color: ${theme.barSelectedColor};
  color: ${theme.textInverseColor};
`

export interface NodeTreeProps {
  className?: string
  node: Node
  path?: Path
  initialIsExpanded?: boolean
  showHighlightedLocations?: boolean
}

const NodeTree: React.FC<NodeTreeProps> = ({
  className,
  node,
  path = [],
  initialIsExpanded = true,
  showHighlightedLocations,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(initialIsExpanded)
  const chevronIconClass = isExpanded
    ? 'mdi mdi-chevron-down'
    : 'mdi mdi-chevron-right'

  const { highlightPaths } = useNodeSpecContext()
  const isSelected =
    showHighlightedLocations && highlightPaths.find((p) => Path.equals(p, path))

  const nodeCss = (theme: Theme) => css`
    ${isSelected ? selectedNodeCss(theme) : undefined}
  `

  let nodeView: React.ReactNode = null

  if (Editor.isEditor(node)) {
    nodeView = <EditorNode css={nodeCss} node={node} path={path} />
  } else if (Element.isElement(node)) {
    nodeView = <ElementNode css={nodeCss} node={node} path={path} />
  } else if (Text.isText(node)) {
    nodeView = <TextNode css={nodeCss} node={node} path={path} />
  }

  return (
    <div css={componentCss} className={className}>
      <span
        css={css`
          display: flex;
        `}
        onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
      >
        <i className={chevronIconClass}></i>
        {nodeView}
      </span>

      {isExpanded && (
        <div
          css={css`
            padding-left: 20px;
          `}
        >
          {Text.isText(node) ? (
            <div
              css={(theme: Theme) => css`
                color: ${theme.color.node.stringColor};
                padding-left: 20px;
                ${isSelected ? selectedNodeCss(theme) : undefined}
              `}
            >
              &quot;
              <TextNodeContent node={node} path={path} />
              &quot;
            </div>
          ) : (
            node.children.map((child, i) => {
              const childPath = path.concat(i)
              return (
                <NodeTree
                  key={childPath.join(',')}
                  node={child}
                  path={childPath}
                  initialIsExpanded={initialIsExpanded}
                  showHighlightedLocations={showHighlightedLocations}
                />
              )
            })
          )}
        </div>
      )}
    </div>
  )
}

export default NodeTree
