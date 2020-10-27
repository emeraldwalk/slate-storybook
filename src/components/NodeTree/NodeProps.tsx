/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Node, Text } from 'slate'

const componentCss = css``

export interface NodePropsProps {
  className?: string
  node: Node
}

const NodeProps: React.FC<NodePropsProps> = ({ className, node }) => {
  const props = Text.isText(node)
    ? Object.keys(node).filter((prop) => prop !== 'text')
    : Object.keys(node).filter((prop) => prop !== 'children' && Text)
  return (
    <span css={componentCss} className={className}>
      {props.map((p) => (
        <span key={p}>
          {p}={JSON.stringify(node[p])}
        </span>
      ))}
    </span>
  )
}

export default NodeProps
