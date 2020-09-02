import { Editor } from 'slate'
export type Plugin = <TEditor extends Editor>(editor: Editor) => TEditor