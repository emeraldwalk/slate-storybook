/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { createEditor, Node } from 'slate'
import { Editable, Slate, withReact, RenderLeafProps } from 'slate-react'
import {
  Leaf,
  mockWords,
  useSpellcheckDecorate,
} from '../../plugins/spellcheckPlugin'

const componentCss = css`
  border: 1px solid #ccc;
`

export interface EditorWithSpellcheckProps {
  initialValue: Node[]
}

const EditorWithSpellcheck: React.FC<EditorWithSpellcheckProps> = ({
  initialValue,
}) => {
  const editor = React.useMemo(() => withReact(createEditor()), [])
  let [value, setValue] = React.useState<Node[]>(initialValue)

  const checkWords = React.useCallback(async (words: string[]) => {
    console.log('check words:', words)

    return Promise.resolve(
      words.map((word) => ({
        word,
        isMisspelled: !mockWords[word],
        suggestions: [],
      }))
    )
  }, [])

  const decorate = useSpellcheckDecorate(editor, checkWords)

  const renderLeaf = React.useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  )

  return (
    <div css={componentCss}>
      <Slate editor={editor} value={value} onChange={setValue}>
        <Editable
          decorate={decorate}
          renderLeaf={renderLeaf}
          spellCheck={false}
        />
      </Slate>
    </div>
  )
}

export default EditorWithSpellcheck
