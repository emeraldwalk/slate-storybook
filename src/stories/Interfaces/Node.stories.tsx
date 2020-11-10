import React from 'react'
import { Story } from '@storybook/react'

import { ApiView, ApiViewProps } from '../../components'
import { nodeApiFunctions } from '../util/api'
import { createStoryFactory, createStoryMeta } from './util'

const meta = createStoryMeta('Node')
export default meta

const NodeInterfaceTemplate: Story<ApiViewProps> = (args) => (
  <ApiView {...args} />
)

const createStory = createStoryFactory(
  () => NodeInterfaceTemplate.bind({}),
  'Node',
  nodeApiFunctions
)

// console.log(
//   Object.keys(nodeApiFunctions)
//     .map((method) => `export const ${method} = createStory('${method}')`)
//     .join('\n')
// )

export const ancestor = createStory('ancestor')
export const ancestors = createStory('ancestors')
export const child = createStory('child')
export const children = createStory('children')
export const common = createStory('common')
export const descendant = createStory('descendant')
export const first = createStory('first')
export const get = createStory('get')
export const has = createStory('has')
export const isNode = createStory('isNode')
export const isNodeList = createStory('isNodeList')
export const last = createStory('last')
export const leaf = createStory('leaf')
export const levels = createStory('levels')
export const parent = createStory('parent')
export const string = createStory('string')
