import React from 'react'
import { Node, NodeEntry } from 'slate'

interface NodeSpecContextValue {
  selectedNodeEntries: NodeEntry<Node>[]
  setSelectedNodeEntries: (
    nodeEntries:
      | NodeEntry<Node>[]
      | ((nodeEntries: NodeEntry<Node>[]) => NodeEntry<Node>[])
  ) => void
}

const NodeSpecContext = React.createContext<NodeSpecContextValue>(
  (null as unknown) as NodeSpecContextValue
)

export const NodeSpecContextProvider = NodeSpecContext.Provider

export function useNodeSpecContext() {
  return React.useContext(NodeSpecContext)
}
