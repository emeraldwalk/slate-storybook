/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'

const componentCss = css``

export interface SourceLinkProps {
  path: string
}

const SourceLink: React.FC<SourceLinkProps> = ({ path }) => {
  return (
    <a
      css={componentCss}
      href={`https://github.com/emeraldwalk/slate-storybook/blob/master/${path}`}
      rel="noopener noreferrer"
      target="_blank"
    >
      Source
    </a>
  )
}

export default SourceLink
