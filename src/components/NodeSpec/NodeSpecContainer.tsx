import React from 'react'
import { useSlate } from 'slate-react'
import { NodeSpec, useNodeSpecContext } from '.'

export interface NodeSpecContainerProps {
  className?: string
}

const NodeSpecContainer: React.FC<NodeSpecContainerProps> = ({ className }) => {
  const { selection } = useSlate()
  const { highlightLocations } = useNodeSpecContext()

  const highlightLocationsWithSelection = React.useMemo(
    () => (selection ? [selection, ...highlightLocations] : highlightLocations),
    [selection, highlightLocations]
  )

  return (
    <NodeSpec
      className={className}
      mode="path"
      highlightLocations={highlightLocationsWithSelection}
    />
  )
}

export default NodeSpecContainer
