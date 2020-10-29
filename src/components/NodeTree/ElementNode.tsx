/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Element, Path } from 'slate'
import { NodeProps, PathView } from '..'
import { Theme } from '../../theme'

const componentCss = ({ color: { node } }: Theme) => css`
  color: ${node.element};
  display: flex;
  > * {
    margin-right: 0.3em;
  }
`

const propsCss = ({ textInverseColor }: Theme) => css`
  color: ${textInverseColor};
`

export interface ElementNodeProps {
  className?: string
  node: Element
  path: Path
}

const ElementNode: React.FC<ElementNodeProps> = ({ className, node, path }) => {
  return (
    <div title="Element Node" css={componentCss} className={className}>
      <i className="mdi mdi-alpha-e-circle-outline"></i>
      <PathView path={path} />
      <NodeProps css={propsCss} node={node} />
    </div>
  )
}

export default ElementNode
