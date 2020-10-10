import React from 'react'
import { Story, Meta } from '@storybook/react'
import { PathSelector, PathSelectorProps } from '../../components'
import { SlateContextDecorator } from '../util'
import { mockParagraphsAndList } from '../util/mockData'

export default {
  title: 'Components/PathSelector',
  component: PathSelector,
  decorators: [
    (Story, context) => {
      return (
        <SlateContextDecorator
          story={Story}
          initialSlateValue={context.parameters.initialSlateValue}
        />
      )
    },
  ],
} as Meta

const Template: Story<PathSelectorProps> = (args) => <PathSelector {...args} />

export const PathSelectorDefault = Template.bind({})
PathSelectorDefault.parameters = {
  initialSlateValue: mockParagraphsAndList,
}
