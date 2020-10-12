/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Editor, Node, NodeEntry, Path, Point } from 'slate'
import { useSlate } from 'slate-react'
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
  const editor = useSlate()
  const [isOpen, setIsOpen] = React.useState(false)
  const valueStr = React.useMemo(() => JSON.stringify(value) ?? '', [value])
  const [inputEl, setInputEl] = React.useState<HTMLInputElement | null>(null)

  const [selectedNodeEntries] = React.useState<NodeEntry<Node>[]>(() => {
    return value ? [Editor.node(editor, value)] : []
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
        placeholder="Select Path..."
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
            selectedNodeEntries={selectedNodeEntries}
            onSelect={onSelect as any}
          />
        </Modal>
      )}
    </div>
  )
}

export default NodeSelector
