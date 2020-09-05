import React from 'react'

/**
 * Hook for logging console output to an HTML element.
 * Uses refs + native DOM api so that a React render isn't required
 * for updating the console.
 *
 * @returns a Console component + some functions to manipulate it.
 */
export function useConsoleRef() {
  const linesRef = React.useRef<string[]>([])
  const consoleRef = React.useRef<HTMLPreElement>(null)

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

  const Console = React.useMemo(
    () => () => (
      <div>
        <header className="header">
          <span>Console</span>
          <button className="clear-console" onClick={clearConsole}>
            Clear
          </button>
        </header>

        <pre ref={consoleRef}></pre>
      </div>
    ),
    [clearConsole]
  )

  return {
    clearConsole,
    logToConsole,
    Console,
  }
}
