import { Editor } from 'slate'

export type Plugin<
  TEditorA extends Editor = Editor,
  TEditorB extends Editor = TEditorA
> = (editor: TEditorA) => TEditorB

/**
 * Composes a list of withXxx plugin functions.
 *
 * Creating a fully type aware pipe function gets really crazy,
 * so compromising by letting first function determine the input / ouput
 * type of subsequent functions. This lets us do something like:
 *
 * // editor will be of type (Editor & ReactEditor)
 * // based on first arg withReact
 * const editor = withPlugins(
 *   withReact,
 *   pluginA,
 *   pluginB
 * )(createEditor())
 */
export function withPlugins<TEditorA extends Editor, TEditorB extends Editor>(
  pluginA: Plugin<TEditorA, TEditorB>,
  ...plugins: Plugin<TEditorB>[]
): Plugin<TEditorA, TEditorB> {
  return function piped(editorA: TEditorA) {
    const editorB = pluginA(editorA)
    return plugins.reduce((memo, func) => func(memo), editorB)
  }
}
