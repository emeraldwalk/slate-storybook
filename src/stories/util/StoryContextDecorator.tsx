import React from 'react'
import { Story } from '@storybook/react'
import { Node, NodeEntry } from 'slate'
import { SlateContext } from '../util'
import { NodeSpecContextProvider } from '../../components'
import { mockParagraphsAndList } from './mockData'

interface StoryContextDecoratorProps {
  story: Story
}

const StoryContextDecorator: React.FC<StoryContextDecoratorProps> = ({
  story: Story,
}) => {
  const [selectedNodeEntries, setSelectedNodeEntries] = React.useState<
    NodeEntry<Node>[]
  >([])

  return (
    <SlateContext initialValue={mockParagraphsAndList}>
      <NodeSpecContextProvider
        value={{ selectedNodeEntries, setSelectedNodeEntries }}
      >
        <Story />
      </NodeSpecContextProvider>
    </SlateContext>
  )
}

export default StoryContextDecorator
