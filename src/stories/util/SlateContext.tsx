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
  onChange?: (value: Node[]) => void
}

const SlateContext: React.FC<SlateContextProps> = ({
  initialValue,
  children,
  onChange,
}) => {
  const editor = React.useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = React.useState<Node[]>(initialValue)

  const onChangeInternal = React.useCallback(
    (value: Node[]) => {
      setValue(value)
      onChange?.(value)
    },
    [onChange]
  )

  return (
    <div css={componentCss}>
      <Slate editor={editor} value={value} onChange={onChangeInternal}>
        {children}
      </Slate>
    </div>
  )
}

export default SlateContext
