import { Location, Path, Point, Range } from 'slate'

export function filterToLocations(data: unknown[]): Location[] {
  const locations: Location[] = []

  for (const datum of data) {
    if (Array.isArray(datum) && datum.length === 2 && Path.isPath(datum[1])) {
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
