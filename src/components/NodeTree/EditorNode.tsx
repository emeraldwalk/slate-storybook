/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Editor, Path } from 'slate'
import { PathView } from '..'

const componentCss = css`
  display: flex;
`

export interface EditorNodeProps {
  node: Editor
  path: Path
}

const EditorNode: React.FC<EditorNodeProps> = ({ path }) => {
  return (
    <div title="Editor Node" css={componentCss}>
      <i className="mdi mdi-alpha-e-circle-outline"></i>
      <PathView path={path} />
    </div>
  )
}

export default EditorNode
