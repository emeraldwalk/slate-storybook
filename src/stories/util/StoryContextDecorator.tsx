import React from 'react'
import { Story } from '@storybook/react'
import { Node, NodeEntry } from 'slate'
import { SlateContext } from '../util'
import { NodeSpecContextProvider } from '../../components'
import { emptySlateValue } from './mockData'

export interface StoryDecoratorProps {
  story: Story
  initialSlateValue?: () => Node[]
}

export const SlateContextDecorator: React.FC<StoryDecoratorProps> = ({
  story: Story,
  initialSlateValue,
}) => {
  return (
    <SlateContext initialValue={initialSlateValue ?? emptySlateValue}>
      <Story />
    </SlateContext>
  )
}

export const NodeSpecContextDecorator: React.FC<StoryDecoratorProps> = ({
  story: Story,
  initialSlateValue,
}) => {
  const [selectedNodeEntries, setSelectedNodeEntries] = React.useState<
    NodeEntry<Node>[]
  >([])

  return (
    <SlateContext initialValue={initialSlateValue ?? emptySlateValue}>
      <NodeSpecContextProvider
        value={{ selectedNodeEntries, setSelectedNodeEntries }}
      >
        <Story />
      </NodeSpecContextProvider>
    </SlateContext>
  )
}
