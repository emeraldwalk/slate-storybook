export function asArray(data: any): unknown[] {
  if (Array.isArray(data)) {
    return data
  }

  if (data && typeof data[Symbol.iterator] === 'function') {
    return [...data]
  }

  return [data]
}
