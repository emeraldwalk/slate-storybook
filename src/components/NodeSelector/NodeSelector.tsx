/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Location, Path, Point } from 'slate'
import { Modal, NodeSpec } from '..'
import { Theme } from '../../theme'
import { useOffClickCallback } from '../../util/useOffClick.hook'

const componentCss = (theme: Theme) => css`
  .mdi.mdi-chevron-down {
    color: ${theme.placeholderColor};
    font-size: 19px;
    margin-right: -1px;
  }
`

export type NodeSelectorProps<TMode extends 'path' | 'point'> = {
  mode: TMode
  placeholder?: string
  value?: TMode extends 'path' ? Path : Point
  onChange: (value?: TMode extends 'path' ? Path : Point) => void
}

const NodeSelector = <TMode extends 'path' | 'point'>({
  mode,
  placeholder,
  value,
  onChange,
}: NodeSelectorProps<TMode>) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const valueStr = React.useMemo(() => JSON.stringify(value) ?? '', [value])
  const [triggerEl, setTriggerEl] = React.useState<HTMLSpanElement | null>(null)

  const [highlightedLocations] = React.useState<Location[]>(() => {
    return value ? [value] : []
  })

  const onClickInput = React.useCallback(() => {
    setIsOpen((isOpen) => !isOpen)
  }, [])

  const onClear = React.useCallback(() => {
    setIsOpen(false)
    onChange(undefined)
  }, [onChange])

  useOffClickCallback(
    triggerEl,
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
      <span
        ref={setTriggerEl}
        css={css`
          align-items: center;
          display: flex;
          position: relative;
        `}
      >
        <input
          css={(theme: Theme) => css`
            cursor: pointer;
            width: 100%;
            ::placeholder {
              color: ${theme.placeholderColor};
            }
          `}
          placeholder={
            placeholder ?? `Select ${mode === 'path' ? 'Path' : 'Point'}...`
          }
          type="text"
          readOnly={true}
          value={valueStr}
          onClick={onClickInput}
        />

        <span
          css={css`
            position: absolute;
            right: 0;
          `}
        >
          <i
            className={`mdi mdi-${value ? 'close' : 'chevron-down'}`}
            onClick={value ? onClear : onClickInput}
          ></i>
        </span>
      </span>
      {isOpen && triggerEl && (
        <Modal targetElement={triggerEl}>
          <NodeSpec
            css={(theme: Theme) => css`
              background-color: #fff;
              border: 1px solid ${theme.placeholderColor};
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
