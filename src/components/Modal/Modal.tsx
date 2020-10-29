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
        top: ${bottom + window.scrollY}px;
        left: 0;// ${left + window.scrollX}px;
      `}
    >
      {children}
    </div>,
    document.body
  )
}

export default Modal
