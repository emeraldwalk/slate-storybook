/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Path } from 'slate'

const componentCss = css``

export interface PathViewProps {
  className?: string
  path: Path
}

const PathView: React.FC<PathViewProps> = ({ className, path }) => {
  return (
    <span css={componentCss} className={className}>
      {JSON.stringify(path)}
    </span>
  )
}

export default PathView
