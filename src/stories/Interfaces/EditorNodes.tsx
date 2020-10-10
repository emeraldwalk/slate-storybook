/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Editor, Element, Text, Node } from 'slate'
import { Editable, RenderElementProps, useEditor } from 'slate-react'
import { NodeSpec } from '../../components'
import { useNodeSpecContext } from '../../components/NodeSpec'
import { useOnValueChangeCallback } from '../../util/useOnValueChangeCallback.hook'

const componentCss = css`
  flex-grow: 1;
  [contenteditable='true'] {
    overflow-y: auto;
  }
`
const nodeSpecCss = css``

type Mode = 'highest' | 'lowest' | 'all' | undefined
const matches = {
  '(n) => !Editor.isEditor(n)': (n: Node) => !Editor.isEditor(n),
  'Editor.isEditor(n)': Editor.isEditor,
  'Element.isElement': Element.isElement,
  'Text.isText': Text.isText,
} as const

export interface EditorNodesProps {
  renderElement: (props: RenderElementProps) => JSX.Element
}

const EditorNodes: React.FC<EditorNodesProps> = ({ renderElement }) => {
  const editor = useEditor()
  const { setSelectedNodeEntries } = useNodeSpecContext()

  const [at, setAt] = React.useState('')
  const [match, setMatch] = React.useState<keyof typeof matches | undefined>(
    undefined
  )
  const [mode, setMode] = React.useState<Mode>(undefined)

  console.log('at:', at, 'mode:', mode ? mode : undefined, 'match:', match)

  const onClick = React.useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault()

      const nodes = [
        ...Editor.nodes(editor, {
          at: at ? JSON.parse(at) : undefined,
          match: matches[match!],
          mode: mode ? mode : undefined,
        }),
      ]

      setSelectedNodeEntries(nodes)
    },
    [at, editor, match, mode, setSelectedNodeEntries]
  )

  const onAtChange = useOnValueChangeCallback(setAt)

  const onMatchChange = React.useCallback(
    ({ currentTarget }: React.ChangeEvent<HTMLSelectElement>) => {
      setMatch(currentTarget.value as keyof typeof matches | undefined)
    },
    []
  )

  const onModeChange = React.useCallback(
    ({ currentTarget }: React.ChangeEvent<HTMLSelectElement>) => {
      const mode = (currentTarget.value
        ? currentTarget.value
        : undefined) as Mode
      setMode(mode)
    },
    []
  )

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

          <select onChange={onMatchChange} value={match}>
            <option value={undefined}>- match -</option>
            {Object.keys(matches).map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>

          <select onChange={onModeChange} value={mode}>
            <option value={undefined}>- mode -</option>
            {['all', 'highest', 'lowest'].map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>

          <button onClick={onClick}>Go</button>
        </div>
        <NodeSpec css={nodeSpecCss} />
      </div>
    </div>
  )
}

export default EditorNodes
