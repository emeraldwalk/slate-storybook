/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Path, Text } from 'slate'
import { NodeProps, PathView } from '..'
import { Theme } from '../../theme'

const componentCss = ({ color: { node } }: Theme) => css`
  display: flex;
  i {
    color: ${node.text};
  }
  > * {
    margin-right: 0.3em;
  }
`

const propsCss = ({ textInverseColor }: Theme) => css`
  color: ${textInverseColor};
`

export interface TextNodeProps {
  className?: string
  node: Text
  path: Path
}

const TextNode: React.FC<TextNodeProps> = ({ className, node, path }) => {
  return (
    <div title="Text Node" css={componentCss} className={className}>
      <i className="mdi mdi-alpha-t-circle-outline"></i>
      <PathView
        css={({ color: { node } }: Theme) =>
          css`
            color: ${node.text};
          `
        }
        path={path}
      />
      <NodeProps css={propsCss} node={node} />
    </div>
  )
}

export default TextNode
