import React from 'react'
import { Story } from '@storybook/react'
import { ApiView, ApiViewProps } from '../../components'
import { editorApiFunctions } from '../util/api'
import { createStoryFactory, createStoryMeta } from './util'

const meta = createStoryMeta('Editor')
export default meta

const EditorInterfaceTemplate: Story<ApiViewProps> = (args) => (
  <ApiView {...args} />
)

const createStory = createStoryFactory(
  () => EditorInterfaceTemplate.bind({}),
  'Editor',
  editorApiFunctions
)

export const above = createStory('above')
export const addMark = createStory('addMark')
export const after = createStory('after')
export const before = createStory('before')
export const deleteBackward = createStory('deleteBackward')
export const deleteForward = createStory('deleteForward')
export const deleteFragment = createStory('deleteFragment')
export const edges = createStory('edges')
export const end = createStory('end')
export const first = createStory('first')
export const fragment = createStory('fragment')
export const hasBlocks = createStory('hasBlocks')
export const hasInlines = createStory('hasInlines')
export const hasTexts = createStory('hasTexts')
export const insertBreak = createStory('insertBreak')
export const insertNode = createStory('insertNode')
export const insertText = createStory('insertText')
export const isBlock = createStory('isBlock')
export const isEditor = createStory('isEditor')
export const isEnd = createStory('isEnd')
export const isEdge = createStory('isEdge')
export const isEmpty = createStory('isEmpty')
export const isInline = createStory('isInline')
export const isNormalizing = createStory('isNormalizing')
export const isStart = createStory('isStart')
export const isVoid = createStory('isVoid')
export const last = createStory('last')
export const leaf = createStory('leaf')
export const levels = createStory('levels')
export const marks = createStory('marks')
export const next = createStory('next')
export const node = createStory('node')
export const nodes = createStory('nodes')
export const normalize = createStory('normalize')
export const parent = createStory('parent')
export const path = createStory('path')
export const pathRef = createStory('pathRef')
export const pathRefs = createStory('pathRefs')
export const point = createStory('point')
export const pointRef = createStory('pointRef')
export const pointRefs = createStory('pointRefs')
export const positions = createStory('positions')
export const previous = createStory('previous')
export const range = createStory('range')
export const rangeRefs = createStory('rangeRefs')
export const removeMark = createStory('removeMark')
export const start = createStory('start')
export const string = createStory('string')
export const voidFn = createStory('void')
