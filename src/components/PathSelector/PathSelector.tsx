/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Editor, Node, NodeEntry, Path } from 'slate'
import { useSlate } from 'slate-react'
import { NodeSpec } from '..'

const componentCss = css``

export interface PathSelectorProps {
  path?: Path
}

const PathSelector: React.FC<PathSelectorProps> = ({ path }) => {
  const editor = useSlate()
  const [selectedNodeEntries] = React.useState<NodeEntry<Node>[]>(() => {
    return path ? [Editor.node(editor, path)] : []
  })

  return (
    <div css={componentCss}>
      <NodeSpec selectedNodeEntries={selectedNodeEntries} />
    </div>
  )
}

export default PathSelector
