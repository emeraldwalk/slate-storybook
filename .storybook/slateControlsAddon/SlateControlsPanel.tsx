/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { addons, types } from '@storybook/addons'
import { useParameter } from '@storybook/api'
import { AddonPanel } from '@storybook/components'
import NodeSelector from '../../src/components/NodeSelector/NodeSelector'

const componentCss = css``

export interface SlateControlsProps {
  addOnId: string
}

const SlateControls: React.FC<SlateControlsProps> = ({ addOnId }) => {
  // const { component: Component } = useParameter<{
  //   component: () => JSX.Element
  // }>(addOnId) || {
  //   component: () => null,
  // }
  // const c = <Component />
  // console.log(Component, c)
  // return <div>{c}</div>
  return <NodeSelector mode="path" value={[]} onChange={console.log} />
}

export default SlateControls

export function registerPanel(addOnId: string) {
  return () => {
    const panelId = `${addOnId}/panel`

    addons.add(panelId, {
      type: types.PANEL,
      title: 'Controls',
      render: ({ active, key }) => {
        return (
          <AddonPanel active={active} key={key}>
            <SlateControls addOnId={addOnId} />
          </AddonPanel>
        )
      },
    })
  }
}
