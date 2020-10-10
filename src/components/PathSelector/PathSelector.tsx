/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Node, NodeEntry } from 'slate'
import { NodeSpec } from '..'

const componentCss = css``

export interface PathSelectorProps {}

const PathSelector: React.FC<PathSelectorProps> = () => {
  const [selectedNodeEntries] = React.useState<NodeEntry<Node>[]>([])

  return (
    <div css={componentCss}>
      <NodeSpec selectedNodeEntries={selectedNodeEntries} />
    </div>
  )
}

export default PathSelector
