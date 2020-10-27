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
    children: [
      {
        text:
          'This is generic content showcasing various Slate data model features. Text formatting such as ',
      },
      {
        bold: true,
        text: 'bold',
      },
      {
        text: ' and ',
      },
      {
        italic: true,
        text: 'italics',
      },
      {
        text: 'are implemented as "marks" on Text nodes.',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          'Differing block types such as lists and paragraphs are defined by attributes on Element nodes.',
      },
    ],
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
