/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Editor, Element, Text, Path } from 'slate'
import { Editable, RenderElementProps, useEditor } from 'slate-react'
import { NodeSelector, NodeSpecContainer, Selector } from '../../components'
import { useNodeSpecContext } from '../../components/NodeSpec'
import { not } from '../../util/callbacks'

const componentCss = css`
  display: flex;
  flex-direction: column;

  > :nth-of-type(1) {
    height: 250px;
  }

  [contenteditable='true'] {
    overflow-y: auto;
  }
`
const nodeSpecCss = css``

type Mode = 'highest' | 'lowest' | 'all'
const matches = {
  'Editor.isEditor': Editor.isEditor,
  'Element.isElement': Element.isElement,
  'Text.isText': Text.isText,
  'not(Editor.isEditor)': not(Editor.isEditor),
  'not(Element.isElement)': not(Element.isElement),
  'not(Text.isText)': not(Text.isText),
} as const
type Match = keyof typeof matches

export interface EditorNodesProps {
  renderElement: (props: RenderElementProps) => JSX.Element
}

const EditorNodes: React.FC<EditorNodesProps> = ({ renderElement }) => {
  return (
    <div css={componentCss}>
      <Editable css={componentCss} renderElement={renderElement} />
      <div
        css={css`
          display: flex;
          > * {
            flex-grow: 1;
          }
        `}
      >
        <EditorNodesControls />
        <NodeSpecContainer css={nodeSpecCss} />
      </div>
    </div>
  )
}

export default EditorNodes

export const EditorNodesControls: React.FC<{}> = () => {
  const editor = useEditor()
  const { setHighlightLocations } = useNodeSpecContext()

  const [at, setAt] = React.useState<Path | undefined>(undefined)
  const [match, setMatch] = React.useState<Match | undefined>(undefined)
  const [mode, setMode] = React.useState<Mode | undefined>(undefined)

  const intervalRef = React.useRef<number>()

  // console.log('at:', at, 'mode:', mode ? mode : undefined, 'match:', match)

  const onClick = React.useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault()

      const paths = [
        ...Editor.nodes(editor, {
          at,
          match: matches[match!],
          mode: mode ? mode : undefined,
        }),
      ].map(([, path]) => path)

      setHighlightLocations([])
      window.clearInterval(intervalRef.current)

      let i = 0
      intervalRef.current = window.setInterval(() => {
        if (++i <= paths.length) {
          setHighlightLocations(paths.slice(0, i))
        } else {
          window.clearInterval(intervalRef.current)
        }
      }, 500)
    },
    [at, editor, match, mode, setHighlightLocations]
  )

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        > span {
          display: flex;
          > * {
            flex: 1 0;
          }
        }
      `}
    >
      <h2>Editor.nodes&lt;T extends Node&gt;(editor, options)</h2>

      <span>
        <label>at?: </label>
        <span>Location | Span</span>
        <NodeSelector mode="path" value={at} onChange={setAt} />
      </span>

      <span>
        <label>match?:</label>
        <span>NodeMatch&lt;T&gt;</span>
        <Selector
          label="match"
          options={Object.keys(matches) as Match[]}
          value={match}
          onChange={setMatch}
        />
      </span>

      <span>
        <label>mode?:</label>
        <span>'all' | 'highest' | 'lowest'</span>
        <Selector
          label="mode"
          options={['all', 'highest', 'lowest']}
          value={mode}
          onChange={setMode}
        />
      </span>

      <span>
        <label>universal?:</label>
        <span>boolean</span>
        <span>true | false</span>
      </span>

      <span>
        <label>reverse?:</label>
        <span>boolean</span>
        <span>true | false</span>
      </span>

      <span>
        <label>voids?:</label>
        <span>boolean</span>
        <span>true | false</span>
      </span>

      <button onClick={onClick}>Go</button>
    </div>
  )
}
