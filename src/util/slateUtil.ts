import { Location, Node, NodeEntry, Path, Point, Range } from 'slate'

export function isNodeEntry(datum: unknown): datum is NodeEntry<Node> {
  return (
    Array.isArray(datum) &&
    datum.length === 2 &&
    Node.isNode(datum[0]) &&
    Path.isPath(datum[1])
  )
}

export function filterToLocations(data: unknown[]): Location[] {
  const locations: Location[] = []

  for (const datum of data) {
    if (isNodeEntry(datum)) {
      locations.push(datum[1])
    } else if (Path.isPath(datum)) {
      locations.push(datum)
    } else if (Point.isPoint(datum)) {
      locations.push(datum)
    } else if (Range.isRange(datum)) {
      locations.push(datum)
    }
  }

  return locations
}
