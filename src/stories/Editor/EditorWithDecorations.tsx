/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { createEditor, Node, NodeEntry, Range } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'
import { useConsoleRef } from './useConsoleRef.hook'

const componentCss = css`
  [contenteditable='true'] {
    border: 1px solid #ccc;
    padding: 4px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  pre {
    background-color: #333;
    color: #fff;
    height: 250px;
    margin: 0;
    padding: 10px;
    overflow-y: auto;
  }
`

export interface EditorWithDecorationsProps {
  initialValue: Node[]
}

const EditorWithDecorations: React.FC<EditorWithDecorationsProps> = ({
  initialValue,
}) => {
  /** Setup logging */
  const { consoleRef, logToConsole, clearConsole } = useConsoleRef()
  logToConsole('render')

  /** If we change the initialValue in Storybook controls, reset things */
  React.useEffect(() => {
    setValue(initialValue)
  }, [clearConsole, initialValue])

  const editor = React.useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = React.useState<Node[]>(initialValue)

  /** Track when decorate is called by logging node paths */
  const decorate = React.useCallback(
    ([node, path]: NodeEntry<Node>) => {
      const ranges: Range[] = []

      logToConsole(`${JSON.stringify(path)} "${Node.string(node)}"`)

      return ranges
    },
    [logToConsole]
  )

  /** Track what type of changes occur */
  const onChange = React.useCallback(
    (newValue) => {
      logToConsole(`onChange: ${newValue === value ? 'selection' : 'document'}`)
      setValue(newValue)
    },
    [logToConsole, value]
  )

  return (
    <div css={componentCss}>
      <Slate editor={editor} value={value} onChange={onChange}>
        <Editable decorate={decorate} spellCheck={false} />

        <header className="header">
          <span>Console</span>
          <button className="clear-console" onClick={clearConsole}>
            Clear
          </button>
        </header>

        <pre ref={consoleRef}></pre>
      </Slate>
    </div>
  )
}

export default EditorWithDecorations
