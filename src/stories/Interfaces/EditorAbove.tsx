import React from 'react'
import { Editor, Path, Point, Range } from 'slate'
import { Editable, useEditor } from 'slate-react'
import { useNodeSpecContext } from '../../components'

// const docs = `/**
//  * Get the ancestor above a location in the document.
//  *
//  * @param options
//  */
// above<T extends Ancestor>(
//   editor: Editor,
//   options?: {
//     at?: Range | Path | Point | undefined;
//     match?: ((node: Node) => boolean) | ((node: Node) => node is T) | undefined;
//     mode?: "highest" | "lowest" | undefined;
//     voids?: boolean | undefined;
//   }
// ): NodeEntry<T> | undefined;`

export interface AboveProps {
  at?: Range | Path | Point
}

const Above: React.FC<AboveProps> = () => {
  const editor = useEditor()
  const { setHighlightLocations } = useNodeSpecContext()

  const onClick = React.useCallback(() => {
    const result = Editor.above(editor)
    console.log(result)
    if (result) {
      setHighlightLocations([result[1]])
    }
  }, [editor, setHighlightLocations])

  return (
    <div>
      <Editable />
      <button onClick={onClick}>Above</button>
      {/* <pre>{docs}</pre> */}
    </div>
  )
}

export default Above
