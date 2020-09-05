import React from 'react'

/**
 * Hook for logging console output to an HTML element.
 * Uses refs + native DOM api so that a React render isn't required
 * for updating the console.
 *
 * @returns a ref to be attached to the target console element and a function
 *  for logging to it.
 */
export function useConsoleRef<T extends HTMLElement = HTMLPreElement>() {
  const linesRef = React.useRef<string[]>([])
  const consoleRef = React.useRef<T>(null)

  const flushDebounceRef = React.useRef<NodeJS.Timeout>()
  const flush = React.useCallback(() => {
    clearTimeout(flushDebounceRef.current!)
    flushDebounceRef.current = setTimeout(() => {
      linesRef.current.push(
        '---------------- console flush --------------------'
      )

      if (consoleRef.current) {
        consoleRef.current.innerText = linesRef.current
          .map((line, i) => `${i + 1}: ${line}`)
          .join('\n')

        consoleRef.current.scrollTop = consoleRef.current.scrollHeight
      }
    }, 250)
  }, [])

  const logToConsole = React.useCallback(
    (line: string) => {
      linesRef.current.push(line)
      flush()
    },
    [flush]
  )

  const clearConsole = React.useCallback(() => {
    linesRef.current.length = 0
    if (consoleRef.current) {
      consoleRef.current.innerText = ''
    }
  }, [])

  React.useEffect(() => {
    flush()
  }, [flush])

  return {
    consoleRef,
    clearConsole,
    logToConsole,
  }
}
