/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'

const componentCss = css``

export interface SelectorProps<TValue extends string> {
  label: string
  options: TValue[]
  value?: TValue
  onChange: (value?: TValue) => void
}

const Selector = <TValue extends string>({
  label,
  options,
  value,
  onChange,
}: SelectorProps<TValue>) => {
  const onChangeInternal = React.useCallback(
    ({ currentTarget }: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(currentTarget.value as TValue | undefined)
    },
    [onChange]
  )

  return (
    <select css={componentCss} onChange={onChangeInternal} value={value}>
      <option value={undefined}>- {label} -</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export default Selector
