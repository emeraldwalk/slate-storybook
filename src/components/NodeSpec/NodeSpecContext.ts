import React from 'react'
import { Location } from 'slate'

interface NodeSpecContextValue {
  highlightLocations: Location[]
  setHighlightLocations: (
    locations: Location[] | ((locations: Location[]) => Location[])
  ) => void
}

const NodeSpecContext = React.createContext<NodeSpecContextValue>(
  (null as unknown) as NodeSpecContextValue
)

export const NodeSpecContextProvider = NodeSpecContext.Provider

export function useNodeSpecContext() {
  return React.useContext(NodeSpecContext)
}
