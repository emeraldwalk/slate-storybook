import React from 'react'

export function useOffClickCallback(
  ignoreElement: HTMLElement | null,
  callback: () => void
): void {
  React.useEffect(() => {
    function offClick(event: MouseEvent) {
      if (
        ignoreElement?.contains(event.target as Node) ||
        (event.target as Element).classList.contains('ignore-off-click')
      ) {
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
