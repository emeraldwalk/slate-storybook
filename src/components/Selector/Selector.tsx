/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'

const componentCss = css``

export interface SelectorProps<TValue extends string | boolean> {
  label: string
  options: TValue[]
  value?: TValue
  onChange: (value?: TValue) => void
}

const Selector = <TValue extends string | boolean>({
  label,
  options,
  value,
  onChange,
}: SelectorProps<TValue>) => {
  const onChangeInternal = React.useCallback(
    ({ currentTarget }: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(
        currentTarget.selectedIndex
          ? (currentTarget.value as TValue)
          : undefined
      )
    },
    [onChange]
  )

  return (
    <select
      css={componentCss}
      className={value === undefined ? 'is-empty' : undefined}
      onChange={onChangeInternal}
      value={String(value)}
    >
      <option value="">- {label} -</option>
      {options.map((option) => (
        <option key={String(option)} value={String(option)}>
          {option}
        </option>
      ))}
    </select>
  )
}

export default Selector
