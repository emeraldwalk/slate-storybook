/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Editor, Node, Point, Text } from 'slate'
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  useSlate,
} from 'slate-react'
import { NodeSpecContainer } from '../../components'

const componentCss = css``

export interface SandboxProps {
  renderElement: (props: RenderElementProps) => JSX.Element
  renderLeaf: (props: RenderLeafProps) => JSX.Element
}

const Sandbox: React.FC<SandboxProps> = ({ renderElement, renderLeaf }) => {
  const editor = useSlate()
  // const { setHighlightLocations } = useNodeSpecContext()

  const test = editorRange
  const [result, setResult] = React.useState<
    ReturnType<typeof test> | undefined
  >(undefined)

  const onClick = React.useCallback(() => {
    const result = test(editor)
    setResult(result)
    // setHighlightLocations(result)
  }, [editor, test])

  return (
    <div css={componentCss}>
      <div
        css={css`
          display: flex;
          > * {
            flex-grow: 1;
          }
        `}
      >
        <Editable
          css={componentCss}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
        <NodeSpecContainer />
      </div>
      <button onClick={onClick}>Run</button>
      <pre>{JSON.stringify(result, undefined, 2)}</pre>
    </div>
  )
}

export default Sandbox

function editorRange(editor: Editor) {
  const testSelection = { path: [0, 3, 0], offset: 0 }

  return isValidPoint(editor, testSelection)
}

function isValidPoint(editor: Editor, { path, offset }: Point): boolean {
  try {
    const node = Node.get(editor, path)
    return Text.isText(node) && offset < node.text.length
  } catch {
    return false
  }
}
