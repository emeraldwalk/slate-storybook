import { Node } from 'slate'

export const emptySlateValue = (): Node[] => {
  return [
    {
      children: [{ text: '' }],
    },
  ]
}

export const mockParagraphsAndList = (): Node[] => [
  {
    type: 'paragraph',
    children: [{ text: 'Aaa aaa aaa.' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Bbb bbb bbb.' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Ccc ccc ccc.' }],
  },
  {
    type: 'unordered-list',
    children: [
      { type: 'list-item', children: [{ text: 'One' }] },
      { type: 'list-item', children: [{ text: 'Two' }] },
      { type: 'list-item', children: [{ text: 'Three' }] },
    ],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Ddd ddd ddd.' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Eee eee eee.' }],
  },
]
