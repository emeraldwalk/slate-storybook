import React from 'react'
import { Editor } from 'slate'
import { useSlate } from 'slate-react'
import { NodeSpec, useNodeSpecContext } from '.'

export interface NodeSpecContainerProps {
  className?: string
}

const NodeSpecContainer: React.FC<NodeSpecContainerProps> = ({ className }) => {
  const editor = useSlate()
  const nodeEntries = [...Editor.nodes(editor, { at: [] })]
  const { selectedNodeEntries } = useNodeSpecContext()

  return (
    <NodeSpec
      className={className}
      editor={editor}
      nodeEntries={nodeEntries}
      selectedNodeEntries={selectedNodeEntries}
    />
  )
}

export default NodeSpecContainer
