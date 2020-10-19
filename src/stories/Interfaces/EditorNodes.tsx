/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Editor, Element, Text, Path } from 'slate'
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  useEditor,
} from 'slate-react'
import { NodeSelector, NodeSpecContainer, Selector } from '../../components'
import { useNodeSpecContext } from '../../components/NodeSpec'
import { Theme } from '../../theme'
import { not } from '../../util/callbacks'

const componentCss = css`
  display: flex;
  flex-direction: column;

  > :nth-of-type(1) {
    /* height: 250px; */
  }

  [contenteditable='true'] {
    overflow-y: auto;
  }

  @media (max-width: 768px) {
    .no-mobile {
      display: none;
    }
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
  renderLeaf: (props: RenderLeafProps) => JSX.Element
}

const EditorNodes: React.FC<EditorNodesProps> = ({
  renderElement,
  renderLeaf,
}) => {
  return (
    <div css={componentCss}>
      <h2>API</h2>
      <EditorNodesControls />
      <div
        css={css`
          display: flex;
          > * {
            flex-grow: 1;
          }
          @media (max-width: 768px) {
            flex-direction: column;
            .no-mobile {
              display: none;
            }
          }
        `}
      >
        <div>
          <h2>Editor</h2>
          <Editable
            css={componentCss}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
          />
        </div>
        <div>
          <h2>Data Model</h2>
          <NodeSpecContainer css={nodeSpecCss} />
        </div>
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
  const [universal, setUniversal] = React.useState<boolean | undefined>(
    undefined
  )
  const [reverse, setReverse] = React.useState<boolean | undefined>(undefined)
  const [voids, setVoids] = React.useState<boolean | undefined>(undefined)

  const intervalRef = React.useRef<number>()

  // console.log('at:', at, 'mode:', mode ? mode : undefined, 'match:', match)

  const onClick = React.useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault()
      console.log(reverse)
      const paths = [
        ...Editor.nodes(editor, {
          at,
          match: matches[match!],
          mode: mode ? mode : undefined,
          universal,
          reverse,
          voids,
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
    [at, editor, match, mode, universal, reverse, voids, setHighlightLocations]
  )

  return (
    <div
      css={(theme: Theme) => css`
        display: flex;
        flex-direction: column;
        > pre > span {
          display: flex;
          align-items: center;
          label {
            margin: 0 1em 0 2em;
          }
          input,
          select {
            width: 100px;
          }
        }
        input,
        select {
          height: 22px;
        }
        select.is-empty {
          color: ${theme.placeholderColor};
        }
        button {
          margin-top: 10px;
        }
      `}
    >
      <header>
        <select>
          <option>Editor.nodes</option>
        </select>
      </header>
      <pre>
        <span
          css={css`
            color: #6a9955;
          `}
        >
          {`/**
 * Iterate through all of the nodes in the Editor.
 *
 * @param editor Editor containing the nodes to iterate
 * @param options.at Location to constrain the list of nodes to. Defaults to editor.selection
 * @param options.match Predicate function to filter the list of yielded nodes
 * @param options.mode Determines which nodes TODO:
 */`}
        </span>
        {`*nodes<T extends Node>(
  editor: Editor,
  options: {`}
        <span>
          <label>
            <span
              css={css`
                color: #9cdcfe;
              `}
            >
              at
            </span>
            ?: Location | Span
          </label>
          <NodeSelector
            mode="path"
            placeholder="- at -"
            value={at}
            onChange={setAt}
          />
        </span>

        <span>
          <label>match?: NodeMatch&lt;T&gt;</label>
          <Selector
            label="match"
            options={Object.keys(matches) as Match[]}
            value={match}
            onChange={setMatch}
          />
        </span>

        <span>
          <label>mode?: 'all' | 'highest' | 'lowest'</label>
          <Selector
            label="mode"
            options={['all', 'highest', 'lowest']}
            value={mode}
            onChange={setMode}
          />
        </span>

        <span>
          <label>universal?: boolean</label>
          <Selector
            label="universal"
            options={[true, false]}
            value={universal}
            onChange={setUniversal}
          />
        </span>

        <span>
          <label>reverse?: boolean</label>
          <Selector
            label="reverse"
            options={[true, false]}
            value={reverse}
            onChange={setReverse}
          />
        </span>

        <span>
          <label>voids?: boolean</label>
          <Selector
            label="voids"
            options={[true, false]}
            value={voids}
            onChange={setVoids}
          />
        </span>
        {`  } = {}
): Generator<NodeEntry<T>, void, undefined>`}
      </pre>
      <button onClick={onClick}>Run</button>
    </div>
  )
}
