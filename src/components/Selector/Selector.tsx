/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'

const componentCss = css``

export interface SelectorProps<
  TValue extends string | boolean | [string, Function]
> {
  label: string
  options: TValue[]
  value?: TValue
  onChange: (value?: TValue) => void
}

const Selector = <TValue extends string | boolean | [string, Function]>({
  label,
  options,
  value,
  onChange,
}: SelectorProps<TValue>) => {
  const [In, Out] = React.useMemo(() => {
    if (typeof options[0] === 'boolean') {
      return [String, (str?: string) => str === 'true'] as const
    }

    if (isTuple(options)) {
      return [
        (option?: [string, Function]) => option?.[0],
        (str: string) =>
          options.find(([label]: [string, Function]) => label === str),
      ] as const
    }

    return [String, String] as const
  }, [options])

  const onChangeInternal = React.useCallback(
    ({ currentTarget }: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(
        currentTarget.selectedIndex
          ? (Out(currentTarget.value) as TValue)
          : undefined
      )
    },
    [onChange, Out]
  )

  return (
    <select
      css={componentCss}
      className={value === undefined ? 'is-empty' : undefined}
      onChange={onChangeInternal}
      value={In(value as Parameters<typeof In>[0])}
    >
      <option value="">- {label} -</option>
      {options.map((option) => {
        const optionStr = In(option as Parameters<typeof In>[0])
        return (
          <option key={optionStr} value={optionStr}>
            {optionStr}
          </option>
        )
      })}
    </select>
  )
}

export default Selector

function isTuple(value: unknown[]): value is [string, Function][] {
  return Array.isArray(value[0]) && value[0].length === 2
}
