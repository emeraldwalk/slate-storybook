import React from 'react'
import { Location } from 'slate'
import { siftLocations, toLabeledRange } from '../../util/slateUtil'

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
  const { highlightLocations, setHighlightLocations } = React.useContext(
    NodeSpecContext
  )

  const {
    paths: highlightPaths,
    points: highlightPoints,
    ranges: highlightRanges,
  } = React.useMemo(() => siftLocations(highlightLocations), [
    highlightLocations,
  ])

  const labeledPoints = React.useMemo(
    () =>
      highlightRanges
        .map(toLabeledRange)
        .flat()
        .concat(highlightPoints.map((point) => ({ label: 'point', point }))),
    [highlightRanges, highlightPoints]
  )

  return {
    highlightLocations,
    setHighlightLocations,
    highlightPaths,
    highlightPoints,
    highlightRanges,
    labeledPoints,
  }
}
