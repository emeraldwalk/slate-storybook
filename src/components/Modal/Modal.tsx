/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import ReactDOM from 'react-dom'

export interface ModalProps {
  targetElement: HTMLElement
}

const Modal: React.FC<ModalProps> = ({ children, targetElement }) => {
  const { bottom, left } = React.useMemo(
    () => targetElement.getBoundingClientRect(),
    [targetElement]
  )

  return ReactDOM.createPortal(
    <div
      css={css`
        position: absolute;
        top: ${bottom}px;
        left: ${left}px;
      `}
    >
      {children}
    </div>,
    document.body
  )
}

export default Modal
