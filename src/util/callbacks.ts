/** Negate a predicate */
export function not<TValue>(predicate: (value: TValue) => boolean) {
  return (value: TValue): boolean => {
    return !predicate(value)
  }
}
