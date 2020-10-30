/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { createEditor, Node, NodeEntry, Range, Text } from 'slate'
import {
  DefaultLeaf,
  Editable,
  RenderLeafProps,
  Slate,
  withReact,
} from 'slate-react'
import SourceLink from '../SourceLink'
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
  const { logToConsole, clearConsole, Console } = useConsoleRef()
  logToConsole('render component')

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

      if (Text.isText(node)) {
        logToConsole(`decorate: ${JSON.stringify(path)} "${Node.string(node)}"`)

        // testing 2 arbitrary decorations on different ranges
        ranges.push({
          anchor: { path, offset: 0 },
          focus: { path, offset: node.text.length },
          isAny: true,
        })
        ranges.push({
          anchor: { path, offset: 0 },
          focus: { path, offset: 1 },
          isFirst: 'Y',
        })
      } else {
        logToConsole(`decorate: ${JSON.stringify(path)}`)
      }

      return ranges
    },
    [logToConsole]
  )

  const renderLeaf = React.useCallback(
    (props: RenderLeafProps) => {
      logToConsole(`renderLeaf: ${JSON.stringify(props.leaf)}`)
      return <DefaultLeaf {...props} />
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
        <Editable
          decorate={decorate}
          spellCheck={false}
          placeholder="Type to see when decorate function is called..."
          renderLeaf={renderLeaf}
        />
      </Slate>

      <Console />
      <SourceLink path={'src/stories/Editor/EditorWithDecorations.tsx#L42'} />
    </div>
  )
}

export default EditorWithDecorations
