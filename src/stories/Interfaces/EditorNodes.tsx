/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Editor, Element, Text, Path } from 'slate'
import { Editable, RenderElementProps, useEditor } from 'slate-react'
import { NodeSelector, NodeSpecContainer, Selector } from '../../components'
import { useNodeSpecContext } from '../../components/NodeSpec'
import { not } from '../../util/callbacks'

const componentCss = css`
  flex-grow: 1;
  [contenteditable='true'] {
    overflow-y: auto;
  }
`
const nodeSpecCss = css``

type Mode = 'highest' | 'lowest' | 'all'
const matches = {
  'not(Editor.isEditor)': not(Editor.isEditor),
  'Editor.isEditor': Editor.isEditor,
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

  const [at, setAt] = React.useState<Path | undefined>(undefined)
  const [match, setMatch] = React.useState<Match | undefined>(undefined)
  const [mode, setMode] = React.useState<Mode | undefined>(undefined)

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

      let i = 0
      let interval = setInterval(() => {
        if (++i <= paths.length) {
          setHighlightLocations(paths.slice(0, i))
        } else {
          clearInterval(interval)
        }
      }, 500)
    },
    [at, editor, match, mode, setHighlightLocations]
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
          <NodeSelector mode="path" value={at} onChange={setAt} />

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
