/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Editor, Element, Text, Node } from 'slate'
import { Editable, RenderElementProps, useEditor } from 'slate-react'
import { NodeSpecContainer, Selector } from '../../components'
import { useNodeSpecContext } from '../../components/NodeSpec'
import { useOnValueChangeCallback } from '../../util/useOnValueChangeCallback.hook'

const componentCss = css`
  flex-grow: 1;
  [contenteditable='true'] {
    overflow-y: auto;
  }
`
const nodeSpecCss = css``

type Mode = 'highest' | 'lowest' | 'all'
const matches = {
  '(n) => !Editor.isEditor(n)': (n: Node) => !Editor.isEditor(n),
  'Editor.isEditor(n)': Editor.isEditor,
  'Element.isElement': Element.isElement,
  'Text.isText': Text.isText,
} as const
type Match = keyof typeof matches

export interface EditorNodesProps {
  renderElement: (props: RenderElementProps) => JSX.Element
}

const EditorNodes: React.FC<EditorNodesProps> = ({ renderElement }) => {
  const editor = useEditor()
  const { setHighlightLocations } = useNodeSpecContext()

  const [at, setAt] = React.useState('')
  const [match, setMatch] = React.useState<Match | undefined>(undefined)
  const [mode, setMode] = React.useState<Mode | undefined>(undefined)

  console.log('at:', at, 'mode:', mode ? mode : undefined, 'match:', match)

  const onClick = React.useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault()

      const paths = [
        ...Editor.nodes(editor, {
          at: at ? JSON.parse(at) : undefined,
          match: matches[match!],
          mode: mode ? mode : undefined,
        }),
      ].map(([, path]) => path)

      setHighlightLocations(paths)
    },
    [at, editor, match, mode, setHighlightLocations]
  )

  const onAtChange = useOnValueChangeCallback(setAt)

  return (
    <div css={componentCss}>
      <div
        css={css`
          display: flex;
          justify-content: space-evenly;
          height: 280px;
        `}
      >
        <Editable css={componentCss} renderElement={renderElement} />
        <div
          css={css`
            display: flex;
            flex-direction: column;
          `}
        >
          <input
            type="text"
            placeholder="- at - (defaults to selection)"
            value={at}
            onChange={onAtChange}
          />

          <Selector
            label="match"
            options={Object.keys(matches) as Match[]}
            value={match}
            onChange={setMatch}
          />

          <Selector
            label="mode"
            options={['all', 'highest', 'lowest']}
            value={mode}
            onChange={setMode}
          />

          <button onClick={onClick}>Go</button>
        </div>
        <NodeSpecContainer css={nodeSpecCss} />
      </div>
    </div>
  )
}

export default EditorNodes
