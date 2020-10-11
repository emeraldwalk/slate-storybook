import React from 'react'
import { Story, Meta } from '@storybook/react'
import { PathSelector, PathSelectorProps } from '../../components'
import { SlateContextDecorator } from '../util'
import { mockParagraphsAndList } from '../util/mockData'
import { Path } from 'slate'

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

const Template: Story<PathSelectorProps> = (args) => {
  const [path, setPath] = React.useState<Path | undefined>(undefined)
  return <PathSelector {...args} path={path} onChangePath={setPath} />
}

export const PathSelectorDefault = Template.bind({})
PathSelectorDefault.parameters = {
  initialSlateValue: mockParagraphsAndList,
}
