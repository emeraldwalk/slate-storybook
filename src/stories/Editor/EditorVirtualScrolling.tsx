/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { createEditor, Node, NodeEntry, Range } from 'slate'
import { Editable, RenderElementProps, Slate, withReact } from 'slate-react'

const componentCss = css`
  [contenteditable='true'] {
    border: 1px solid #ccc;
    padding: 4px;
  }
`

export interface EditorVirtualScrollingProps {
  initialValue: Node[]
}

const EditorVirtualScrolling: React.FC<EditorVirtualScrollingProps> = ({
  initialValue,
}) => {
  const editor = React.useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = React.useState(initialValue)
  const virtualValue = React.useMemo(() => value.slice(0, 2), [value])

  const decorate = React.useCallback(([node, path]: NodeEntry<Node>) => {
    const ranges: Range[] = []

    if (path.length === 1 && path[0] < 3) {
      ranges.push({
        anchor: { path, offset: 0 },
        focus: { path, offset: 2 },
        virtual: true,
      })
    }

    return ranges
  }, [])

  const renderElement = React.useCallback(
    ({ element, attributes, children }: RenderElementProps) => {
      return (
        <div style={{ color: true ? 'green' : undefined }} {...attributes}>
          {children}
        </div>
      )
    },
    []
  )

  return (
    <div css={componentCss}>
      <Slate editor={editor} value={virtualValue} onChange={setValue}>
        <Editable
          decorate={decorate}
          // as={VirtualDocument}
          renderElement={renderElement}
        />
      </Slate>
    </div>
  )
}

export default EditorVirtualScrolling

// interface VirtualDocumentProps {}

// const VirtualDocument: React.FC<VirtualDocumentProps> = React.forwardRef<
//   HTMLDivElement,
//   VirtualDocumentProps
// >(({ children, ...props }, ref) => {
//   console.log(props, children)
//   return (
//     <div ref={ref} {...props}>
//       <div contentEditable={false}>Blah</div>
//       {children}
//       <div contentEditable={false}>Bleh</div>
//     </div>
//   )
// })
