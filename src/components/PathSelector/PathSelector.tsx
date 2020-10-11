/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Editor, Node, NodeEntry, Path } from 'slate'
import { useSlate } from 'slate-react'
import { NodeSpec } from '..'

const componentCss = css``

export interface PathSelectorProps {
  path?: Path
}

const PathSelector: React.FC<PathSelectorProps> = ({ path: initialPath }) => {
  const editor = useSlate()

  const [path, setPath] = React.useState(initialPath)

  const [selectedNodeEntries] = React.useState<NodeEntry<Node>[]>(() => {
    return path ? [Editor.node(editor, path)] : []
  })

  return (
    <div css={componentCss}>
      <input type="text" readOnly={true} value={JSON.stringify(path)} />
      <NodeSpec
        mode="path"
        selectedNodeEntries={selectedNodeEntries}
        onSelect={(pathOrPoint) =>
          Path.isPath(pathOrPoint)
            ? setPath(pathOrPoint)
            : setPath(pathOrPoint.path)
        }
      />
    </div>
  )
}

export default PathSelector
