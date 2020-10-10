import React from 'react'
import { Node, NodeEntry } from 'slate'

interface NodeSpecContext {
  selectedNodeEntries: NodeEntry<Node>[]
  setSelectedNodeEntries: (
    nodeEntries:
      | NodeEntry<Node>[]
      | ((nodeEntries: NodeEntry<Node>[]) => NodeEntry<Node>[])
  ) => void
}

const NodeSpecContext = React.createContext<NodeSpecContext>(
  (null as unknown) as NodeSpecContext
)

export const NodeSpecContextProvider = NodeSpecContext.Provider

export function useNodeSpecContext() {
  return React.useContext(NodeSpecContext)
}
