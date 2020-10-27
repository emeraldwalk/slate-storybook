/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Element, Path } from 'slate'
import { NodeProps, PathView } from '..'
import { Theme } from '../../theme'

const componentCss = ({ color: { node } }: Theme) => css`
  color: ${node.element};
  display: flex;
`

const propsCss = ({ textInverseColor }: Theme) => css`
  color: ${textInverseColor};
`

export interface ElementNodeProps {
  node: Element
  path: Path
}

const ElementNode: React.FC<ElementNodeProps> = ({ node, path }) => {
  return (
    <div title="Element Node" css={componentCss}>
      <i className="mdi mdi-alpha-e-circle-outline"></i>
      <PathView path={path} />
      <NodeProps css={propsCss} node={node} />
    </div>
  )
}

export default ElementNode
