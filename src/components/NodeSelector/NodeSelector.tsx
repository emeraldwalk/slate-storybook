/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Location, Path, Point } from 'slate'
import { Modal, NodeSpec } from '..'
import { useOffClickCallback } from '../../util/useOffClick.hook'

const componentCss = css``

export type NodeSelectorProps<TMode extends 'path' | 'point'> = {
  mode: TMode
  value?: TMode extends 'path' ? Path : Point
  onChange: (value: TMode extends 'path' ? Path : Point) => void
}

const NodeSelector = <TMode extends 'path' | 'point'>({
  mode,
  value,
  onChange,
}: NodeSelectorProps<TMode>) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const valueStr = React.useMemo(() => JSON.stringify(value) ?? '', [value])
  const [inputEl, setInputEl] = React.useState<HTMLInputElement | null>(null)

  const [highlightedLocations] = React.useState<Location[]>(() => {
    return value ? [value] : []
  })

  const onClickInput = React.useCallback(() => {
    setIsOpen((isOpen) => !isOpen)
  }, [])

  useOffClickCallback(
    inputEl,
    React.useCallback(() => {
      setIsOpen(false)
    }, [])
  )

  const onSelect = React.useCallback(
    (pathOrPoint: TMode extends 'path' ? Path : Point) => {
      onChange(pathOrPoint)
      setIsOpen(false)
    },
    [onChange]
  )

  return (
    <div css={componentCss}>
      <input
        ref={setInputEl}
        css={css`
          cursor: pointer;
        `}
        placeholder={`Select ${mode === 'path' ? 'Path' : 'Point'}...`}
        type="text"
        readOnly={true}
        value={valueStr}
        onClick={onClickInput}
      />
      {isOpen && inputEl && (
        <Modal targetElement={inputEl}>
          <NodeSpec
            css={css`
              height: 250px;
            `}
            mode={mode}
            highlightLocations={highlightedLocations}
            onSelect={onSelect as any}
          />
        </Modal>
      )}
    </div>
  )
}

export default NodeSelector
