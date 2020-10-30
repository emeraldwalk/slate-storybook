import React from 'react'
import { Story } from '@storybook/react'
import { Location, Node } from 'slate'
import { SlateContext } from '../util'
import { NodeSpecContextProvider } from '../../components'
import { emptySlateValue } from './mockData'

export interface StoryDecoratorProps {
  story: Story
  initialSlateValue?: Node[] | (() => Node[])
  onChange?: (value: Node[]) => void
}

export const SlateContextDecorator: React.FC<StoryDecoratorProps> = ({
  story: Story,
  initialSlateValue,
  onChange,
}) => {
  return (
    <SlateContext
      initialValue={initialSlateValue ?? emptySlateValue}
      onChange={onChange}
    >
      <Story />
    </SlateContext>
  )
}

export const NodeSpecContextDecorator: React.FC<
  StoryDecoratorProps & { initialHighlightLocations?: Location[] }
> = ({
  story: Story,
  initialSlateValue,
  onChange,
  initialHighlightLocations = [],
}) => {
  const [highlightLocations, setHighlightLocations] = React.useState<
    Location[]
  >(initialHighlightLocations)

  return (
    <SlateContext
      initialValue={initialSlateValue ?? emptySlateValue}
      onChange={onChange}
    >
      <NodeSpecContextProvider
        value={{ highlightLocations, setHighlightLocations }}
      >
        <Story />
      </NodeSpecContextProvider>
    </SlateContext>
  )
}
