import React from 'react'
import { Story } from '@storybook/react'
import { ApiView, ApiViewProps } from '../../components'
import {
  editorApiFunctions,
  nodeApiFunctions,
  pathApiFunctions,
} from '../util/api'
import { createStoryFactory, createStoryMeta } from './util'

const meta = createStoryMeta()
export default meta

const InterfaceTemplate: Story<ApiViewProps> = (args) => <ApiView {...args} />

const createEditorStory = createStoryFactory(
  () => InterfaceTemplate.bind({}),
  'Editor',
  editorApiFunctions
)

const createPathStory = createStoryFactory(
  () => InterfaceTemplate.bind({}),
  'Path',
  pathApiFunctions
)

const createNodeStory = createStoryFactory(
  () => InterfaceTemplate.bind({}),
  'Node',
  nodeApiFunctions
)

export const editor = createEditorStory()
export const node = createNodeStory()
export const path = createPathStory()
