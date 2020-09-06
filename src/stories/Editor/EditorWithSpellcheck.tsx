/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { createEditor, Node } from 'slate'
import { Editable, Slate, withReact, RenderLeafProps } from 'slate-react'
import {
  Leaf,
  mockWords,
  SpellcheckResult,
  useSpellcheckDecorate,
  withSpellcheck,
} from '../../plugins/spellcheckPlugin'

const componentCss = css`
  border: 1px solid #ccc;
`

/** Mocking a spellcheck service */
async function mockCheckWords(words: string[]): Promise<SpellcheckResult[]> {
  return Promise.resolve(
    words.map((word) => ({
      word,
      isMisspelled: !mockWords[word],
      suggestions: [],
    }))
  )
}

export interface EditorWithSpellcheckProps {
  initialValue: Node[]
}

const EditorWithSpellcheck: React.FC<EditorWithSpellcheckProps> = ({
  initialValue,
}) => {
  const resultsCache = React.useRef<Record<string, SpellcheckResult>>({})
  const decorate = useSpellcheckDecorate(resultsCache.current)
  const renderLeaf = React.useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  )

  const editor = React.useMemo(
    () =>
      withSpellcheck(
        withReact(createEditor()),
        resultsCache.current,
        mockCheckWords
      ),
    []
  )

  const [value, setValue] = React.useState<Node[]>(initialValue)

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
