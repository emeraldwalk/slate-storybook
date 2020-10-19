import React from 'react'
import { RenderElementProps, RenderLeafProps } from 'slate-react'

export function renderElement({
  element,
  attributes,
  children,
}: RenderElementProps) {
  let E = 'p'

  switch (element.type) {
    case 'unordered-list':
      E = 'ul'
      break

    case 'ordered-list':
      E = 'ol'
      break

    case 'list-item':
      E = 'li'
      break
  }

  return <E {...attributes}>{children}</E>
}

export function renderLeaf({ leaf, attributes, children }: RenderLeafProps) {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }
  return <span {...attributes}>{children}</span>
}
