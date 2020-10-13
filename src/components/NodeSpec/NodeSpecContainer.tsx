import React from 'react'
import { NodeSpec, useNodeSpecContext } from '.'

export interface NodeSpecContainerProps {
  className?: string
}

const NodeSpecContainer: React.FC<NodeSpecContainerProps> = ({ className }) => {
  const { highlightLocations } = useNodeSpecContext()

  return (
    <NodeSpec
      className={className}
      mode="path"
      highlightLocations={highlightLocations}
    />
  )
}

export default NodeSpecContainer
