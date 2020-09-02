/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { createEditor, Node } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'
import { Plugin } from '../../types'

const componentCss = css`
  border: 1px solid #ccc;
`

export interface EditorProps {
  initialValue: Node[],
  plugins?: Plugin[]
}

const Editor: React.FC<EditorProps> = ({
  initialValue,
}) => {
  const editor = React.useMemo(
    () => withReact(createEditor()),
    []
  )

  const [value, setValue] = React.useState<Node[]>(initialValue)

  return (
    <div css={componentCss}>
      <Slate editor={editor} value={value} onChange={setValue}>
        <Editable />
      </Slate>
    </div>
  )
}

export default Editor;