/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'

const componentCss = css``

export interface NodeSpecProps {}

const NodeSpec: React.FC<NodeSpecProps> = () => {
  return <div css={componentCss}>NodeSpec</div>
}

export default NodeSpec
