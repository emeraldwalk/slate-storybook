/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { createEditor, Node } from 'slate'
import { Slate, withReact } from 'slate-react'

const componentCss = css`
  [contenteditable='true'] {
    border: 1px solid #ccc;
    padding: 4px;
  }
`

export interface SlateContextProps {
  initialValue: Node[] | (() => Node[])
}

const SlateContext: React.FC<SlateContextProps> = ({
  initialValue,
  children,
}) => {
  const editor = React.useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = React.useState<Node[]>(initialValue)

  return (
    <div css={componentCss}>
      <Slate editor={editor} value={value} onChange={setValue}>
        {children}
      </Slate>
    </div>
  )
}

export default SlateContext
