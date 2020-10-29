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

export function siftLocations(
  locations: Location[]
): { paths: Path[]; points: Point[]; ranges: Range[] } {
  const paths: Path[] = []
  const points: Point[] = []
  const ranges: Range[] = []

  for (const location of locations) {
    if (Path.isPath(location)) {
      paths.push(location)
    } else if (Point.isPoint(location)) {
      points.push(location)
    } else if (Range.isRange(location)) {
      ranges.push(location)
    }
  }

  return {
    paths,
    points,
    ranges,
  }
}

/**
 * Return a ordered, labeled range
 */
export function toLabeledRange(
  range: Range
): [{ label: string; point: Point }, { label: string; point: Point }] {
  const anchor = { label: 'anchor', point: range.anchor }
  const focus = { label: 'focus', point: range.focus }

  return Range.isForward(range) ? [anchor, focus] : [focus, anchor]
}
