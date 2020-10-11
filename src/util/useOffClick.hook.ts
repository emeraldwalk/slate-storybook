import React from 'react'

export function useOffClickCallback(
  ignoreElement: HTMLElement | null,
  callback: () => void
): void {
  React.useEffect(() => {
    function offClick(event: MouseEvent) {
      if (ignoreElement?.contains(event.target as Node)) {
        return
      }
      callback()
    }

    document.addEventListener('click', offClick)
    return () => {
      document.removeEventListener('click', offClick)
    }
  }, [ignoreElement, callback])
}
