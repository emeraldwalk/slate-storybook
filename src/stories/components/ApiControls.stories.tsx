import React from 'react'
import { Story, Meta } from '@storybook/react'
import { ApiControls, ApiControlsProps } from '../../components'
import { NodeSpecContextDecorator } from '../util'
import { mockParagraphsAndList } from '../util/mockData'
import { editorApiFunctions } from '../util/api'
import { useArgValues } from '../../components/ApiControls/model'

export default {
  title: 'Components/ApiControls',
  component: ApiControls,
  decorators: [
    (Story, context) => {
      return (
        <NodeSpecContextDecorator
          story={Story}
          initialSlateValue={context.parameters.initialSlateValue}
        />
      )
    },
  ],
} as Meta

const Template: Story<ApiControlsProps> = ({ apiFunction, onChange }) => {
  const [values, setValues] = useArgValues(apiFunction.args)
  const onChangeInternal = React.useCallback(
    (values) => {
      setValues(values)
      onChange(values)
    },
    [onChange, setValues]
  )
  return (
    <ApiControls
      apiFunction={apiFunction}
      values={values}
      onChange={onChangeInternal}
    />
  )
}

export const ApiControlsDefault = Template.bind({})
ApiControlsDefault.parameters = {
  initialSlateValue: mockParagraphsAndList,
}
ApiControlsDefault.args = {
  apiFunction: editorApiFunctions[0],
  values: [],
}
