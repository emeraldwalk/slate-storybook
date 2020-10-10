import React from 'react'
import { NodeSpec, useNodeSpecContext } from '.'

export interface NodeSpecContainerProps {
  className?: string
}

const NodeSpecContainer: React.FC<NodeSpecContainerProps> = ({ className }) => {
  const { selectedNodeEntries } = useNodeSpecContext()

  return (
    <NodeSpec className={className} selectedNodeEntries={selectedNodeEntries} />
  )
}

export default NodeSpecContainer
