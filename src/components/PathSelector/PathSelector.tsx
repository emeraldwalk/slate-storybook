/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Editor, Node, NodeEntry, Path, Point } from 'slate'
import { useSlate } from 'slate-react'
import { Modal, NodeSpec } from '..'
import { useOffClickCallback } from '../../util/useOffClick.hook'

const componentCss = css``

export interface PathSelectorProps {
  path?: Path
  onChangePath: (path: Path) => void
}

const PathSelector: React.FC<PathSelectorProps> = ({ path, onChangePath }) => {
  const editor = useSlate()
  const [isOpen, setIsOpen] = React.useState(false)
  const pathValue = React.useMemo(() => JSON.stringify(path) ?? '', [path])
  const [inputEl, setInputEl] = React.useState<HTMLInputElement | null>(null)

  const [selectedNodeEntries] = React.useState<NodeEntry<Node>[]>(() => {
    return path ? [Editor.node(editor, path)] : []
  })

  const onClickInput = React.useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      event.stopPropagation()
      setIsOpen((isOpen) => !isOpen)
    },
    []
  )

  useOffClickCallback(
    inputEl,
    React.useCallback(() => {
      setIsOpen(false)
    }, [])
  )

  const onSelect = React.useCallback(
    (pathOrPoint: Path | Point) => {
      Path.isPath(pathOrPoint)
        ? onChangePath(pathOrPoint)
        : onChangePath(pathOrPoint.path)

      setIsOpen(false)
    },
    [onChangePath]
  )

  return (
    <div css={componentCss}>
      <input
        ref={setInputEl}
        css={css`
          cursor: pointer;
        `}
        type="text"
        readOnly={true}
        value={pathValue}
        onClick={onClickInput}
      />
      {isOpen && inputEl && (
        <Modal targetElement={inputEl}>
          <NodeSpec
            css={css`
              height: 250px;
            `}
            mode="path"
            selectedNodeEntries={selectedNodeEntries}
            onSelect={onSelect}
          />
        </Modal>
      )}
    </div>
  )
}

export default PathSelector
