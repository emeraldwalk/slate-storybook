import React from 'react'
import { Story } from '@storybook/react'

import { ApiView, ApiViewProps } from '../../components'
import { pathApiFunctions } from '../util/api'
import { createStoryFactory, createStoryMeta } from './util'

const meta = createStoryMeta('Path')
export default meta

const PathInterfaceTemplate: Story<ApiViewProps> = (args) => (
  <ApiView {...args} />
)

const createStory = createStoryFactory(
  () => PathInterfaceTemplate.bind({}),
  'Path',
  pathApiFunctions
)

// console.log(
//   Object.keys(pathApiFunctions)
//     .map((method) => `export const ${method} = createStory('${method}')`)
//     .join('\n')
// )

export const ancestors = createStory('ancestors')
export const common = createStory('common')
export const compare = createStory('compare')
export const endsAfter = createStory('endsAfter')
export const endsAt = createStory('endsAt')
export const endsBefore = createStory('endsBefore')
export const equals = createStory('equals')
export const isAfter = createStory('isAfter')
export const isAncestor = createStory('isAncestor')
export const isBefore = createStory('isBefore')
export const isChild = createStory('isChild')
export const isCommon = createStory('isCommon')
export const isDescendant = createStory('isDescendant')
export const isParent = createStory('isParent')
export const isPath = createStory('isPath')
export const isSibling = createStory('isSibling')
export const levels = createStory('levels')
export const next = createStory('next')
export const parent = createStory('parent')
export const previous = createStory('previous')
export const relative = createStory('relative')
