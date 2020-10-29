/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Editor, Path } from 'slate'
import { PathView } from '..'

const componentCss = css`
  display: flex;
  > * {
    margin-right: 0.3em;
  }
`

export interface EditorNodeProps {
  className?: string
  node: Editor
  path: Path
}

const EditorNode: React.FC<EditorNodeProps> = ({ className, path }) => {
  return (
    <div title="Editor Node" css={componentCss} className={className}>
      <i className="mdi mdi-alpha-e-circle-outline"></i>
      <PathView path={path} />
    </div>
  )
}

export default EditorNode
