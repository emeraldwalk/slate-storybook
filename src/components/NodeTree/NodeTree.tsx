/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Editor, Node, Element, Text, Path } from 'slate'
import { EditorNode, ElementNode, TextNode } from '..'
import { Theme } from '../../theme'

const componentCss = ({ textInverseColor, color: { node } }: Theme) =>
  css`
    background-color: ${node.backgroundColor};
    color: ${textInverseColor};
    font-size: 0.9em;
  `

export interface NodeTreeProps {
  className?: string
  node: Node
  path?: Path
  initialIsExpanded?: boolean
}

const NodeTree: React.FC<NodeTreeProps> = ({
  className,
  node,
  path = [],
  initialIsExpanded = true,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(initialIsExpanded)
  const chevronIconClass = isExpanded
    ? 'mdi mdi-chevron-down'
    : 'mdi mdi-chevron-right'

  let nodeView: React.ReactNode = null

  if (Editor.isEditor(node)) {
    nodeView = <EditorNode node={node} path={path} />
  } else if (Element.isElement(node)) {
    nodeView = <ElementNode node={node} path={path} />
  } else if (Text.isText(node)) {
    nodeView = <TextNode node={node} path={path} />
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
              css={({ color: { node } }: Theme) => css`
                color: ${node.stringColor};
                padding-left: 20px;
              `}
            >
              &quot;{node.text}&quot;
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
