import React from 'react'
import { Editor, Path, Point, Range, Transforms } from 'slate'
import { Editable, useEditor } from 'slate-react'

const docs = `/**
 * Get the ancestor above a location in the document.
 *
 * @param options
 */
above<T extends Ancestor>(
  editor: Editor,
  options?: {
    at?: Range | Path | Point | undefined;
    match?: ((node: Node) => boolean) | ((node: Node) => node is T) | undefined;
    mode?: "highest" | "lowest" | undefined;
    voids?: boolean | undefined;
  }
): NodeEntry<T> | undefined;`

export interface AboveProps {
  at?: Range | Path | Point
}

export const Above: React.FC<AboveProps> = () => {
  const editor = useEditor()

  const onClick = React.useCallback(() => {
    console.log(Editor.above(editor))
  }, [editor])

  return (
    <div>
      <Editable />
      <button onClick={onClick}>Above</button>
      {/* <pre>{docs}</pre> */}
    </div>
  )
}
