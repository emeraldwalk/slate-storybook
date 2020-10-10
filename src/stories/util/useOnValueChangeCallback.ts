import React from 'react'

export function useOnValueChangeCallback(callback: (value: string) => void) {
  return React.useCallback(
    ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
      callback(currentTarget.value)
    },
    [callback]
  )
}
