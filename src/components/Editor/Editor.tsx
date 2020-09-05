/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import {
  createEditor,
  Editor as SlateEditor,
  Node,
  NodeEntry,
  Range,
} from 'slate'
import {
  Editable,
  ReactEditor,
  RenderLeafProps,
  Slate,
  withReact,
} from 'slate-react'
import { Plugin, withPlugins } from './withPlugins'

const componentCss = css`
  border: 1px solid #ccc;
`

export interface EditorProps {
  initialValue: Node[]
  plugins?: Plugin<SlateEditor & ReactEditor>[]
  createDecorate?: <TEditor extends SlateEditor>(
    editor: TEditor
  ) => (entry: NodeEntry<Node>) => Range[]
  renderLeaf?: (props: RenderLeafProps) => JSX.Element
}

const Editor: React.FC<EditorProps> = ({
  initialValue,
  plugins = [],
  createDecorate,
  renderLeaf,
}) => {
  const editor = React.useMemo(
    () => withPlugins(withReact, ...plugins)(createEditor()),
    [plugins]
  )

  const [value, setValue] = React.useState<Node[]>(initialValue)
  // console.log(JSON.stringify(value, undefined, 2))
  console.log(JSON.stringify(editor.selection, undefined, 2))
  return (
    <div css={componentCss}>
      <Slate editor={editor} value={value} onChange={setValue}>
        <Editable
          decorate={createDecorate && createDecorate(editor)}
          renderLeaf={renderLeaf}
          spellCheck={false}
        />
      </Slate>
    </div>
  )
}

export default Editor
